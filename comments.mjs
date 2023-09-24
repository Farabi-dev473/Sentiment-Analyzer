import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: false });

export default async function getComments(link) {
  const page = await browser.newPage();
  await page.goto(link);
  await page.waitForSelector(".comment");
  const comments = await page.evaluate(() => {
    return [...document.querySelectorAll(".comment")].map((e) => e.innerText);
  });
  await page.close();
  return comments;
}
