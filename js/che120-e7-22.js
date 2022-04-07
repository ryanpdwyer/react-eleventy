



function calcMolarityNaOH(m_KHP, v_NaOH) {
    const M_KHP = 204.2;
    return (m_KHP / M_KHP) / v_NaOH *1000.0
}

function calcUnknownMolarity(v_unknown, v_NaOH, M_NaOH) {
    return M_NaOH * v_NaOH / v_unknown
}

document.getElementById("check-NaOH-submit").addEventListener("click", function() {
    const m_KHP = parseFloat(document.getElementById("mass-khp").value);
    const v_NaOH = parseFloat(document.getElementById("volume-NaOH").value);
    const molarity = calcMolarityNaOH(m_KHP, v_NaOH);
    const molarity_given = parseFloat(document.getElementById("molarity-NaOH").value);

    if (Math.abs(molarity - molarity_given) / (molarity) * 100 < 0.2) {
        document.getElementById("correct-molarity").innerText = "Correct!";
    } else {
        document.getElementById("correct-molarity").innerText = "Incorrect. Perhaps you make a calculation or significant figures error? Try again.";
    }
}
);

document.getElementById("check-acetic-acid-submit").addEventListener("click", function() {
    const v_unknown = parseFloat(document.getElementById("mL-unknown").value);
    const v_NaOH = parseFloat(document.getElementById("volume-NaOH-2").value);
    const M_NaOH = parseFloat(document.getElementById("molarity-NaOH-2").value);

    const M_unknown_calc = calcMolarityNaOH(v_unknown, v_NaOH, M_NaOH);
    const M_unknown_given = parseFloat(document.getElementById("unknown-molarity").value);

    if (Math.abs(M_unknown_calc - M_unknown_given) / (M_unknown_calc) * 100 < 0.2) {
        document.getElementById("correct-molarity").innerText = "Correct!";
    } else {
        document.getElementById("correct-molarity").innerText = "Incorrect. Perhaps you make a calculation or significant figures error? Try again.";
    }
}
);