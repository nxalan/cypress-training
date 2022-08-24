describe('Registration Page', () => {
  beforeEach(() => {
    cy.visit('https://sparkling-hotteok-39b532.netlify.app/')
  })

  describe('Step 1', () => {
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
      cy.get('span').contains('1. Registration Data').should('have.class', 'border-b-green-700 border-b-4')
      cy.get('[data-testid=personalDataForm').should('be.visible')
      cy.get('[data-testid=registrationDataForm').should('not.exist')
    })

    it('Should render password input with type password', () => {
      cy.get('[data-testid=password]').should('have.attr', 'type', 'password')
    })

    it('Should change input type on icon click', () => {
      cy.get('[data-testid=closedEyeIcon]').click()
      cy.get('[data-testid=password]').should('have.attr', 'type', 'text')
      cy.get('[data-testid=openedEyeIcon]').click()
      cy.get('[data-testid=password]').should('have.attr', 'type', 'password')
    })
  })

  describe('Step 2', () => {
    it('Should render the second step correctly', () => {
      cy.get('[data-testid=continueButton').click()
      cy.get('label').contains('Country')
      cy.get('[data-testid=country]').should('be.visible')
      cy.get('label').contains('State')
      cy.get('[data-testid=state]').should('be.visible')
      cy.get('label').contains('City')
      cy.get('[data-testid=city]').should('be.visible')
      cy.get('label').contains('Neighborhood')
      cy.get('[data-testid=neighborhood]').should('be.visible')
      cy.get('label').contains('Street')
      cy.get('[data-testid=street]').should('be.visible')
      cy.get('label').contains('Street Number')
      cy.get('[data-testid=streetNumber]').should('be.visible')
      cy.get('[data-testid=backButton]').contains('Voltar').should('be.visible')
      cy.get('[data-testid=continueButton]').contains('Continuar').should('be.visible')
    })
  })
})