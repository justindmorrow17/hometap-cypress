describe("Mortgage Calculator e2e", () => {
  beforeEach(() => {
    // Visit the Zillow mortgage calculator page before each test
    cy.visit("https://www.zillow.com/mortgage-calculator/");
  });

  //Validate the default values for the Zillow mortgage calculator
  it("Home Price input", () => {
    // Find the homePrice input, validate default value of 300000
    cy.get("#homePrice").should("have.value", "300,000");
    //Find the downPayment input, validate default value of 60000
    cy.get("#form-1_downPayment").should("have.value", "60,000");
    //Find the downPaymentPercent input, validate default value of 20
    cy.get("#form-1_downPaymentPercent").should("have.value", "20");
    //Find the Loan Program term input, validate the attribute of Fixed30Year
    cy.get("#form-1_term").should("have.value", "Fixed30Year");
    //Validate the displayed text for 30 year fixed term
    cy.get("#form-1_term option:selected").should("contain.text", "30 year fixed");
  });

  // Mortgage calculator operations e2e
  it("Entering values for the mortgage calculator e2e", () => {
    //Find the homePrice input, clear input, and enter a value of 450000
    cy.get("#homePrice").clear().type("450000");
    // Click outside the input to trigger validation
    cy.get('h1').click();
    
    // Assert the input value is set correctly
    cy.get("#homePrice").should("have.value", "450,000");
  
    // Enter a value for the down payment percentage
    // Find the downPaymentPercent input, clear it, and enter a valid value
    cy.get("#form-1_downPaymentPercent").clear().type("10");
    // Click outside the input to trigger validation
    cy.get('h1').click();

    //Find the downPayment input, validate value of 45000
    cy.get("#form-1_downPayment").should("have.value", "45,000");
    
    // Find the interest rate input, clear it, and enter a valid value
    cy.get('#rate').clear().type('4.5');

    // Click outside the input to trigger validation
    cy.get('h1').click();

    //Find the Payment breakdown, validate the payment panel exists
    cy.get("#breakdown-panel").should("exist");
    cy.get("#breakdown-panel").should('contain.text', 'Your payment')
    cy.get("#breakdown-panel").should('contain.text', '$2,960')
  });
});
