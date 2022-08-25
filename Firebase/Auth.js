import auth from '@react-native-firebase/auth';

export const onStateChange = (callback) => {
  return auth().onAuthStateChanged(callback);
};

export const signUp = async (credentials, callback) => {
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
    alert("Error: Please use different credentials");
    console.error(error)
  }
  const currentUser = auth().currentUser;
  if (!!currentUser) {
    alert('Unable to create credentials. Please try again');
    console.error(currentUser);
  }
  console.log(`Signed in as ${currentUser}`);
  callback();
};

export const login = async (email, password, callback) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  }
  catch (error) {
    alert(error);
    console.error(error);
  }
  callback();
};

export const logout = async () => {
  await auth().signOut();
  console.log('Goodbye!');
};