/// <reference path="../support/index.d.ts" />

describe("", () => {
  it("should login success", () => {
    cy.signin();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should login failed with wrong credentials", () => {
    cy.visit("/auth/sign-in");
    cy.findByLabelText(/email address/i).type("wrong-email@email.com");
    cy.findByLabelText("Password *").type("wrong-password");

    cy.findByText(/sign in/i, { selector: "span" }).click();
    cy.findByText(/Auth with provided credentials failed/i).should("exist");
  });
});
