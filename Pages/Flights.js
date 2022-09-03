import React, { useState } from "react";
import { StyleSheet, View, FlatList } from 'react-native';
import Flight from "./Firebase/DataStructures/Flight";
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";
import { FlightTrackFlightOption } from "./PageComponents/FlightTrackFlightOption";
import { getFlights } from "./Firebase/Firestore";


export function Flights({navigation}) {
  const [flights, setFlights] = useState([]);
  const [searching, setSearching] = useState(false);
  if (flights.length === 0 && !searching) {
    setSearching(true);
    getFlights().then(flights => {
      setFlights(flights);
      setSearching(false);
    });
  }

  const renderFlightOption = ({item}) => {
    return (
      <FlightTrackFlightOption data={item} onPress={() => navigation.navigate('Flight', {flight: item})} />
    );
  };

  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Flights' onBackArrowPress={navigation.goBack} />
      <FlatList data={flights} renderItem={renderFlightOption} keyExtractor={item => item.getId()} style={styles.list} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  list: {
    width: '76%',
  },
});