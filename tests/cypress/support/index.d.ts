declare namespace Cypress {
  interface Chainable {
    getByTestId: (id: string) => Chainable<Element>
    testUrl: (path: string) => Chainable<Element>
  }
}
