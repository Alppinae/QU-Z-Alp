const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

let shuffledQuestions, currentQuestionIndex;

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startQuiz() {
    currentQuestionIndex = 0;
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Yeniden Başla';
        nextButton.classList.remove('hide');
        nextButton.addEventListener('click', startQuiz);
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Hangi dil JavaScript\'in yapı taşlarından biri değildir?',
        answers: [
            { text: 'HTML', correct: true },
            { text: 'CSS', correct: false },
            { text: 'Python', correct: false },
            { text: 'Java', correct: false }
        ]
    },
    {
        question: 'JavaScript\'te "===" operatörü neyi kontrol eder?',
        answers: [
            { text: 'Değerin ve tipin eşitliğini', correct: true },
            { text: 'Sadece değerin eşitliğini', correct: false },
            { text: 'Sadece tipin eşitliğini', correct: false },
            { text: 'Hiçbirini', correct: false }
        ]
    },
    {
        question: 'JavaScript\'te hangi döngü bir koşul yanlış olana kadar kodu tekrarlar?',
        answers: [
            { text: 'for loop', correct: false },
            { text: 'while loop', correct: true },
            { text: 'do...while loop', correct: false },
            { text: 'if...else statement', correct: false }
        ]
    },
    {
        question: 'JavaScript\'te hangi anahtar kelime bir fonksiyon tanımlar?',
        answers: [
            { text: 'function', correct: true },
            { text: 'func', correct: false },
            { text: 'method', correct: false },
            { text: 'define', correct: false }
        ]
    }
];

startQuiz();
