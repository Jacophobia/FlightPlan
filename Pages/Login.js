import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import LinearGradient from 'react-native-linear-gradient';
import { FlightTrackButton } from "./PageComponents/FlightTrackButton";


export function Login(props) {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      <View style={styles.pageContent}>  
        <View style={styles.logoContainer} >
          <Image 
            source={require("./../assets/Logo.png")} 
            style={styles.logo}
          />
        </View>
        <View style={styles.input}>
          <FlightTrackInput labelText='Username' onUpdate={setUsername} />
          <FlightTrackInput labelText='Password' onUpdate={setPassword} hide={true} />
          <View style={styles.forgotLoginPressable}>
            <Pressable onPress={() => alert('Not yet implemented')}>
              <Text style={styles.forgotLoginText}>
                Forgot Login
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.submitContainer}>
          <FlightTrackButton style={styles.submit} title='Log In' onPress={() =>{props.navigate.recordFlightForm(); alert('Not yet implemented');}} />
        </View>
        <Pressable onPress={() => alert('Not yet implemented')} style={styles.signUp} >
          <Text style={styles.signUpText}>Sign Up</Text>
        </Pressable>
      </View>
    </LinearGradient>
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
    marginTop: '14%',
    marginBottom: '20%',
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
    fontSize: 15,
    fontFamily: 'sans-serif-medium',
    color: '#000000'
  },
});