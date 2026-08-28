const { PDFDocument } = PDFLib

// The class roster lives server-side (Netlify Function + Blobs), not in this file.
// See netlify/functions/lookup.mjs for the roster/blob workflow.

let unknownLetters = ["A", "B"];
let duName = null;

const handleSubmit = async (e) => {
    e.preventDefault();
    const myEmail = document.getElementById("emailInput").value.trim().toLowerCase();

    let result = { found: false };
    try {
        const res = await fetch("/.netlify/functions/lookup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: myEmail }),
        });
        if (res.ok) {
            result = await res.json();
        }
    } catch (err) {
        result = { found: false };
    }

    if (!result.found) {
        document.getElementById("email-not-found").style.display = "block";
        return;
    }
    document.getElementById("email-not-found").style.display = "none";
    chooseUnknowns(result);
}

document
  .getElementById("120-water-26fa")
  .addEventListener("submit", handleSubmit);


function checkReady() {
    let ready = true;
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;

    if (name == "" || email == "") {
        ready = false;
    }
    if (ready) {
        document.getElementById("submitName").removeAttribute("disabled");
    }
}

document
  .getElementById("nameInput")
  .addEventListener("input", checkReady);

document
  .getElementById("emailInput")
  .addEventListener("input", checkReady);


function chooseUnknowns(result) {
    unknownLetters[0] = result.u1Letter;
    unknownLetters[1] = result.u2Letter;
    duName = result.du;

    document.getElementById('assignedUnknowns').style.display='block';

    Array.from(document.getElementsByClassName(`unknown3`)).forEach(x=> {
            x.innerText = result.vial;
    });
}

window.chooseUnknowns = chooseUnknowns;


async function copyPages() {
    const name = document.getElementById("nameInput").value;

    const baseUrl = '/pdf/'
    const fileName = (x) => baseUrl+x+'.pdf';
    const pdf1 =  await fetch(fileName(unknownLetters[0])).then(res => res.arrayBuffer());
    const pdf2 =  await fetch(fileName(unknownLetters[1])).then(res => res.arrayBuffer());
    const duPng = await fetch(`/img/du/${duName}.png`).then(res => res.arrayBuffer());

    const pdfDoc1 = await PDFDocument.load(pdf1);
    const pdfDoc2 = await PDFDocument.load(pdf2);

    const pdfDoc = await PDFDocument.create();

    const [p11, p12] = await pdfDoc.copyPages(pdfDoc1, [0, 1])
    const [p21, p22] = await pdfDoc.copyPages(pdfDoc2, [0, 1])

    pdfDoc.addPage(p11);
    pdfDoc.addPage(p12);
    pdfDoc.addPage(p21);
    pdfDoc.addPage(p22);

    const pages = pdfDoc.getPages()

    const vial = document.getElementById(`unknown3`).innerText

    const inds = [0, 1];
    const yPos = 8;
    const fontSize = 14;

    inds.forEach(i=>{
        if (i ===0 ) {
            pages[i*2].drawText(`2026 ${name} ${vial}B IR`, {size: fontSize, y: yPos});
            pages[i*2+1].drawText(`${name} ${vial}B NMR`, {size: fontSize, y: yPos});
        } else if (i === 1){
            pages[i*2].drawText(`${name} ${vial}C IR`, {size: fontSize, y: yPos});
            pages[i*2+1].drawText(`${name} ${vial}C NMR`, {size: fontSize, y: yPos});
        }
    });

    pages[0].moveDown(18)
    pages[0].drawText(``);

    // Final page: the Discussion Unknown structure (no letter or number shown).
    // Landscape to match the spectra pages; structure left, discussion
    // questions 2-3 right so the printout doubles as the worksheet.
    const duImage = await pdfDoc.embedPng(duPng);
    const duPage = pdfDoc.addPage([792, 612]);

    const maxW = 340;
    const maxH = 400;
    const scale = Math.min(maxW / duImage.width, maxH / duImage.height);
    const w = duImage.width * scale;
    const h = duImage.height * scale;

    duPage.drawText(`Discussion Unknown`, {size: 22, x: 110, y: 555});
    duPage.drawImage(duImage, {
        x: (420 - w) / 2,
        y: 110 + (420 - h) / 2,
        width: w,
        height: h,
    });

    const rightX = 430;
    let lineY = 565;
    const writeLines = (lines, size, lineGap) => {
        lines.forEach(line => {
            duPage.drawText(line, {size: size, x: rightX, y: lineY});
            lineY -= lineGap;
        });
    };

    writeLines([
        `Refer to your lab manual for the discussion`,
        `questions about this compound.`,
    ], 13, 17);

    duPage.drawText(`2026 ${name} Discussion Unknown`, {size: fontSize, y: yPos});

    const pdfBytes = await pdfDoc.save()

    download(pdfBytes, `CHE 120 ${name} E1 Spectra.pdf`, "application/pdf");
}

window.copyPages = copyPages


async function downloadStructure() {
    const name = document.getElementById("nameInput").value;
    const blob = await fetch(`/img/du/${duName}.png`).then(res => res.blob());
    download(blob, `CHE 120 ${name} Discussion Unknown.png`, "image/png");
}

window.downloadStructure = downloadStructure
