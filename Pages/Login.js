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
          <FlightTrackButton style={styles.submit} title='Log In' onPress={() => alert('Not yet implemented')} />
        </View>
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
    width: '65%',
  },  
  loginText: {
    fontSize: 43,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#222e60',
    backgroundColor: 'transparent',
  },
  logoContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 120,
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  },
  forgotLoginPressable: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    width: '90%',
    marginTop: 5,
  },
  forgotLoginText: {
    color: '#222e60',
    fontSize: 15.5,
    marginRight: 14.9,
  },
  submitContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  submit: {
    width: '35%',
    height: 35
  }
});