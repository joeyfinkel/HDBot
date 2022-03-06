require('dotenv').config();

const puppeteer = require('puppeteer');
const { PDXEvents } = require('./PDX/PDXEvents');

const events = async () => {
  const launchOptions = {
    // devtools: true,
    headless: false,
    slowMo: 20,
    defaultViewport: { width: 1530, height: 830 },
    args: ['--start-maximized'],
  };
  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  await PDXEvents(page);
};

events();
