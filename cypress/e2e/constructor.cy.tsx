/// <reference types='cypress' />
describe('Добавление ингредиента из списка в конструктор', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  it('Добавление ингредиента', function () {
    cy.get('[data-cy=main]').contains('Добавить').click();
    cy.get('[data-cy=ingredient]').contains(
      'Биокотлета из марсианской Магнолии'
    );
  });
});

describe('Работа модальных окон', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  it('Открытие окна', function () {
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.get('#modals').contains('Биокотлета из марсианской Магнолии');
  });

  it('Закрытие окна по клику на крестик', function () {
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.get('#modals').contains('Биокотлета из марсианской Магнолии');
    cy.get('#modals button').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрытие окна по клику на оверлей', function () {
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.get('#modals').contains('Биокотлета из марсианской Магнолии');
    cy.get('[data-cy=overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Создание заказа', function () {
  beforeEach(function () {
    localStorage.setItem('refreshToken', '123');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', 'api/auth/token', { fixture: 'token.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.visit('http://localhost:4000');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Собираем бургер', function () {
    cy.get('[data-cy=bun]').contains('Добавить').click();
    cy.get('[data-cy=main]').contains('Добавить').click();
    cy.get('[data-cy=sauce]').contains('Добавить').click();
    cy.get('[data-cy=order]').contains('Оформить заказ').click();
    cy.get('#modals').contains('555');
    cy.get('#modals button').click();
    cy.contains('идентификатор заказа').should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Соус Spicy-X')
      .should('not.exist');
  });
});
