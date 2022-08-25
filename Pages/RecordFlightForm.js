import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, View, KeyboardAvoidingView, Button, Platform } from 'react-native';
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

  const setTailNumber = (newVal) => {
    setFlight(oldFlight => oldFlight.setTailNumber(newVal));
  };
  const setDate = (newVal) => {
    setFlight(oldFlight => oldFlight.setDate(newVal));
  };
  const setDeparture = (newVal) => {
    setFlight(oldFlight => oldFlight.setDeparture(newVal));
  };
  const setArrival = (newVal) => {
    setFlight(oldFlight => oldFlight.setArrival(newVal));
  };
  const setHobbs = ({left, right}) => {
    setFlight(oldFlight => oldFlight.setHobbs({Out: left, In: right}));
  };
  const setFlightHours = (newVal) => {
    setFlight(oldFlight => oldFlight.setFlightHours(newVal));
  };
  const setApuHours = (newVal) => {
    setFlight(oldFlight => oldFlight.setApuHours(newVal));
  };
  const setFuel = ({left, right}) => {
    setFlight(oldFlight => oldFlight.setFuel({Out: left, In: right}));
  };
  const setGallons = (newVal) => {
    setFlight(oldFlight => oldFlight.setGallons(newVal));
  };
  const setFuelPrice = (newVal) => {
    setFlight(oldFlight => oldFlight.setFuelPrice(newVal));
  };
  const setPilotId = (newVal) => {
    setFlight(oldFlight => oldFlight.setPilotId(newVal));
  };
  const setCopilotId = (newVal) => {
    setFlight(oldFlight => oldFlight.setCopilotId(newVal));
  };
  const setClientId = (newVal) => {
    setFlight(oldFlight => oldFlight.setClientId(newVal));
  };
  const setPrincipleId = (newVal) => {
    setFlight(oldFlight => oldFlight.setPrincipleId(newVal));
  };
  const setPurposeId = (newVal) => {
    setFlight(oldFlight => oldFlight.setPurposeId(newVal));
  };
  const setLandingFee = (newVal) => {
    setFlight(oldFlight => oldFlight.setLandingFee(newVal));
  };
  const setReciepts = ({left, right}) => {
    setFlight(oldFlight => oldFlight.setReciepts({Fuel: left, Landing: right}));
  };
  const submit = () => {
    console.log(flight);
    alert('Not yet implemented');
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FlightTrackHeader headerText='Record Flight' onBackArrowPress={() => {props.navigate.login(); alert('Not yet implemented')}}/>
      </View>
      <KeyboardAvoidingView style={styles.scrollable}>
        <ScrollView>
          <View style={styles.formList}>
            <FlightTrackDropDown 
              labelText='Tail Number' 
              color='#010100' 
              options={[{name: 'Tail Number 1', id: '1'}, {name: 'Tail Number 2', id: '2'}, {name: 'Tail Number 3', id: '3'}, {name: 'Tail Number 4', id: '4'}, {name: 'Tail Number 5', id: '5'}]} 
              data={flight.getTailNumber()} 
              onUpdate={setTailNumber}
            />
            <FlightTrackDatePicker 
              labelText='Date' 
              color='#010100' 
              data={flight.getDate()} 
              onUpdate={setDate}
            />
            <FlightTrackInput 
              labelText='Departure' 
              icon={require('../assets/DepartingPlane.png')} 
              color='#010100' 
              data={flight.getDeparture()} 
              onUpdate={setDeparture}
            />
            <FlightTrackInput 
              labelText='Arrival' 
              icon={require('../assets/ArrivingPlane.png')} 
              color='#010100' 
              data={flight.getArrival()} 
              onUpdate={setArrival}
            />
            <FlightTrackDualInput 
              labelText='Hobbs' 
              leftField={FlightTrackLabeledNumberInput}
              leftLabel='Out:' 
              rightField={FlightTrackLabeledNumberInput} 
              rightLabel='In:' 
              color='#010100' 
              data={flight.getHobbs()} 
              onUpdate={setHobbs}
            />
            <FlightTrackNumberInput 
              labelText='Flight Hours' 
              color='#010100' 
              data={flight.getFlightHours()} 
              onUpdate={setFlightHours}
            />
            <FlightTrackNumberInput 
              labelText='APU Hours' 
              color='#010100' 
              data={flight.getApuHours()} 
              onUpdate={setApuHours}
            />
            <FlightTrackDualInput 
              labelText='Fuel' 
              leftField={FlightTrackLabeledNumberInput} 
              leftLabel='Out:' 
              rightField={FlightTrackLabeledNumberInput} 
              rightLabel='In:' 
              color='#010100' 
              data={flight.getFuel()} 
              onUpdate={setFuel}
            />
            <FlightTrackNumberInput 
              labelText='Gallons' 
              color='#010100' 
              data={flight.getGallons()}  
              onUpdate={setGallons}
            />
            <FlightTrackDollarInput 
              labelText='Fuel Price' 
              color='#010100' 
              data={flight.getFuelPrice()} 
              onUpdate={setFuelPrice} // cents
            />
            <FlightTrackDropDown 
              labelText='Pilot in Command' 
              color='#010100' 
              options={[{name: 'Crew Member 1', id: '1'}, {name: 'Crew Member 2', id: '2'}, {name: 'Crew Member 3', id: '3'}, {name: 'Crew Member 4', id: '4'}, {name: 'Crew Member 5', id: '5'}]} 
              data={flight.getPilotId()} 
              onUpdate={setPilotId}
            />
            <FlightTrackDropDown 
              labelText='Second in Command' 
              color='#010100' 
              options={[{name: 'Crew Member 1', id: '1'}, {name: 'Crew Member 2', id: '2'}, {name: 'Crew Member 3', id: '3'}, {name: 'Crew Member 4', id: '4'}, {name: 'Crew Member 5', id: '5'}]} 
              data={flight.getCopilotId()} 
              onUpdate={setCopilotId}
            />
            <FlightTrackDropDown 
              labelText='Client' 
              color='#010100' 
              options={[{name: 'Client 1', id: '1'}, {name: 'Client 2', id: '2'}, {name: 'Client 3', id: '3'}, {name: 'Client 4', id: '4'}, {name: 'Client 5', id: '5'}]} 
              data={flight.getClientId()} 
              onUpdate={setClientId}
            />
            <FlightTrackDropDown 
              labelText='Principle' 
              color='#010100' 
              options={[{name: 'Principle 1', id: '1'}, {name: 'Principle 2', id: '2'}, {name: 'Principle 3', id: '3'}, {name: 'Principle 4', id: '4'}, {name: 'Principle 5', id: '5'}]} 
              data={flight.getPrincipleId()} 
              onUpdate={setPrincipleId}
            />
            <FlightTrackDropDown 
              labelText='Purpose' 
              color='#010100' 
              options={[{name: 'Purpose 1', id: '1'}, {name: 'Purpose 2', id: '2'}, {name: 'Purpose 3', id: '3'}, {name: 'Purpose 4', id: '4'}, {name: 'Purpose 5', id: '5'}]} 
              data={flight.getPurposeId()} 
              onUpdate={setPurposeId}
            />
            <FlightTrackDollarInput 
              labelText='Landing Fee'
              color='#010100' 
              data={flight.getLandingFee()} 
              onUpdate={setLandingFee}
            />
            <FlightTrackDualInput 
              labelText='Reciepts'
              rightField={FlightTrackPhotoButton} 
              rightLabel='Landing:' 
              leftField={FlightTrackPhotoButton} 
              leftLabel='Fuel:' 
              color='#010100'
              data={flight.getReciepts()}
              onUpdate={setReciepts}
            />
            <FlightTrackButton onPress={submit} style={styles.submit} title='Submit' />
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
    flex: Platform.OS === 'ios' ? 6.0 : 3.9,
  },
  header: {
    flex: 1,
  },
  submit: {
    margin: 35,
  },
});