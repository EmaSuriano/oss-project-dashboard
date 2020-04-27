import '@percy/cypress';

Cypress.Commands.add('login', () => {
  cy.window().then(({ localStorage }) =>
    localStorage.setItem('token', Cypress.env('GITHUB_ACCESS_TOKEN_CI')),
  );
  cy.reload();
});
