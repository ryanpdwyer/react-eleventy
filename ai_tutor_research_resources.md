---
layout: vanillabootflex-md.njk
title: AI Tutor — Reference Resources
---

# AI Tutor — Reference Resources

A compact, self-contained reference for a researcher working on an AI chatbot for education. Drawn from a production chemistry tutor ("DOT") embedded in the OLI Torus learning platform. All student data has been stripped — what's here is **prompts, context-loading patterns, function-calling tools, and methodology** (evaluation rubric + categorization codebook).

---

## 1. The base Socratic system prompt (production)

This is the actual default `page_prompt` template that DOT uses. It's an Elixir `EEx` template — the `<%= … %>` slots get filled in per request.

```text
You are an assistant in a <%= course_title %> course. <%= course_description %>

Your goal is to help the student. Do not answer questions that you do not know the answer to.
If you do not know the answer, you can say "I don't know" or "I don't understand".
If you do not know the answer, you can also ask the student to rephrase the question.
You can also ask the student to provide more context.

You will have access to a set of functions, but only those functions. You do not have
the abiity to execute arbitrary code (in python or otherwise).

The current user's user id (current_user_id) is <%= current_user_id %>.

The current course section's unique id (section_id) is <%= section_id %>.

Your assistance is being requested within the context of a particular lesson with this course.
Please pay attention to this specific lesson content when providing assistance. The content of
the lesson is:

<%= page_content %>
```

Key design choices:

- **Lightweight system prompt, heavy context injection.** The persona is short; the bulk of every prompt is the lesson page itself.
- **Explicit "I don't know" license.** The model is told it's OK to refuse — a common hallucination mitigation.
- **IDs are passed in.** `current_user_id` and `section_id` become arguments the model can pass to tool calls (see §4).
- **Customizable per course section.** This template lives in the DB (`sections.page_prompt_template`), not hard-coded — instructors/admins can override.

---

## 2. How the per-request prompt context is assembled

For each conversation turn, the platform builds the system prompt by filling these slots:

| Slot              | Source                                                                                    |
|-------------------|-------------------------------------------------------------------------------------------|
| `course_title`    | Project metadata                                                                          |
| `course_description` | Project metadata                                                                       |
| `current_user_id` | LiveView session                                                                          |
| `section_id`      | LiveView session                                                                          |
| `page_content`    | **Rendered text version of the current lesson page**, stored in a Cachex cache by `revision_id` |

The `page_content` is the rendered *text* (not HTML) of the lesson the student is currently viewing. It is populated when the student loads the page via `PageContentCache.put(page_id, page_as_text)`, and pulled back during the dialogue's system-prompt build via `PageContentCache.get(revision_id)`.

For pages with no specific lesson context (Home, Discussions, etc.), `page_content` is replaced with:

```text
Use only the available functions and their outputs to answer the question.
Avoid drawing on external or assumed information.
```

Conversation history is stored separately in a Postgres table `assistant_conversation_messages` with columns: `role` (system/user/assistant/function), `content`, `token_length`, `user_id`, `resource_id`, `section_id`. History is replayed into the LLM call as standard chat messages.

---

## 3. Trigger-based proactive prompts (DOT activates on student events)

DOT isn't just reactive — the platform fires it proactively at instrumented points. Each trigger gets a short "what just happened" description appended to an author-supplied instruction. This is the wrapper template that wraps every trigger prompt:

```text
AI Activation points are a feature of this platform that allow a course author to instrument
various points of student interaction in the course to 'activate' your (the AI agent)
intervention. This is one such AI activation point invocation. The author has configured this
activation point in response to a student action or event. Do not mention 'activation points' ever.

Some questions are comprised of multiple parts. You MUST limit your response to only the
specified part of the question.

In this activation point, the student has just {REASON}

Engage by greeting the student.

VERY IMPORTANT: The author has also requested the AI agent to
follow these specific instructions while engaging with the student:

{AUTHOR_PROMPT}
```

`{REASON}` is one of these strings, generated from trigger type and event data:

| Trigger              | Reason text                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `page`               | `Visited the learning page`                                                 |
| `content_group`      | `Clicked a button next to a content group id (id: {ref_id})`                |
| `content_block`      | `Viewed a content block (id: {ref_id})`                                     |
| `correct_answer`     | `Answered correctly part {part_id} of question {question}. The student's response is in: {student_response}` |
| `incorrect_answer`   | `Answered incorrectly part {part_id} of question {question}. The student's response is in: {student_response}` |
| `hint`               | `Requested a hint (id: {ref_id}) for part {part_id} of question {question}` |
| `explanation`        | `Received the explanation (id: {ref_id}) for part {part_id} of question {question}` |
| `targeted_feedback`  | `Received targeted feedback (id: {ref_id}) for part {part_id} of question {question}. The student's response is in: {student_response}` |

For evaluation triggers (`correct_answer`, `incorrect_answer`, `explanation`, `targeted_feedback`), the platform also encodes the full question model and the student's part attempts as JSON and injects them into the prompt context.

`{AUTHOR_PROMPT}` is whatever instruction the course author wrote — e.g., "If the student got this wrong, do not give the answer; ask them about their reasoning about X."

---

## 4. Sample `{AUTHOR_PROMPT}` values from production

Three real author-written prompts pulled from production triggers in the General Chemistry I course. They show the typical pattern: a guardrail for empty/junk input, a role assignment, the expert answer or rubric, and explicit constraints on length, tone, and feedback style. The author prompt does double duty — it's both what DOT operates under at runtime *and* what DOT is judged against later by the LLM-as-judge in §5.

### Sample A — "When is the molecular shape the same as the electron-group geometry?"

```text
If this student doesn't enter anything, ask them to give their best guess.
If a student enters gibberish, ask them to make their best guess.
You are an expert chemistry tutor. Your task is to evaluate a student's response to this question.

Use this expert answer to guide your evaluation: "When there are no lone pairs of electrons around the central atom."

Constraints:
1. Compare the student's answer to the expert's answer.
2. If the response is correct, provide positive, specific feedback in no more than four sentences and under 80 words.
3. If the response is incomplete or incorrect, identify what's missing or wrong and offer a clear hint, also in no more than four sentences and under 80 words.
4. Always keep your tone concise, constructive, and encouraging.
```

### Sample B — "What do you notice more generally about the phase diagram of water?"

```text
If this student doesn't enter anything, ask them to give their best guess.
If a student enters gibberish, ask them to make their best guess.
You are an expert chemistry tutor. Your task is to evaluate a student's response to this question.

Use this rubric to guide your evaluation:
"You would be correct if you said there are three regions of the phase diagram (solid, liquid, and gas), and there are boundaries between the regions. The water phase diagram shown here has a solid–liquid phase boundary and a liquid–gas phase boundary. A part of the phase diagram that's not shown in this graph is the solid–gas phase diagram, which occurs at pressures that are very close to 0 atm (difficult to see in the scale of this graph) and mainly at negative temperatures (in °C)."

Constraints:
If the response is correct, provide positive, specific feedback in no more than four sentences and under 80 words.

If the response is incomplete or incorrect, identify what's missing or wrong and offer a clear hint, also in no more than four sentences and under 80 words.

Always keep your tone concise, constructive, and encouraging.
```

### Sample C — "What are two ways that these entities are different?"

```text
If this student doesn't enter anything, ask them to give their best guess.
If a student enters gibberish, ask them to make their best guess.
You are an expert chemistry tutor. Your task is to evaluate a student's response to this question.

Use this rubric to guide your evaluation:
"Does your answer include any of these possible physical differences, such as color, texture, the thickness of a liquid, whether it dissolves easily in water, or the temperature at which it melts or boils? How about any of these possible chemical differences, such as smell, taste, whether gas bubbles form when it's mixed with vinegar, or whether it rusts?"

Constraints:
If the response is correct, provide positive, specific feedback in no more than four sentences and under 80 words.

If the response is incomplete or incorrect, identify what's missing or wrong and offer a clear hint, also in no more than four sentences and under 80 words.

Always keep your tone concise, constructive, and encouraging.
```

### Recurring patterns across author prompts

- **Empty/gibberish guardrails up front.** Almost every author prompt opens with the same two-line "if no input / if gibberish, ask for best guess" — to prevent DOT from producing meaningful-sounding feedback on meaningless input.
- **Role-priming line.** `"You are an expert chemistry tutor. Your task is to evaluate a student's response to this question."` — a per-trigger role reset, even though there's a global system prompt above it.
- **Expert answer OR rubric, not both.** Sometimes the author supplies the canonical correct answer; sometimes a softer "you would be correct if you mentioned any of…" rubric for open-ended questions.
- **Tight length budget.** "≤ 4 sentences, ≤ 80 words" appears in almost every prompt. This is one of the binary criteria DOT is later judged on (§5: `met_word_limit`, `met_sentence_limit`).
- **Two branches: correct vs. incorrect/incomplete.** Almost every author prompt has exactly these two response paths.

---

## 5. Function-calling tools the LLM has access to

DOT gets exposed four tools (OpenAI / Anthropic function-calling style). These are what shape what DOT *can* know beyond the page text:

```json
[
  {
    "name": "course_sequence",
    "description": "Returns the full sequence of units, modules, sections and learning pages in this course as a list of objects with keys [resource_id, title, url, is_page, graded, level].",
    "parameters": {"section_id": "integer"}
  },
  {
    "name": "up_next",
    "description": "Returns the next scheduled lessons in the course as a list of objects with keys title, url, due_date, num_attempts_taken.",
    "parameters": {"current_user_id": "integer", "section_id": "integer"}
  },
  {
    "name": "avg_score_for",
    "description": "Returns average score across all scored assessments (float 0–1) for a given user and section.",
    "parameters": {"current_user_id": "integer", "section_id": "integer"}
  },
  {
    "name": "relevant_course_content",
    "description": "Useful when a student's question cannot be adequately answered by the context of the current lesson. Retrieves relevant course content from other lessons. Returns {relevant_pages, instructors, layout, content}.",
    "parameters": {"student_input": "string", "section_id": "integer"}
  }
]
```

Notable design choices:

- **No raw answer-key access.** No tool exposes correct answers to past questions.
- **No PII tools.** No "tell me about student X" tool.
- **One retrieval-style tool.** `relevant_course_content` is the platform's RAG escape hatch when the current page text isn't enough.
- **Student history is summarized, not raw.** `avg_score_for` returns a float — not the student's full attempt log.

---

## 6. Evaluation rubric (LLM-as-judge)

The team scores DOT's responses against an "Expert Rubric" the author wrote per question (see §4). The judge prompt scores 9 binary criteria + free-text notes. Full template:

```text
# Context
You are evaluating responses from DOT, an AI tutoring assistant embedded in a college-level
General Chemistry I course. Students are typically first-year undergraduates. DOT provides
formative feedback on open-response questions.

DOT was given instructions (the "Expert Rubric") specifying how to evaluate student answers
and what feedback to provide.

---

## Question Asked to Student
{{ question }}

---

## Expert Rubric (DOT's Instructions)
{{ expert_rubric }}

---

## Student's Response
{{ student_response }}

---

## DOT's Actual Response
{{ dot_response }}

---

# Evaluation Criteria

Answer true/false for each criterion.

## A. Did DOT follow the rubric?
1. correctly_identified_answer_quality: Did DOT correctly judge whether the student's answer
   was correct, incorrect, or incomplete according to the rubric's criteria?
2. stayed_on_topic: Did DOT address the specific concepts/criteria mentioned in the rubric
   (not go off on tangents)?
3. appropriate_response_type: Did DOT give praise for correct answers and hints/guidance
   for incorrect/incomplete ones (as the rubric typically instructs)?

## B. Did DOT follow constraints?
4. met_word_limit: Is DOT's response within the word limit specified in the rubric
   (typically under 80 words)? If no limit specified, answer true.
5. met_sentence_limit: Is DOT's response within the sentence limit specified in the rubric
   (typically 4 sentences or less)? If no limit specified, answer true.
6. appropriate_tone: Is DOT's tone constructive and encouraging (not dismissive,
   condescending, or discouraging)?

## C. Did DOT make errors?
7. factual_error: Did DOT state something chemically or scientifically incorrect?
8. misleading_hint: Did DOT give a hint or guidance that would lead the student toward a
   wrong answer?
9. misread_student: Did DOT misinterpret or misunderstand what the student actually wrote?

---

# Response Format
Respond with ONLY valid JSON, no text outside the JSON:

{
  "correctly_identified_answer_quality": true,
  "stayed_on_topic": true,
  "appropriate_response_type": true,
  "met_word_limit": true,
  "met_sentence_limit": true,
  "appropriate_tone": true,
  "factual_error": false,
  "misleading_hint": false,
  "misread_student": false,
  "notes": "One sentence explaining any issues, or empty string if none"
}
```

The three rubric "axes" are intentional: (A) did the tutor follow the *pedagogical* rubric, (B) did it follow the *formatting* constraints, (C) did it make *correctness* errors. They're scored independently so failure modes don't get conflated.

---

## 7. Student-message categorization codebook

Used to bulk-code real student messages with an LLM "as coder." Useful both as an analysis lens and as a starting taxonomy.

```
1_Content
  - Concept            (scientific principles, ideas, facts)
  - Problem_Solving    (asking for help on a calculation/step)
  - Process            (how to do a procedure)
  - Direct_from_Course (copy-paste of course material — see below)
  - Explain_Why        (reasoning/causation questions)
  - Summarize_Content  (asks for concise overview)

2_Course_Administration
  - Locate             (where to find materials)
  - Due_Dates          (deadlines)
  - Grades             (scores/grading)

3_Platform_Issues
  - Bugs               (errors/broken features)
  - Formatting         (how to enter answers, sig figs, units)
  - Functioning        (how features work)

4_Feedback
  - Positive
  - Negative
  - Neutral            (objective observations)

5_Unserious_Conversation
  - Off_Topic          (jokes, voting, etc.)
  - Greeting           ("hi", "hello")
  - Thanks             ("ty", "thanks")

6_Conversational  (only meaningful in context of an ongoing exchange)
  - Affirmative        ("yes", "ok", "sure")
  - Negative           ("no", "nope")
  - Follow_Up          ("can you explain more?", "and then?")
  - Answer_Attempt     (bare answers: "12", "NaCl", "0.003")

Others
  - Exams
  - Practice_Problems
  - Ask_Answers        (wants the answer, not help understanding)
```

**Direct_from_Course detection:** A frequent and interesting pattern is students copy-pasting the question prompt into chat. To detect it, the categorizer prompt is given the **page title + a list of activity titles on that page** as additional context, and asked to flag near-paraphrases.

**Conversation history is also injected** into the categorizer prompt as a sequence of `<role>...</role>` blocks, so the coder can disambiguate things like "yes" (Affirmative reply to a tutor) from "yes" (Off-Topic noise).

---

## 8. Architectural patterns worth borrowing

- **Cache page text by revision, not by request.** Lesson content barely changes; the system caches `rendered_text(page)` keyed by `revision_id` so prompt construction is O(1).
- **Templates in DB, not in code.** The system prompt lives in a Postgres row, so per-course customization doesn't require deployment.
- **Trigger metadata as natural language.** Rather than passing the model a structured "event = INCORRECT_ANSWER" payload, the platform converts it to a sentence ("The student just answered incorrectly part 2 of question Q42…"). Easier for the LLM, easier to debug in logs.
- **Per-author instructions on top of a global wrapper.** The trigger wrapper is fixed; each activity author writes their own `{AUTHOR_PROMPT}` for that specific question (see §4). This lets pedagogy live where pedagogy expertise lives, without giving authors the ability to break platform-level safety guardrails.
- **Author prompts double as eval rubrics.** The same string is the runtime instruction and the gold standard the judge model evaluates against — so any prompt iteration automatically updates the evaluation criteria.
- **LLM-as-judge with binary criteria + free-text notes.** The 9 criteria are independent yes/no questions. Scoring noise drops dramatically vs. asking the judge for a single Likert score.
- **Coding-with-conversation-context.** Single-message classification is noisy because of short replies ("yes", "12"). Feeding the prior turns as context fixes most of it.
