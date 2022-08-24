import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera } from "react-native-image-picker";

/**
 * Flight Track Button
 * @param props onPress
 * @returns a configurable button styled after the flight track way
 */
export function FlightTrackButton(props) {

  return (
    <Pressable style={[styles.button, props.style]} onPress={props.onPress}>
      <Text style={styles.text}>{props.title || ''}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '50%',
    height: 45,
    backgroundColor: '#177dbf',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 35,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

// backgroundColor: '#177dbf',