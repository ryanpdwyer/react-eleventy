



function calcMolarityNaOH(m_KHP, v_NaOH) {
    const M_KHP = 204.2;
    return (m_KHP / M_KHP) / v_NaOH *1000.0
}

document.getElementById("check-NaOH-submit").addEventListener("click", function() {
    const m_KHP = parseFloat(document.getElementById("mass-khp").value);
    const v_NaOH = parseFloat(document.getElementById("volume-NaOH").value);
    const molarity = calcMolarityNaOH(m_KHP, v_NaOH);
    const molarity_given = parseFloat(document.getElementById("molarity-NaOH").value);

    if (Math.abs(molarity - molarity_given) / (molarity) * 100 < 0.2) {
        document.getElementById("correct-molarity").innerHTML = "Correct!";
    } else {
        document.getElementById("correct-molarity").innerHTML = "Incorrect. Perhaps you make a calculation or significant figures error? Try again.";
    }
}
);