const express = require('express');
const app = express();
const port = 8000;

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});

const router = require('./router')(app);


mongoose.connect('mongodb://localhost/khusat');

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});