import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from 'react-native';

/**
 * Flight Track Drop Down Option
 * @param props option, onPress/1
 * @returns A single element to be placed in a Flight Track Dropdown element
 */
export function FlightTrackDropDownOption(props) {
  const [color, setColor] = useState('transparent');

  const onPress = () => {
    props.onPress(props.option);
  };

  return (
    <>
      <View style={styles.divider} />
      <Pressable 
        style={[styles.pressable, {backgroundColor: color}]} 
        onPress={onPress}
        onPressIn={() => setColor('#D9D9D9')}
        onPressOut={() => setColor('transparent')}
      >
        <Text>{props.option.name}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  pressable: {
    padding: 10,
  },
  divider: {
    backgroundColor: '#b0b0b0',
    height: 1,
  },
});