export class apiRequests{

getAllBoards(){
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
}
createBoard(boardName){
    const nameOfBoard = boardName
    cy.wrap(nameOfBoard).as('nameOfBoard')
    cy.request({
        url: Cypress.env('apiUrl')+'/1/boards/',
        method: 'POST',
        qs: {
          'name': boardName,
          'prefs_permissionLevel': 'public',
          'key': Cypress.env('key'), 
          'token': Cypress.env('token')
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.closed).to.eql(false)
        expect(response.body.prefs.permissionLevel).to.eql('public')
        expect(response.body).to.have.property('id')
       const boardID = response.body.id
       cy.wrap(boardID).as('boardID')
      })
      cy.reload()
}
setExistingListAsVariable(number){
    const numberOfList = number
    cy.wrap(numberOfList).as('numberOfList')
    cy.get('@boardID').then((boardID) => {
    cy.request({
        url: Cypress.env('apiUrl')+'/1/boards/'+boardID+'/lists',
        method: 'GET',
        qs: {
          'key':Cypress.env('key'), 
          'token': Cypress.env('token')
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        const existingListID = response.body[number].id
       cy.wrap(existingListID).as('existingListID')
      })
    })
}
createList(listName){
    const nameOfList = listName
    cy.wrap(nameOfList).as('nameOfList')
    cy.get('@boardID').then((boardID) => {
        cy.request({
          url: Cypress.env('apiUrl')+'/1/lists',
          method: 'POST',
          qs: {
            'name': listName,
            'idBoard': boardID,
            'key':Cypress.env('key'), 
            'token': Cypress.env('token')
          }
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.closed).to.eql(false)
          expect(response.body.idBoard).to.eql(boardID)
          expect(response.body.name).to.eql(listName)
          expect(response.body).to.have.property('id')
          const listID = response.body.id
          cy.wrap(listID).as('listID')
        })
     })
     cy.reload()
}
createCard(cardName){
    const nameOfCard = cardName
    cy.wrap(nameOfCard).as('nameOfCard')
    cy.get('@boardID').then((boardID) => {
    cy.get('@listID').then((listID) => {
        cy.request({
         url: Cypress.env('apiUrl')+'/1/cards',
         method: 'POST',
         qs: {
          'name': cardName,
          'idList': listID,
          'key':Cypress.env('key'), 
          'token': Cypress.env('token')
         }
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.closed).to.eql(false)
          expect(response.body.name).to.eql(cardName)
          expect(response.body.idBoard).to.eql(boardID)
          expect(response.body.idList).to.eql(listID)
          const cardID = response.body.id
          cy.wrap(cardID).as('cardID')
        })
      })
    })
    cy.reload()
}
moveCardFromCreatedListToExistingList(){
    cy.get('@boardID').then((boardID) => {
    cy.get('@cardID').then((cardID) => {
    cy.get('@existingListID').then((existingListID) => {
        cy.request({
         url: Cypress.env('apiUrl')+'/1/cards/'+cardID,
         method: 'PUT',
         qs: {
          'idList': existingListID,
          'key':Cypress.env('key'), 
          'token': Cypress.env('token')
         }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.idBoard).to.eql(boardID)
            expect(response.body.idList).to.eql(existingListID)
        })
    })
    })
})
cy.reload()
}
deleteCard(){
    cy.get('@cardID').then((cardID) => {
    cy.request({
        url: Cypress.env('apiUrl')+'/1/cards/'+cardID,
        method: 'DELETE',
        qs: {
         'key':Cypress.env('key'), 
         'token': Cypress.env('token')
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.statusText).to.eq("OK")
    })
})
}
deleteBoard(){
      cy.get('@boardID').then((boardID) => this.deleteBoardByID(boardID));
      cy.reload()
}

deleteBoardByID(boardId) {
  cy.request({
    url: Cypress.env('apiUrl')+'/1/boards/'+boardId,
    method: 'DELETE',
    qs: {
     'key':Cypress.env('key'), 
     'token': Cypress.env('token')
    }
}).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.statusText).to.eq("OK")
})
}
deleteAllBoards(){
  cy.get('@boardArray').then((boardArray) => {
    boardArray.forEach((board) => {
        apiRequest.deleteBoardByID(board.id)
        cy.reload()
    })
    
})
}
getAllBoardsInWorkspace(){
  cy.request({
    url: Cypress.env('apiUrl')+'/1/organizations/workspace93204874/boards',
    method: 'GET',
    qs: {
     'key':Cypress.env('key'), 
     'token': Cypress.env('token')
    }
}).then((response) => {
    expect(response.status).to.eq(200)
    const boardArray = response.body
    cy.wrap(boardArray).as('boardArray')
})
}

}
export const apiRequest = new apiRequests()