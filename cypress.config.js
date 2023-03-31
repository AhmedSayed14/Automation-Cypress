const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter:'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: true,
      html: true,
   },
    retries:1,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
    baseUrl: 'https://www.nomobank.com/',
  },
  
  chromeWebSecurity: false,
  //open browser is specific viewport width and height
  viewportHeight: 900,
  viewportWidth:1440,
  // retry until conditoin is fulfilled for 5 secs
  defaultCommandTimeout:5000
});
