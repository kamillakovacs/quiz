'use strict'

window.onload = () => {
  const thisQuestion = document.querySelector('.this-question');
  const url = "http://localhost:3000/game";
  let answer1 = document.querySelector('.q1');
  let answer2 = document.querySelector('.q2');
  let answer3 = document.querySelector('.q3');
  let answer4 = document.querySelector('.q4');
  let currentScore = document.querySelector('#score');

  fetch(url)
    .then( res => res.json())
    .then( resp => {
      thisQuestion.textContent = resp.question;
      answer1.textContent = resp.answers[0].answer;
      answer2.textContent = resp.answers[1].answer;
      answer3.textContent = resp.answers[2].answer;
      answer4.textContent = resp.answers[3].answer;

      answer1.setAttribute("value", `${resp.answers[0].is_correct}`)
      answer2.setAttribute("value", `${resp.answers[1].is_correct}`)
      answer3.setAttribute("value", `${resp.answers[2].is_correct}`)
      answer4.setAttribute("value", `${resp.answers[3].is_correct}`)
    })

  setInterval(() => {
  fetch(url)
    .then( res => res.json())
    .then( resp => {
      thisQuestion.textContent = resp.question;
      answer1.textContent = resp.answers[0].answer;
      answer2.textContent = resp.answers[1].answer;
      answer3.textContent = resp.answers[2].answer;
      answer4.textContent = resp.answers[3].answer;

      answer1.setAttribute("value", `${resp.answers[0].is_correct}`)
      answer2.setAttribute("value", `${resp.answers[1].is_correct}`)
      answer3.setAttribute("value", `${resp.answers[2].is_correct}`)
      answer4.setAttribute("value", `${resp.answers[3].is_correct}`)

    })
  }, 10000);

answer1.addEventListener('click', (event) => {
  if (event.target.value == 1) {
    currentScore.textContent+1;
  }
})

answer2.addEventListener('click', (event) => {
  if (event.target.value == 1) {
    currentScore.textContent++
  }
})

answer3.addEventListener('click', (event) => {
  if (event.target.value == 1) {
    currentScore.textContent++
  }
})

answer4.addEventListener('click', (event) => {
  if (event.target.value == 1) {
    currentScore.textContent++
  }
})
}