import React, { useState } from "react";
import { StyleSheet, View, FlatList } from 'react-native';
import { ProgressBar } from "react-native-paper";
import Flight from "./Firebase/DataStructures/Flight";
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";
import { FlightTrackFlightOption } from "./PageComponents/FlightTrackFlightOption";
import { getFlights } from "./Firebase/Firestore";

const InitializingBar = ({percent}) => {
  return (
      <View style={{justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
        <ProgressBar
          progress={percent} color="#177cbf" visible={true} style={{width: 300, height: 10}}
        />
      </View>
    );
};

export function Flights({navigation}) {
  const [flights, setFlights] = useState([]);
  const [searching, setSearching] = useState(false);

  //   v v v v Initialize Options v v v v
  const [initializePercent, setInitializePercent] = useState(0.0);
  const [initializeState, setInitializeState] = useState('starting');

  const initializeOptions = async () => {
    setInitializeState('initializing');
    let prev = 100;
    for (let i = 1; i < 100; i++) {
      setTimeout(() => {
        setInitializePercent(i / 100.0);
      }, prev);
      prev *= 1.04;
    }

    try {
      const flights = await getFlights();
      setFlights(flights);
    } catch (error) {
      console.error(error);
    }


    setInitializeState('done');
  };
  
  if (initializeState === 'done') {
    
  }
  else if (initializeState === 'starting') {
    setInitializePercent(0.2);
    initializeOptions();
    return (<InitializingBar percent={initializePercent} />);
  }
  else {
    return (<InitializingBar percent={initializePercent} />);
  }
  //   ^ ^ ^ ^ Initialize Options ^ ^ ^ ^

  const renderFlightOption = ({item}) => {
    return (
      <FlightTrackFlightOption data={item} onPress={() => navigation.navigate('Flight', {flight: item})} />
    );
  };

  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Flights' onBackArrowPress={navigation.goBack} />
      <FlatList data={flights} renderItem={renderFlightOption} keyExtractor={item => item.getId()} style={styles.list} contentContainerStyle={styles.listContent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#ffffff',
  },
  list: {
    width: '100%',
  },
  listContent: {
    alignItems: 'center',

  }
});