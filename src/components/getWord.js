import axios from 'axios'
import { GetSynonymsAndAntonyms } from "./getSyns&Ants";

let CHOSEN_WORD = {}

const fetchRandomWord = async (length) => {
    const url = `https://random-word-api.herokuapp.com/word?number=10&length=${length}`;

    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {}
};

const fetchWordInfo = async (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const response = await axios.get(url);
        return ({
            "word": response.data[0].word,
            "definitions": response.data[0].meanings[0].definitions
        })
    } catch (error) {}
}

const fetchWordInfoWithRetry = async (words) => {
    console.log(`starting words: ${words}`)
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wordInfo = await fetchWordInfo(word);
        let defs = []
        if (wordInfo) {
            for (let i = 0; i < wordInfo.definitions.length; i++){
                if ( !(wordInfo.definitions[i].definition.includes(wordInfo.word)) ){
                    defs.push(wordInfo.definitions[i].definition)
                }
            }
            if (defs.length !== 0) {
                wordInfo.definitions = defs
                return wordInfo
            }
        }
    }
    // No word info found for any of the words
    console.log("No word info found, retrying");
    fetchRandomWord(5)
        .then((new_words) => {
            return fetchWordInfoWithRetry(new_words);
        })
};

export const GetWord = () => {
    return new Promise((resolve, reject) => {
        // Usage: Pass the desired length as an argument
        fetchRandomWord(5)
            .then((randomWord) => {
                fetchWordInfoWithRetry(randomWord)
                    .then((data) => {
                        GetSynonymsAndAntonyms(data.word)
                            .then((syns_ants) => {
                                CHOSEN_WORD.word = data.word.toUpperCase()
                                CHOSEN_WORD.definitions = data.definitions;
                                CHOSEN_WORD.synonyms = syns_ants.synonyms
                                CHOSEN_WORD.antonyms = syns_ants.antonyms
                                resolve(CHOSEN_WORD);
                            })
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