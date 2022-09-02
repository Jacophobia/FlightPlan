import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';

/**
 * Flight Track Tail Logo
 * @param props tailNumber, style
 */
export function FlightTrackTailLogo({tailNumber, style}) {
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.tailContainer}>
        <Image source={require('../../assets/Tail.png')} style={styles.logo} />
      </View>
      <View style={styles.tailNumberContainer}>
        <Text style={styles.tailNumber}>{tailNumber}</Text>
      </View>
    </View>
  );
}

const outline = {
  // borderWidth: 1,
  // borderColor: 'red',
}

const styles = StyleSheet.create({
  container: {
    ...outline,
    height: 70,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tailContainer: {
    ...outline,
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    ...outline,
    resizeMode: "contain",
    height: 70,
    width: 130,
    marginLeft: 10,
  },
  tailNumberContainer: {
    justifyContent: "flex-end",
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  tailNumber: {
    ...outline,
    color: '#ffffff',
    marginBottom: '3%',
  },
});