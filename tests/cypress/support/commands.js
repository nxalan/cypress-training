Cypress.Commands.add('getByTestId', (id) => cy.get(`[data-testid=${id}]`))

Cypress.Commands.add('testUrl', (path) => {
  const baseUrl = Cypress.config().baseUrl
  cy.url().should('eq', `${baseUrl}${path}`)
})
