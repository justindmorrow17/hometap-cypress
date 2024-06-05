describe('Mortgage Calculator', () => {
  beforeEach(() => {
    // Visit the Zillow mortgage calculator page before each test
    cy.visit('https://www.zillow.com/mortgage-calculator/');
  });

  // Test Case 1: Verify the Interest Rate input accepts valid numerical values
  it('accepts valid numerical values in the Interest Rate input', () => {
    // Find the interest rate input, clear it, and enter a valid value
    cy.get('#rate').clear().type('4.5');

    // Assert the input value is set correctly
    cy.get('#rate').should('have.value', '4.5');
  });

  // Test Case 5: Verify the Interest Rate input does not accept non-numerical values
  it('does not accept non-numerical values in the Interest Rate input', () => {
    // Find the interest rate input, clear it, and enter an invalid value
    cy.get('#rate').clear().type('abc');

    // Click outside the input to trigger validation
    cy.get('body').click();

    // Assert the error message is displayed correctly
    cy.get('form')
      .find('div.form-error-message')
      .should('contain.text', "'abc' is not a valid number");
  });

  // Test Case 8: Verify the functionality and accuracy of the Legal Disclaimer
  it('displays the correct legal disclaimer message', () => {
    // Click the legal disclaimer button
    cy.contains('button', 'Calculator disclaimer').click();

    // Assert the modal message is displayed correctly
    cy.get('body').find('div[role="dialog"] section p')
      .should('contain.text', 'The mortgage calculator is intended to be used for educational purposes only.');

    const expectedMessage = "The mortgage calculator is intended to be used for educational purposes only. Actual available rates and monthly payment amounts are subject to market fluctuations and will depend on a number of factors, including geography and loan characteristics. The estimates are based on information you provide, and may not include other fees and costs that a lender may assess in addition to monthly principal and interest, such as taxes and insurance and the actual payment obligation may be greater. Zillow Group Marketplace, Inc. does not make loans and this is not a commitment to lend.";

    cy.get('body').find('div[role="dialog"] section p').invoke('text').then((text) => {
      expect(text).to.equal(expectedMessage);
    });
  });
});
