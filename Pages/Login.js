import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import LinearGradient from 'react-native-linear-gradient';


export function Login(props) {
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
        <Image 
          source={require("./../assets/Logo.png")} 
          style={styles.logo}
        />
        <View style={styles.input}>
          <Text style={styles.buttonText}>
            Login
          </Text>
          <FlightTrackInput labelText='Username' />
          <FlightTrackInput labelText='Password' />
          <View style={styles.forgotLoginPressable}>
            <Text style={styles.forgotLoginText}>
              Forgot Login
            </Text>
          </View>
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
  },
  input: {
    flex: 2.1,
    justifyContent: 'flex-start'
  },  
  buttonText: {
    fontSize: 32,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#222e60',
    backgroundColor: 'transparent',
  },
  logo: {
    flex: 1,
    width: 120,
    resizeMode: "contain",
  },
  forgotLoginPressable: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotLoginText: {
    color: '#222e60',
    fontSize: 14,
    marginRight: 9,
  },
});