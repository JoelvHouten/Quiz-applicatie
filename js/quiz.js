// Startscherm verbergen en quiz tonen
document.getElementById("btn-start").addEventListener("click", () => {
    document.getElementById("welkom").style.display = "none";
    document.getElementById("quiz").style.display = "block";
});

// Quiz variabelen elementen toewijzen en laden van vragen (random)
let questions = [];
let currentQuestion = 0;
let score = 0;

const jsonLoadFailed = document.getElementById('json-error');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextButton = document.getElementById('next');

// Quizvragen laden uit externe JSON
fetch('json/quiz_vragen.json')
    .then (response => response.json())
    .then (data => {
        // Willekeurig laden van vragen en als alles goed gaat de eerste vraag laten zien
        questions = shuffleArray(data);
        showQuestion();
    })
    .catch(error => {
        // Wanneer het laden van het JSON bestand mislukt een foutmelding laten zien
        jsonLoadFailed.innerHTML = 'Fout bij het laden van de quizvragen uit het JSON bestand.';
        console.error('Fout bij laden van JSON:', error);
    });

// Functie voor het willekeurig laden van een vraag
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}