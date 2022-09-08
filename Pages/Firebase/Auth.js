import { Platform } from 'react-native';
import auth from '@react-native-firebase/auth';

import { setCrewMember } from './Firestore'

export const onStateChange = (callback) => {
  return auth().onAuthStateChanged(callback);
};

export const signUp = async (credentials, callback = () => {}) => {
  const validation = credentials.validate();
  if (validation.valid === false) {
    alert(validation.error);
    return;
  }
  try {
    await auth().createUserWithEmailAndPassword(
      credentials.getEmail(), credentials.getPassword()
    );
  } 
  catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('That email address is already in use');
    }
    if (error.code === 'auth/invalid-email') {
      alert('That email address is invalid');
    }
    alert('Error: Please use different credentials');
    console.error(error)
  }
  callback();
};

export const saveUser = (user, fullName, callback = () => {}) => {
  setCrewMember(user, fullName, callback).then(() => {
    console.log('User added to database');
  }).catch(error => {
    alert(
      `Unable to add to crew members list.\n` + 
      `Please take a screenshot of this message\n` +
      `and send it to your administrator so you\n` + 
      `can be manually added.\nuid = ${user.uid}`
    );
    console.error(error);
  });
};

export const login = async (email, password, callback = () => {}) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  }
  catch (error) {
    switch (error.code) {
    case 'auth/user-not-found':
      alert('User not found');
      break;
    case 'auth/wrong-password':
      alert('Wrong password');
      break;
    default:
      alert('Unable to log in');
    }
    console.error(error);
    return false;
  }
  callback();
  return true;
};

export const logout = async () => {
  if (!!auth().currentUser) {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  console.log('Goodbye!');
};

export const getUid = () => {
  return auth().currentUser.uid;
};

export const recoverAccount = async (email) => {
  await auth().sendPasswordResetEmail(email);
};