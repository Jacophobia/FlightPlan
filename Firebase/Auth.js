import auth from '@react-native-firebase/auth';

import { addCrewMember } from './Firestore'

export const onStateChange = (callback) => {
  console.log('onstatechange'); // DELETEME
  return auth().onAuthStateChanged(callback);
};

export const signUp = async (credentials, callback = () => {}) => {
  console.log('signup'); // DELETEME
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

export const saveUser = (user, fullName) => {
  console.log('saveuser'); // DELETEME
  console.log(fullName);
  addCrewMember(user, fullName).then(() => {
    console.log('User added to database');
  }).catch(reason => {
    console.error('Unable to add user to database:', reason);
  });
};

export const login = async (email, password, callback = () => {}) => {
  console.log('login'); // DELETEME
  try {
    await auth().signInWithEmailAndPassword(email, password);
  }
  catch (error) {
    alert('Unable to log in');
    console.error(error);
  }
  callback();
};

export const logout = async () => {
  console.log('logout'); // DELETEME
  if (!!auth().currentUser) {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  console.log('Goodbye!');
};