import React from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';


export function FlightTrackDisplay({label, data, style}) {

  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelContainer}>
        <Text>{label}:</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text>{data}</Text>
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
    width: '86%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    ...outline,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dataContainer: {
    ...outline,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0EFFB',
  },
});