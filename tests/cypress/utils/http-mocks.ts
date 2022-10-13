import faker from '@faker-js/faker'

export const mockForbiddenError = (url: RegExp, method: string, alias: string = 'request'): void => {
  cy.intercept({
    url,
    method
  }, {
    statusCode: 403,
    body: {
      error: faker.random.words()
    }
  })
}

export const mockServerError = (url: RegExp, method: string, alias: string = 'request'): void => {
  cy.intercept({
    url,
    method
  }, {
    statusCode: faker.helpers.arrayElement([400, 404, 500]),
    body: {
      error: faker.random.words()
    }
  }).as(alias)
}

export const mockOk = (url: RegExp, method: string, fixture: string, alias: string = 'request'): void => {
  cy.intercept({
    url,
    method
  }, {
    statusCode: 200,
    fixture
  }).as(alias)
}
