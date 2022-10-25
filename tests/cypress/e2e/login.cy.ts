import faker from '@faker-js/faker'
import { mockUnauthorizedError, mockServerError, mockOk } from '../utils/http-mocks'

const path = /login/
const mockInvalidCredentialsError = (): void => mockUnauthorizedError(path)
const mockUnexpectedError = (): void => mockServerError(path, 'POST')
const mockSuccessLogin = (): void => mockOk(path, 'POST', 'account')

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('Shoud load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('submit').should('have.attr', 'disabled')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    mockInvalidCredentialsError()
    simulateValidSubmit()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
    cy.testUrl('/login')
  })

  it('Should present UnexpectedError on default error cases', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    cy.testUrl('/login')
  })

  it('Should store account on localStorage if valid credentials are provided', () => {
    mockSuccessLogin()
    simulateValidSubmit()
    cy.testUrl('/')
    cy.window().then(window => assert.isOk(window.localStorage.getItem('account')))
  })
})
