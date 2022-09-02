import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";
import { FlightTrackDisplay } from "./PageComponents/FlightTrackDisplay";
import { FlightTrackDualDisplay } from "./PageComponents/FlightTrackDualDisplay";
import { FlightTrackDualImageLink } from "./PageComponents/FlightTrackDualImageLink";
import { getCrewMember, getClient, getPrinciple, getPurpose } from "./Firebase/Firestore";


export function Flight({ route, navigation }) {
  const { flight } = route.params;

  const [initializing, setInitializing] = useState(true);
  const [pilot, setPilot] = useState('');
  const [copilot, setCopilot] = useState('');
  const [client, setClient] = useState('');
  const [principle, setPrinciple] = useState('');
  const [purpose, setPurpose] = useState('');

  if (initializing) {
    setInitializing(false);
    getCrewMember(flight.getPilotId()).then(setPilot);
    getCrewMember(flight.getCopilotId()).then(setCopilot);
    getClient(flight.getClientId()).then(setClient);
    getPrinciple(flight.getPrincipleId()).then(setPrinciple);
    getPurpose(flight.getPurposeId()).then(setPurpose);
  }

  const date = new Date(flight.getDate());
  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Flight' onBackArrowPress={navigation.goBack} />
      <FlightTrackDisplay label='Tail Number' data={flight.getTailNumber()} style={styles.firstDisplayField} />
      <FlightTrackDisplay label='Date' data={date.toDateString()} />
      <FlightTrackDisplay label='Departure' data={flight.getDeparture()} />
      <FlightTrackDisplay label='Arrival' data={flight.getArrival()} />
      <FlightTrackDualDisplay label='Hobbs' leftLabel='Out' rightLabel='In' leftData={flight.getHobbs().Out} rightData={flight.getHobbs().In} />
      <FlightTrackDisplay label='Flight Hours' data={flight.getFlightHours()} />
      <FlightTrackDisplay label='APU Hours' data={flight.getApuHours()} />
      <FlightTrackDualDisplay label='Fuel' leftLabel='Out' rightLabel='In' leftData={flight.getFuel().Out} rightData={flight.getFuel().In} />
      <FlightTrackDisplay label='Pilot' data={pilot.name} />
      <FlightTrackDisplay label='Copilot' data={copilot.name} />
      <FlightTrackDisplay label='Client' data={client.name} />
      <FlightTrackDisplay label='Principle' data={principle.name} />
      <FlightTrackDisplay label='Purpose' data={purpose.name} />
      <FlightTrackDisplay label='Landing Fee' data={flight.getLandingFee()} />
      <FlightTrackDualImageLink label='Reciepts' leftLabel='Fuel' rightLabel='Landing' leftUrl={flight.getFuelRecieptUrl()} rightUrl={flight.getLandingRecieptUrl()} style={styles.last} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  firstDisplayField: {
    marginTop: '5%',
  },
  last: {
    marginBottom: '10%',
  },
});