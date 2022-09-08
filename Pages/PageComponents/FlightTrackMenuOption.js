import React from "react";
import { StyleSheet, Text, Image, Pressable } from 'react-native';


export function FlightTrackMenuOption({label, icon, onPress, iconScale = 1.0}) {

  const iconStyle = {
    width: `${20 * iconScale}%`,
    height: `${100 * iconScale}%`,
    resizeMode: "contain",
  };

  return (
    <Pressable style={styles.pressable} onPress={onPress} >
      <Text style={styles.text}>{label}</Text>
      <Image source={icon} style={iconStyle} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    padding: 10,
    backgroundColor: '#4C71C7',
    margin: 15,
    width: '65%',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 23,
  },
});