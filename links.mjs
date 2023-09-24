import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: false });

export default async function getLinks(){
  const page = await browser.newPage();
  await page.goto("https://hn.algolia.com");

  await page.waitForSelector(".SearchInput");
  await page.type(".SearchInput", "show hn", { delay: 100 });
  await page.screenshot({ path: "data/search.png" });

  const links = await page.evaluate(() => {
    return [...document.querySelectorAll(".Story_title a:first-child")].map(
      (e) => e.href
    );
  });
  await page.close()
  browser.close()
  return links;
};