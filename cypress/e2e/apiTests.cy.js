const { apiRequest } = require("../support/page_objects/apiRequest")


describe('API tests', () => {
  
  it('All API tests', () => {

    apiRequest.createBoard('Board 1')

    apiRequest.createList('List 1')

    apiRequest.createCard('Card 1')

    apiRequest.setExistingListAsVariable(2)

    apiRequest.moveCardFromCreatedListToExistingList()

    apiRequest.deleteCard()
    
    apiRequest.deleteBoard()
})
})

