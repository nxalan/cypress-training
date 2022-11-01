import { mockServerError, mockOk, mockForbiddenError } from '../utils/http-mocks'
import { setLocalStorageItem, getLocalStorageItem } from '../utils/helpers'

const path = /surveys/
const mockUnexpectedError = (): void => mockServerError(path, 'GET')
const mockSuccess = (): void => mockOk(path, 'GET', 'survey-list')
const mockAccessDeniedError = (): void => mockForbiddenError(path, 'GET')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      setLocalStorageItem('account', account)
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

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('')
    cy.testUrl('/login')
  })

  it('Should present correct username', () => {
    mockUnexpectedError()
    cy.visit('')
    const { name } = getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logout link click on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    cy.testUrl('/login')
  })

  it('Should logout on logout link click on success', () => {
    mockSuccess()
    cy.visit('')
    cy.getByTestId('logout').click()
    cy.testUrl('/login')
  })

  it('Should present survey items', () => {
    mockSuccess()
    cy.visit('')
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '19')
      assert.equal(li.find('[data-testid="month"]').text(), 'jun')
      assert.equal(li.find('[data-testid="year"]').text(), '2022')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question1')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
      })
    })
    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '19')
      assert.equal(li.find('[data-testid="month"]').text(), 'jun')
      assert.equal(li.find('[data-testid="year"]').text(), '2022')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question2')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown)
      })
    })
  })
})
