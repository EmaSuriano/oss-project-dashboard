describe('Visual Testing', () => {
  const SCREENS = [375, 768, 1280];
  it('Auth Page', () => {
    cy.visit('/');

    cy.percySnapshot('Auth page Responsive', {
      widths: SCREENS,
    });
  });

  // it('Project Page', () => {
  //   cy.visit('/');
  //   cy.window().then(({ localStorage }) =>
  //     localStorage.setItem(
  //       'token',
  //       process.env.REACT_APP_GITHUB_ACCESS_TOKEN_TRAVIS,
  //     ),
  //   );
  //   cy.reload();
  //   cy.screenshot();
  // });
});
