import { setLocalStorageItem } from '../utils/helpers'
import { mockForbiddenError, mockOk, mockServerError } from '../utils/http-mocks'

const path = /api\/surveys/
const mockLoadSuccess = (): void => mockOk(path, 'GET', 'load-survey-result')

describe('SurveyResult', () => {
  describe('load', () => {
    const mockUnexpectedError = (): void => mockServerError(path, 'GET')
    const mockAccessDeniedError = (): void => mockForbiddenError(path, 'GET')

    beforeEach(() => {
      cy.fixture('account').then(account => {
        setLocalStorageItem('account', account)
      })
    })

    it('Should present error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.visit('/surveys/any_id')
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    })

    it('Should reload on button click', () => {
      mockUnexpectedError()
      cy.visit('/surveys/any_id')
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
      mockLoadSuccess()
      cy.getByTestId('reload').click()
      cy.getByTestId('question').should('exist')
    })

    it('Should logout on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.visit('/surveys/any_id')
      cy.testUrl('/login')
    })

    it('Should present survey result', () => {
      mockLoadSuccess()
      cy.visit('/surveys/any_id')
      cy.getByTestId('question').should('have.text', 'any_question')
      cy.getByTestId('day').should('have.text', '19')
      cy.getByTestId('month').should('have.text', 'jun')
      cy.getByTestId('year').should('have.text', '2022')
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_1')
        assert.equal(li.find('[data-testid="percent"]').text(), '71%')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
      })
      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_2')
        assert.equal(li.find('[data-testid="percent"]').text(), '29%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })

    it('Should go to SurveyList on back button click', () => {
      mockLoadSuccess()
      cy.visit('')
      cy.visit('/surveys/any_id')
      cy.getByTestId('back-button').click()
      cy.testUrl('/')
    })
  })

  describe('save', () => {
    const mockUnexpectedError = (): void => mockServerError(path, 'PUT')
    const mockAccessDeniedError = (): void => mockForbiddenError(path, 'PUT')
    const mockSaveSuccess = (): void => mockOk(path, 'PUT', 'save-survey-result')

    beforeEach(() => {
      cy.fixture('account').then(account => {
        setLocalStorageItem('account', account)
      })
      mockLoadSuccess()
      cy.visit('/surveys/any_id')
    })

    it('Should present error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    })

    it('Should logout on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.get('li:nth-child(2)').click()
      cy.testUrl('/login')
    })

    it('Should present survey items', () => {
      mockSaveSuccess()
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('question').should('have.text', 'any_question')
      cy.getByTestId('day').should('have.text', '19')
      cy.getByTestId('month').should('have.text', 'jun')
      cy.getByTestId('year').should('have.text', '2022')
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_1')
        assert.equal(li.find('[data-testid="percent"]').text(), '30%')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
      })
      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_2')
        assert.equal(li.find('[data-testid="percent"]').text(), '50%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })
  })
})