const express = require("express");
const app = express();
const fs = require("fs");
const path = require('path');
const port = 3000;

const wordList = JSON.parse(fs.readFileSync('./wordList.json'))

app.use(express.json())
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/public/about.html");
});

app.get("/gameplay", (req, res) => {
    res.sendFile(__dirname + "/public/gameplay.html");
});

app.get("/settings", (req, res) => {
    res.sendFile(__dirname + "/public/settings.html");
});


app.post("/word", (req, res) => {
    var wordLength = req.body.word;
    console.log("received word length: " + wordLength)
    fs.readFile('wordList.json', (err, data) => {
        if (err) throw err;
        let words = JSON.parse(data)
        const randomIndex = Math.floor(Math.random() * words[wordLength].length);
        const randomWord = words[wordLength][randomIndex];
        console.log(randomWord)

        const responseString = randomWord ;
        res.json({ responseString });

    })


})



app.listen(port, () => {
    console.log(`Microservice is listening on port ${port}`);
});
