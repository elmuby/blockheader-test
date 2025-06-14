const questions = [
  {
    text: "Who is the founder of ethereum?",
    options: ["nakamoto", "Nikolai", "Berlin", "Buterin"],
    answer: "Buterin",
  },
  {
    text: "Where is the buidl locate?",
    options: ["Java", "Sabo", "Barnawa", "Kakuri"],
    answer: "Barnawa",
  },
  {
    text: "Which is a JavaScript framework?",
    options: ["Laravel", "React", "Django", "Spring"],
    answer: "React",
  },
  {
    text: "Which is not a unit of measuring ethereum?",
    options: ["lei", "eth", "gwei", "wei"],
    answer: "lei",
  },
];

let currentQuestion = 0;
let score = 0;
let shuffledQuestions = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  const question = shuffledQuestions[currentQuestion];

  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");

  questionEl.textContent = question.text;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  const shuffledOptions = shuffle([...question.options]);

  shuffledOptions.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "option-btn";
    btn.onclick = () => selectAnswer(btn, question.answer);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(button, correctAnswer) {
  const options = document.querySelectorAll(".option-btn");
  options.forEach((btn) => (btn.disabled = true));

  if (button.textContent === correctAnswer) {
    button.classList.add("correct");
    document.getElementById("feedback").textContent = "✅ Correct!";
    score++;
  } else {
    button.classList.add("incorrect");
    document.getElementById(
      "feedback"
    ).textContent = `❌ Incorrect! Correct answer: ${correctAnswer}`;
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < shuffledQuestions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  document.getElementById(
    "question"
  ).textContent = `You scored ${score} out of ${shuffledQuestions.length}`;
  document.getElementById("options").innerHTML = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("restart-btn").style.display = "inline-block";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  shuffledQuestions = shuffle([...questions]);
  document.getElementById("next-btn").style.display = "inline-block";
  document.getElementById("restart-btn").style.display = "none";
  loadQuestion();
}

window.onload = () => {
  shuffledQuestions = shuffle([...questions]);
  loadQuestion();
};
