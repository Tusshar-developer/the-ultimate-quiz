//* api_link: https://opentdb.com/api.php?amount=1

var questionDOM = $(".question");
var optionsDiv = document.querySelector(".options");
var questionNumDOM = $(".questionNum");
var rowsDOM = document.querySelectorAll(".row");
var scoreDOM = $(".score");
var score = 0;
var questionNum, question;

function init() {
  questionNum = 0;
  question = "Loading...";
  options = "";
  score = 0;

  questionNumDOM.text(questionNum);
  questionDOM.text(question);

  getQuestion(score);
}

window.onload = init;

function getQuestion(score) {
  fetch("https://opentdb.com/api.php?amount=1")
    .then((response) => response.json())
    .then((data) => {
      res = data.results[0];
      console.log(res);

      question = res.question;
      questionNum++;

      var options = [];

      for (let i = 0; i < res.incorrect_answers.length; i++) {
        options.push(res.incorrect_answers[i]);
      }

      options.push(res.correct_answer);
      console.log(options);

      updateDisplay(
        question,
        questionNum,
        options,
        res.incorrect_answers.length,
        score
      );
    });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function chooseAnswer(answer, buttonNum, correctAnswer) {
  for (let i = 0; i < document.querySelectorAll(".option").length; i++) {
    document.querySelectorAll(`.option`)[i].setAttribute("disabled", "true");
  }

  if (answer == correctAnswer) {
    document.querySelectorAll(".option")[buttonNum].classList.add("correct");
    console.log("correct");

    score += 50;

    await sleep(1500);

    for (let i = 0; i < rowsDOM.length; i++) {
      rowsDOM[i].innerHTML = "";
    }

    getQuestion(score);
  } else {
    document.querySelectorAll(`.option`)[buttonNum].classList.add("incorrect");
    console.log("incorrect");

    await sleep(1500);

    document.querySelector(".correctAnswerNotice").classList.add("active");

    $(".correctAnswer").html(correctAnswer);

    $(".tryAgain").addClass("active");
  }
}

function updateDisplay(
  question,
  questionNum,
  options,
  totalIncorrectAnswers,
  score
) {
  questionDOM.html(question);
  questionNumDOM.text(questionNum);

  for (let i = 0; i < totalIncorrectAnswers + 1; i++) {
    var button = document.createElement("button");
    button.className = `option`;

    const randNum = Math.floor(Math.random() * options.length);

    button.innerHTML = options[randNum];
    button.setAttribute(
      "onclick",
      `chooseAnswer('${options[randNum]}', ${i}, '${res.correct_answer}')`
    );

    if (i < 2) {
      rowsDOM[0].appendChild(button);
    } else {
      rowsDOM[1].appendChild(button);
    }

    options.splice(randNum, 1);
  }

  scoreDOM.text(score);
}
