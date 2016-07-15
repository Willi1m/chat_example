var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/xiaohuangji")
var Schema = mongoose.Schema;

var QASchema = new Schema({
  q: String,
  a: String
})

var QA = mongoose.model('QA', QASchema)

exports.addQA = function(q,a,callback){
  var qa = new QA({q:q,a:a})
  qa.save(function(err){
    callback()
  })
}

exports.answer = function(q){
  return QA.find({q:q}).exec();
}
