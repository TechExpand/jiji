const express = require('express')
let cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/api', require("./routes/users"))
app.use('/api', require("./routes/post"))


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jiji');
mongoose.Promise = global.Promise;

app.use(function(err,req,res,next){
    res.status(422).send({error: err.message});
  });
  
  
  
  app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
  });

  
  
  app.listen(process.env.PORT || 3000);
  console.log('Web Server is listening at port '+ (process.env.port || 3000));

