import React from "react";
import { StyleSheet, Text, Image, Pressable } from 'react-native';


export function FlightTrackMenuOption({label, icon, onPress}) {

  return (
    <Pressable style={styles.pressable} onPress={onPress} >
      <Text style={styles.text}>{label}</Text>
      <Image source={icon} style={styles.icon} />
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
  icon: {
    width: '20%',
    height: '100%',
    resizeMode: "contain",
  },
});