const DELAY = 1000
const TEXT = 'el'
const addedElements = 3
const checkClass = (classes, value) => expect(classes).to.contain(value)
const checkCircleElement = ({el, value, state, type}) => {
  if (type === 'head') {
    el.find('div[class*="head"] div[class*="' + state + '"]')
      .should('have.length', 1)
      .and('have.text', value)
  } else if (type === 'tail') {
    el.find('div[class*="tail"] div[class*="' + state + '"]')
      .should('have.length', 1)
      .and('have.text', value)
  } else {
    el.find('div[class*="' + state + '"]').should('have.length', 1)
  }
}

describe('list page works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list')
  })

  // it('add and delete buttons should be disabled when there is nothing to add or delete', () => {
  //   const text = cy.get('form input[type="text"]').value
  //   const index = cy.get('form input[type="number"]').value

  //   if (!text) {
  //     cy.contains('Добавить в head').should('have.attr', 'disabled')
  //     cy.contains('Добавить в tail').should('have.attr', 'disabled')
  //   }
  //   if (!text || ! index) {
  //     cy.contains('Добавить по индексу').should('have.attr', 'disabled')
  //     cy.contains('Удалить по индексу').should('have.attr', 'disabled')
  //   }
  // })

  // it('should display default list correctly', () => {
  //   let length = 0
  //   cy.get('form').next().children('div').as('list')
  //   cy.wait(1000)
  //   cy.get('@list').then($list => length = $list.length)

  //   cy.wait(1000)

  //   cy.get('@list').each(($el, index) => {
  //     index === 0 && expect($el.find('div[class*="head"]')).have.text('head')
  //     index !== 0 && expect($el.find('div[class*="head"]')).have.text('')
  //     index === length - 1 && expect($el.find('div[class*="tail"]')).have.text('tail')
  //     index !== length - 1 && expect($el.find('div[class*="tail"]')).have.text('')

  //     expect($el.find('p[class*="letter"]')).not.have.text('')
  //     expect($el.find('div[class*="default"]')).to.have.length(1)
  //   })

  // })

  // it('should add head element correctly', () => {
  //   cy.wait(DELAY)
  //   cy.get('form input[type="text"]').type(TEXT)
  //   cy.contains('Добавить в head').click()

  //   cy.get('form').next().children('div').as('list')
  //   checkCircleElement({el:cy.get('@list').eq(0), value: TEXT, state: 'changing', type: 'head'})

  //   cy.wait(DELAY)
  //   checkCircleElement({el: cy.get('@list').eq(0), value: TEXT, state: 'modified'})

  //   cy.wait(DELAY)
  //   checkCircleElement({el: cy.get('@list').eq(0), value: TEXT, state: 'default'})

  // })

  // it('should add tail element correctly', () => {
  //   cy.wait(DELAY)
  //   cy.get('form input[type="text"]').type(TEXT)
  //   cy.contains('Добавить в tail').click()

  //   cy.get('form').next().children('div').as('list')
  //   checkCircleElement({el:cy.get('@list').last(), value: TEXT, state: 'changing', type: 'head'})

  //   cy.wait(DELAY)
  //   checkCircleElement({el: cy.get('@list').last(), value: TEXT, state: 'modified'})

  //   cy.wait(DELAY)
  //   checkCircleElement({el: cy.get('@list').last(), value: TEXT, state: 'default'})

  // })

  it('should delete head element correctly', () => {
    cy.wait(DELAY)
    let length = 0
    let value = ''
    cy.get('form').next().children('div').as('list')
    cy.get('@list').then($list => length = $list.length)
    cy.get('@list').first().find('p[class*="letter"]')
      .then($el => {
        value = $el.text()
      })
      .then(() => {
        cy.wait(DELAY)
        cy.contains('Удалить из head').click()

        checkCircleElement({el: cy.get('@list').first(), value: value, state: 'changing', type: 'tail'})
        cy.get('@list').first().find('div[class*="circle_default"]').should('not.have.text', value)

        cy.wait(DELAY)
        cy.get('@list').then($list => {
          expect($list.length).to.eq(length - 1)
        })
      })
      .end()

  })

  it('should delete tail element correctly', () => {
    cy.wait(DELAY)
    let length = 0
    let value = ''
    cy.get('form').next().children('div').as('list')
    cy.get('@list').then($list => length = $list.length)
    cy.get('@list').last().find('p[class*="letter"]')
      .then($el => {
        value = $el.text()
      })
      .then(() => {
        cy.wait(DELAY)
        cy.contains('Удалить из tail').click()

        checkCircleElement({el: cy.get('@list').last(), value: value, state: 'changing', type: 'tail'})
        cy.get('@list').last().find('div[class*="circle_default"]').should('not.have.text', value)

        cy.wait(DELAY)
        cy.get('@list').then($list => {
          expect($list.length).to.eq(length - 1)
        })
      })
      .end()

  })


})
