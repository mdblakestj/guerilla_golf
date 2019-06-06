import {addCampaign, editCampaign, removeCampaign} from '../../actions/campaigns'

test('Should setup remove campaign action object', () => {
  const result = removeCampaign({id: 'abc'})
  expect(result).toEqual({
    type: 'REMOVE_CAMPAIGN',
    id: 'abc'
  })
})


test('Should setup edit Campaign action object', () => {
  const result = editCampaign('abc', {createdAt:0})
  expect(result).toEqual({
    type: 'EDIT_CAMPAIGN',
    id: 'abc',
    updates: {createdAt:0}
  })

})
