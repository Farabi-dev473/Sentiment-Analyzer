import getLinks from './links.mjs';
import { Queue } from 'bullmq';
import Redis from 'ioredis';

const connection = new Redis({
    maxRetriesPerRequest: null
});

const myQueue = new Queue("comment", { connection });

const links = await getLinks()
for (let link of links) {
  myQueue.add(link, { url: link }, { jobId: link });
}
