import { chromium, Browser, Page} from '@playwright/test';

let browser: Browser;
let page: Page;
let context : any;

export async function createPage(): Promise<Page> {
  browser = await chromium.launch({headless:false});
  context = await browser.newContext();
  page = await context.newPage();
  return page;
};

export { page};
