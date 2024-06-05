import { chromium, Browser, Page, test } from '@playwright/test';

let browser: Browser;
let page: Page;
let context : any;
let newPage: Page;

test.beforeAll(async () => {
  // Launch a browser instance before all tests
  browser = await chromium.launch();
});

test.afterAll(async () => {
  // Close the browser instance after all tests
  if (browser) {
    await browser.close();
  }
});

export async function createPage(): Promise<Page> {
  browser = await chromium.launch({headless:false});
  context = await browser.newContext();
  page = await context.newPage();
  return page;
};

export async function newTab(): Promise<Page> {
  newPage = await context.newPage();
  return newPage;
};

export { page, newPage, browser, context};
