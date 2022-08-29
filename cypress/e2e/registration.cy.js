function goToStep2() {
  cy.get("[data-testid='firstName']").type("Alan");
  cy.get("[data-testid='lastName']").type("Alan");
  cy.get("[data-testid='birthdate']").type("Alan");
  cy.get("[data-testid='email']").type("Alan@alan.com");
  cy.get("[data-testid='password']").type("Alan");
  cy.get("[data-testid='confirmPassword']").type("Alan");
  cy.get("[data-testid=continueButton").click();
}

function validateNumberOfErrors(numberOfErrors) {
  cy.get("[data-testid=continueButton").click();
  cy.get("div")
    .find("span[class='ml-2 text-red-500']")
    .should("have.length", numberOfErrors);
}

describe("Registration Page", () => {
  beforeEach(() => {
    cy.visit("https://sage-youtiao-e66e6e.netlify.app/registration");
  });

  describe("Step 1", () => {
    it("Should render the first step correctly", () => {
      cy.get("[data-testid=firstName]").should("be.visible");
      cy.get("[data-testid=lastName]").should("be.visible");
      cy.get("[data-testid=birthdate]").should("be.visible");
      cy.get("[data-testid=email]").should("be.visible");
      cy.get("[data-testid=password]").should("be.visible");
      cy.get("[data-testid=confirmPassword]").should("be.visible");
      cy.get("[data-testid=backButton]").should("be.visible");
      cy.get("[data-testid=continueButton]").should("be.visible");
    });

    it("Should stay on step 1 if back button is clicked", () => {
      cy.get("[data-testid=backButton]").should("have.attr", "disabled");
    });

    it("Should go from step 1 to step 2 if next button is clicked", () => {
      cy.get("[data-testid='firstName']").type("Alan");
      cy.get("[data-testid='lastName']").type("Alan");
      cy.get("[data-testid='birthdate']").type("Alan");
      cy.get("[data-testid='email']").type("Alan@alan.com");
      cy.get("[data-testid='password']").type("Alan");
      cy.get("[data-testid='confirmPassword']").type("Alan");
      cy.get("[data-testid=continueButton").click();
      cy.get("span")
        .contains("1. Registration Data")
        .should("have.class", "border-b-green-700 border-b-4");
      cy.get("[data-testid=personalDataForm").should("be.visible");
      cy.get("[data-testid=registrationDataForm").should("not.exist");
    });

    it("Should present error if email is invalid", () => {
      cy.get("[data-testid='email']").type("Alan");
      cy.get("[data-testid=continueButton").click();
      cy.get("span").contains("Invalid email").should("be.visible");
    });

    it("Should present error if form is invalid", () => {
      cy.get("[data-testid=continueButton").click();
      validateNumberOfErrors(6);
    });

    it("Should render password input with type password", () => {
      cy.get("[data-testid=password]").should("have.attr", "type", "password");
    });

    it("Should change input type on icon click", () => {
      cy.get("[data-testid=closedEyeIcon]").click();
      cy.get("[data-testid=password]").should("have.attr", "type", "text");
      cy.get("[data-testid=openedEyeIcon]").click();
      cy.get("[data-testid=password]").should("have.attr", "type", "password");
    });
  });

  describe("Step 2", () => {
    beforeEach(() => {
      goToStep2();
    });

    it("Should render the second step correctly", () => {
      cy.get("[data-testid=continueButton").click();
      cy.get("label").contains("Country");
      cy.get("[data-testid=country]").should("be.visible");
      cy.get("label").contains("State");
      cy.get("[data-testid=state]").should("be.visible");
      cy.get("label").contains("City");
      cy.get("[data-testid=city]").should("be.visible");
      cy.get("label").contains("Neighborhood");
      cy.get("[data-testid=neighborhood]").should("be.visible");
      cy.get("label").contains("Street");
      cy.get("[data-testid=street]").should("be.visible");
      cy.get("label").contains("Street Number");
      cy.get("[data-testid=streetNumber]").should("be.visible");
      cy.get("[data-testid=backButton]").contains("Back").should("be.visible");
      cy.get("[data-testid=continueButton]")
        .contains("Continue")
        .should("be.visible");
    });

    it("Should be able to go back from step 2 to step 1 if back button is clicked", () => {
      cy.get("[data-testid=backButton]").click();
      cy.get("span")
        .contains("1. Registration Data")
        .should("have.class", "border-b-slate-400 border-b-4");
    });

    it("Should present error if form is invalid", () => {
      cy.get("[data-testid=continueButton]").click();
      validateNumberOfErrors(6);
    });

    it("Should go from step 2 to step 3 if next button is clicked", () => {
      cy.get("[data-testid='country']").type("Alan");
      cy.get("[data-testid='state']").type("Alan");
      cy.get("[data-testid='city']").type("Alan");
      cy.get("[data-testid='neighborhood']").type("Alan@alan.com");
      cy.get("[data-testid='street']").type("Alan");
      cy.get("[data-testid='streetNumber']").type("Alan");
      cy.get("[data-testid=continueButton").click();
      cy.get("span")
        .contains("2. Personal Data")
        .should("have.class", "border-b-green-700 border-b-4");
      cy.get("[data-testid=personalDataForm").should("not.exist");
    });
  });
});
