import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Popover validete', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
	});
  
  test('should add shop-list-change to the page', async () => {
    await page.goto(baseUrl);
    const button = await page.$('.btn-pencil');
    button.click();
    await page.waitForSelector('.shop-list-change');
    const form = await page.$('.shop-list-change');
    const input = await form.$('.cost-product');
    await input.focus();
    await input.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await input.type('0');
    const submit = await form.$('.save-product');
    submit.click();
    await page.waitForSelector('.cost-product.error');
  });

  test('should open delete-product to the page', async () => {
    await page.goto(baseUrl);
    const button = await page.$('.btn-cross');
    button.click();
    await page.waitForSelector('.delete-product.active');
  });

  test('should add .error class for input', async () => {
    await page.goto(baseUrl);
    const button = await page.$('.btn-plus');
    button.click();
    await page.waitForSelector('.shop-list-add');
    const form = await page.$('.shop-list-add');
    const input = await form.$('.name-product');
    await input.type('');
    const submit = await form.$('.save-product');
    submit.click();
    await page.waitForSelector('.name-product.error');
  });
});
