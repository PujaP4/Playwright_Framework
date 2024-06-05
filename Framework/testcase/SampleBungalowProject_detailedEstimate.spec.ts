import {test} from '@playwright/test'
import {createPage, page} from '../class_fixtures/browserSetup'
import { SiteBook } from '../pageObject/siteBookPageObj';


test.describe.serial('Sample bunglow project ', () => {
    let site_book : SiteBook;

    test.beforeAll(async () => {
        const page = await createPage();
        site_book =  new SiteBook(page!);
        await page.goto(`${process.env.URL}`); //we can pass uer using .env 
        // await page.goto('app/auth/signin?logout=true');// we cam also desfine baseURL in config file
    });

    test('Verify user is able to Login to Site Book', async () => {
        await test.step('Enter mobile number', async () => {
            await site_book.EnterMobileNumber();
        });
        await test.step('Click on Continue', async () => {
            await site_book.ClickOncontinueButton();
        });
        await test.step('Enter password', async () => {
            await site_book.EnterPassword();
        });
        await test.step('Click on Login', async () => {
            await site_book.ClickOnLogin();
        });

    });

    test('Verify user is able to click on Sample Bungalow Project G+1 card', async () => {
        await site_book.ClickOnSampleBunglowProject();
    })

    test('Verify user is able to click on Detailed Estimate', async () => {
        await site_book.ClickOnDetailedEstimate();
    })
    test('Verify Quanitity for Ground Flooring', async () => {
        await site_book.VerifyQauntityOfGroundFlooring();
    });

    test('Verify Unit for Ground Flooring', async () => {
        await site_book.VerifyUnitOfGroundFlooring();
    })

    test('Verify Total Cost for Ground Flooring', async () => {
        await site_book.VerifyTotalCostOfGroundFlooring();
    })
    
})
