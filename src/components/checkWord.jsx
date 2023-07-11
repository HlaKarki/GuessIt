import axios from 'axios'

export const isValid = async (user_word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${user_word}`;
    console.log(`user_word: ${user_word}`)
    try {
        await axios.get(url);
        return true
    } catch (error) {
        // console.error(error);
        return false
    }
}
