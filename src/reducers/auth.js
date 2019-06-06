export default (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      }
    case 'LOGOUT':
      return {
        uid: action.uid
      }
    default:
      return state;
  }
}
