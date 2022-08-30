import React from "react";
import { StyleSheet, Text, Pressable } from 'react-native';

/**
 * Flight Track Button
 * @param props onPress, label
 * @returns a configurable button styled after the flight track way
 */
export function FlightTrackButton({style, label, onPress, enabled = true}) {
  let opacity = { opacity: 1.0 };

  if (!enabled) {
    opacity = { opacity: 0.5 };
  }

  return (
    <Pressable style={[styles.button, style, opacity]} onPress={onPress} enabled={enabled}>
      <Text style={styles.text}>{label || ''}</Text>
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