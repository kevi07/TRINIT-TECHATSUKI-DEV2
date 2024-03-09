const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require("path");


mongoose.connect('mongodb+srv://kevin:Kevin123@cluster0.fdzpbea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const tutorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    experience: String,
    history: String,
    languages: [String],
    phoneNumber: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pricing: Number,
    timings: [String],
  });
  

  const Tutor = mongoose.model('Tutor', tutorSchema);
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  app.post('/tutor/register', async (req, res) => {
    try {
      const {
        name,
        age,
        experience,
        history,
        languages,
        phoneNumber,
        email,
        pricing,
        timings,
      } = req.body;
  
      const tutor = new Tutor({
        name,
        age,
        experience,
        history,
        languages,
        phoneNumber,
        email,
        pricing,
        timings,
      });
  
      const savedTutor = await tutor.save();
      res.status(201).json(savedTutor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


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
});

app.get('/videoplayer', (req, res) => { 
    const range = req.headers.range 
    const videoPath = '/video/English_course.mp4'; 
    const videoSize = fs.statSync(videoPath).size 
    const chunkSize = 1 * 1e6; 
    const start = Number(range.replace(/\D/g, "")) 
    const end = Math.min(start + chunkSize, videoSize - 1) 
    const contentLength = end - start + 1; 
    const headers = { 
        "Content-Range": `bytes ${start}-${end}/${videoSize}`, 
        "Accept-Ranges": "bytes", 
        "Content-Length": contentLength, 
        "Content-Type": "video/mp4"
    } 
    res.writeHead(206, headers) 
    const stream = fs.createReadStream(videoPath, { 
        start, 
        end 
    }) 
    stream.pipe(res) 
}) 

app.listen(5000);