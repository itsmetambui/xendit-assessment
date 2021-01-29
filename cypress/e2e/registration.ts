import { buildUser } from "../support/generate";

describe("registration", () => {
  it("should register a new user", () => {
    const user = buildUser();
    cy.visit("/auth/sign-up");
    cy.findByLabelText(/email address/i).type(user.email);
    cy.findByLabelText("Password *").type(user.password);
    cy.findByLabelText(/confirm password/i).type(user.password);
    cy.findByText(/register/i, { selector: "span" }).click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
