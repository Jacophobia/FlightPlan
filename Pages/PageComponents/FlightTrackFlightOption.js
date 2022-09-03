import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { FlightTrackTailLogo } from "./FlightTrackTailLogo";

/**
 * Flight Track Flight Option
 * @param props onPress, label
 */
export function FlightTrackFlightOption({style, onPress, data}) {
  const date = new Date(data.getDate());
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <FlightTrackTailLogo tailNumber={data.getTailNumber()} style={styles.tailLogo} />
      <View style={styles.textContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{date.toLocaleDateString()}</Text>
        </View>
        <View style={styles.airports}>
          <View style={styles.airportContainer}>
            <Text style={styles.airportLabel}>Departure:</Text>
            <Text style={styles.airport}>{data.getDeparture()}</Text>
          </View>
          <View style={styles.airportContainer}>
            <Text style={styles.airportLabel}>Arrival:</Text>
            <Text style={styles.airport}>{data.getArrival()}</Text>
          </View>
        </View>
        
      </View>
    </Pressable>
  );
}

const outline = {
  // borderWidth: 1,
  // borderColor: 'red',
}

const text = {
  fontSize: 13,
  color: '#000000'
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderRadius: 18,
    borderColor: '#4C71C7',
    width: '76%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: '2.5%',
  },
  textContainer: {
    ...outline,
    paddingBottom: 9, 
    marginRight: 5,
    justifyContent: 'space-between',
    height: '100%',
    flex: 1,
  },
  airports: {
    marginTop: 15,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  airportContainer: {
    ...outline,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },  
  dateContainer: {
    ...outline,
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    alignItems: 'center',
  },
  date: {
    ...outline,
    fontSize: 20,
    color: '#000000',
    marginTop: 2,
    marginRight: 2,
  },
  airportLabel: {
    ...outline,
    ...text,
  },
  airport: {
    ...outline,
    ...text,
    width: '55%',
    textAlign: 'center',
  },
  tailLogo: {
    ...outline,

  },
});