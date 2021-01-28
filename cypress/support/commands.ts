Cypress.Commands.add("signin", () => {
  cy.visit("/auth/sign-in");
  cy.fixture("user.json").then((user) => {
    cy.findByLabelText(/email address/i).type(user.email);
    cy.findByLabelText("Password *").type(user.password);

    cy.findByText(/sign in/i, { selector: "span" }).click();
  });
});
