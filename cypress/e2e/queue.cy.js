const DELAY = 500
const TEXT = 't'
const addedElements = 3
const checkClass = (classes, value) => {expect(classes).to.contain(value)}

describe('queue page works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/queue')
  })

  it('add button should be disabled when there is nothing to add', () => {
    cy.contains('Добавить').should('have.attr', 'disabled')
  })

  it('should animate adding new element correctly', () => {
    cy.get('form').next().children('div').as('queue')

    for (let i = 0; i < addedElements; i++) {
      cy.get('form input[type="text"]').type(TEXT + i)
      cy.get('form button[type="submit"]').click()

      cy.get('@queue').eq(i).find('p[class*="letter"]').should('have.text', TEXT + i)
      cy.get('@queue').eq(i).find('div[class*="tail"]').should('have.text', 'tail')
      cy.get('@queue').eq(0).find('div[class*="head"]').should('have.text', 'head')

      if (i > 0) {
        cy.get('@queue').eq(i - 1).find('div[class*="tail"]').should('not.have.text', 'tail')
      }

      // Анимация состояния добавленного элемента
      cy.get('@queue').eq(i).should('have.attr', 'class')
        .should(($class) => {
          checkClass($class, 'current')
        })

      cy.wait(DELAY)

      cy.get('@queue').eq(i).find('div[class*="circle_circle"]').should('have.attr', 'class')
        .should(($class) => {
          checkClass($class, 'default')
        })
    }

  })

  it('should delete element correctly', () => {
    cy.get('form').next().children('div').as('queue')

    for (let i = 0; i < addedElements; i++) {
      cy.get('form input[type="text"]').type(TEXT + i)
      cy.get('form button[type="submit"]').click()
    }
    cy.contains('Удалить').click()

    cy.get('@queue').eq(0).should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'current')
      })

    cy.wait(DELAY)

    cy.get('@queue').eq(0).find('div[class*="circle_circle"]').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'default')
      })

    cy.get('@queue').eq(0).find('p[class*="letter"]').should('have.text', '')
    cy.get('@queue').eq(0).find('div[class*="head"]').should('have.text', '')
    cy.get('@queue').eq(1).find('div[class*="head"]').should('have.text', 'head')
  })

  it('should clear queue correctly', () => {
    cy.get('form').next().children('div').as('queue')
    const length = cy.get('@queue').length
    console.log('l', length);

    for (let i = 0; i < addedElements; i++) {
      cy.get('form input[type="text"]').type(TEXT)
      cy.get('form button[type="submit"]').click()
    }

    cy.contains('Очистить').click()
    for (let i = 0; i < length; i++) {
      cy.get('@queue').eq(i).find('p[class*="letter"]').should('have.text', '')
      cy.get('@queue').eq(i).find('div[class*="head"]').should('have.text', '')
      cy.get('@queue').eq(i).find('div[class*="tail"]').should('have.text', '')
    }
  })

})