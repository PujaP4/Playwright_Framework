import { Page, errors, expect, Locator, test } from "@playwright/test";
import { error, log } from "console";
import * as path from 'path'

export class TestMethods {
  public page: Page;
  public currentDate: number;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForSelector(element: Locator, timeout?: number) {
    const xpath = String(element);
    const updatedXpath = xpath.replace("Locator@", "");
    await this.page.waitForSelector(updatedXpath, { timeout: timeout });
  }

  /*Give Input by clearing previous input*/
  giveInput = async (element: Locator, input: string, logMsg: string) => {
    if (await element.isVisible()) {
      await element.fill(input);
      console.log(logMsg);
    } else {
      throw new error;
    }
  };

  async clickOnElement(element: Locator, logMsg: string, timeout?: number) {
    if (await element.isVisible()) {
      await element.click({ timeout: timeout });
      console.log(logMsg);
    } else {
      console.error("Element not found");
    }
  }

}
