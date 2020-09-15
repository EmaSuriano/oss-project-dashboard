describe('Visual Testing', () => {
  const SCREENS = [375, 768, 1280];
  it.only('Auth Page', () => {
    cy.visit('/');

    cy.percySnapshot('Auth Page', {
      widths: SCREENS,
    });
  });

  it('Project Page', () => {
    cy.visit('/');
    cy.login();
    cy.get('Health Status').should('be.visible');
    cy.percySnapshot('Dashboard Page', {
      widths: SCREENS,
    });
  });

  it('Settings Page', () => {
    cy.visit('/settings');
    cy.login();
    cy.get('Loading your Settings ...').should('not.be.visible');
    cy.percySnapshot('Settings Page', {
      widths: SCREENS,
    });
  });
});
