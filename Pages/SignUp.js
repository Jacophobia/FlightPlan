import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import LinearGradient from 'react-native-linear-gradient';
import { FlightTrackButton } from "./PageComponents/FlightTrackButton";
import { Credentials } from "../DataStructures/Credentials";
import { onStateChange, signUp } from "../Firebase/Auth";

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
  function onAuthStateChanged(user) {
    console.log("user =", user);
    setUser(user);
    if (initializing) {
      setInitializing(false);
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
    signUp(credentials, () => props.navigation.goBack());
  };

  return (
    <KeyboardAvoidingView behavior='height' enabled={false} style={{flex: 1, width: '100%'}} >
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
      <KeyboardAvoidingView style={styles.pageContent} enabled={true} behavior='padding'>  
        <View style={styles.logoContainer} >
          <Image 
            source={require("./../assets/Logo.png")} 
            style={styles.logo}
          />
        </View>
        <View style={styles.input}>
          <FlightTrackInput labelText='Full Name' onUpdate={setName} />
          <FlightTrackInput labelText='Email Address' onUpdate={setUsername} />
          <FlightTrackInput labelText='Password' onUpdate={setPassword} hide={true} />
          <FlightTrackInput labelText='Confirm Password' onUpdate={setConfirmedPassword} hide={true} />
        </View>
        <View style={styles.submitContainer}>
          <FlightTrackButton style={styles.submit} title='Sign Up' onPress={submit} />
        </View>
      </KeyboardAvoidingView>
        <Pressable onPressIn={props.navigation.goBack} style={styles.signUp} >
          <Text style={styles.signUpText}>Log In</Text>
        </Pressable>
    </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  enclosingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#348CCB',
  },
  pageContent: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '85%',
  },  
  logoContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? '10%' : '0%',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  forgotLoginPressable: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    width: '90%',
    marginTop: 3,
  },
  forgotLoginText: {
    color: '#b0b0b0',
    fontSize: 14,
    marginRight: 0,
  },
  submitContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  submit: {
    width: '39%',
    height: 39,
    marginTop: '5%',
  },
  signUp: {
    marginVertical: '10%',
  },
  signUpText: {
    fontSize: 17,
    fontFamily: 'Roboto',
    color: '#000000'
  },
});