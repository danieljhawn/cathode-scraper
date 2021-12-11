const puppeteer = require('puppeteer');
require('dotenv').config()

// const db = require('db')
// db.connect({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS
// })

console.log(process.env.TEST_VAR);

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/cathodecinema/', {
    waitUntil: 'networkidle0',
  });
  await page.pdf({ path: 'hn.pdf', format: 'a4' });

  await browser.close();
})();