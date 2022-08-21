import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import LinearGradient from 'react-native-linear-gradient';

/**
 * Flight Track Drop Down Option
 * @param props value, onPress/1
 * @returns A single element to be placed in a Flight Track Dropdown element
 */
export function FlightTrackDropDownOption(props) {

  const onPress = () => {
    props.onPress(props.value);
  };

  return (
    <>
      <View style={styles.divider} />
      <Pressable style={styles.highlight} onPress={onPress}>
        <Text>{props.value}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  highlight: {
    borderColor: 'transparent',
    padding: 10,
  },
  divider: {
    backgroundColor: '#b0b0b0',
    height: 1,
  },
});