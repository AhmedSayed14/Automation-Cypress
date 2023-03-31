Cypress.Commands.add('hoverOnElementUsingText', elementText => {
    cy.contains(elementText).trigger('mouseover');
  });

Cypress.Commands.add('clickOnElementUsingText', elementText => {
    cy.contains(elementText).click();
  });