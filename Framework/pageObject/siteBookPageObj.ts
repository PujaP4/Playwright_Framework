import {test, Page, Locator, expect} from "@playwright/test";
import { TestMethods } from "../utils/testMethods";
import * as data from "../test_data/loginCredentials.json";
import * as estimation_data from "../test_data/estimationData.json"

export class SiteBook extends TestMethods{
    public page : Page;
    public loginBtn : Locator;
    public enterNum : Locator;
    public continueBtn : Locator;
    public password :  Locator;
    public login : Locator;
    public samplebunglowProject : Locator;
    public detailesEstimation : Locator;
    public quantity :  Locator;
    public unit :  Locator;
    public totalCost :  Locator;



    constructor (page:Page){
        super(page);
        this.page = page;
        this.loginBtn = page.getByText('LOGIN');
        this.enterNum = page.locator('#mobileNumber');
        this.continueBtn = page.getByText(' Continue ');
        this.password = page.locator('#password');
        this.login = page.getByText(' Login ');
        this.samplebunglowProject = page.getByText(' Sample Bungalow Project G+1');
        this.detailesEstimation = page.getByText(' Detailed Estimate');
        this.quantity = page.locator('#quantity');
        this.unit = page.locator('#unit');
        this.totalCost = page.locator('#total');

    }

    async ClickOnLoginButtonOnHomePage(){
        await this.waitForSelector(this.loginBtn,60000);
        await this.clickOnElement(this.loginBtn,"Clicked on Login button on Home page", 60000);
    }

    async EnterMobileNumber(){
        await this.waitForSelector(this.enterNum,60000);
        await this.giveInput(this.enterNum,data.username,"Mobile number is entered");
    }

    async EnterPassword(){
        await this.waitForSelector(this.password,60000);
        await this.giveInput(this.password,data.password, "Password is entered");
    }

    async ClickOncontinueButton(){
        await this.waitForSelector(this.continueBtn,60000);
        await this.clickOnElement(this.continueBtn,"Clicked on Continue button", 60000);
    }

    async ClickOnLogin(){
        await this.waitForSelector(this.login.last(),60000);
        await this.clickOnElement(this.login.last(),"Clicked on Login button", 60000);
    }

    async ClickOnSampleBunglowProject(){
        await this.waitForSelector(this.samplebunglowProject,60000);
        await this.clickOnElement(this.samplebunglowProject,"Clicked on Sample Bungalow Project G+1", 60000);
    }

    async ClickOnDetailedEstimate(){
        await this.waitForSelector(this.detailesEstimation.first(),60000);
        await this.clickOnElement(this.detailesEstimation.first(),"Clicked on Detailed Estimate", 60000);
    }

    async VerifyQauntityOfGroundFlooring(){
        await this.waitForSelector(this.quantity.nth(2),60000);
        await this.quantity.nth(3).scrollIntoViewIfNeeded();
       await expect(this.quantity.nth(2)).toContainText(estimation_data.quantity.groundFlooring);
       await expect(this.quantity.nth(3)).toContainText(estimation_data.quantity.FrontYard);
       await expect(this.quantity.nth(4)).toContainText(estimation_data.quantity.parkingArea);
       await this.quantity.nth(5).scrollIntoViewIfNeeded();
       await expect(this.quantity.nth(5)).toContainText(estimation_data.quantity.passage);
       await expect(this.quantity.nth(6)).toContainText(estimation_data.quantity.lobby);
       await expect(this.quantity.nth(7)).toContainText(estimation_data.quantity.toiletParkingArea);
       await this.quantity.nth(8).scrollIntoViewIfNeeded();
       await expect(this.quantity.nth(8)).toContainText(estimation_data.quantity.dining_DrawingRoom);
       await expect(this.quantity.nth(9)).toContainText(estimation_data.quantity.pantryArea);
       await this.quantity.nth(10).scrollIntoViewIfNeeded();
       await expect(this.quantity.nth(10)).toContainText(estimation_data.quantity.backyard);
    }

    async VerifyUnitOfGroundFlooring(){
        await this.waitForSelector(this.unit.nth(2),60000);
        await this.unit.nth(3).scrollIntoViewIfNeeded();
        await expect(this.unit.nth(2)).toContainText(estimation_data.unit.unit_sf);
        await expect(this.unit.nth(3)).toContainText(estimation_data.unit.unit_sf);
        await expect(this.unit.nth(4)).toContainText(estimation_data.unit.unit_sf);
        await this.unit.nth(5).scrollIntoViewIfNeeded();
        await expect(this.unit.nth(5)).toContainText(estimation_data.unit.unit_sf);
        await expect(this.unit.nth(6)).toContainText(estimation_data.unit.unit_sf);
        await expect(this.unit.nth(7)).toContainText(estimation_data.unit.unit_sf);
        await this.unit.nth(9).scrollIntoViewIfNeeded();
        await expect(this.unit.nth(8)).toContainText(estimation_data.unit.unit_sf);
        await expect(this.unit.nth(9)).toContainText(estimation_data.unit.unit_sf);
        await expect(this.unit.nth(10)).toContainText(estimation_data.unit.unit_sf);
     }

     async VerifyTotalCostOfGroundFlooring(){
        await this.waitForSelector(this.totalCost.nth(2),60000);
        await this.totalCost.nth(3).scrollIntoViewIfNeeded();
        await expect(this.totalCost.nth(2)).toContainText(estimation_data.totalCost.groundFlooring);
        await expect(this.totalCost.nth(3)).toContainText(estimation_data.totalCost.FrontYard);
        await expect(this.totalCost.nth(4)).toContainText(estimation_data.totalCost.parkingArea);
        await this.totalCost.nth(5).scrollIntoViewIfNeeded();
        await expect(this.totalCost.nth(5)).toContainText(estimation_data.totalCost.passage);
        await expect(this.totalCost.nth(6)).toContainText(estimation_data.totalCost.lobby);
        await expect(this.totalCost.nth(7)).toContainText(estimation_data.totalCost.toiletParkingArea);
        await this.totalCost.nth(9).scrollIntoViewIfNeeded();
        await expect(this.totalCost.nth(8)).toContainText(estimation_data.totalCost.dining_DrawingRoom);
        await expect(this.totalCost.nth(9)).toContainText(estimation_data.totalCost.pantryArea);
        await expect(this.totalCost.nth(10)).toContainText(estimation_data.totalCost.backyard);
     }


    



}