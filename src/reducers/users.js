

// user Reducer

const userReducerDefaultState = [];
const userReducer = (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.user];
    case 'REMOVE_USER':
      return state.filter(({id}) => {return id != action.id})
    case 'EDIT_USER':
      return state.map((user) => {
        if (user.id === action.id) {
          return {
            ...user,
            ...action.updates
          }
        } else {
          return user
        }
      })


    default:
      return state;

  }
}

export default userReducer;
