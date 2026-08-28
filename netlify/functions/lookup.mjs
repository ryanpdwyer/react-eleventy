import { getStore } from "@netlify/blobs";

// Permanent test accounts (also the local-dev fallback when no roster blob exists).
// The real roster is NOT in this repo: upload it with
//   netlify blobs:set che120 roster-26fa --input roster-26fa.json
// Row shape: { "Student Name", "Email", "section", "labId", "Vial", "U1", "U2", "DU" }
const placeholders = [
  { "Student Name": "Student A", "Email": "studenta@mountunion.edu", "section": "LAB9", "labId": 0, "Vial": 1, "U1": 13, "U2": 9, "DU": "alpha" },
  { "Student Name": "Student B", "Email": "studentb@mountunion.edu", "section": "LAB9", "labId": 1, "Vial": 2, "U1": 7, "U2": 5, "DU": "epsilon" },
  { "Student Name": "Student C", "Email": "studentc@mountunion.edu", "section": "LAB9", "labId": 2, "Vial": 3, "U1": 8, "U2": 6, "DU": "nu" },
  { "Student Name": "Student D", "Email": "studentd@mountunion.edu", "section": "LAB9", "labId": 3, "Vial": 4, "U1": 14, "U2": 11, "DU": "theta" },
];

const letters = "ABCDEFGHIJKLMN";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { email } = await req.json().catch(() => ({}));
  if (!email) {
    return Response.json({ found: false }, { status: 400 });
  }
  const myEmail = email.trim().toLowerCase();

  let roster = [];
  try {
    const store = getStore("che120");
    roster = (await store.get("roster-26fa", { type: "json" })) || [];
  } catch (e) {
    // Blobs unavailable (e.g. netlify dev without a linked site) — placeholders still work.
  }

  const match = [...roster, ...placeholders].find(
    (x) => (x.Email || "").toLowerCase() === myEmail
  );
  if (!match) {
    return Response.json({ found: false }, { status: 404 });
  }

  // Only this student's assignment ever leaves the server.
  return Response.json({
    found: true,
    vial: match.Vial,
    u1Letter: letters[match.U1 - 1],
    u2Letter: letters[match.U2 - 1],
    du: match.DU,
  });
};
