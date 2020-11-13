const mongoose = require('mongoose');
const schema = mongoose.Schema;

const jobSchema = new schema({
  /**
   * 특기병 폼
   * 번호, 대분류, 중분류, 소분류, 설명, 사진
   */

  num:{
    type: Number,
    default: -1
  },
  high:{
    type: String,
    default: "대분류를 입력하세요",
  },
  low:{
    type: String,
    default: "소분류를 입력하세요",
  },
  description:{
    type: String,
    default: "보직 설명",
  },
  image:{
    type: String,
    default: "???/???"
  }
  
});

module.exports = mongoose.model('job', jobSchema);