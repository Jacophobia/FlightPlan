import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";
import { FlightTrackMenuOption } from "./PageComponents/FlightTrackMenuOption";
import { getUserData } from "./Firebase/Shared";

export function Home({navigation}) {
  const toRecordFlightForm = () => {
    navigation.navigate('RecordFlightForm');
  };
  const toFlights = () => {
    navigation.navigate('Flights');
  };
  const toCrewMembers = () => {
    navigation.navigate('CrewMembers');
  };
  const toPlanes = () => {
    navigation.navigate('Planes');
  };
  const toClients = () => {
    navigation.navigate('Clients');
  };
  const toPrinciples = () => {
    navigation.navigate('Principles');
  };
  const toPurposes = () => {
    navigation.navigate('Purposes');
  };
  const toProfile = async () => {
    const { name, email } = await getUserData().catch(error => console.error(error));
    navigation.navigate('Profile', {name, email});
  };

  const [admin, setAdmin] = useState(undefined);
  const MenuOptions = () => {
    if (admin === undefined) {
      getUserData().then(({admin}) => setAdmin(admin));
    }

    if (admin) {
      return (
        <View style={styles.content}>
          <FlightTrackMenuOption label='Record Flight' icon={require('../assets/HomePage/RecordFlight.png')} onPress={toRecordFlightForm} iconScale={0.8} />
          <FlightTrackMenuOption label='Flights' icon={require('../assets/HomePage/Flights.png')} onPress={toFlights} />
          <FlightTrackMenuOption label='Crew Members' icon={require('../assets/HomePage/CrewMembers.png')} onPress={toCrewMembers} />
          <FlightTrackMenuOption label='Planes' icon={require('../assets/HomePage/Planes.png')} onPress={toPlanes} />
          <FlightTrackMenuOption label='Clients' icon={require('../assets/HomePage/Clients.png')} onPress={toClients} />
          <FlightTrackMenuOption label='Principles' icon={require('../assets/HomePage/Principles.png')} onPress={toPrinciples} />
          <FlightTrackMenuOption label='Purposes' icon={require('../assets/HomePage/Purposes.png')} onPress={toPurposes} />
          <FlightTrackMenuOption label='Profile' icon={require('../assets/HomePage/Profile.png')} onPress={toProfile} />
        </View>
      );
    }
    else {
      return (
        <View style={[styles.content, {justifyContent: 'center'}]}>
          <FlightTrackMenuOption label='Record Flight' icon={require('../assets/HomePage/RecordFlight.png')} onPress={toRecordFlightForm} />
          <FlightTrackMenuOption label='Profile' icon={require('../assets/HomePage/Profile.png')} onPress={toProfile} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Home' onBackArrowPress={navigation.goBack} />
      <MenuOptions />
    </View>
  );
}

const center = {
  justifyContent: 'center', 
  alignItems: 'center',
}

const fullSize = {
  width: '100%',
  height: '100%',
}

const styles = StyleSheet.create({
  container: {
    ...fullSize,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: '10%',
  },
});