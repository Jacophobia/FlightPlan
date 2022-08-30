import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";


export function Principles({ navigation }) {

  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Principles' onBackArrowPress={navigation.goBack} />
      <Text>Not yet Implemented</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});