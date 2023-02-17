describe('API tests', () => {
  
  it('Get all boards', () => {
    cy.request({
      url: 'https://api.trello.com/1/members/me/boards',
      method: 'GET',
      qs: {
        'key':'', 
        'token': ''
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
  it('Create a board', () => {
    cy.request({
      url: 'https://api.trello.com/1/boards/',
      method: 'POST',
      qs: {
        'name': 'API Board',
        'prefs_permissionLevel': 'public',
        'key':'', 
        'token': ''
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
      //cy.wrap(response.body.id).as('boardID')
     const boardID = response.body.id
     cy.wrap(boardID).as('boardID')
    })
  // })
  //it('Create a list', () => {
    cy.get('@boardID').then((boardID) => {
    cy.request({
      url: 'https://api.trello.com/1/lists',
      method: 'POST',
      qs: {
        'name': 'TODO List',
        'idBoard': boardID,
        'key':'', 
        'token': ''
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
      const boadrID = response.body.id
      cy.wrap(boadrID).as('TODOlistID')
    })
  })
})
})

