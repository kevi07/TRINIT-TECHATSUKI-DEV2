const express = require('express');
const app = express();
const path = require("path");

app.set('view engine' , 'ejs');

app.set("views", path.join(__dirname, "views"));

app.use(express.static('public'));

app.get('/',(req,res) => {
    res.render('index.ejs');
});

app.get('/login',(req,res) => {
    res.render('question.ejs');
})

app.get('/tutor', (req, res) => {
    res.render('tutorregister');
  });

app.get('/tutorworkspace' , (req,res) => {
    res.render('tutor')
})

app.listen(5000);