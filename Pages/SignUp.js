import React, { useState, useEffect } from "react";
import { Text, View, Image, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FlightTrackButton } from "./PageComponents/FlightTrackButton";
import Credentials from "./Firebase/DataStructures/Credentials";
import { onStateChange, saveUser, signUp } from "./Firebase/Auth";
import { FlightTrackFancyInput } from "./PageComponents/FlightTrackFancyInput";
import { styles } from "./Login";

const emptyCreds = new Credentials({});

export function SignUp(props) {
  const [credentials, setCredentials] = useState(emptyCreds);
  const setUsername = (username) => {
    setCredentials(oldCreds => oldCreds.setEmail(username));
  };
  const setPassword = (password) => {
    setCredentials(oldCreds => oldCreds.setPassword(password));
  };
  const setConfirmedPassword = (password) => {
    setCredentials(oldCreds => oldCreds.setConfirmedPassword(password));
  }
  const setName = (name) => {
    setCredentials(oldCreds => oldCreds.setName(name));
  };

  // Firebase v v v v v v v v v v v v v v v v v v v v v v
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    console.log("sign up user =", user);
    setInitializing(false);
    if (!user) {
      return;
    }
    const {valid, error} = credentials.validate();
    if (!!user && valid) {
      saveUser(user, credentials.getName());
    }
    else {
      console.error(error);
    }
  }

  useEffect(() => {
    const subscriber = onStateChange(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }
  // Firebase ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^

  const submit = () => {
    if (credentials.validate()) {
      signUp(credentials);
    }
  };

  return (
    <LinearGradient 
      colors={
        [
          '#ffffff',
          '#ffffff',
          '#4C71C7',
          // '#177cbf', // medium blue from logo
          // '#4C71C7', // dark blue from logo
        ]
      } 
      style={styles.enclosingView}
    >
      <View style={styles.pageContent} enabled={true}>  
        <View style={styles.logoContainer} >
          <Image 
            source={require("./../assets/Logo.png")} 
            style={styles.logo}
          />
        </View>
        <KeyboardAvoidingView style={styles.input} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled={Platform.OS === 'ios'}>
          <FlightTrackFancyInput label='Full Name' onUpdate={setName} />
          <FlightTrackFancyInput label='Email Address' onUpdate={setUsername} keyboardType='email-address' />
          <FlightTrackFancyInput label='Password' onUpdate={setPassword} hide={true} />
          <FlightTrackFancyInput label='Confirm Password' onUpdate={setConfirmedPassword} hide={true} />
          <FlightTrackButton style={styles.submit} label='Sign Up' onPress={submit} />
        </KeyboardAvoidingView>
      </View>
      <Pressable onPressIn={props.navigation.goBack} style={styles.signUp} >
        <Text style={styles.signUpText}>Log In</Text>
      </Pressable>
    </LinearGradient>
  );
}