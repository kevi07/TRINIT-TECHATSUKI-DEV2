const express = require('express');
const app = express();
const fs = require('fs');
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
});

app.get('/videoplayer', (req, res) => { 
    const range = req.headers.range 
    const videoPath = './video/English_course.mp4'; 
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