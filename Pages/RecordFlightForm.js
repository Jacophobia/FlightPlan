import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, View, KeyboardAvoidingView, Button } from 'react-native';
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import { FlightTrackDatePicker } from "./PageComponents/FlightTrackDatePicker";
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";
import { FlightTrackNumberInput } from "./PageComponents/FlightTrackNumberInput";
import { FlightTrackPhotoButton } from "./PageComponents/FlightTrackPhotoButton";
import { FlightTrackDropDown } from "./PageComponents/FlightTrackDropDown";
import { FlightTrackDollarInput } from "./PageComponents/FlightTrackDollarInput";
import { FlightTrackDualInput } from "./PageComponents/FlightTrackDualInput";
import { FlightTrackLabeledNumberInput } from "./PageComponents/FlightTrackLabeledNumberInput";
import Flight from "../DataStructures/Flight";
import { FlightTrackButton } from "./PageComponents/FlightTrackButton";

/**
 * Record Flight Form
 * @param props data (type: Flight Object), onSubmit
 * @returns A form which collects info about a single flight
 */
export function RecordFlightForm(props) {
  const [flight, setFlight] = useState(new Flight({}));

  const setReciepts = ({left, right}) => {
    setFlight(oldFlight => oldFlight.setReciepts({Fuel: left, Landing: right}));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FlightTrackHeader headerText='Record Flight' onBackArrowPress={props.toLogin}/>
      </View>
      <KeyboardAvoidingView style={styles.scrollable}>
        <ScrollView>
          <View style={styles.formList}>
            <FlightTrackDropDown labelText='Tail Number' color='#010100' data={['Tail Number 1', 'Tail Number 2', 'Tail Number 3', 'Tail Number 4', 'Tail Number 5']} />
            <FlightTrackDatePicker labelText='Date' color='#010100' />
            <FlightTrackInput labelText='Departure' icon={require('../assets/DepartingPlane.png')} color='#010100' />
            <FlightTrackInput labelText='Arrival' icon={require('../assets/ArrivingPlane.png')} color='#010100' />
            <FlightTrackDualInput labelText='Hobbs' leftField={FlightTrackLabeledNumberInput} leftLabel='Out:' rightField={FlightTrackLabeledNumberInput} rightLabel='In:' color='#010100' />
            <FlightTrackNumberInput labelText='Flight Hours' color='#010100' />
            <FlightTrackNumberInput labelText='APU Hours' color='#010100' />
            <FlightTrackDualInput labelText='Fuel' leftField={FlightTrackLabeledNumberInput} leftLabel='Out:' rightField={FlightTrackLabeledNumberInput} rightLabel='In:' color='#010100' />
            <FlightTrackNumberInput labelText='Gallons' color='#010100' />
            <FlightTrackDollarInput labelText='Fuel Price' color='#010100' />
            <FlightTrackDropDown labelText='Pilot in Command' color='#010100' data={['Crew Member 1', 'Crew Member 2', 'Crew Member 3', 'Crew Member 4', 'Crew Member 5']} />
            <FlightTrackDropDown labelText='Second in Command' color='#010100' data={['Crew Member 1', 'Crew Member 2', 'Crew Member 3', 'Crew Member 4', 'Crew Member 5']} />
            <FlightTrackDropDown labelText='Client' color='#010100' data={['Client 1', 'Client 2', 'Client 3', 'Client 4', 'Client 5']} />
            <FlightTrackDropDown labelText='Principle' color='#010100' data={['Principle 1', 'Principle 2', 'Principle 3', 'Principle 4', 'Principle 5']} />
            <FlightTrackDropDown labelText='Purpose' color='#010100' data={['Purpose 1', 'Purpose 2', 'Purpose 3', 'Purpose 4', 'Purpose 5']} />
            <FlightTrackDollarInput labelText='Landing Fee' color='#010100' />
            <FlightTrackDualInput 
              rightField={FlightTrackPhotoButton} 
              rightLabel='Landing:' 
              leftField={FlightTrackPhotoButton} 
              leftLabel='Fuel:' 
              onUpdate={setReciepts} 
              color='#010100'
            />
            <FlightTrackButton onPress={() => console.log(flight)} title='Submit' />
            <Text>Record Flight Form Not Yet Complete</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  formList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollable: {
    flex: 3.9,
  },
  header: {
    flex: 1,
  },
});