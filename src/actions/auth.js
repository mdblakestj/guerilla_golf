import { firebase, googleProvider } from "../firebase/firebase";

export const login = uid => ({
  type: "LOGIN",
  uid
});

export const logout = () => ({
  type: "LOGOUT"
});
export const startLogin = () => {
  return () => {
    firebase.auth().signInWithPopup(googleProvider);
  };
};

export const startLogout = () => {
  console.log("logged out");
  return () => {
    return firebase.auth().signOut();
  };
};
