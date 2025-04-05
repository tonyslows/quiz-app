const questions = [
    {
        question: "Phần của đường bộ được sử dụng cho các phương tiện giao thông qua lại là gì?",
        answers: [
            {text: "1- Phần mặt đường và lề đường.", isCorrect: false},
            {text: "2- Phần đường xe chạy.", isCorrect: true},
            {text: "3- Phần đường xe cơ giới.", isCorrect: false}
        ]
    },
    {
        question: "Cuộc đua xe chỉ được thực hiện khi nào?",
        answers: [
            {text: "1-Diễn ra trên đường phố không có người qua lại.", isCorrect: false},
            {text: "2-Được người dân ủng hộ.", isCorrect: false},
            {text: "3-Được cơ quan có thẩm quyền cấp phép", isCorrect: true}
        ]
    }
];

const questionElement = document.getElementById("question");
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
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.isCorrect) {
            button.dataset.isCorrect = answer.isCorrect;
        }
        button.addEventListener("click", selectAnswer);
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