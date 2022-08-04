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
    width: '100%',
  },
  input: {
    flex: 2.9,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '65%',
    marginTop: 45,
  },  
  buttonText: {
    fontSize: 43,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
    color: '#222e60',
    backgroundColor: 'transparent',
  },
  logo: {
    flex: 1,
    width: 130,
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
});