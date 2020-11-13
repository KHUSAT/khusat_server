const express = require('express');
const app = express();
const port = 3000;

let questions = [];
let jobList = [];

app.get('/', (req, res, next) => {
  res.send('hello world!');
});

app.get('/getQuestions', (req, res, next) => {
  

  /**
   * 질문 폼
   * 번호 질문내용  답1 답2 가중치1, 가중치2
   */

  let questionNums = [];
  const numOfQuestions = 25;
  for(let i=0; i<numOfQuestions; i++){
    questionNums[i] = i;
  }
  // shuffle(questionNums);
  questionNums.sort(function () {
    return Math.round(Math.random()) - 0.5
  });

  questionNums = questionNums.slice(0, 10);
  
  let sendQuestions = [];
  for(let i=0; i<10; i++){
    sendQuestions.push(questions[questionNums[i]]);
  }
  res.send(sendQuestions);
});

app.post('/submit', (req, res, next) => {
  const {answer} = req.body;
  console.log(answer);
  
  const answerArray = [];

  let score = 50;

  /**
   * 정답 폼
   * 문항 번호  정답 고른것
   */

  for(let i=0; i< answerArray.length; i++){
    if(answerArray[i][1] === 0){
      // 1번답 골랐을때
      score += questions[answerArray[i]][3];
    }
    else{
      score += questions[answerArray[i]][4];
    }
  }

  const recommendedJob = jobList[score%jobList.length];

  res.send(recommendedJob);
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});