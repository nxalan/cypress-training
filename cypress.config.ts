import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:8080",
    specPattern: "tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    fixturesFolder: "tests/cypress/fixtures",
    supportFile: "tests/cypress/support/commands.js",
    video: false,
    screenshotOnRunFailure: false
  },
});
