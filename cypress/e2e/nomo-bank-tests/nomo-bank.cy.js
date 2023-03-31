import HomePage from '../pages/HomePage';
import RentalPropertyPage from '../pages/RentalPropertyPage';

describe('Nomo Bank', () => {
  beforeEach(() => {
    // Go to Nomo Bank Website usig baseURL set in cypress.config.js file and refers to it by /
    cy.visit('/');
    })

  it('Nomo Bank Webite is Up and Running', () => {
    let homePage= new HomePage();
   
    // Valdidate the Title of the Nomo Bank Home page 
    cy.title().should('eq','Nomo Bank | UK Sharia-compliant digital banking');

    // Validate the Header text visibility
    homePage.getHomePageHeader().should('be.visible');
  })

  it('Test Mortgage Calculator using correct data', () => {
    let rentalPropertyPage= new RentalPropertyPage();

    // Go to Rental Property from home page
    cy.hoverOnElementUsingText('Property Finance');
    cy.clickOnElementUsingText('Rental Property');

    //or You can use the blow direct link commented below
    //cy.visit('/rental-property-finance');

    // validate the Rental Property page Header text visibility
    cy.contains('Invest in UK rental property').should('be.visible');
   
    // change values of Estimated Property,Estimated Rental Income and Estimated Down Payment
    rentalPropertyPage.changeEstimatedPropertyInputValueTo(1000000);
    rentalPropertyPage.changeEstimtedMonthlyRentalIncomeInputValueTo(1000);
    rentalPropertyPage.changeEstimtedDownpaymentInputValueTo(500000);

    //Expand Fixed Rate Period Dropdown list then select option
    rentalPropertyPage.getFixedRatePeriodDropDownIcon().click();
    //Select option by text from Fixed Rate Period Dropdown list
    rentalPropertyPage.selectFixedRatePeriodOptionByText('2 year fixed rate');

    // assert on sliders to have correct values
    rentalPropertyPage.getEstimatedPropertySliderThumb().should('have.value','1000000');
    rentalPropertyPage.getEstimatedMonthlyRentalIncomeSliderThumb().should('have.value','1000');
    rentalPropertyPage.getEstimatedDownpaymentSliderThumb().should('have.value','500000');

    // assert on selected option in Fixed Rate Period dropdown list
    rentalPropertyPage.getSelectedFixedRatePeriodOption().should('have.text','2 year fixed rate')

    // assert on Finance Amount and Monthly Costs values as numbers ex. 92,915 GBP => 92915
    rentalPropertyPage.getFinanceAmountValue('number').should('deep.equal',92915);
    rentalPropertyPage.getMonthlyCostsValue('number').should('deep.equal',458);

    // assert on Finance Amount and Monthly Costs values as text ex. 92,915 GBP => 92,915 GBP
    rentalPropertyPage.getFinanceAmountValue('txt').should('deep.equal','92,915 GBP');
    rentalPropertyPage.getMonthlyCostsValue('txt').should('deep.equal','458 GBP');
  })

//There is an issue when typing - at the begining of the number
// Steps
// 1- click on Estimated Property field
// 2- move to the left hand side of the number using the keyboard left arrow 
// 3- type negative sign '-' twice

// actual - Estimated Property field has 'NaN' as a value
// expected - Estimated Property field should have the same number as it was

  it('Test Mortgage Calculator using negative numbers', () => {
    let rentalPropertyPage= new RentalPropertyPage();

    // Go to Rental Property from home page
    cy.hoverOnElementUsingText('Property Finance');
    cy.clickOnElementUsingText('Rental Property');

    // validate the Rental Property page Header text visibility
    cy.contains('Invest in UK rental property').should('be.visible');
   
    // change values of Estimated Property,Estimated Rental Income and Estimated Down Payment
    rentalPropertyPage.changeEstimatedPropertyInputValueTo(-10);
    rentalPropertyPage.changeEstimtedMonthlyRentalIncomeInputValueTo(-123);
    rentalPropertyPage.changeEstimtedDownpaymentInputValueTo(-1434);
    //Expand Fixed Rate Period Dropdown list then select option
    rentalPropertyPage.getFixedRatePeriodDropDownIcon().click();
    //Select option by text from Fixed Rate Period Dropdown list
    rentalPropertyPage.selectFixedRatePeriodOptionByText('2 year fixed rate');

    // assert on selected option in Fixed Rate Period dropdown list
    rentalPropertyPage.getSelectedFixedRatePeriodOption().should('have.text','2 year fixed rate')

    //assert on Estimated Property,Estimated Rental Income and Estimated Down Payment values
    rentalPropertyPage.getEstimatedPropertyInput().should('have.value',10);
    rentalPropertyPage.getEstimtedMonthlyRentalIncomeInput().should('have.value',123);
    rentalPropertyPage.getEstimatedDownpaymentInput().should('have.value','1,434');

    // assert on validation message for down payment field when finance amount is less than 100,000
    rentalPropertyPage.getEstimatedDownpayment().contains('The minimum finance amount is 100,000 GBP').should('be.visible');

    // assert on Finance Amount and Monthly Costs values as numbers ex. 92,915 GBP => 92915
    rentalPropertyPage.getFinanceAmountValue('number').should('deep.equal',0);
    rentalPropertyPage.getMonthlyCostsValue('number').should('deep.equal',0);

  })
 
  it('Test Mortgage Calculator using values greater than the maximum values of the slider', () => {
    let rentalPropertyPage= new RentalPropertyPage();

    // Go to Rental Property from home page
    cy.hoverOnElementUsingText('Property Finance');
    cy.clickOnElementUsingText('Rental Property');

    // validate the Rental Property page Header text visibility
    cy.contains('Invest in UK rental property').should('be.visible');
   
    // change values of Estimated Property,Estimated Rental Income and Estimated Down Payment
    rentalPropertyPage.changeEstimatedPropertyInputValueTo(4000000);
    rentalPropertyPage.changeEstimtedMonthlyRentalIncomeInputValueTo(15000);
    rentalPropertyPage.changeEstimtedDownpaymentInputValueTo(3000000);
    //Expand Fixed Rate Period Dropdown list then select option
    rentalPropertyPage.getFixedRatePeriodDropDownIcon().click();
    //Select option by text from Fixed Rate Period Dropdown list
    rentalPropertyPage.selectFixedRatePeriodOptionByText('5 year fixed rate');

    // assert on selected option in Fixed Rate Period dropdown list
    rentalPropertyPage.getSelectedFixedRatePeriodOption().should('have.text','5 year fixed rate')

    //assert on Estimated Property,Estimated Rental Income and Estimated Down Payment values
    rentalPropertyPage.getEstimatedPropertyInput().should('have.value','4,000,000');
    rentalPropertyPage.getEstimtedMonthlyRentalIncomeInput().should('have.value','15,000');
    rentalPropertyPage.getEstimatedDownpaymentInput().should('have.value','3,000,000');

    // assert on validation message for estimated property field when value is greater than 3000,000
    rentalPropertyPage.getEstimatedProperty().contains('For properties of value over 3,000,000 GBP, please visit');

    // assert on Finance Amount and Monthly Costs values as numbers ex. 92,915 GBP => 92915
    rentalPropertyPage.getFinanceAmountValue('number').should('deep.equal',1000000);
    rentalPropertyPage.getMonthlyCostsValue('number').should('deep.equal',4933);

  })

  it('Test Mortgage Calculator using decimal values', () => {
    let rentalPropertyPage= new RentalPropertyPage();

    // Go to Rental Property from home page
    cy.hoverOnElementUsingText('Property Finance');
    cy.clickOnElementUsingText('Rental Property');

    // validate the Rental Property page Header text visibility
    cy.contains('Invest in UK rental property').should('be.visible');
   
    // change values of Estimated Property,Estimated Rental Income and Estimated Down Payment
    rentalPropertyPage.changeEstimatedPropertyInputValueTo(1200.23);
    rentalPropertyPage.changeEstimtedMonthlyRentalIncomeInputValueTo(5.123);
    rentalPropertyPage.changeEstimtedDownpaymentInputValueTo(12.3);

    //Expand Fixed Rate Period Dropdown list then select option
    rentalPropertyPage.getFixedRatePeriodDropDownIcon().click();

    //Select option by text from Fixed Rate Period Dropdown list
    rentalPropertyPage.selectFixedRatePeriodOptionByText('2 year fixed rate');

    // assert on selected option in Fixed Rate Period dropdown list
    rentalPropertyPage.getSelectedFixedRatePeriodOption().should('have.text','2 year fixed rate')

    //assert on Estimated Property,Estimated Rental Income and Estimated Down Payment values
    rentalPropertyPage.getEstimatedPropertyInput().should('have.value','120,023');
    rentalPropertyPage.getEstimtedMonthlyRentalIncomeInput().should('have.value','5,123');
    rentalPropertyPage.getEstimatedDownpaymentInput().should('have.value',123);

    // assert on validation message for down payment field when value is low
    rentalPropertyPage.getEstimatedDownpayment().contains('The down payment needs to be higher');

    // assert on Finance Amount and Monthly Costs values as numbers ex. 92,915 GBP => 92915
    rentalPropertyPage.getFinanceAmountValue('number').should('deep.equal',0);
    rentalPropertyPage.getMonthlyCostsValue('number').should('deep.equal',0);

  })


//There is an issue follow the steps below to reproduce it
// Steps 
// 1- select value from fixed rate period dropdown list 
// 2- double click on the value in Estimated Property to select it  then Type any character 
// 3- In Estimated Property field type any character 

// actual - Monthly cost shows NaN GBP
// expected - Monthly cost should shows 0 GBP

// below test case will fail in assertion in line 216 and line 221 
///due to the above issue
  it('Test Mortgage Calculator using string values', () => {
    let rentalPropertyPage= new RentalPropertyPage();
    // Go to Rental Property from home page
    cy.hoverOnElementUsingText('Property Finance');
    cy.clickOnElementUsingText('Rental Property');

    // validate the Rental Property page Header text visibility
    cy.contains('Invest in UK rental property').should('be.visible');
   
    // change values of Estimated Property,Estimated Rental Income and Estimated Down Payment
    rentalPropertyPage.changeEstimatedPropertyInputValueTo('text');
    rentalPropertyPage.changeEstimtedMonthlyRentalIncomeInputValueTo('text');
    rentalPropertyPage.changeEstimtedDownpaymentInputValueTo('text');

    // Expand Fixed Rate Period Dropdown list then select option
    rentalPropertyPage.getFixedRatePeriodDropDownIcon().click();
    //Select option by text from Fixed Rate Period Dropdown list
    rentalPropertyPage.selectFixedRatePeriodOptionByText('5 year fixed rate');

    // assert on selected option in Fixed Rate Period dropdown list
    rentalPropertyPage.getSelectedFixedRatePeriodOption().should('have.text','5 year fixed rate')

    //assert on Estimated Property,Estimated Rental Income and Estimated Down Payment values
    rentalPropertyPage.getEstimatedPropertyInput().should('have.value',0);
    rentalPropertyPage.getEstimtedMonthlyRentalIncomeInput().should('not.have.value');
    rentalPropertyPage.getEstimatedDownpaymentInput().should('not.have.value');

    // assert on Finance Amount and Monthly Costs values as numbers ex. 92,915 GBP => 92915
    rentalPropertyPage.getFinanceAmountValue('number').should('deep.equal',0);
    rentalPropertyPage.getMonthlyCostsValue('number').should('deep.equal',0);

  })
})
