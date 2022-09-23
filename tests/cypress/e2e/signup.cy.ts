import faker from '@faker-js/faker'

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Shoud load with correct state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly')
    cy.getByTestId('name-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('name-label').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('email').should('have.attr', 'readOnly')
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
    cy.getByTestId('passwordConfirmation-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('passwordConfirmation-label').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3))
    cy.getByTestId('name-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4))
    cy.getByTestId('passwordConfirmation-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('submit').should('have.attr', 'disabled')
  })
})
