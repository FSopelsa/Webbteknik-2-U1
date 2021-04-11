// Globala variabler
var input1Elem,     // Textfält input 1 (indata)
    input2Elem;     // Textfält input 2 (indata)
var msgElem;        // Meddelanden från programmet
var selFruitsElem;  // Referens till vilka frukter som ska visas
var selFruitNr;     // Nummer på vald frukt
// ------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
    input1Elem = document.getElementById("input1");
    input2Elem = document.getElementById("input2");
    msgElem = document.getElementById("message")
    selFruitsElem = document.getElementById("selectedFruits");
    document.getElementById("btn1").onclick = showFruit;
    document.getElementById("btn2").onclick = addFruits;
    selFruitNr = 0;
} // End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad
// ------------------------------
// Avläs textfältet och visa bild på vald frukt
function showFruit() {
    let nr = checkNr(input1Elem.value,5); // Hämtar från input 1
    if (nr == null) return;
    input1Elem.value = nr;
    document.getElementById("fruitImg").src = getUrl(nr);
    selFruitNr = nr; // Sparar vald frukt i den globala variabeln
} // End showFruit
// ------------------------------
// Tar fram rätt URL till den bild som ska visas
function getUrl(nr) {
    let url; //Bild-URL
    switch (nr) {
        case 1: url = "img/apple.png"; break;
        case 2: url = "img/pear.png"; break;
        case 3: url = "img/orange.png"; break;
        case 4: url = "img/banana.png"; break;
        case 5: url = "img/pineapple.png"; break;
        deault: url = "img/nofruit.png";
    }
    return url;
} // End getUrl
// ------------------------------
// Kontrollerar om nr är ett nummer mellan 0 och high
function checkNr(nr,high) {
    msgElem.innerHTML = "";
    if (isNaN(nr)) {
        msgElem.innerHTML = "Du måste skriva ett tal med siffror";
        return null;
    }//Ser till att det säkert skrivs ett nummer

    if (nr < 1 || nr > high) {
        msgElem.innerHTML = "Du måste skriva ett tal mellan 1 och " + high;
        return null;
    }//Säger till om talet inte är mellan 1 och 9

    nr = parseInt(nr); //Tar bort decimaler
    return nr; 
} // End checkNr
// ------------------------------
// Lägg till vald frukt i listan med valda frukter
function addFruits() {
    if (selFruitNr == 0) {
        msgElem.innerHTML = "Du måste först välja en frukt.";
        return;
    }
    let amount = checkNr(input2Elem.value,9); // Hämta antal från input2, max 9
    if (amount == null) return;
    let imgList = ""; // HTML-kod för nya img-taggar
    let fruitUrl = getUrl(selFruitNr); // URL till bild för vald frukt

    for (let i = 0; i < amount; i++) {
        imgList += "<img src='" + fruitUrl + "' alt='frukt'>";
    }
    selFruitsElem.innerHTML += imgList;
} // End addFruits
// ------------------------------