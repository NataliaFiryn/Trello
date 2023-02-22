export class UItests{
clickOnCreatedBoard(){
    cy.get('@nameOfBoard').then((nameOfBoard) => {
        cy.get('.boards-page-layout-list li [class="board-tile-details is-badged"] [title="'+nameOfBoard+'"]').should('contain',nameOfBoard).click()
        })
}
findCreatedList(){
    cy.get('@nameOfList').then((nameOfList) => {
        cy.get('#board [class="js-list list-wrapper"] [aria-label='+nameOfList+']').should('contain',nameOfList)
        })
}
clickOnCreatedCard(){
    cy.get('@nameOfList').then((nameOfList) => {
        cy.get('#board [class="js-list list-wrapper"] [aria-label='+nameOfList+']').should('contain',nameOfList).then(list => {
            cy.get('[class="list-card js-member-droppable ui-droppable"]').click()
        })
    })
}
findCreatedCard(){
    cy.get('@nameOfList').then((nameOfList) => {
        cy.get('@nameOfCard').then((nameOfCard) => {
            cy.get('#board [class="js-list list-wrapper"] [aria-label='+nameOfList+']').should('contain',nameOfList).then(list => {
                cy.get('[class="list-card js-member-droppable ui-droppable"]').should('contain',nameOfCard)  
            })
        })
    })
}
findMovedCard(){
    cy.get('@numberOfList').then((numberOfList) => {
        cy.get('@nameOfCard').then((nameOfCard) => {
        cy.get('#board [class="js-list list-wrapper"]').eq(numberOfList).then(list => {
            cy.get('[class="list-card js-member-droppable ui-droppable"]').should('contain',nameOfCard)  
        })
        })
    })
}
deletedCardNotExist(){
    cy.get('@nameOfList').then((nameOfList) => {
        cy.get('@nameOfCard').then((nameOfCard) => {
            cy.get('#board [class="js-list list-wrapper"] [aria-label='+nameOfList+']').should('contain',nameOfList).then(list => {
                cy.get('[class="list-card js-member-droppable ui-droppable"]').should('not.exist')
            })
        })
    })
}
findCreatedBoard(){
    cy.get('@nameOfBoard').then((nameOfBoard) => {
        cy.get('.boards-page-layout-list li [class="board-tile-details is-badged"] [title="'+nameOfBoard+'"]').should('contain',nameOfBoard)
        })
}
deletedBoardNotExist(){
    cy.get('@nameOfBoard').then((nameOfBoard) => {
        cy.get('.boards-page-layout-list li .board-tile-details-name [title="'+nameOfBoard+'"]').should('not.exist')
        })
}
}
export const board = new UItests()