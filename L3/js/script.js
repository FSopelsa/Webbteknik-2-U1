// Globala konstanter och variabler
const wordList = ["BLOMMA","LASTBIL","SOPTUNNA","KÖKSBORD","RADIOAPPARAT","VINTER","SOMMAR","DATORMUS","LEJON","ELEFANTÖRA","JULTOMTE","SKOGSHYDDA","BILNUMMER","BLYERTSPENNA","SUDDGUMMI","KLÄDSKÅP","VEDSPIS","LJUSSTAKE","SKRIVBORD","ELDGAFFEL","STEKPANNA","KASTRULL","KAFFEBRYGGARE","TALLRIK","SOFFBORD","TRASMATTA","FLYGPLAN","FLYGPLATS","TANGENTBORD"]; // Lista (array) med ord som ska väljas slumpmässigt
var selectedWord; // Det ord som valts slumpmässigt och som användaren ska gissa på
var letterBoxes; // Array med referenser till de span-taggar som utgör rutor för bokstäverna
var hangmanImg; // Referens till img-elementet med bilden för galgen och gubben
var hangmanImgNr; // Nummer för aktuell bild för den bild som visas (så man vet vilken nästa blir)
var msgElem; // Referens till div-elementet för meddelanden
var startGameBtn; // Referens till startknappen
var letterButtons; // Array med referenser till bokstavsknapparna
var startTime; // Tidsräknare soms tartar då spelet startas
// ------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
	startGameBtn = document.getElementById("startGameBtn");
    startGameBtn.onclick = startGame;
    letterButtons = document.getElementById("letterButtons").
    getElementsByTagName("button");
    for (let i = 0; i < letterButtons.length; i++)
        letterButtons[i].onclick = guessLetter;
    hangmanImg = document.getElementById("hangman");
    msgElem = document.getElementById("message");
    startGameBtn.disabled = false;
    for (let i = 0; i < letterButtons.length; i++)
        letterButtons[i].disabled = true;
} // End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad
// ------------------------------
// Initiera ett nytt spel. Välj ord, visa första bilden och bokstavsrutor
// Sätt 0 som bildnummer, inaktivera startknappen och aktiver bokstavsknappar
function startGame() {
    randomWord();
    showLetterBoxes();
    hangmanImg.src = "img/h0.png";
    hangmanImgNr = 0;
    startGameBtn.disabled = true;
    for (let i = 0; i < letterButtons.length; i++)
        letterButtons[i].disabled = false;
    msgElem.innerHTML = "";
    let now = new Date(); // Date-objekt för tiden just nu
    startTime = now.getTime(); // Tid i millisekunder
} // End startGame
// ------------------------------
// Ett ord väljs slumpmässigt och en kontroll så att det inte är samma ord som förra gången utförs
function randomWord() {
    let oldWord = selectedWord; // Ordet som användes förra gången
    while (oldWord == selectedWord) {
        let wordIndex = Math.floor(wordList.length*Math.random()); // Slumpar tal mellan 0 och antal ord i wordList
        selectedWord = wordList[wordIndex]; // Nytt ord sparas i variabeln
    }
} // End randomWord
// ------------------------------
// Visa rutor för varje bokstav i ordet
function showLetterBoxes() {
    let newCode = ""; // Ny HTML-kod för bokstavsrutor
    for (let i = 0; i < selectedWord.length; i++) {
        newCode += "<span>&nbsp;</span>"; // Lägg in ett nonbreakable space så att "tom" ruta visas
    }
    document.getElementById("letterBoxes").innerHTML = newCode;
    letterBoxes = document.getElementById("letterBoxes").
    getElementsByTagName("span");
} // End showLetterBoxes
// ------------------------------
// Användaren klickade på en bokstavsknapp
// Kontrollera om bokstaven finns i ordet och skriv isf ut den
// Om bokstaven ej finns - uppdatera bilden
// Om alla bokstäver har gissats eller om sista bilden visas - avsluta spelet
function guessLetter() {
    this.disabled = true; // Inaktivera knappen
    let letter = this.value; // Hämta bokstaven ur knappen (this är referens till button-elementet)
    let letterFound = false; // Flagga true/false för indikation huruvida bokstaven stämmer
    let correctLetterCount = 0; // Räknare för antal korrekt bokstäver
    for (let i = 0; i < selectedWord.length; i++) { // Alla bokstäver i ordet gås igenom 
        if (letter == selectedWord.charAt(i)) {
            letterBoxes[i].innerHTML = letter; // Visa bokstaven i rutan
            letterFound = true; // Bokstaven hittades i ordet
        }
        if (letterBoxes[i].innerHTML != "&nbsp;")
        correctLetterCount++; // Räknaren räknas upp med 1
    } // End for
    if (letterFound == false) { // Bokstaven fanns ej
        hangmanImgNr++;
        hangmanImg.src = "img/h" + hangmanImgNr + ".png";
        if (hangmanImgNr == 6) {
            endGame(true); // Gubben blev hängd
        }
    }
    else if (correctLetterCount == selectedWord.length) {
        endGame(false); // Alla bokstäver rätt, gubben blev inte hängd
    }
} // End guessLetter
// ------------------------------
// Avsluta spelet. Skriv ut ett meddelande, aktivera startknappen och inaktivera bokstavsknapparna
function endGame(manHanged) { // manHanged är true/false
    let runTime = (new Date().getTime() - startTime) / 1000; // Speltid
    if (manHanged) {
        msgElem.innerHTML = "Tyvärr, gubben hängdes. Rättt svar är " + selectedWord;
    }
    else {
        msgElem.innerHTML = "Gratulerar. Du kom fram till rätt ord.";
    }
    msgElem.innerHTML += "<br>Det tog " + runTime.toFixed(1) + " sekunder.";
    startGameBtn.disabled = false;
    for (let i = 0; i < letterButtons.length; i++)
        letterButtons[i].disabled = true;
} // End endGame
// ------------------------------