import Sentiment from "sentiment";

export default async function getSentiment(text){
    const setiment = new Sentiment()
    const result = setiment.analyze(text)
    return result
}