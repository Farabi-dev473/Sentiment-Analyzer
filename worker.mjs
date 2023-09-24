import { Worker } from 'bullmq';
import {setTimeout} from "timers/promises"
import getComments from './comments.mjs';
import getSentiment from './sentiment.mjs';
import Redis from 'ioredis';

const connection = new Redis({
    maxRetriesPerRequest: null
});

const db = new Redis()


new Worker('comment', async (job) => {
    const link = job.data.url
    console.log(link)
    const comments = await getComments(link)
    console.log(comments[0])
    const sentiment = await getSentiment(comments.join(' '))
    console.log(sentiment.score)
    await db.set(link, sentiment.score)
    await setTimeout(4000)
},{connection})

