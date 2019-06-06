

// Campaign Reducer

const campaignReducerDefaultState = [];
const campaignReducer = (state = campaignReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CAMPAIGN':
      return [...state, action.campaign];
    case 'REMOVE_CAMPAIGN':
      return state.filter(({id}) => {return id != action.id})
    case 'EDIT_CAMPAIGN':
      return state.map((campaign) => {
        if (campaign.id === action.id) {
          return {
            ...campaign,
            ...action.updates
          }
        } else {
          return campaign
        }
      })
    case 'SET_CAMPAIGNS':
      return action.campaign


    default:
      return state;

  }
}

export default campaignReducer;
