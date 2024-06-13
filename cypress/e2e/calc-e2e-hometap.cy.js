describe("Mortgage Calculator e2e", () => {
  beforeEach(() => {
    // Visit the Zillow mortgage calculator page before each test
    cy.visit("https://www.zillow.com/mortgage-calculator/");
  });

  // Validate the Home Price input
  it("Home Price input", () => {
    // Find the homePrice input, validate start value of 300000
    cy.get("#homePrice").should("have.value", "300,000");
    // Find the homePrice input, clear it, and enter a valid value
    cy.get("#homePrice").clear().type("400000");

    // Click outside the input to trigger validation
    cy.get("h1").click();

    // Assert the input value is set correctly
    cy.get("#homePrice").should("have.value", "400,000");
  });
});
