const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;

app.use(express.json())

// serve files in the public folder using express
app.use(express.static('public'));

// fetch word function is received here, returns a random word
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
            let randomWord = words[wordLength][randomIndex];

            // while (hasDuplicateLetters(randomWord)) {
            //     const randomIndex = Math.floor(Math.random() * words[wordLength].length);
            //     randomWord = words[wordLength][randomIndex];
            // }
            console.log("random word chosen: ", randomWord)

            const responseString = randomWord.toLowerCase() ;
            res.json({ responseString });
        }
        catch (parseError){
            console.error(parseError)
        }
    })

    // function hasDuplicateLetters(s) {
    //     for (let i = 0; i < s.length; i++) {
    //         for (let j = i + 1; j < s.length; j++) {
    //             if (s[i] === s[j]) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }
})

// check if the word user input is in the list

// when feedback page is loaded, returns the feedbacks store in the JSON file
app.get('/getData', function(req, res) {
    fs.readFile('feedbacks.json', function(error, data) {
        if (error) {
            throw error;
        }
        const jsonData = JSON.parse(data)
        res.json(jsonData);
    })
})

// when feedback is being submitted, the name and description along with time is added to JSON file
app.post('/addFeedback', function(req, res){
    // Get form data from request body
    const name = req.body.name;
    const feedback = req.body.feedback;
    const time = req.body.time;

    // Load existing feedback data from JSON
    const feedbackData = fs.readFileSync("feedbacks.json");
    const feedbacks = JSON.parse(feedbackData);

    // Add new feedback to array
    feedbacks.push({
        name: name,
        feedback: feedback,
        time: time
    })

    // Save updated feedback data to JSON file
    fs.writeFileSync("feedbacks.json", JSON.stringify(feedbacks, null, 2));

    // Send response indicating success
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Microservice is listening on port ${port}`);
});
