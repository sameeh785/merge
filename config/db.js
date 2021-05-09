const moongose = require('mongoose')
const config  = require('config')
const db =    config.get('mongoURL')
const connectDb = async () =>{
  try{
   await moongose.connect(db,{ useUnifiedTopology: true , useNewUrlParser: true} )
   console.log("server connected")
  }
  catch(e){
   console.log(e)
   process.exit(1)
  }
}

module.exports = connectDb