import faker from '@faker-js/faker'

export const mockForbiddenError = (url: RegExp, method: string): void => {
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
