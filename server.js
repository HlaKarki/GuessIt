const express = require("express");
const app = express();
const fs = require("fs");
const path = require('path');
const port = 3000;

app.use(express.json())
app.use(express.static('public'));

app.post("/word", (req, res) => {
    let wordLength = req.body.word;
    console.log("received word length: " + wordLength)

    fs.readFile('wordList.json', (error, data) => {
        if (error) {
            console.error(error)
            return
        }
        try {
            let words = JSON.parse(data)
            const randomIndex = Math.floor(Math.random() * words[wordLength].length);
            const randomWord = words[wordLength][randomIndex];
            console.log("random word chosen: ", randomWord)

            const responseString = randomWord ;
            res.json({ responseString });
        }
        catch (parseError){
            console.error(parseError)
        }
    })
})


app.listen(port, () => {
    console.log(`Microservice is listening on port ${port}`);
});
