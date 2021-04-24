import React, { useState, useEffect } from "react";

export default function App() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setQuestions(res.results);
      });
  }, []);

  const getAnswers = (question) => {
    let answers = [];
    for (var x=0; x<question.incorrect_answers.length; x++){
      answers.push(question.incorrect_answers[x]);
    }
    answers.splice(Math.random()*3,0,question.correct_answer);
    //console.log(answers);
    return answers;
  }

  const update = (className, correct_answer, question, answer) => {
    disableButtons(className);
    changeColors(className, correct_answer, question, answer);
  }

  const disableButtons = (className) => {
    var elements = document.getElementsByClassName(className);    
    for(var i=0; i<elements.length; i++){
      elements[i].disabled = true;
    }
  }

  const changeColors = (className, correct_answer, question, answer) => {
    var elements = document.getElementsByClassName(className);    
    var correctElement = elements[0];
    var incorrectElements = [];
    var q = document.getElementsByClassName(question);
    q = q[0];
    console.log(q);
    for(var i=0; i<elements.length; i++){
      if(elements[i].innerHTML === correct_answer){
        correctElement = elements[i];
      }
      else{
        incorrectElements.push(elements[i]);
      }
    }
    correctElement.style.backgroundColor = "green";
    for(var i=0; i<incorrectElements.length; i++){
      incorrectElements[i].style.backgroundColor = "red";
    }
    if(answer === correct_answer){
      q.style.color = "green";
    }
    else{
      q.style.color = "red";
    }
  }

  return (
    
    <div style={{textAlign:'center'}}>
      <h1>Hey, Launch! 👋</h1>
      {questions.map((question) => (
        <div>
          <h3 className={question.question}>{question.question}</h3>
          {getAnswers(question).map((answer) => (
            <button id={answer} className={questions.indexOf(question)} onClick={()=>update(questions.indexOf(question), question.correct_answer, question.question, answer)}>{answer}</button>
          ))}
        </div>
      ))}
    </div>

  );

}