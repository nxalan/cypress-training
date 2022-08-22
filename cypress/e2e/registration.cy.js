
describe('Registration Page', () => {
  beforeEach(() => {
    cy.visit('https://sparkling-hotteok-39b532.netlify.app/')
  })

  it('Should render the first step correctly', () => {
    cy.get('[data-testid=firstName]').should('be.visible')
    cy.get('[data-testid=lastName]').should('be.visible')
    cy.get('[data-testid=birthdate]').should('be.visible')
    cy.get('[data-testid=email]').should('be.visible')
    cy.get('[data-testid=password]').should('be.visible')
    cy.get('[data-testid=confirmPassword]').should('be.visible')
    cy.get('[data-testid=backButton]').should('be.visible')
    cy.get('[data-testid=continueButton]').should('be.visible')
  })

  it('Should stay on step 1 if back button is clicked', () => {
    cy.get('[data-testid=backButton]').should('have.attr', 'disabled')
  })

  it('Should from step 1 to step 2 if next button is clicked', () => {
    cy.get('[data-testid=continueButton').click()
    cy.get('[data-testid=personalDataForm').should('be.visible')
    cy.get('[data-testid=registrationDataForm').should('not.exist')
  })
})