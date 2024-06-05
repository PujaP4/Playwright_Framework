import { Page, errors, expect, Locator, test } from "@playwright/test";
import { error, log } from "console";
import * as path from 'path'

export class TestMethods {
  public page: Page;
  public currentDate: number;

  constructor(page: Page) {
    this.page = page;
  }

  async GoToURL(url: string, timeout?: number) {
    await this.page.goto(url, { timeout: timeout });
    // await this.page.waitForNavigation({timeout:timeout});
  }

  async waitForSelector(element: Locator, timeout?: number) {
    const xpath = String(element);
    const updatedXpath = xpath.replace("Locator@", "");
    await this.page.waitForSelector(updatedXpath, { timeout: timeout });
  }

  async waitForSelectorInNewPage(page:Page, element: Locator, timeout?: number) {
    const xpath = element.toString();
    const updatedXpath = xpath.replace("Locator@", "");
    await page.waitForSelector(updatedXpath, { timeout: timeout });
  }
  //   async waitForSelector(element: Locator, timeout?: number) {
  //   const xpath = String(element);
  //   const updatedXpath = xpath.replace(/^locator\('(.*)'\)$/g, "$1");
  //   await this.page.waitForSelector(updatedXpath, { timeout: timeout });
  // }

  // async waitForSelectorInNewPage(page:Page, element: Locator, timeout?: number) {
  //   const xpath = String(element);
  //   const updatedXpath = xpath.replace(/^locator\('(.*)'\)$/g, "$1");
  //   await page.waitForSelector(updatedXpath, { timeout: timeout });
  // }

  async waitForElementState(
    element: Locator,
    state: "hidden" | "visible" | "attached" | "detached",
    timeout?: number
  ) {
    await element.waitFor({ state: state });
  }

  async setTimeoutForTest(timeout: string) {
    const miliSeconds = parseInt(timeout);
    test.setTimeout(miliSeconds);
  }

  async waitForLoaderToDisappear(element: Locator, timeout?: number) {
    await element.waitFor({ state: "visible", timeout: timeout });
    if (await element.isVisible()) {
      console.log("Loader is loading........");
      await element.waitFor({ state: "hidden", timeout: timeout });
    } else {
      console.error("Loader is not visible");
    }
  }

  async waitForLoaderTo_Disappear(element: Locator, timeout?: number) {
    // await element.waitFor({ state: "visible", timeout: timeout });
    if (await element.isVisible()) {
      console.log("Loader is loading...");
      await element.waitFor({ state: "hidden", timeout: timeout });
    } else {
      console.error("Loader is not visible");
    }
  }
  async waitForLoaderTo_DisappearForAll(element: Locator, milliseconds:number, timeout?: number) {
    // await element.waitFor({ state: "visible", timeout: timeout });
    if (await element.all()) {
      console.log("Loader is loading...");
      const waitforElement = element.nth(1);
      await this.page.waitForTimeout(milliseconds)
      await waitforElement.waitFor({ state: "hidden", timeout: timeout });
    } else {
      console.error("Loader is not visible");
    }
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

  /*Give Input without clearing previous input*/
  async giveInputByType(element: Locator, input: string, logMsg: string) {
    if (await element.isVisible()) {
      await element.type(input);
      console.log(logMsg);
    } else {
      throw new console.error();
    }
  }

  async getInputValueOfGivenInput(element: Locator) {
    if (await element.isVisible()) {
      let value = element.inputValue();
      console.log("Entered value is " + (await value));
    } else {
      throw new console.error();
    }
  }

  async clickOnElement(element: Locator, logMsg: string, timeout?: number) {
    if (await element.isVisible()) {
      await element.click({ timeout: timeout });
      console.log(logMsg);
    } else {
      console.error("Element not found");
    }
  }

  async VerifyUrl(page:Page,urlExpected: string, logMsg: string) {
    await page.waitForTimeout(5000);
    const url = page.url();
    await expect(url).toContain(urlExpected);
    console.log(logMsg);
    return this.page.url();
  }

  async scrollIntoViewIfNeeded(element: Locator) {
    if (await element.isVisible()) {
      await element.scrollIntoViewIfNeeded();
    } else {
      throw new console.error();
    }
  }

  /*Single select dropdown*/
  async selectdropdownOption(
    element: Locator,
    dropdownList: Locator,
    dropdownOption: string
  ) {
    if (await element.isVisible()) {
      await element.click();
      console.log("Clicked on dropdown field");
      if (dropdownList) {
        await dropdownList.locator("li", { hasText: dropdownOption }).click();
      }
      console.log("Option is selected in the dropdown");
    } else {
      throw new console.error();
    }
  }

  async selectdropdownOptionByLabel(page:Page,element: Locator, labelValue: string) {
    if (await element.isVisible()) {
      const xpath = element.toString();
      const updatedXpath = xpath.replace("Locator@", "");
      await page.selectOption(updatedXpath, {
        label: labelValue,
      });
      console.log("Option is selected in the dropdown");
    } else {
      throw new console.error();
    }
  }

  async selectdropdownOptionByValue(page:Page,element: Locator, _value: string) {
    if (await element.isVisible()) {
      const xpath = element.toString();
      const updatedXpath = xpath.replace("Locator@", "");
      await page.selectOption(updatedXpath, {
        value: _value,
      });
      console.log("Option is selected in the dropdown");
    } else {
      throw new console.error();
    }
  }

  async selectdropdownOptionByIndex(page:Page,element: Locator, _index: number) {
    if (await element.isVisible()) {
      const xpath = element.toString();
      const updatedXpath = xpath.replace("Locator@", "");
      await page.selectOption(updatedXpath, {
        index: _index,
      });
      console.log("Option is selected in the dropdown");
    } else {
      throw new console.error();
    }
  }

  /*Multiselect dropdown*/
  async multiselectdropdownOptionByLabel(
    page:Page,
    element: Locator,
    labelValueOne: string,
    labelValueTwo: string
  ) {
    if (await element.isVisible()) {
      const xpath = element.toString();
      const updatedXpath = xpath.replace("Locator@", "");
      await page.selectOption(updatedXpath, [
        { label: labelValueOne },
        { label: labelValueTwo },
      ]);
      console.log("Options is selected in the dropdown");
    } else {
      throw new console.error();
    }
  }

  async multiselectdropdownOptionByValue(
    page:Page,
    element: Locator,
    valueOne: string,
    valueTwo: string
  ) {
    if (await element.isVisible()) {
      const xpath = element.toString();
      const updatedXpath = xpath.replace("Locator@", "");
      await page.selectOption(updatedXpath, [
        { value: valueOne },
        { value: valueTwo },
      ]);
      console.log("Options is selected in the dropdown");
    } else {
      throw new console.error();
    }
  }

  async multiselectdropdownOptionByIndex(
    page:Page,
    element: Locator,
    indexOne: number,
    indexTwo: number
  ) {
    if (await element.isVisible()) {
      const xpath = element.toString();
      const updatedXpath = xpath.replace("Locator@", "");
      await page.selectOption(updatedXpath, [
        { index: indexOne },
        { index: indexTwo },
      ]);
      console.log("Options is selected in the dropdown");
    } else {
      throw new console.error();
    }
  }

  async selectDropdownOptionFromList(
    DropdownFieldName: string,
    dropdwonElement: Locator,
    dropdownList: Locator,
    selectedOption: Locator,
    values: string[]
  ) {
    console.log(`${DropdownFieldName} field`);
    await this.waitForSelector(dropdwonElement);
    await this.clickOnElement(
      dropdwonElement,
      `Clicked on ${DropdownFieldName} field`
    );
    await this.waitForSelector(dropdownList);
    if (await dropdownList.all()) {
      for (const list of await dropdownList.all()) {
        const optionText = String(await list.innerText());
        if (values.includes(optionText)) {
          await this.clickOnElement(
            list,
            `Clicked on ${optionText} dropdown option and is selected`
          );
        }
      }
    }
    await this.waitForSelector(selectedOption);
    if (await selectedOption.isVisible()) {
      const selectedValues = await selectedOption.textContent();
      console.log(`Selected options in the ${DropdownFieldName} are ${selectedValues}`);
    }
  }

  async selectSingleDropdownOptionFromList(
    DropdownFieldName: string,dropdwonElement: Locator,dropdownList: Locator,selectedOption: Locator, values: string) {
    console.log(`${DropdownFieldName} field`);
    await this.waitForSelector(dropdwonElement);
    await this.clickOnElement(
      dropdwonElement,
      `Clicked on ${DropdownFieldName} field`
    );
    await this.waitForSelector(dropdownList);
    if (await dropdownList.all()) {
      for (const list of await dropdownList.all()) {
        const optionText = String(await list.innerText());
        if (values.includes(optionText)) {
          await this.clickOnElement(
            list,
            `Clicked on ${optionText} dropdown option and is selected`
          );
        }
      }
    }
    await this.waitForSelector(selectedOption);
    if (await selectedOption.isVisible()) {
      const selectedValues = await selectedOption.textContent();
      console.log(`Selected option in the ${DropdownFieldName} is ${selectedValues}`);
    }
  }

  //with input assert
  async selectDropdownOptionFromListWithAssert(DropdownFieldName: string,dropdwonElement: Locator,dropdownList: Locator,values: string[]) {
    console.log(`${DropdownFieldName} field`);
    await this.waitForSelector(dropdwonElement);
    await this.clickOnElement(
      dropdwonElement,
      `Clicked on ${DropdownFieldName} field`
    );
    await this.waitForSelector(dropdownList);
    if (await dropdownList.all()) {
      for (const list of await dropdownList.all()) {
        const optionText = String(await list.innerText());
        if (values.includes(optionText)) {
          await this.clickOnElement(
            list,
            `Clicked on ${optionText} dropdown option and is selected`
          );
        }
      }
    }
    await this.waitForSelector(dropdwonElement);
    if (await dropdwonElement.isVisible()) {
      const selectedValues = await dropdwonElement.getAttribute("value");
      console.log(`Selected option in the ${DropdownFieldName} is ${selectedValues}`);
    }
  }

  async selectDropdownOptionFromListTextContent(DropdownFieldName: string,dropdwonElement: Locator,dropdownList: Locator,values: string[]) {
    console.log(`${DropdownFieldName} field`);
    await this.waitForSelector(dropdwonElement);
    await this.clickOnElement(
      dropdwonElement,
      `Clicked on ${DropdownFieldName} field`
    );
    await this.waitForSelector(dropdownList);
    if (await dropdownList.all()) {
      for (const list of await dropdownList.all()) {
        const optionText = String(await list.textContent());
        if (values.includes(optionText)) {
          await this.clickOnElement(
            list,
            `Clicked on ${optionText} dropdown option and is selected`
          );
        }
      }
    }
    await this.waitForSelector(dropdwonElement);
    if (await dropdwonElement.isVisible()) {
      const selectedValues = await dropdwonElement.getAttribute("value");
      console.log(`Selected option in the ${DropdownFieldName} is ${selectedValues}`);
    }
  }


  /*Get inner text*/

  async getTextContent(element: Locator) {
    let innerText;
    if (await element.isVisible()) {
      innerText = element.textContent();
      console.log(innerText);
    } else {
      throw new console.error();
    }
    return innerText;
  }

  async getInnerText(element: Locator) {
    let innerText;
    if (await element.isVisible()) {
      innerText = element.innerText();
      console.log(innerText);
    } else {
      throw new console.error();
    }
    return innerText;
  }

  /*Assertions*/

  async elementToHaveText(element: Locator, expectedText: string) {
    if (await element.isVisible()) {
      await expect(element).toHaveText(expectedText);
    } else {
      throw new console.error();
    }
  }

  async elementToBeAttached(element: Locator) {
    if (await element.isVisible()) {
      await expect(element).toBeAttached();
    } else {
      throw new console.error();
    }
  }

  async elementToBeChecked(element: Locator) {
    if (await element.isVisible()) {
      await expect(element).toBeAttached();
    } else {
      throw new console.error();
    }
  }

  async elementToBeDisabled(element: Locator) {
    if (await element.isVisible()) {
      await expect(element).toBeDisabled();
    } else {
      throw new console.error();
    }
  }

  async elementToBeEditable(element: Locator) {
    if (await element.isVisible()) {
      await expect(element).toBeEditable();
    } else {
      throw new console.error();
    }
  }

  async elementToBeEnabled(element: Locator) {
    if (await element.isVisible()) {
      await expect(element).toBeEnabled();
    } else {
      throw new console.error();
    }
  }

  async elementTobeEmpty(element: Locator) {
    if (await element.isVisible()) {
      await expect(element).toBeEmpty();
    } else {
      throw new console.error();
    }
  }

  async elementTobeFocused(element: Locator, expectedText: string) {
    if (await element.isVisible()) {
      await expect(element).toBeFocused();
    } else {
      throw new console.error();
    }
  }

  async elementToBeHidden(element: Locator) {
    if (await element.isVisible()) {
      await expect(element).toBeHidden();
    } else {
      throw new console.error();
    }
  }

  async elementToBeInViewport(element: Locator) {
    if (await element.isVisible()) {
      await expect(element).toBeInViewport();
    } else {
      throw new console.error();
    }
  }

  async elementToBeVisible(element: Locator) {
    if (await element.isVisible()) {
      await expect(element).toBeVisible();
    } else {
      throw new console.error();
    }
  }

  async elementToContainText(element: Locator, expText: string) {
    if (await element.isVisible()) {
      await expect(element).toContainText(expText);
    } else {
      throw new console.error();
    }
  }

  async elementToHaveClass(element: Locator, classAttributeValue: string) {
    if (await element.isVisible()) {
      await expect(element).toHaveClass(classAttributeValue);
    } else {
      throw new console.error();
    }
  }

  async elementToHaveCount(element: Locator, count: number) {
    if (await element.isVisible()) {
      await expect(element).toHaveCount(count);
    } else {
      throw new console.error();
    }
  }

  async elementToHaveID(element: Locator, id: string) {
    if (await element.isVisible()) {
      await expect(element).toHaveId(id);
    } else {
      throw new console.error();
    }
  }

  async elementToHaveValue(element: Locator) {
    if (await element.isVisible()) {
      await expect(element).toBeDisabled();
    } else {
      throw new console.error();
    }
  }

  async elementToHaveValues(element: Locator) {
    if (await element.isVisible()) {
      await expect(element).toBeEditable();
    } else {
      throw new console.error();
    }
  }

  async elementToHaveUrl(page:Page,element: Locator, url: string) {
    if (await element.isVisible()) {
      await expect(page).toHaveURL(url);
    } else {
      throw new console.error();
    }
  }

  async elementToHaveTitle(page:Page,title: string) {
    await expect(page).toHaveTitle(title);
  }

  //Capture Screenshots

  async screenShot(page:Page,fileName: string) {
    await page.screenshot({ path: `./screenshots/${fileName}.png` });
  }

  async fullPageScreenshot(page:Page,fileName: string) {
    await page.screenshot({
      path: `./screenshots/${fileName}.png`,
      fullPage: true,
    });
  }

  async captureIntoBuffer(page:Page,fileType: BufferEncoding) {
    const buffer = await page.screenshot();
    console.log(buffer.toString(fileType));
  }

  async elementScreenshot(element: Locator, fileName: string) {
    if (await element.isVisible()) {
      await element.screenshot({ path: `./screenshots/${fileName}.png` });
    } else {
      throw new console.error();
    }
  }

  // Mouse clicks

  async doubleClick(element: Locator) {
    if (await element.isVisible()) {
      await element.dblclick();
      console.log("Double click action performed");
    } else {
      throw new console.error();
    }
  }

  async rightClick(element: Locator) {
    if (await element.isVisible()) {
      await element.click({ button: "right" });
      console.log("Mouse right click action performed");
    } else {
      throw new console.error();
    }
  }

  async shiftPlusClick(element: Locator) {
    if (await element.isVisible()) {
      await element.click({ modifiers: ["Shift"] });
      console.log("Shift + click");
    } else {
      throw new console.error();
    }
  }

  async hoverOverElement(element: Locator) {
    if (await element.isVisible()) {
      await element.click({ modifiers: ["Shift"] });
      console.log("Hover over elements");
    } else {
      throw new console.error();
    }
  }

  async clickOnTopLeftCorner(element: Locator) {
    if (await element.isVisible()) {
      await element.click({ position: { x: 0, y: 0 } });
      console.log("Clicked on top left corner");
    } else {
      throw new console.error();
    }
  }

  async clickWithPosition(
    element: Locator,
    x: number,
    y: number,
    logMsg: string
  ) {
    if (await element.isVisible()) {
      await element.click({ position: { x: x, y: y } });
      console.log(logMsg);
    } else {
      throw new console.error();
    }
  }

  //Mouse

  //Left click
  async mouseClick(page:Page,element: Locator) {
    this.waitForSelector(element);
    if (await element.isVisible()) {
      const getBoundedBox = await element.boundingBox();
      if (getBoundedBox) {
        const boundingBox_X = getBoundedBox.x;
        const boundingBox_Y = getBoundedBox.y;
        await page.mouse.click(boundingBox_X, boundingBox_Y);
      }
    } else {
      throw new console.error();
    }
  }

  async mouseDown(page:Page, element: Locator) {
    await page.mouse.down();
  }

  async mouseMove(page:Page,element: Locator) {
    this.waitForSelector(element);
    if (await element.isVisible()) {
      const getBoundedBox = await element.boundingBox();
      if (getBoundedBox) {
        const boundingBox_X = getBoundedBox.x;
        const boundingBox_Y = getBoundedBox.y;
        await page.mouse.move(boundingBox_X, boundingBox_Y);
      }
    } else {
      throw new console.error();
    }
  }

  async mouseUp(page:Page,element: Locator) {
    await page.mouse.up();
  }

  async mouseWheel(page:Page,element: Locator) {
    this.waitForSelector(element);
    if (await element.isVisible()) {
      const getBoundedBox = await element.boundingBox();
      if (getBoundedBox) {
        const boundingBox_X = getBoundedBox.x;
        const boundingBox_Y = getBoundedBox.y;
        await page.mouse.wheel(boundingBox_X, boundingBox_Y);
      }
    } else {
      throw new console.error();
    }
  }

  async mouseWheelVertically(page:Page,element: Locator) {
    await this.waitForSelector(element);
    if (await element.isVisible()) {
      const getBoundedBox = await element.boundingBox();
      if (getBoundedBox) {
        const boundingBox_Y = getBoundedBox.y;
        await page.mouse.wheel(0, boundingBox_Y);
      }
    } else {
      throw new console.error();
    }
  }

  async mouseWheelHorizontally(page:Page,element: Locator) {
    await this.waitForSelector(element);
    if (await element.isVisible()) {
      const getBoundedBox = await element.boundingBox();
      if (getBoundedBox) {
        const boundingBox_X = getBoundedBox.x;
        await page.mouse.wheel(boundingBox_X, 0);
      }
    } else {
      throw new console.error();
    }
  }

  //Scroll Horizontally will be usefull in Table
  async scrollHorizontally(page:Page,ScrollBarElement: Locator) {
    await this.waitForSelector(ScrollBarElement,60000);
    if (await ScrollBarElement.isVisible()) {
      const getBoundedBox = await ScrollBarElement.boundingBox();
      log({getBoundedBox})
      if (getBoundedBox) {
        const boundingBox_X = getBoundedBox.x;
        await page.mouse.wheel(boundingBox_X, 0);
      }
    } else {
      throw new console.error();
    }
  }

  //Scroll vertically will be usefull in table
  async scrollVertically(page:Page,ScrollBarElement: Locator) {
    await this.waitForSelector(ScrollBarElement,60000);
    if (await ScrollBarElement.isVisible()) {
      const getBoundedBox = await ScrollBarElement.boundingBox();
      if (getBoundedBox) {
        const boundingBox_Y = getBoundedBox.y;
        await page.mouse.wheel(0, boundingBox_Y);
      }
    } else {
      throw new console.error();
    }
  }

  //Get Current Date
  async getCurrentDate() {
    const date = new Date();
    this.currentDate = date.getDate();
    console.log("Currenet date is " + this.currentDate);
    return this.currentDate;
  }

  // return pagePromise

  async returnPagePromise(page:Page){
    let pagePromise = page.context().waitForEvent('page');
    return pagePromise;
  }

  //upload File

  async UploadSingleFile(page: Page, element: Locator, fileName: string, logMsg : string, timeout?: number) {
    const filePath = path.join(__dirname, `/Document/${fileName}`);
    const xpath = element.toString();
    const updatedXpath = xpath.replace("Locator@", "");
    await page.waitForSelector(updatedXpath, { timeout: timeout });
    if(updatedXpath){
      await page.setInputFiles(updatedXpath, filePath);
      console.log(logMsg);
    }else{
      error("Element not found");
      test.fail();
    }
  }

  async UploadMultipleFile(page: Page, element: Locator, fileName: string[], logMsg : string, timeout?: number) {
    const filePath = path.join(__dirname, `/Document/${fileName}`);
    const xpath = element.toString();
    const updatedXpath = xpath.replace("Locator@", "");
    await page.waitForSelector(updatedXpath, { timeout: timeout });
    if(updatedXpath){
      await page.setInputFiles(updatedXpath, filePath);
      console.log(logMsg);
    }else{
      error("Element not found");
      test.fail();
    }
  }

  //if file tyle is not //input[@type='file'] then

  async UploadFile(page: Page, element: Locator, fileName: string[], logMsg : string, timeout?: number) {
    const filePath = path.join(__dirname, `/Document/${fileName}`);
    const xpath = element.toString();
    const updatedXpath = xpath.replace("Locator@", "");
    await page.waitForSelector(updatedXpath, { timeout: timeout });
    if(updatedXpath){
      const fileChooserPromise = await page.waitForEvent('filechooser')
      page.click(updatedXpath)
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(filePath);
    }else{
      error("Element not found");
    }
  }

  //convert ist date to PST

  async ConvertISTtoPSTDate(){
    var istDateTime = new Date();
        var utcDateTime = new Date(
            istDateTime.getUTCFullYear(),
            istDateTime.getUTCMonth(),
            istDateTime.getUTCDate(),
            istDateTime.getUTCHours(),
            istDateTime.getUTCMinutes(),
            istDateTime.getUTCSeconds()
          );
        var pstDateTime = new Date(utcDateTime.getTime() - 8 * 60 * 60 * 1000);
        const date = String(pstDateTime.getDate());
        return date;
  }

}
