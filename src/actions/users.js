import uuid from "uuid";
import database from "../firebase/firebase";

//ADD_User
export const addUser = user => ({
  type: "ADD_USER",
  user
});

export const startAddUser = (userData = {}) => {
  return dispatch => {
    const {
      firstName = "",
      lastName = "",
      email = "",
      password = "",
      authToken = "",
      createdAt = 0
    } = userData;
    const user = {
      firstName,
      lastName,
      email,
      password,
      authToken: uuid(),
      createdAt
    };
    database
      .ref("users")
      .push(user)
      .then(ref => {
        dispatch(
          addUser({
            id: ref.key,
            ...user
          })
        );
      });
  };
};

export const removeUser = ({ id } = {}) => ({
  type: "REMOVE_USER",
  id
});
//EDIT
export const editUser = (id, updates) => ({
  type: "EDIT_USER",
  id,
  updates
});
