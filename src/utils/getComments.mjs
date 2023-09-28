import puppeteer from "puppeteer";

export default async function getComments(link) {
  const browser = await puppeteer.launch({ headless: false });
  
  try {
    const page = await browser.newPage();
    await page.goto(link);
    await page.waitForSelector(".comment");
    const comments = await page.evaluate(() => {
      return [...document.querySelectorAll(".comment")].map((e) => e.innerText);
    });
    
    return comments;
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
