import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyByWUUEusifoRpHrmJSX6QsXcR0Dh2jSec",
    authDomain: "todo-react-1d2aa.firebaseapp.com",
    projectId: "todo-react-1d2aa",
    storageBucket: "todo-react-1d2aa.appspot.com",
    messagingSenderId: "155835981499",
    appId: "1:155835981499:web:c7c67a59e7ac8dd6f1539e"
};
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const handle_signin_google = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const handle_logout = () => {
  auth.signOut();
};
//const signInWithEmailAndPassword = async (email, password) => {
  //try {
    //await auth.signInWithEmailAndPassword(email, password);
  //} catch (err) {
    //console.error(err);
    //alert(err.message);
  //}
//};
//const registerWithEmailAndPassword = async (name, email, password) => {
  //try {
    //const res = await auth.createUserWithEmailAndPassword(email, password);
    //const user = res.user;
    //await db.collection("users").add({
      //uid: user.uid,
      //name,
      //authProvider: "local",
      //email,
    //});
  //} catch (err) {
    //console.error(err);
    //alert(err.message);
  //}
//};
//const sendPasswordResetEmail = async (email) => {
  //try {
    //await auth.sendPasswordResetEmail(email);
    //alert("Password reset link sent!");
  //} catch (err) {
    //console.error(err);
    //alert(err.message);
  //}
//};

export {
    auth,
    db,
    handle_signin_google,
    handle_logout,
};
