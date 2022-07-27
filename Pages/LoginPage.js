import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import LinearGradient from 'react-native-linear-gradient';


export function LoginPage(props) {
  return (
    <LinearGradient colors={['#ffffff', '#ffffff', '#AEDDFE', '#4BB3FD']} style={styles.enclosingView}>
      <View style={styles.pageContent}>  
        <Image source={require("./../assets/PlaceHolderLogo.jpg")} style={styles.logo}/>
        <View style={styles.input}>
          <Text style={styles.buttonText}>
            Login
          </Text>
          <FlightTrackInput/>
          <FlightTrackInput/>
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
    flex: 2,
    justifyContent: 'flex-start'
  },  
  buttonText: {
    fontSize: 32,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#000000',
    backgroundColor: 'transparent',
  },
  logo: {
    flex: 1,
    width: 200,
    resizeMode: "contain",
    height: 126,
  },
  forgotLoginPressable: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotLoginText: {
    fontSize: 12,
    marginRight: 9,
  },
});