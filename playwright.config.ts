import { PlaywrightTestConfig,devices} from "@playwright/test";
import dotenv from 'dotenv'

dotenv.config({
  path:`./env/.env.${process.env.ENV='prod'}`, // From here I can change the url of Prod or staging by chnaging .env file
});

const config: PlaywrightTestConfig = {
  workers: 1,
  testDir: './framework/testcase',
  forbidOnly: !!process.env.CI,
  fullyParallel: false,
  use: {
      actionTimeout: 180 * 1000,
      navigationTimeout: 180 * 1000,
      headless:true /*to open the instance of browser will not run in background*/,
      trace: 'retain-on-failure',
      screenshot: "on",
      video: "on",
      /*to slows down the execution*/
      launchOptions: {
      slowMo: 100 /*miliseconds*/,
    },
  },
  retries: 0,
  reporter: [
    ["experimental-allure-playwright"],
    ["dot"],
    [
      "html",
      {
        open: "never",
      },
    ],
    [
      "junit",
      {
        outputFile: "allure-report/results.xml",
      },
    ],
  ],

  projects: [
    /*Setup project*/


    {
      name: 'chromium',
      use: {
        ...devices["Desktop Chrome"],
        baseURL: 'https://mysitebook.io/', // from here also we can pas diff environment url
        screenshot:'on',
        video:'on'
      },
      
    },

    /* {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox'],
      // Use prepared auth state.
      storageState: 'playwright/.auth/user.json',
    },
    dependencies: ['setup'],
  },*/
  ],
};

export default config;
