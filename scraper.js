const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1200, height: 900 } });
  const page = await browser.newPage();

  await page.goto('https://www.instagram.com/', {
    waitUntil: 'networkidle2',
  });

  await page.type('input[name=username]', process.env.IG_USERNAME);
  await page.type('input[name=password]', process.env.IG_PASSWORD);
  // await page.waitForTimeout(1000);

  // await page.click('button[type=submit]');
  await page.evaluate(() => {
    const btns = [...document.querySelector('.HmktE').querySelectorAll('button')]
    btns.forEach(function (btn) {
      if (btn.innerText === 'Log In') { btn.click() }
    })
  });

  await page.waitForTimeout(2000);
  await page.goto('https://www.instagram.com/cathodecinema/', {
    waitUntil: 'networkidle2',
  });

  await page.waitForTimeout(3500);

  const postDivs = await page.$$eval('div[class="v1Nh3 kIKUG  _bz0w"]', inputs => { return inputs.map(input => input.children[0].href) })
  console.log('post links:', postDivs)

  await page.goto(postDivs[0], {
    waitUntil: 'networkidle0',
  });

  // const page.$('div[class="C4VMK"')
  const postContent = await page.$$eval('div[class="C4VMK"]', inputs => { return inputs.map(input => input.children[1].innerHTML) })
  let postContent2 = postContent.toString()
  let splitContent = postContent2.split('<br><br>')
  await console.log('post content:', splitContent)

})();