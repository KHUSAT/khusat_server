const mongoose = require('mongoose');
const schema = mongoose.Schema;

const questionSchema = new schema({
  /**
   * 질문 폼
   * 번호 질문내용  답1 답2 가중치1, 가중치2
   */

  questionNum:{
    type: Number,
    default: -1
  },
  question: {
    type: String,
    default: "질문",
  },
  answer1: {
    type: String,
    default: "그렇다"
  },
  answer2: {
    type: String,
    default: "아니다"
  },
  score1: {
    type: Number,
    default: 50,
  },
  score2: {
    type: Number,
    default: -50,
  },
});

module.exports = mongoose.model('question', questionSchema);