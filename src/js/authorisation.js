// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB9BkppnXfaYDAiVi6RvUMDrBOu1m_umL8',
  authDomain: 'hotcode-76a51.firebaseapp.com',
  projectId: 'hotcode-76a51',
  storageBucket: 'hotcode-76a51.appspot.com',
  messagingSenderId: '719459605405',
  appId: '1:719459605405:web:bab6bcd703170bdc726d74',
  measurementId: 'G-8XB3KBGM25',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

// let database = firebase.database(app);

const signUpBtn = document.querySelector('.signUp');
const logOutBtn = document.querySelector('.logout');

logOutBtn.classList.add('hidden');
console.log(signUpBtn);
const signUpForm = document.querySelector('#signup-form');
const signUpModal = document.querySelector('#modal-signup');
console.log(signUpModal);

signUpBtn.addEventListener('click', onSignUpBtnClick);
function onSignUpBtnClick() {
  signUpModal.classList.remove('hidden');
}

console.log(signUpForm);

signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signUpForm.elements.email.value;
  const password = signUpForm.elements.email.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user.uid;
      alert('registration successfull. Pls, confirm your email');
      signUpForm.reset();
      console.log(user);
      signUpModal.classList.add('hidden');
      saveUserData();

      // сделать закрытие модалки вместо hidden
    })
    .catch(error => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

const logInBtn = document.querySelector('.login');
logInBtn.addEventListener('click', onLogInBtnClick);
function onLogInBtnClick() {
  logInModal.classList.remove('hidden');
}

const logInForm = document.querySelector('#login-form');
console.log(logInForm);

const logInModal = document.querySelector('#modal-login');

logInForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = logInForm.elements.email.value;
  const password = logInForm.elements.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      localStorage.setItem('email', password);
      console.log(email, password, user);
      logInForm.reset();
      logOutBtn.classList.remove('hidden');
      logInBtn.disabled = true;
      logInModal.classList.add('hidden');
      // заменить на функцию закрытия
    })
    .catch(error => {
      const errorCode = error.code;
      alert(errorCode);
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
// -------------logout

console.log(logOutBtn);
// function signOut() {
//   user = undefined;
//   localStorage.removeItem('userId');
// }

// function isLogIn() {
//   return user !== undefined;
// }

logOutBtn.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('user signed out');
  });
});

function checkUserStatus() {
  // Auth state changes.
  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in.
      const userName = user.displayName;
      const email = user.email;
      const pass = user.password;
      const uid = user.uid;

      logOutBtn.classList.remove('hidden');
      logInBtn.disabled = true;

      console.log(
        `Current user: ${userName}, user email: ${email}, user password: ${pass}, userId: ${uid}`,
      );
      getUserData(uid);
    } else {
      // User is signed out.
      logOutBtn.classList.add('hidden');
      logInBtn.disabled = false;
    }
  });
}

function getUserData(userId) {
  return firebase
    .database(app)
    .ref('/users/' + userId)
    .once('value');
}
function saveUserData(userId, name, email) {
  firebase
    .database(app)
    .ref('users/' + userId)
    .set(
      {
        username: name,
        email: email,
      },
      error => {
        if (error) {
          console.log('Failed!');
        } else {
          console.log('User data saved successfully!');
        }
      },
    );
}

function checkUserId() {
  const userId = users.uid;
  return firebase
    .database(app)
    .ref('/users/' + userId)
    .once('value');
}
