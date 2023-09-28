import puppeteer from "puppeteer";

export default async function getLinks() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("https://hn.algolia.com");
    await page.waitForSelector(".SearchInput");
    await page.type(".SearchInput", "show hn", { delay: 100 });
    await page.screenshot({ path: "data/search.png" });

    const links = await page.evaluate(() => {
      return [...document.querySelectorAll(".Story_title a:first-child")].map(
        (e) => e.href
      );
    });

    return links;
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  } finally {
    await page.close();
    await browser.close();
  }
}
