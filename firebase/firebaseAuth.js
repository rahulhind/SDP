import firebase from './firebaseInit';
import { useHistory } from 'react-router-dom';  // Assuming you're using react-router for navigation

const provider = new firebase.auth.GoogleAuthProvider();

// Function to handle the sign-in
const signInWithGoogle = () => {
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      // Example: Update application state with user info, redirect, etc.
      console.log("Logged in user:", user);
      // Assuming you have a context or state management setup to update
      // updateUserContext(user);

      // Optionally redirect the user after sign-in
      useHistory().push('/home');  // Redirect to home page or dashboard
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;

      // Log errors or display them to the user
      console.error("Authentication error:", errorCode, errorMessage);
    });
};

export default signInWithGoogle;
