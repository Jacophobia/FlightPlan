import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FlightTrackButton } from "./PageComponents/FlightTrackButton";
import { onStateChange, login, logout } from "./Firebase/Auth";
import { FlightTrackFancyInput } from "./PageComponents/FlightTrackFancyInput";

logout();

export function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const clear = () => {
    setUsername('');
    setPassword('');
  };

  const toHome = () => {
    props.navigation.navigate('Home');
  };

  // Firebase v v v v v v v v v v v v v v v v v v v v v v
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    console.log('login user =', user);
    setUser(user);
    setInitializing(false);
    if (!!user) {
      setUsername(user.email);
      toHome();
    }
  };

  useEffect(() => {
    const subscriber = onStateChange(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  const submit = async () => {
    if (username.length === 0 || password.length === 0) {
      return;
    }
    try {
      setLoading(true);
      await logout();
      await login(username, password);
      toHome();
      clear();
    } catch (error) {
      console.error('Error logging in or out:', error);
    }
    setLoading(false);
  };
  // Firebase ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^

  const toSignUp = () => {
    clear();
    logout();
    props.navigation.navigate('SignUp');
  };

  return (
    <LinearGradient 
      colors={
        [
          '#ffffff',
          '#ffffff',
          '#4C71C7',
          // '#177cbf', // medium blue from logo
          // '#222e61', // dark blue from logo
        ]
      } 
      style={styles.enclosingView}
    >
      <View style={styles.pageContent}>  
        <View style={styles.logoContainer} >
          <Image 
            source={require("./../assets/Logo.png")} 
            style={styles.logo}
          />
        </View>
        <KeyboardAvoidingView style={styles.input} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled={Platform.OS === 'ios'} >
          <FlightTrackFancyInput label='Email Address' onUpdate={setUsername} value={username} keyboardType='email-address' />
          <FlightTrackFancyInput label='Password' onUpdate={setPassword} value={password} hide={true} />
          <View style={styles.forgotLoginPressable}>
            <Pressable onPress={() => alert('Not yet implemented')}>
              <Text style={styles.forgotLoginText}>
                Forgot Login
              </Text>
            </Pressable>
          </View>
          <FlightTrackButton style={styles.submit} label='Log In' onPress={submit} enabled={!loading} />
        </KeyboardAvoidingView>
        <Pressable onPress={toSignUp} style={styles.signUp} >
          <Text style={styles.signUpText}>Sign Up</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const outline = {
  // borderWidth: 1,
  // borderColor: 'red',
}

export const styles = StyleSheet.create({
  enclosingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#348CCB',
  },
  pageContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    ...outline,
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    flex: 1,
  },  
  logoContainer: {
    ...outline,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? '10%' : '5%',
  },
  logo: {
    ...outline,
    width: 150,
    height: Dimensions.get('screen').height * 0.175,
    resizeMode: "contain",
  },
  forgotLoginPressable: {
    ...outline,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    width: '90%',
    marginTop: 3,
  },
  forgotLoginText: {
    color: '#a0a0a0',
    fontSize: 14,
    marginRight: 0,
  },
  submitContainer: {
    ...outline,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  submit: {
    ...outline,
    width: '39%',
    height: 39,
    margin: '5%',
  },
  signUp: {
    ...outline,
    margin: '10%',
  },
  signUpText: {
    fontSize: 17,
    fontFamily: Platform.OS === 'ios' ? undefined : 'Roboto',
    color: '#000000',
  },
});