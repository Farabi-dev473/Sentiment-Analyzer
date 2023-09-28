import { Worker, Queue } from 'bullmq';
import { setTimeout } from 'timers/promises';
import Redis from 'ioredis';
import getComments from './utils/getComments.mjs';
import getSentiment from './utils/getSentiment.mjs';
import getLinks from './utils/getLinks.mjs';

async function processJob(job) {
  const link = job.data.url;
  console.log(link);
  const comments = await getComments(link);
  console.log(comments[0]);
  const sentiment = await getSentiment(comments.join(' '));
  console.log(sentiment.score);
  await db.set(link, sentiment.score);
  await setTimeout(4000);
}

async function populateQueueWithLinks(queue, links) {
  for (let link of links) {
    await queue.add(link, { url: link }, { jobId: link });
  }
}

const connection = new Redis({
  maxRetriesPerRequest: null
});

const db = new Redis();

const worker = new Worker('comment', processJob, { connection });
const myQueue = new Queue('comment', { connection });

(async () => {
  const links = await getLinks();
  await populateQueueWithLinks(myQueue, links);
})();
