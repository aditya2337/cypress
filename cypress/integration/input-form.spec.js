describe('Input form', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('focuses input on load', () => {
    cy.focused().should('have.class', 'new-todo');
  });

  it('accepts input', () => {
    const typeText = 'Buy Milk';

    cy
      .get('.new-todo')
      .type(typeText)
      .should('have.value', typeText);
  });

  context('Form submission', () => {
    it.only('Adds a new todo the submit', () => {
      const buyText = 'Buy eggs';
      cy.server();
      cy.route('POST', '/api/todos', {
        name: buyText,
        id: 1,
        isComplete: false
      });
      cy
        .get('.new-todo')
        .type(buyText)
        .type('{enter}');
      cy
        .get('.todo-list li')
        .should('have.length', 1)
        .and('contain', buyText);
    });
  });
});
