import React, { useState } from "react";
import { StyleSheet, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native';
import { ProgressBar } from "react-native-paper";
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import { FlightTrackDatePicker } from "./PageComponents/FlightTrackDatePicker";
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";
import { FlightTrackNumberInput } from "./PageComponents/FlightTrackNumberInput";
import { FlightTrackPhotoButton } from "./PageComponents/FlightTrackPhotoButton";
import { FlightTrackDropDown } from "./PageComponents/FlightTrackDropDown";
import { FlightTrackDollarInput } from "./PageComponents/FlightTrackDollarInput";
import { FlightTrackDualInput } from "./PageComponents/FlightTrackDualInput";
import { FlightTrackLabeledNumberInput } from "./PageComponents/FlightTrackLabeledNumberInput";
import Flight from "./Firebase/DataStructures/Flight";
import { FlightTrackButton } from "./PageComponents/FlightTrackButton";

import { getPlanes, getCrewMembers, getClients, getPrinciples, getPurposes, getPlane, getMostRecentFlight } from "./Firebase/Firestore";

const newFlight = new Flight({pilotId: 1});

const InitializingBar = ({percent}) => {
  return (
      <View style={{justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
        <ProgressBar
          progress={percent} color="#177cbf" visible={true} style={{width: 300, height: 10}}
        />
      </View>
    );
};

export function RecordFlightForm({navigation}) {
  const [flight, setFlight] = useState(newFlight);
  const [crewMembers, setCrewMembers] = useState([{name: "Jacob", id: 1}, {name: "Hayden", id: 2}, {name: "Luke", id: 3}, {name: "Cruz", id: 4}]);
  const [tailNumbers, setTailNumbers] = useState([]);
  const [clients, setClients] = useState([]);
  const [principles, setPrinciples] = useState([]);
  const [purposes, setPurposes] = useState([]);

  const [initializeState, setInitializeState] = useState(0.0)
  const initializeOptions = async () => {
    let prev = 100;
    for (let i = 1; i < 33; i++) {
      setTimeout(() => {
        setInitializeState(i / 100.0);
      }, prev);
      prev *= 1.03;
    }
    for (let i = 33; i < 66; i++) {
      setTimeout(() => {
        setInitializeState(i / 100.0);
      }, prev);
      prev *= 1.03;
    }
    for (let i = 66; i < 101; i++) {
      setTimeout(() => {
        setInitializeState(i / 100.0);
      }, prev);
      prev *= 1.03;
    }
  };

  if (initializeState >= 1.0) {

  }
  else if (initializeState === 0.0) {
    setInitializeState(0.2);
    initializeOptions();
    return (<InitializingBar percent={initializeState} />);
  }
  else {
    return (<InitializingBar percent={initializeState} />);
  }

  const updateFlight = (callback) => {
    setFlight(callback);
    setTimeout(() => {
      console.log(flight);
    }, 2000);
  };

  const setTailNumber = (newValue) => updateFlight(currentFlight => currentFlight.setTailNumber(newValue));
  const setDate = (newValue) => updateFlight(currentFlight => currentFlight.setDate(newValue));
  const setDeparture = (newValue) => updateFlight(currentFlight => currentFlight.setDeparture(newValue));
  const setArrival = (newValue) => updateFlight(currentFlight => currentFlight.setArrival(newValue));
  const setHobbs = (newValue) => updateFlight(currentFlight => currentFlight.setHobbs(newValue));
  const setFlightHours = (newValue) => updateFlight(currentFlight => currentFlight.setFlightHours(newValue));
  const setApuHours = (newValue) => updateFlight(currentFlight => currentFlight.setApuHours(newValue));
  const setFuel = (newValue) => updateFlight(currentFlight => currentFlight.setFuel(newValue));
  const setGallons = (newValue) => updateFlight(currentFlight => currentFlight.setGallons(newValue));
  const setFuelPrice = (newValue) => updateFlight(currentFlight => currentFlight.setFuelPrice(newValue));
  const setPilotId = (newValue) => updateFlight(currentFlight => currentFlight.setPilotId(newValue));
  const setCopilotId = (newValue) => updateFlight(currentFlight => currentFlight.setCopilotId(newValue));
  const setClientId = (newValue) => updateFlight(currentFlight => currentFlight.setClientId(newValue));
  const setPrincipleId = (newValue) => updateFlight(currentFlight => currentFlight.setPrincipleId(newValue));
  const setPurposeId = (newValue) => updateFlight(currentFlight => currentFlight.setPurposeId(newValue));
  const setLandingFee = (newValue) => updateFlight(currentFlight => currentFlight.setLandingFee(newValue));
  const setReciepts = (newValue) => updateFlight(currentFlight => currentFlight.setReciepts(newValue));

  const clear = () => updateFlight(new Flight({}));
  const submit = () => {};

  const hasApu = false;
  const canSubmit = flight.complete();

  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Record Flight' onBackArrowPress={() => { clear(); navigation.goBack(); }}/>
      <KeyboardAvoidingView style={styles.scrollable} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled={Platform.OS === 'ios'} >
        <ScrollView>
          <View style={styles.formList}>
            <FlightTrackDropDown 
              labelText='Tail Number' 
              color='#010100' 
              options={tailNumbers} 
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
              display={hasApu}
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
              options={crewMembers} 
              data={flight.getPilotId()} 
              onUpdate={setPilotId}
            />
            <FlightTrackDropDown 
              labelText='Second in Command' 
              color='#010100' 
              options={crewMembers} 
              data={flight.getCopilotId()} 
              onUpdate={setCopilotId}
            />
            <FlightTrackDropDown 
              labelText='Client' 
              color='#010100' 
              options={clients} 
              data={flight.getClientId()} 
              onUpdate={setClientId}
            />
            <FlightTrackDropDown 
              labelText='Principle' 
              color='#010100' 
              options={principles} 
              data={flight.getPrincipleId()} 
              onUpdate={setPrincipleId}
            />
            <FlightTrackDropDown 
              labelText='Purpose' 
              color='#010100' 
              options={purposes} 
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
            <FlightTrackButton onPress={submit} style={styles.submit} label='Submit' enabled={canSubmit} />
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
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  formList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollable: {
    flex: 1
  },
  submit: {
    margin: 35,
  },
});
