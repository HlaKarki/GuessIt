import axios from 'axios'

export const GetSynonymsAndAntonyms = async (word) => {
    const url = `https://api.api-ninjas.com/v1/thesaurus?word=${word}`
    try {
        const response = await axios.get(url)
        return {
            "synonyms": response.data.synonyms,
            "antonyms": response.data.antonyms
        }
        // console.log(returnThis)
    }catch (error) {
        console.log(error)
    }
}