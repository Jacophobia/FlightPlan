import React from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Flight, { getTestFlight } from "./Firebase/DataStructures/Flight";


export function Flights({navigation}) {
  const toFlight = () => {
    navigation.navigate('Flight', {flight: getTestFlight()});
  };

  return (
    <View style={styles.container}>
      <Text>Not yet Implemented</Text>
      <Pressable onPress={toFlight} style={styles.tempButton}>
        <Text>To Flight Page</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempButton: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },  
});