import { buildUser } from "../support/generate";

describe("registration", () => {
  beforeEach(() => {
    cy.visit("/auth/sign-up");
  });

  const user = buildUser();
  it("should register a new user", () => {
    cy.intercept("users/registration/", { email: user.email }).as("register");

    cy.findByLabelText(/email address/i).type(user.email);
    cy.findByLabelText("Password *").type(user.password);
    cy.findByLabelText(/confirm password/i).type(user.password);
    // Material UI button's label is actually a span inside a button.
    cy.findByText(/register/i, { selector: "span" }).click();

    cy.wait("@register");

    cy.findByText(/This page is only visible by authenticated users./i).should(
      "exist"
    );
  });

  it("should show error when create new user with existed email", () => {
    cy.intercept("users/registration/", {
      statusCode: 400,
      body: { email: "custom user with this email address already exists." },
    }).as("register");

    cy.findByLabelText(/email address/i).type(user.email);
    cy.findByLabelText(/name/i).type(user.username);
    cy.findByLabelText("Password *").type(user.password);
    cy.findByLabelText(/confirm password/i).type(user.password);
    // Material UI button's label is actually a span inside a button.
    cy.findByText(/register/i, { selector: "span" }).click();

    cy.wait("@register");

    cy.findByText(
      /custom user with this email address already exists./i
    ).should("exist");
  });
});
