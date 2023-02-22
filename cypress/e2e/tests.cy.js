const { apiRequest } = require("../support/page_objects/apiRequest")
const { board } = require("../support/page_objects/board")

describe('Trello Board', () => {
    beforeEach('Open Trello Workspace', () => {
        cy.visit('/')
      })

    it('Create A Board', () => {
        apiRequest.createBoard('First Board')
        board.clickOnCreatedBoard()
    })
    it('Create A List', () => {
        apiRequest.createBoard('Second Board')
        board.clickOnCreatedBoard()
        apiRequest.createList('TODO')
        board.findCreatedList()
    })
    it('Create a Card', () => {
        apiRequest.createBoard('Third Board')
        board.clickOnCreatedBoard()
        apiRequest.createList('TestList')
        apiRequest.createCard('Task 1')
        board.clickOnCreatedCard()
    })
    it('Move Card', () => {
        apiRequest.createBoard('Fourth Board')
        board.clickOnCreatedBoard()
        apiRequest.createList('TestList')
        apiRequest.createCard('Task 1')
        board.findCreatedCard()
        apiRequest.setExistingListAsVariable(2)
        apiRequest.moveCardFromCreatedListToExistingList()
        board.findMovedCard()
    })
    it('Delete Card', () => {
        apiRequest.createBoard('Fifth Board')
        board.clickOnCreatedBoard()
        apiRequest.createList('List')
        apiRequest.createCard('To delete')
        board.findCreatedCard()
        apiRequest.deleteCard()
        board.deletedCardNotExist()
    })
    it('Delete Board', () => {
        apiRequest.createBoard('Sixth Board')
        board.findCreatedBoard()
        apiRequest.deleteBoard()
        board.deletedBoardNotExist()
    })
})
describe('Delete all boards in the workspace', () => { 
    it('Delete all boards in the workspace', () => {
        cy.visit('/')
        apiRequest.getAllBoardsInWorkspace()
        apiRequest.deleteAllBoards()
        board.noBoardInWorkspace()
    })
})
