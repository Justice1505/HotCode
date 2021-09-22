import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import 'firebase/database';
import { accessHome } from './switchHome-Library.js';
import './apiItems.js';

const firebaseConfig = {
  apiKey: 'AIzaSyB9BkppnXfaYDAiVi6RvUMDrBOu1m_umL8',
  authDomain: 'hotcode-76a51.firebaseapp.com',
  projectId: 'hotcode-76a51',
  storageBucket: 'hotcode-76a51.appspot.com',
  messagingSenderId: '719459605405',
  appId: '1:719459605405:web:bab6bcd703170bdc726d74',
  measurementId: 'G-8XB3KBGM25',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// рефсы--------------------------------------
const signUpBtn = document.querySelector('.signUp');
console.log(signUpBtn);
const logOutBtn = document.querySelector('.logout');
console.log(logOutBtn);
const signUpForm = document.querySelector('#signup-form');
const signUpModal = document.querySelector('#modal-signup');
console.log(signUpModal);
console.log(signUpForm);
const logInForm = document.querySelector('#login-form');
console.log(logInForm);
const logInBtn = document.querySelector('.login');
console.log(logInBtn);
const logInModal = document.querySelector('#modal-login');
const notification = document.querySelector('.error-text');

// ------------дефолтные значения
logOutBtn.classList.add('hidden');
// logOutBtn.disabled = true;

// регистрация------------------------
signUpBtn.addEventListener('click', onSignUpBtnClick);
function onSignUpBtnClick() {
  signUpModal.classList.remove('hidden');
}
// закрытие модалок вне сабмита-------------------------
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    signUpModal.classList.add('hidden');
    logInModal.classList.add('hidden');
  }
});
document.addEventListener('click', function (e) {
  const container = document.querySelector('main');
  if (e.target === container) {
    signUpModal.classList.add('hidden');
    logInModal.classList.add('hidden');
  }
});

signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signUpForm.elements.email.value;
  const password = signUpForm.elements.password.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user.uid;
      // alert('registration successfull. Pls, confirm your email');
      notification.textContent = 'registration successfull. Pls, log in';
      notification.style.color = '#008000';
      signUpForm.reset();
      signUpModal.classList.add('hidden');
      // saveUserData();
      // сделать закрытие модалки вместо hidden
    })
    .catch(error => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

// Логин--------------------------

logInBtn.addEventListener('click', onLogInBtnClick);
function onLogInBtnClick() {
  logInModal.classList.remove('hidden');
}

logInForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = logInForm.elements.email.value;
  console.log(email);
  const password = logInForm.elements.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user.uid;
      localStorage.setItem('email', password);
      console.log(email, password, user);
      logOutBtn.classList.remove('hidden');
      notification.textContent = 'Welcome to the HotCode Filmoteka!';
      notification.style.color = '#008000';
      // logInBtn.disabled = true;
      logInBtn.classList.add('hidden');
      signUpBtn.classList.add('hidden');
      logInModal.classList.add('hidden');
      logInForm.reset();
      // заменить на функцию закрытия
    })
    .catch(error => {
      const errorCode = error.code;
      console.log(errorCode);
      alert(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
});

// логаут----------------------------------
logOutBtn.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut().then(() => {
    localStorage.removeItem('email');
    logOutBtn.classList.add('hidden');
    logInBtn.classList.remove('hidden');
    signUpBtn.classList.remove('hidden');
    console.log('user signed out');
    accessHome();
    localStorage.clear();
  });
});

// изменение статуса пользователя-----------------
function checkUserStatus() {
  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in.
      const userName = user.displayName;
      const email = user.email;
      const pass = user.password;
      const uid = user.uid;

      // logOutBtn.classList.remove('hidden');
      logInBtn.disabled = true;
      logOutBtn.disabled = false;
      notification.textContent = 'Welcome to the HotCode Filmoteka!';
      console.log(
        `Current user: ${userName}, user email: ${email}, user password: ${pass}, userId: ${uid}`,
      );
      // getUserData(uid);
    } else {
      // User is signed out.
      // logOutBtn.classList.add('hidden');
      // logOutBtn.disabled = true;
      // logInBtn.disabled = false;
    }
  });
}

// function getUserData(userId) {
//   return firebase
//     .database(app)
//     .ref('/users/' + userId)
//     .once('value');
// }
// function saveUserData(userId, name, email) {
//   firebase
//     .database(app)
//     .ref('users/' + userId)
//     .set(
//       {
//         username: name,
//         email: email,
//       },
//       error => {
//         if (error) {
//           console.log('Failed!');
//         } else {
//           console.log('User data saved successfully!');
//         }
//       },
//     );
// }

// function checkUserId() {
//   const userId = users.uid;
//   return firebase
//     .database(app)
//     .ref('/users/' + userId)
//     .once('value');
// }
