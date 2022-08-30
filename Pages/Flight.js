import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";
import { FlightTrackDisplay } from "./PageComponents/FlightTrackDisplay";
import { FlightTrackDualDisplay } from "./PageComponents/FlightTrackDualDisplay";
import { FlightTrackDualImageLink } from "./PageComponents/FlightTrackDualImageLink";

export function Flight({ route, navigation }) {
  const { flight } = route.params;

  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Flight' onBackArrowPress={navigation.goBack} />
      <FlightTrackDisplay label='Tail Number' data={flight.getTailNumber()} style={styles.firstDisplayField} />
      <FlightTrackDisplay label='Date' data={flight.getDate().toLocaleDateString()} />
      <FlightTrackDisplay label='Departure' data={flight.getDeparture()} />
      <FlightTrackDisplay label='Arrival' data={flight.getArrival()} />
      <FlightTrackDualDisplay label='Hobbs' leftLabel='Out' rightLabel='In' leftData={flight.getHobbs().Out} rightData={flight.getHobbs().In} />
      <FlightTrackDisplay label='Flight Hours' data={flight.getFlightHours()} />
      <FlightTrackDisplay label='APU Hours' data={flight.getApuHours()} />
      <FlightTrackDualDisplay label='Fuel' leftLabel='Out' rightLabel='In' leftData={flight.getFuel().Out} rightData={flight.getFuel().In} />
      <FlightTrackDisplay label='Pilot' data={flight.getPilotId()} />
      <FlightTrackDisplay label='Copilot' data={flight.getCopilotId()} />
      <FlightTrackDisplay label='Client' data={flight.getClientId()} />
      <FlightTrackDisplay label='Principle' data={flight.getPrincipleId()} />
      <FlightTrackDisplay label='Purpose' data={flight.getPurposeId()} />
      <FlightTrackDisplay label='Landing Fee' data={flight.getLandingFee()} />
      <FlightTrackDualImageLink label='Reciepts' leftLabel='Fuel' rightLabel='Landing' leftUrl={flight.getFuelRecieptUrl()} rightUrl={flight.getLandingRecieptUrl()} />
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
});