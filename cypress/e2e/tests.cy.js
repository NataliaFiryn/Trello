const { apiRequest } = require("../support/page_objects/apiRequest")

describe('Trello Board', () => {

it('Create A Board', () => {
    apiRequest.createBoard('First Board')
    cy.visit('https://trello.com/w/workspace93204874')
    cy.get('@nameOfBoard').then((nameOfBoard) => {
    cy.get('.boards-page-layout-list li [class="board-tile-details is-badged"] [title="'+nameOfBoard+'"]').should('contain',nameOfBoard).click()
    })
})
it('Create A List', () => {
    apiRequest.createBoard('Second Board')
    apiRequest.createList('TODO')
    cy.visit('https://trello.com/w/workspace93204874')
    cy.get('@nameOfBoard').then((nameOfBoard) => {
    cy.get('.boards-page-layout-list li [class="board-tile-details is-badged"] [title="'+nameOfBoard+'"]').should('contain',nameOfBoard).click()
    })
    cy.get('@nameOfList').then((nameOfList) => {
    cy.get('#board [class="js-list list-wrapper"] [aria-label='+nameOfList+']').should('contain',nameOfList)
    })
})
it('Create a Card', () => {
    apiRequest.createBoard('Third Board')
    apiRequest.createList('TestList')
    apiRequest.createCard('Task 1')
    cy.visit('https://trello.com/w/workspace93204874')
    cy.get('@nameOfBoard').then((nameOfBoard) => {
        cy.get('.boards-page-layout-list li [class="board-tile-details is-badged"] [title="'+nameOfBoard+'"]').should('contain',nameOfBoard).click()
    })
    cy.get('@nameOfList').then((nameOfList) => {
        cy.get('#board [class="js-list list-wrapper"] [aria-label='+nameOfList+']').should('contain',nameOfList).then(list => {
            cy.get('[class="list-card js-member-droppable ui-droppable"]').click()
            cy.get('#trello-root [class="window-wrapper js-autofocus js-tab-parent"] [role="button"]').click()
        })
    })
})
it('Move Card',() => {
    apiRequest.createBoard('Fourth Board')
    cy.visit('https://trello.com/w/workspace93204874')
    cy.get('@nameOfBoard').then((nameOfBoard) => {
        cy.get('.boards-page-layout-list li [class="board-tile-details is-badged"] [title="'+nameOfBoard+'"]').should('contain',nameOfBoard).click()
    })
    apiRequest.createList('TestList')
    apiRequest.createCard('Task 1')
    cy.reload()
    cy.get('@nameOfList').then((nameOfList) => {
    cy.get('@nameOfCard').then((nameOfCard) => {
        cy.get('#board [class="js-list list-wrapper"] [aria-label='+nameOfList+']').should('contain',nameOfList).then(list => {
            cy.get('[class="list-card js-member-droppable ui-droppable"]').should('contain',nameOfCard)  
        })
    })
    })
    apiRequest.setExistingListAsVariable(2)
    apiRequest.moveCardFromCreatedListToExistingList()
    cy.reload()
    cy.get('@numberOfList').then((numberOfList) => {
    cy.get('@nameOfCard').then((nameOfCard) => {
    cy.get('#board [class="js-list list-wrapper"]').eq(numberOfList).then(list => {
        cy.get('[class="list-card js-member-droppable ui-droppable"]').should('contain',nameOfCard)  
    })
    })
})
})
it('Delete Card',() => {
    apiRequest.createBoard('Fifth Board')
    apiRequest.createList('List')
    apiRequest.createCard('To delete')
    cy.visit('https://trello.com/w/workspace93204874')
    cy.get('@nameOfBoard').then((nameOfBoard) => {
        cy.get('.boards-page-layout-list li [class="board-tile-details is-badged"] [title="'+nameOfBoard+'"]').should('contain',nameOfBoard).click()
    })
    cy.get('@nameOfList').then((nameOfList) => {
        cy.get('@nameOfCard').then((nameOfCard) => {
            cy.get('#board [class="js-list list-wrapper"] [aria-label='+nameOfList+']').should('contain',nameOfList).then(list => {
                cy.get('[class="list-card js-member-droppable ui-droppable"]').should('contain',nameOfCard)  
            })
        })
})
apiRequest.deleteCard()
cy.get('@nameOfList').then((nameOfList) => {
    cy.get('@nameOfCard').then((nameOfCard) => {
        cy.get('#board [class="js-list list-wrapper"] [aria-label='+nameOfList+']').should('contain',nameOfList).then(list => {
            cy.get('[class="list-card js-member-droppable ui-droppable"]').should('not.exist')
        })
    })
})
})
it('Delete Board', () => {
    apiRequest.createBoard('Sixth Board')
    cy.visit('https://trello.com/w/workspace93204874')
    cy.get('@nameOfBoard').then((nameOfBoard) => {
        cy.get('.boards-page-layout-list li [class="board-tile-details is-badged"] [title="'+nameOfBoard+'"]' ).should('contain',nameOfBoard)
    })
    apiRequest.deleteBoard()
    cy.reload()
    cy.get('@nameOfBoard').then((nameOfBoard) => {
    cy.get('.boards-page-layout-list li .board-tile-details-name [title="'+nameOfBoard+'"]').should('not.exist')
    })
})
})
