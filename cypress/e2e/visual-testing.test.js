describe('Visual Testing', () => {
  const SCREENS = [375, 768, 1280];
  it('Auth Page', () => {
    cy.visit('/');

    cy.percySnapshot('Auth page Responsive', {
      widths: SCREENS,
    });
  });

  it('Project Page', () => {
    cy.visit('/');
    cy.login();
    cy.get('.loading').should('not.be.visible');
    cy.percySnapshot('Project page Responsive', {
      widths: SCREENS,
    });
  });
});
