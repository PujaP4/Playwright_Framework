import {test,Page, Locator, expect} from "@playwright/test";
import { TestMethods } from "../utils/testMethods";

export class SiteBook extends TestMethods{
    public page : Page;
    public loginBtn : Locator;


    constructor (page:Page){
        super(page);
        this.page = page;
        this.loginBtn = page.getByText('LOGIN');
    }

    async ClickOnLoginButtonOnHomePage(){
        await this.waitForSelector(this.loginBtn,60000);
        await this.clickOnElement(this.loginBtn,"Clicked on Login button on Home page", 60000);
    }


}