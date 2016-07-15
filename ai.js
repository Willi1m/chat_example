var mongoose = require('mongoose')
mongoose.connect("mongodb://bigtom:1234qwer@ds011389.mlab.com:11389/xiaohuangji")
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
  //返回一个promise
  return QA.find({q:q}).exec();
}
