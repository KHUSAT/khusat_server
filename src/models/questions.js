const mongoose = require('mongoose');
const schema = mongoose.Schema;

const questionSchema = new schema({
  /**
   * 질문 폼
   * 번호 질문내용  답1 답2 가중치1, 가중치2
   */

  num:{
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
  fight: {
    type: Number,
    default: 0,
  },
  detail: {
    type: Number,
    default: 0,
  },
  traffic: {
    type: Number,
    default: 0,
  },
  control: {
    type: Number,
    default: 0,
  },
  support: {
    type: Number,
    default: 0,
  },
  activity: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('question', questionSchema);