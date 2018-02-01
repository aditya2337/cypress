describe('Input form', () => {
  beforeEach(() => {
    cy.seedAndVisit([]);
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
    beforeEach(() => {
      cy.server();
    });
    it('Adds a new todo the submit', () => {
      const buyText = 'Buy eggs';
      cy.route('POST', '/api/todos', {
        name: buyText,
        id: 1,
        isComplete: false
      });
      cy
        .get('.new-todo')
        .type(buyText)
        .type('{enter}')
        .should('have.value', '');
      cy
        .get('.todo-list li')
        .should('have.length', 1)
        .and('contain', buyText);
    });

    it('Shows an erro message on a failed submission', () => {
      cy.route({
        url: '/api/todos',
        method: 'POST',
        status: 500,
        response: {}
      });

      cy.get('.new-todo').type('test{enter}');

      cy.get('.todo-list li').should('not.exist');

      cy.get('.error').should('be.visible');
    });
  });
});
