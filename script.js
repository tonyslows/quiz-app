let questions = [];

fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
        startQuiz();
    });


const questionElement = document.getElementById("question");
const questionImg = document.getElementById("question-img");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const h1 = document.querySelector("h1");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() { 
    h1.innerHTML = "Lý thuyết GPLX Hạng B";
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question.replace(/^\* /, "")}`;

  if (currentQuestion.image) {
    questionImg.src = currentQuestion.image;
    questionImg.style.display = "block";
  } else {
    questionImg.style.display = "none";
  }

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.isCorrect) button.dataset.isCorrect = answer.isCorrect;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}


function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.isCorrect === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.isCorrect === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Bạn trả lời đúng ${score}/${questions.length} câu hỏi!`;
    nextButton.innerHTML = "Làm lại";
    nextButton.style.display = "block";
    questionImg.style.display = "none";
}

function handleNextQuestion() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextQuestion();
    }
    else {
        startQuiz();
    }
});
startQuiz();