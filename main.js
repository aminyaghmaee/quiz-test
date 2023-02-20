// Fetch data:

async function getAPI() {
  const res = await fetch("https://opentdb.com/api.php?amount=4");
  const data = await res.json();
  return data.results;
}

// Variables:

const result = await getAPI();
const question = document.getElementById("question");
const answersParent = document.querySelector(".answers_parent");
const lights = document.querySelector(".lights");
let questionNumber = 0;
const numbers = [0, 1, 2, 3];
const numberOfQuestions = document.querySelector(".number_of_question");
const answers = document.querySelectorAll(".answers");

// Show Answers function:

function showAnswers() {
  // we merged 2 arrays in 1 array and sort them:
  let allAnswers = [
    ...result[questionNumber].incorrect_answers,
    result[questionNumber].correct_answer,
  ].sort();
  // 1: our answers = data answers
  // 2: to change display of answers
  if (allAnswers.length == 4) {
    for (let i = 0; i < allAnswers.length; i++) {
      answers[i].textContent = allAnswers[i];
    }
    answers[2].style.display = "flex";
    answers[3].style.display = "flex";
  } else {
    for (let i = 0; i < allAnswers.length; i++) {
      answers[i].textContent = allAnswers[i];
    }
    answers[2].style.display = "none";
    answers[3].style.display = "none";
  }
}
showAnswers();

// Show Question function:

function showQuestions() {
  question.textContent = result[questionNumber].question;
}
showQuestions();

// On Click each Answer:

answers.forEach((item) => {
  item.addEventListener("click", () => nextQuestion(item));
});

//Next Question function:

function nextQuestion(e) {
  if (e.textContent == result[questionNumber].correct_answer) {
    lights.children[questionNumber].style.backgroundColor = "green";
  } else {
    lights.children[questionNumber].style.backgroundColor = "red";
  }
  questionNumber++;
  if (questionNumber <= 3) {
    numberOfQuestions.textContent = `Question${questionNumber + 1}`;
  }

  showQuestions();
  showAnswers();
  console.log(questionNumber);
}
