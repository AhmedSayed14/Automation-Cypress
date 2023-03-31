# Cypress Cucumber

## Getting Started
* install npm:
```sh
  npm install -g npm
```
* Open project location:
```sh
  cd /project/path
```
* Install Cypress via npm:
```sh
  npm install cypress --save-dev
```
* Install Mochawesome reporter via npm:
```sh
  npm i cypress-mochawesome-reporter --save-dev
```
* Installation is done open cypress
```sh
 ./node_modules/.bin/cypress open
```
* Run Test cases
```sh
 go to cypress open cd /project/path
 ```
 ```sh
  execute 'npx cypress open' for Cypress UI 
  or  
  'npx cypress run' to run in headless browser and report will be generated under cypress/results
 ```
* To run test cases click on any cy.js file and cypress run test cases on the chosen browser.
* The test cases report will be extracted at location: cypress/results when using "npx cypress run"
* After you you finish make sure to remove the generated test cases report folders cypress/results from the root folder.
