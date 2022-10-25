import { mockServerError, mockOk } from '../utils/http-mocks'

const path = /surveys/
const mockUnexpectedError = (): void => mockServerError(path, 'GET')
const mockSuccess = (): void => mockOk(path, 'GET', 'survey-list')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      cy.setLocalStorageItem('account', account)
    })
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })

  it('Should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.get('li:not(:empty)').should('have.length', 2)
  })
})
