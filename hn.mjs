import puppeteer from "puppeteer";
import {setTimeout} from "timers/promises "
import Sentiment from "sentiment";

async function getSentiment(text){
    const setiment = new Sentiment()
    const result = setiment.analyze(text)
    return result
}

const browser = await puppeteer.launch({headless:false})


const page = await browser.newPage()
await page.goto("https://hn.algolia.com")

await page.waitForSelector('.SearchInput')
await page.type('.SearchInput', 'show hn', {delay: 100})
await page.screenshot({path: 'data/search.png'})

const links = await page.evaluate(() => {
    return [...document.querySelectorAll('.Story_title a:first-child')].map(e=>e.href)
})
// console.log(links)

for(let link of links){
    const page = await browser.newPage()
    await page.goto(link)
    await page.waitForSelector('.comment')
    const comments = await page.evaluate(() => {
        return [...document.querySelectorAll('.comment')].map(e=>e.innerText)
    })
    console.log(comments)
    await page.close()
    await setTimeout(4000)
}

await browser.close()