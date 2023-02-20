describe('API tests', () => {
  
  it('Get all boards', () => {
    cy.request({
      url: Cypress.env('apiUrl')+'/1/members/me/boards',
      method: 'GET',
      qs: {
        'key':Cypress.env('key'), 
        'token':Cypress.env('token')
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
  it('Create brord, list and a cart', () => {
    // Create a Board
    cy.request({
      url: Cypress.env('apiUrl')+'/1/boards/',
      method: 'POST',
      qs: {
        'name': 'API Board',
        'prefs_permissionLevel': 'public',
        'key': Cypress.env('key'), 
        'token': Cypress.env('token')
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
     const boardID = response.body.id
     cy.wrap(boardID).as('boardID')
    })
  // Create a List 
    cy.get('@boardID').then((boardID) => {
    cy.request({
      url: Cypress.env('apiUrl')+'/1/lists',
      method: 'POST',
      qs: {
        'name': 'TODO List',
        'idBoard': boardID,
        'key':Cypress.env('key'), 
        'token': Cypress.env('token')
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
      const listID = response.body.id
      cy.wrap(listID).as('TODOlistID')
    })
 })
  // Crate a Cart
    cy.get('@TODOlistID').then((TODOlistID) => {
    cy.request({
     url: Cypress.env('apiUrl')+'/1/cards',
     method: 'POST',
     qs: {
      'name': 'Cart',
      'idList': TODOlistID,
      'key':Cypress.env('key'), 
      'token': Cypress.env('token')
     }
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})

})

