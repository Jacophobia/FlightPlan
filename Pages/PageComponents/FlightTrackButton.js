import React from "react";
import { StyleSheet, Text, Pressable } from 'react-native';

/**
 * Flight Track Button
 * @param props onPress, label
 * @returns a configurable button styled after the flight track way
 */
export function FlightTrackButton(props) {

  return (
    <Pressable style={[styles.button, props.style]} onPress={props.onPress}>
      <Text style={styles.text}>{props.label || ''}</Text>
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
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

// backgroundColor: '#177dbf',