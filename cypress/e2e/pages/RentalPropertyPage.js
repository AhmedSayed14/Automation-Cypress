class RentalPropertyPage{

estimatedPropertyTxt='estimate-property';
rentalIncomeTxt='estimate-rental-income';
downPaymentTxt='down-payment';


// Mortgage Calculator Iframe Locator
getIframe() {
    return cy.get('[id="mortgage-calculator"] iframe')
            .its('0.contentDocument.body')
            .should('not.empty')
            .then(cy.wrap);
  }


// Estimated Property and its contents Element
getEstimatedProperty(){
    return this.getIframe().find(`label[for="${this.estimatedPropertyTxt}"]`).parent();
}

// Estimated Property Input Element
getEstimatedPropertyInput(){
    return this.getEstimatedProperty().find(`input[name="${this.estimatedPropertyTxt}"]`);
}

// Estimated Property Slider Thumb Element
getEstimatedPropertySliderThumb(){
    return this.getEstimatedProperty().find('input[type="range"]');
}
// --------------------------------------------------------------------------------------------

// Estimated Rental Income and its contents Element
getEstimatedMonthlyRentalIncomeProperty(){
    return this.getIframe().find(`label[for="${this.rentalIncomeTxt}"]`).parent();
}

// Estimated Rental Income Input Element
getEstimtedMonthlyRentalIncomeInput(){
    return this.getEstimatedMonthlyRentalIncomeProperty().find(`input[name="${this.rentalIncomeTxt}"]`);
}

// Estimated Monthly Rental Income Slider Thumb Element
getEstimatedMonthlyRentalIncomeSliderThumb(){
    return this.getEstimatedMonthlyRentalIncomeProperty().find('input[type="range"]');
}

// --------------------------------------------------------------------------------------------

// Estimated Down Payment and its contents Element
getEstimatedDownpayment(){
    return this.getIframe().find(`label[for="${this.downPaymentTxt}"]`).parent();
}
// Estimated Down Payment Input Element
getEstimatedDownpaymentInput(){
 return this.getEstimatedDownpayment().find(`input[name="${this.downPaymentTxt}"]`);
}
// Estimated Downpayment Slider Thumb Element
getEstimatedDownpaymentSliderThumb(){
    return this.getEstimatedDownpayment().find('input[type="range"]');
}
// --------------------------------------------------------------------------------------------


// Fixed Rate Period Dropdown Button Element
getFixedRatePeriodDropDownIcon(){
    return this.getIframe().find('[data-testid="ArrowDropDownIcon"]').siblings('[role="button"]');
   }




// Selected option element in fixed rate period dropdown 
getSelectedFixedRatePeriodOption(){
    return this.getIframe().find('[role="button"][aria-haspopup="listbox"]');
}

// return Finance Amount Value as number or string based on the argument
getFinanceAmountValue(format){
    return this.getIframe().find('section h2').invoke('text').then( financeAmountValue =>{
   format == 'number' ? cy.wrap(parseInt(financeAmountValue.replaceAll(',',''))): cy.wrap(financeAmountValue)
    });
}

// return Monthly Costs Value as number or string based on the argument
getMonthlyCostsValue(format){
    return this.getIframe().find('section h3').first().invoke('text').then( monthlyCostsValue =>{
        format == 'number' ?  cy.wrap(parseInt(monthlyCostsValue.replace(',',''))): cy.wrap(monthlyCostsValue)
    });
}

// Change the value of Estimated Property Field
changeEstimatedPropertyInputValueTo(value){
  this.getEstimatedPropertyInput().should('be.enabled').clear();
  this.getEstimatedPropertyInput().type(value);
}

// Change the value of Estimated Rental Income Field
changeEstimtedMonthlyRentalIncomeInputValueTo(value){
    this.getEstimtedMonthlyRentalIncomeInput().should('be.enabled').clear();
    this.getEstimtedMonthlyRentalIncomeInput().type(value);
}

// Change the value of Estimated Down Payment Field
changeEstimtedDownpaymentInputValueTo(value){
    this.getEstimatedDownpaymentInput().should('be.enabled').clear();
    this.getEstimatedDownpaymentInput().type(value);
}

// Select option from Fixed Rate Period Dropdown list
selectFixedRatePeriodOptionByText(valueText){
    this.getIframe().find('[role="option"]')
    .should('not.be.selected')
    .contains(valueText).click();
  }
}
export default RentalPropertyPage;