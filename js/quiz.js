// Startscherm verbergen en quiz tonen
document.getElementById("start").addEventListener("click", () => {
    document.getElementById("welkom").style.display = "none";
    document.getElementById("resultaat").style.display = "none";
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
const resetButton = document.getElementById('reset');

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

// Functie voor het tonen van de vraag en antwoorden en het kiezen van het antwoord
function showQuestion(){
    // Laad een vraag uit de array en toon deze in het juiste element
    const question = questions[currentQuestion];
    questionEl.textContent = question.question;

    // Legen van de keuzes en het deactiveren van de volgende knop
    choicesEl.innerHTML = '';
    nextButton.classList.add('inactive');
    nextButton.classList.remove('btn-color');
    nextButton.querySelector('button').classList.add('inactive');
    nextButton.querySelector('button').classList.remove('text-white');
    
    // De antwoord elementen creeren en de juiste classes toewijzen aan de elementen en een event listener toevoegen voor styling en antwoord selectie
    question.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center custom-option text-start';

        const span = document.createElement('span');
        span.textContent = choice;

        const icon = document.createElement('i');
        icon.className = 'bi bi-check-circle';

        btn.appendChild(span);
        btn.appendChild(icon);

        btn.addEventListener('click', function () {
            document.querySelectorAll('.custom-option').forEach(b => {
                b.classList.remove('active');
                const i = b.querySelector('i');
                if (i) {
                    i.classList.remove('bi-check-circle-fill');
                    i.classList.add('bi-check-circle');
                }
            });

            this.classList.add('active');
            icon.classList.remove('bi-check-circle');
            icon.classList.add('bi-check-circle-fill');

            selectAnswer(choice);
        });

        choicesEl.appendChild(btn);
    });
}

// Functie voor de controle van het geselecteerde antwoord en styling van het juiste en fout gekozen antwoord
function selectAnswer(choice) {

     const current = questions[currentQuestion];

     if (choice === current.answer){
        score ++;
     }

    nextButton.classList.remove('inactive', 'disable');
    nextButton.classList.add('btn-color');
    nextButton.querySelector('button').classList.remove('inactive');
    nextButton.querySelector('button').classList.add('text-white');

    document.querySelectorAll('.custom-option').forEach(btn => {

        const text = btn.querySelector('span').textContent;

        if (text === current.answer) {
            btn.classList.add('bg-success', 'text-white');
        } else if (text === choice) {
            btn.classList.add('bg-danger', 'text-white');
        }

        btn.classList.add('disable');
    });
}

// Volgende vraag en bijhouden of alle vragen zijn beantwoord en laat de score zien wanneer alle vragen zijn beantwoord
nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        document.getElementById("quiz").style.display = "none";
        document.getElementById("resultaat").style.display = "block";
        document.getElementById("quiz-resultaat").innerText = `Je hebt ${score}/20 vragen goed beantwoord`;

        // Informatieve tekst gebasseerd op het aantal juiste antwoorden en boven de 17 confetti
        let resultaatTekst = "";

        if (score > 17) {
            resultaatTekst = "Fantastisch! Je bent een echte JavaScript ninja! 🎉🚀";
            startConfetti();
        } else if (score > 15) {
            resultaatTekst = "Top gedaan! Je kent de JS-basis als geen ander!";
        } else if (score > 10) {
            resultaatTekst = "Niet slecht! Tijd om je console.log wat vaker te gebruiken!";
        } else if (score > 5) {
            resultaatTekst = "Je bent op de goede weg, maar vergeet niet de semicolons! 😉";
        } else {
            resultaatTekst = "Zet die PC maar op marktplaats. Dit wordt niks! 😅";
        }

        document.getElementById("quiz-resultaat-info").textContent = resultaatTekst;

        // Reset de quiz
        resetButton.addEventListener('click', () => {
            resetQuiz();
        });
    }
});

function resetQuiz(){
    location.reload();
}
