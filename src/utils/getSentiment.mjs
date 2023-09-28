import Sentiment from "sentiment";

export default async function analyzeSentiment(text) {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);
  return result;
}
