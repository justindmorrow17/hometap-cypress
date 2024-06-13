describe('Mortgage Calculator', () => {
  beforeEach(() => {
    // Visit the Zillow mortgage calculator page before each test
    cy.visit('https://www.zillow.com/mortgage-calculator/');
  });

  // Test Case 1: Verify the Interest Rate input accepts valid numerical values
  it('accepts valid numerical values in the Interest Rate input', () => {
    // Find the interest rate input, clear it, and enter a valid value
    cy.get('#rate').clear().type('4.5');

    // Click outside the input to trigger validation
    cy.get('h1').click();

    // Assert the input value is set correctly
    cy.get('#rate').should('have.value', '4.5');
  });

  // Test Case 5: Verify the Interest Rate input does not accept non-numerical values
  it('does not accept non-numerical values in the Interest Rate input', () => {
    cy.contains(/'abc' is not a valid number/i).should('not.exist')
    // Find the interest rate input, clear it, and enter an invalid value
    cy.get('#rate').clear().type('abc');

    // Click outside the input to trigger validation
    cy.get('h1').click();

    // Assert the error message is displayed correctly
    cy.contains(/'abc' is not a valid number/i).should('exist')
  });

  // Test Case 8: Verify the functionality and accuracy of the Legal Disclaimer
  it('displays the correct legal disclaimer message', () => {
    // Click the legal disclaimer button
    cy.contains('button', 'Calculator disclaimer').click();
    
    cy.contains(/Calculator Disclaimer/i).should('exist')

    // Increase the timeout for waiting for the modal to appear
    //cy.get('div[role="dialog"]', { timeout: 10000 }).should('be.visible');
    
    //Assert the modal message is displayed correctly
    cy.get('section[role="dialog"]').find('p').should('contain.text', 'The mortgage calculator is intended to be used for educational purposes only.');

    const expectedMessage = "The mortgage calculator is intended to be used for educational purposes only. Actual available rates and monthly payment amounts are subject to market fluctuations and will depend on a number of factors, including geography and loan characteristics. The estimates are based on information you provide, and may not include other fees and costs that a lender may assess in addition to monthly principal and interest, such as taxes and insurance and the actual payment obligation may be greater. Zillow Group Marketplace, Inc. does not make loans and this is not a commitment to lend.";

    cy.get('section[role="dialog"]').find('p').invoke('text').then((text) => {
      expect(text).to.equal(expectedMessage);
    });
  });
});
