const Question = require('../models/questions');
const Job = require('../models/jobs');
const bodyParser = require('body-parser');

bodyParser.json();

async function jobRecommend(fight, detail, traffic, control, support, activity){
  const jobs = await Job.find().exec();

  let scores = [fight, detail, traffic, control, support];
  const bar = 50;
  
  // 내림차순 정렬
  scores.sort(function(a, b) {
    return b-a;
  });

  if(activity >= bar){
    // 동적
    if(scores[0] === fight){
      // 전투성향 높음 : 보병, 기갑
      if(detail >= bar){
        return "포병";
      }
      else if(traffic >= bar){
        // 기갑
        return "기갑";
      }
      return "보병";
    }
    else if(scores[0] === detail){
      return "포병";
    }
    else if(scores[0] === traffic){
      if(fight >= bar){
        return "기갑";
      }
      else{
        return "수송";
      }
    }
    else if(scores[0] === control){
      return "헌병";
    }
    else{
      return "의무";
    }
  }
  else{
    //정적
    if(scores[0] === fight){
      // 전투성향 높음
      if(detail >= bar){
        return "방공";
      }
      return "화생방";
    }
    else if(scores[0] === detail){
      if(fight >= bar){
        return "방공";
      }
      return "공병";
    }
    else if(scores[0] === traffic){
      return "보급";
    }
    else if(scores[0] === control){
      if(support >= bar){
        return "정보통신";
      }
      return "인사";
    }
    else{
      if(control>=bar){
        return "정보통신";
      }
      else if(fight >= bar){
        return "화생방";
      }
      else if(traffic >= bar){
        return "보급";
      }
      else{
        return "정보";
      }
    }
  }

  return "보병";
}

module.exports = function(app)
{
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
    const answers = req.body;
    // console.log(answers);
  
    let fight = 50;
    let detail = 50;
    let traffic = 50;
    let control = 50;
    let support = 50;
    let activity = 50;
  
    /**
     * 정답 폼
     * 문항 번호  정답 고른것
     */
    
    for(let i=0; i<answers.length; i++){
      const question = await Question.findOne({num: answers[i].num}).exec();
      if(question.choice === 0){
        fight += question.fight;
        detail += question.detail;
        traffic += question.traffic;
        control += question.control;
        support += question.support;
        activity += question.activity;
      }
      else{
        fight -= question.fight;
        detail -= question.detail;
        traffic -= question.traffic;
        control -= question.control;
        support -= question.support;
        activity -= question.activity;
      }
    }
    
    console.log(fight, detail, traffic, control, support, activity);
    const recommandedJob = await jobRecommend(fight, detail, traffic, control, support, activity);

    // TODO : recommand job
    // const jobList = await Job.find({high: recommandedJob}).exec();

    // const rand = Math.floor(Math.random() * jobList.length);
    // const result = jobList[rand];
  
    res.send(recommandedJob);
    // res.send(result);
    
  });

  app.post('/addJobs', async(req, res, next) => {
    // 보직 추가하는 api
    


  });
  app.post('/addQuestions', async(req, res, next) => {
    // 질문 추가하는 api
    const datas = req.body;
    // console.log(datas);
    console.log(typeof(datas));

    for(let i=0; i<datas.length; i++){
      const data = new Question();

      data.num = datas[i].num;
      data.question = datas[i].question;
      data.answer1 = datas[i].answer1;
      data.answer2 = datas[i].answer2;
      data.fight = datas[i].fight;
      data.detail = datas[i].detail;
      data.traffic = datas[i].traffic;
      data.control = datas[i].control;
      data.support = datas[i].support;
      data.activity = datas[i].activity;
      
      // console.log(data);

      await data.save();
    }

    res.send(req.body);
  });
  
}