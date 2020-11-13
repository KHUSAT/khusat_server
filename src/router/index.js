const Question = require('../models/questions');
const Job = require('../models/jobs');


module.exports = function(app)
{
    
  // let questions = [];
  // let jobList = [];

  app.get('/', (req, res, next) => {
    res.send('hello world!');
  });
  
  app.get('/getQuestions', async (req, res, next) => {
    
  
    /**
     * 질문 폼
     * 번호 질문내용  답1 답2 가중치1, 가중치2
     */
  
    const questions = await Question.find().exec();

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
  
  app.post('/submit', async (req, res, next) => {
    const {answer} = req.body;
    console.log(answer);
    
    const answerArray = await Job.find().exec();
  
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

  app.post('/addJobs', async(req, res, next) => {
    // 보직 추가하는 api
    const datas = req.body;
    

  });

  app.post('/addQuestions', async(req, res, next) => {
    // 질문 추가하는 api
  });


  
}