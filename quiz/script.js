localStorage.setItem("points", 0);

const questionDOM = $(".question");
const questionNumDOM = $(".questionNum");
var questionNum = questionNumDOM.text();
const buttons = document.querySelector(".buttons");
const pointsDOM = $(".points");
var points = parseInt(pointsDOM.text());
const categoryDOM = $(".category");
const difficultyDOM = $(".difficulty");
var res;

function init() {
  questionDOM.text("Loading...");
  questionNum = 0;
  questionNumDOM.text(questionNum);
  getQuestion();
}

function getQuestion() {
  fetch("https://opentdb.com/api.php?amount=1")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      res = data.results[0];
      // console.log(res);
      questionDOM.html(res.question);
      categoryDOM.html(res.category);
      difficultyDOM.html(res.difficulty);

      var allOptions = [];
      for (let i = 0; i < res.incorrect_answers.length; i++) {
        allOptions.push(res.incorrect_answers[i]);
      }
      allOptions.push(res.correct_answer);
      // console.log(allOptions);

      var buttonNum = 0;
      for (let i = 0; i < res.incorrect_answers.length + 1; i++) {
        var button = document.createElement("button");
        button.className = `option button-${buttonNum}`;
        const randNum = Math.floor(Math.random() * allOptions.length);
        button.innerHTML = allOptions[randNum];
        button.setAttribute(
          "onclick",
          `chooseAnswer("${allOptions[randNum]}", "button-${buttonNum}")`
        );

        allOptions.splice(randNum, 1);

        buttons.append(button);
        buttonNum++;
      }

      questionNum++;
      questionNumDOM.text(questionNum);
      document.querySelector(
        "title"
      ).textContent = `Question #${questionNum} - The Ultimate Quiz - Tusshar Luthra`;
    });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function chooseAnswer(answer, buttonClass) {
  if (answer == res.correct_answer) {
    document.querySelector(`.${buttonClass}`).classList.add("correct");
    points += 50;
    pointsDOM.text(points);
    localStorage.setItem("points", points);
  } else {
    document.querySelector(`.${buttonClass}`).classList.add("incorrect");
  }

  for (let i = 0; i < document.querySelectorAll(".option").length; i++) {
    document.querySelector(`.button-${i}`).setAttribute("disabled", "true");
  }

  await sleep(1500);

  if (answer == res.correct_answer) {
    buttons.innerHTML = "";
    getQuestion();
  } else {
    window.location.replace("/end");
  }
}

window.onload = () => {
  init();
};
