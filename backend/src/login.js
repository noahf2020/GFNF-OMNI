const fs = require('fs');
const puppeteer = require('puppeteer-extra')
const chromePaths = require("chrome-paths");

const parser = require('./cookies/parser');

module.exports = async function login(accountDetails, jar, ua) {
  let state;

  console.log('Signing in');

  let cookies = jar.getCookies('https://amazon.com/').map(_ => ({
    name: _.key,
    value: _.value,
    domain: _.domain
  }))

  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ["--enable-automation"],
    executablePath: chromePaths.chrome,
    args: [
      "--disable-blink-features=AutomationControlled",
      "--window-size=500,650",
      "--use-mobile-user-agent",
      "--ignore-certificate-errors",
      `--user-agent=${ua}`
    ]
  });

  try {
    const page = await browser.newPage();
    
    await page.setCookie(...cookies);

    await page.setViewport({
      width: 500,
      height: 650
    })

    await page.goto(`https://smile.amazon.com/ap/signin?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fsmile.amazon.com%2Fref%3Dsmi_se_ya_so_ul&pageId=amzn_smile`)

    await page.waitForSelector('#continue', {
      timeout: 60000
    })
    
    await page.type('#ap_email', accountDetails.email);

    await page.keyboard.press('Enter');

    await page.waitForSelector('#ap_password', {
      timeout: 60000
    })

    await page.type('#ap_password', accountDetails.password);

    await page.keyboard.press('Enter');

    await page.waitForSelector('#a-autoid-0', {
      timeout: 30000
    })

    let cookieObj = {};

    (await page.cookies()).forEach(cookie => {
      cookieObj[cookie.name] = cookie.value;
    })

    cookieObj.lastUpdated = Date.now();

    parser.writeAccount(accountDetails.email, cookieObj);

    await browser.close();  
    
    state = true;
  } catch (e) {
    state = false;

    browser.close();

    console.log(e)

    console.log('Error signing in');
  }

  return state;
}