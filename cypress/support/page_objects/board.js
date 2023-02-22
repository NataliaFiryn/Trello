export class UItests{

    boardList = '.boards-page-layout-list li [class="board-tile-details is-badged"]'
    listsList = '#board [class="js-list list-wrapper"]'
    card = '[class="list-card js-member-droppable ui-droppable"]'

clickOnCreatedBoard(){
    cy.get('@nameOfBoard').then((nameOfBoard) => {
        cy.get(board.boardList).find('[title="'+nameOfBoard+'"]').should('contain',nameOfBoard).click()
        })
}
findCreatedList(){
    cy.get('@nameOfList').then((nameOfList) => {
        cy.get(board.listsList).find('[aria-label='+nameOfList+']').should('contain',nameOfList)
        })
}
clickOnCreatedCard(){
    cy.get('@nameOfList').then((nameOfList) => {
        cy.get(board.listsList).find('[aria-label='+nameOfList+']').should('contain',nameOfList).then(list => {
            cy.get(board.card).click()
        })
    })
}
findCreatedCard(){
    cy.get('@nameOfList').then((nameOfList) => {
        cy.get('@nameOfCard').then((nameOfCard) => {
            cy.get(board.listsList).find('[aria-label='+nameOfList+']').should('contain',nameOfList).then(list => {
                cy.get(board.card).should('contain',nameOfCard)  
            })
        })
    })
}
findMovedCard(){
    cy.get('@numberOfList').then((numberOfList) => {
        cy.get('@nameOfCard').then((nameOfCard) => {
        cy.get(board.listsList).eq(numberOfList).then(list => {
            cy.get(board.card).should('contain',nameOfCard)  
        })
        })
    })
}
deletedCardNotExist(){
    cy.get('@nameOfList').then((nameOfList) => {
        cy.get('@nameOfCard').then((nameOfCard) => {
            cy.get(board.listsList).find('[aria-label='+nameOfList+']').should('contain',nameOfList).then(list => {
                cy.get(board.card).should('not.exist')
            })
        })
    })
}
findCreatedBoard(){
    cy.get('@nameOfBoard').then((nameOfBoard) => {
        cy.get(board.boardList).find('[title="'+nameOfBoard+'"]').should('contain',nameOfBoard)
        })
}
deletedBoardNotExist(){
    cy.get('@nameOfBoard').then((nameOfBoard) => {
    cy.get('.boards-page-layout-list').then(($boardcontainer) => {
        if($boardcontainer.find('li [class="board-tile-details is-badged"]').length){
        cy.get(board.boardList).find('[title="'+nameOfBoard+'"]').should('not.exist')
        } else {
            cy.get(board.boardList).should('not.exist')
        }
        })
    })

}
noBoardInWorkspace(){
    cy.get(board.boardList).should('not.exist')
}
}
export const board = new UItests()