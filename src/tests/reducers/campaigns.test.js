import campaignReducer from '../../reducers/campaigns'
import campaigns from '../fixtures/campaigns'



test('Should set default state to empty array', () => {
  const state = campaignReducer(undefined, {type: 'here'})
  expect(state).toEqual([]);
})

test('Should return correct array for add campaign action', () => {
  const state = []
  const action = {type: 'ADD_CAMPAIGN', campaign: 'hats', id: 'abc', updates: {createdAt: 0}}
  const result = campaignReducer([], action )
  expect(result).toEqual([...state, 'hats'])
})

test('Should remove campaign by ID', () => {
  const action = {
   type: 'REMOVE_CAMPAIGN',
   id: campaigns[0].id
  }
  const state = campaignReducer(campaigns, action )
  expect(state).toEqual([campaigns[1]])
})

test('Should not remove campaigns if campaign ID not found', () => {
  const action = {
   type: 'REMOVE_CAMPAIGN',
   id: '5'
  }
  const state = campaignReducer(campaigns, action )
  expect(state).toEqual(campaigns)
})


test('Should add an expense', () => {
  const newCampaign = {

    id: '3',
    title: 'Hats',
    description: 'HatsHatsHats',
    triggerNumber: 1000,
    createdBy: 'Dan',
    createdAt: 100000,
    members: [],
    imageURL: 'www.test.com'
  }
  const action = {
   type: 'ADD_CAMPAIGN',
   campaign: newCampaign
  }
  const state = campaignReducer(campaigns, action )

  expect(state).toEqual([...campaigns, newCampaign])
})

test('Should edit a campaign', () => {

  const action = {
   type: 'EDIT_CAMPAIGN',
   id: '1',
   updates: {title: 'Dats'}
  }
  const state = campaignReducer(campaigns, action )
  const editedCampaign = {...campaigns[0], ...action.updates}
  expect(state).toEqual([editedCampaign, campaigns[1]])
})

test('Should edit a campaign', () => {

  const action = {
   type: 'EDIT_CAMPAIGN',
   id: '6',
   updates: {title: 'Dats'}
  }
  const state = campaignReducer(campaigns, action )
  expect(state).toEqual(campaigns)
})



// export const editCampaign = (id, updates) => ({
//   type: 'EDIT_CAMPAIGN',
//   id,
//   updates
// }
// )



// const campaignReducerDefaultState = [];
// const campaignReducer = (state = campaignReducerDefaultState, action) => {
//   switch (action.type) {
//     case 'ADD_CAMPAIGN':
//       return [...state, action.campaign];
//     case 'REMOVE_CAMPAIGN':
//       return state.filter(({id}) => {return id != action.id})
//     case 'EDIT_CAMPAIGN':
//       return state.map((campaign) => {
//         if (campaign.id === action.id) {
//           return {
//             ...campaign,
//             ...action.updates
//           }
//         } else {
//           return campaign
//         }
//       })
//     case 'SET_CAMPAIGNS':
//       return action.campaign
//
//
//     default:
//       return state;
//
//   }
// }
