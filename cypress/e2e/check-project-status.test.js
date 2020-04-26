describe('Check project status', () => {
  const PR_THRESHOLD = 10;
  const ISSUES_THRESHOLD = 5;

  it('Pull request', () => {
    cy.visit('/');
    cy.login();
    cy.get('.loading').should('not.be.visible');
    cy.get("[e2e-id='Pull Requests']").should((tag) => {
      const pullRequestAmount = parseInt(tag.text(), 10);
      expect(pullRequestAmount).to.be.below(PR_THRESHOLD);
    });
  });

  it('Pull request', () => {
    cy.visit('/');
    cy.login();
    cy.get('.loading').should('not.be.visible');
    cy.get("[e2e-id='Issues']").should((tag) => {
      const issuesAmount = parseInt(tag.text(), 10);
      expect(issuesAmount).to.be.below(ISSUES_THRESHOLD);
    });
  });
});
