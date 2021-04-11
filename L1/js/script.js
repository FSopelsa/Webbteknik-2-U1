// Globala variabler
var input1Elem, // Textfält input 1 (indata)
    input2Elem; // Textfält input 2 (indata)
var resultElem; // Element för resultat
// ------------------------------
// Initiering efter inläsning
function init () {
    input1Elem = document.getElementById("input1");
    input2Elem = document.getElementById("input2");
    resultElem = document.getElementById("result");
    document.getElementById("runBtn").onclick = areaCalculations;
} //End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad
// ------------------------------
function areaCalculations() {
    var length;     // Längd i meter
    var width;      // Bredd i meter
    var area;       // Yta i kvadratmeter
    length = Number(input1Elem.value);
    width = Number(input2Elem.value);
// ------------------------------
  // Area för en rektangel
    area = length * width;
    resultElem.innerHTML += "<p>Rektangelns area är " + area + " m<sup>2</sup></p>";
  // Area för en ellips
    area = 3.14 * length * width / 4;  
    resultElem.innerHTML += "<p>Ellipsens area är " + area + " m<sup>2</sup></p>";
  // Area för rektangeln om bredden ökas med 5
    area = (length + 5) * width;
    resultElem.innerHTML += "<p>Längden + 5 ger rektangelns area " + area + " m<sup>2</sup<</p>";  
// Egna tillägg
  // Area för rektangeln om längden ökar med 50% och breden ökas med 3 meter  
    area = length * 1.5 * (width + 3);
    resultElem.innerHTML += "<p>Då längden ökas med 50% och bredden med 3 meter blir rektangelns area " + area + " m<sup>2</sup></p>"
  // Area för triangeln i kvadratfot
    area = length * 3.28 *width * 3.28 / 2;
    resultElem.innerHTML += "<p>Triangelns area blir " + area + " kvadratfot</p>"
} // End areaCalculations