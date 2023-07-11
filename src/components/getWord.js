import axios from 'axios'
import { isValid } from "./checkWord";

let CHOSEN_WORD = {
    word: "",
    definitions: []
}

const fetchRandomWord = async (length) => {
    const url = `https://random-word-api.herokuapp.com/word?number=10&length=${length}`;

    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        console.error(error)
    }
};

const fetchWordInfo = async (word, KEY) => {
    console.log(process.env.REACT_APP_RAPID_API_KEY)
    const options = {
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
        headers: {
            'X-RapidAPI-Key' : process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {}
}

const fetchWordInfoWithRetry = async (words, KEY) => {
    console.log(`starting words: ${words}`)
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wordInfo = await fetchWordInfo(word, KEY);

        if (wordInfo) {
            if (wordInfo.results && wordInfo.word.length === 5) {
                const result = await isValid(wordInfo.word);

                if (result) {
                    return wordInfo
                }
            }
        }
    }

    // No word info found for any of the words
    console.log("No word info found");
    return null;
};

export const GetWord = (KEY) => {
    return new Promise((resolve, reject) => {
        // Usage: Pass the desired length as an argument
        fetchRandomWord(5)
            .then((randomWord) => {
                fetchWordInfoWithRetry(randomWord, KEY)
                    .then((data) => {
                        console.log(data.word);
                        CHOSEN_WORD.word = data.word.toUpperCase()
                        CHOSEN_WORD.definitions = data.results;
                        resolve(CHOSEN_WORD);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
};