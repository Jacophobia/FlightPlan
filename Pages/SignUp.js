import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import LinearGradient from 'react-native-linear-gradient';
import { FlightTrackButton } from "./PageComponents/FlightTrackButton";
import { Credentials } from "../DataStructures/Credentials";
import { onStateChange, saveUser, signUp, logout } from "../Firebase/Auth";
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
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    console.log("sign up user =", user);
    setUser(user);
    setInitializing(false);
    if (!!user) {
      saveUser(user, credentials.getName());
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
      signUp(credentials, () => props.navigation.goBack());
    }
  };

  return (
    <LinearGradient 
      colors={
        [
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#f7fafd', 
          '#e1eff6', 
          '#c2dcee', 
          '#aad1e8', 
          '#8ebfdf', 
          '#7cb5dc', 
          '#60a5d3', 
          '#4b99cd', 
          '#348dc7', 
          '#197cbf',
          // '#177cbf', // medium blue from logo
          // '#222e61', // dark blue from logo
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
        <KeyboardAvoidingView style={styles.input} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <FlightTrackFancyInput label='Full Name' onUpdate={setName} />
          <FlightTrackFancyInput label='Email Address' onUpdate={setUsername} keyboardType='email-address' />
          <FlightTrackFancyInput label='Password' onUpdate={setPassword} hide={true} />
          <FlightTrackFancyInput label='Confirm Password' onUpdate={setConfirmedPassword} hide={true} />
          <FlightTrackButton style={styles.submit} title='Sign Up' onPress={submit} />
        </KeyboardAvoidingView>
      </View>
        <Pressable onPressIn={props.navigation.goBack} style={styles.signUp} >
          <Text style={styles.signUpText}>Log In</Text>
        </Pressable>
    </LinearGradient>
  );
}