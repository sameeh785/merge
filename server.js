const express = require("express");
const connectDb = require("./config/db");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
app.use(bodyParser.json());

connectDb();
// 

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.use("/api/posts", require("./routes/api/posts"));

app.use("/api/profile", require("./routes/api/profile"));

// serving static assets to build
if(process.env.NODE_ENV === 'production'){
  //set_static folder
  app.use(express.static('client/build'))
  app.get('*',(req,res) =>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server is running"));
