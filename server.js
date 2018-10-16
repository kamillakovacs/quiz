'use strict'

const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'HowNice',
  database: `quiz`,
  multipleStatements: true,
});

app.use('/assets', express.static('assets'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});


let multiplier = 10;

app.get('/game', (req, res) => {
  let randomNumber = Math.ceil(Math.random() * multiplier);
  conn.query(`SELECT questions.id, question_id, answer, is_correct, question FROM answers INNER JOIN questions ON answers.question_id = questions.id where questions.id=${randomNumber};`, (err, result) => {
    if (err) {
      res.status(400).json({
        error: 'Unexpected error',
    })
    } else {
      let theAnswers = [];
      result.forEach(elem => {
        theAnswers.push(elem)
      })
      res.status(200).json({
        id: result[0].id,
        question: result[0].question,
        answers: theAnswers,
      })
    }
  })
})

app.get('/questioning', (req, res) => {
  conn.query(`SELECT * FROM questions;`, (err, result) => {
    if (err) {
      res.status(400).json({
        error: 'Unexpected error',
    })
    } else {
      res.status(200).json({result})
    }
  })
})

app.get('/questions', function(request, response) {
  response.sendFile(path.join(__dirname, '/assets/questions.html'));
});

app.post('/questions', (req, res) => {
  function checkifchecked (n) {
    if ( req.body.is_correct == n ) {
      return 1;
    } else {
      return 0;
    }
  }
  
  let newQuestion = req.body.question;
  let answer1 = req.body.answer1;
  let iscorrect1 = checkifchecked('answer_1')
  let answer2 = req.body.answer2;
  let iscorrect2 = checkifchecked('answer_2')
  let answer3 = req.body.answer3;
  let iscorrect3 = checkifchecked('answer_3')
  let answer4 = req.body.answer4;
  let iscorrect4 = checkifchecked('answer_4')

  if (newQuestion) {
    conn.query(`INSERT INTO questions (question) values (?);`, [newQuestion], (err, result) => {
      if (err) {
        console.log(`Database error QUESTION ENTRY`);
        res.status(500).send(err.message);
        return;
      } 
      conn.query(`INSERT INTO answers (question_id, answer, is_correct) VALUES (${result.insertId}, '${answer1}', '${iscorrect1}'), (${result.insertId}, '${answer2}', '${iscorrect2}'), (${result.insertId}, '${answer3}', '${iscorrect3}'), (${result.insertId}, '${answer4}', '${iscorrect4}');`, (err, answer) => {
        if (err) {
          console.log(`Database error NEW ANSWERS`)
          res.status(500).send(err.message)
          return;
        } 
        conn.query(`SELECT * from answers where question_id = ${result.insertId}`, (err, finalAnswers) => {
          if (err) {
            console.log(`Database error FINAL ANSWERS`)
            res.status(500).send(err.message)
            return;
          } 
          res.redirect('/');
          multiplier++;
        })
      })
    })
  }
})

app.listen(PORT, () => {
  console.log(`App is up and running on port ${PORT}`);
});