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

import { recordFlight } from "./Firebase/Shared";
import { getPlanes, getCrewMembers, getClients, getPrinciples, getPurposes, getPlane, getMostRecentFlight } from "./Firebase/Firestore";

const newFlight = new Flight({});

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
  const [hasApu, setHasApu] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  //   v v v v Drop Down Options v v v v
  const [tailNumbers, setTailNumbers] = useState([])
  const [crewMembers, setCrewMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const [principles, setPrinciples] = useState([]);
  const [purposes, setPurposes] = useState([]);
  //   ^ ^ ^ ^ Drop Down Options ^ ^ ^ ^

  //   v v v v Initialize Options v v v v
  const [initializePercent, setInitializePercent] = useState(0.0);
  const [initializeState, setInitializeState] = useState('starting');

  const initializeOptions = async () => {
    setInitializeState('initializing');
    setInitializePercent(0.0);

    const planes = await getPlanes();
    setTailNumbers(planes);
    setInitializePercent(0.2);
    const crewMembers = await getCrewMembers();
    setCrewMembers(crewMembers);
    setInitializePercent(0.4);
    const clients = await getClients();
    setClients(clients);
    setInitializePercent(0.6);
    const principles = await getPrinciples();
    setPrinciples(principles);
    setInitializePercent(0.8);
    const purposes = await getPurposes();
    setPurposes(purposes);
    setInitializePercent(1.0);

    setInitializeState('done');
  };
  
  if (initializeState === 'done') {
    
  }
  else if (initializeState === 'starting') {
    initializeOptions();
    return (<InitializingBar percent={initializePercent} />);
  }
  else {
    return (<InitializingBar percent={initializePercent} />);
  }
  //   ^ ^ ^ ^ Initialize Options ^ ^ ^ ^

  //   v v v v Fill Flight Form v v v v
  const updateFlight = (callback) => {
    setFlight(currentFlight => new Flight(callback(currentFlight)));
  };

  const setDate        = (newValue)      => updateFlight(currentFlight => currentFlight.setDate(newValue));
  const setDeparture   = (newValue)      => updateFlight(currentFlight => currentFlight.setDeparture(newValue));
  const setArrival     = (newValue)      => updateFlight(currentFlight => currentFlight.setArrival(newValue));
  const setFlightHours = (newValue)      => updateFlight(currentFlight => currentFlight.setFlightHours(newValue));
  const setApuHours    = (newValue)      => updateFlight(currentFlight => currentFlight.setApuHours(newValue));
  const setGallons     = (newValue)      => updateFlight(currentFlight => currentFlight.setGallons(newValue));
  const setFuelPrice   = (newValue)      => updateFlight(currentFlight => currentFlight.setFuelPrice(newValue));
  const setPilotId     = (newValue)      => updateFlight(currentFlight => currentFlight.setPilotId(newValue));
  const setCopilotId   = (newValue)      => updateFlight(currentFlight => currentFlight.setCopilotId(newValue));
  const setClientId    = (newValue)      => updateFlight(currentFlight => currentFlight.setClientId(newValue));
  const setPrincipleId = (newValue)      => updateFlight(currentFlight => currentFlight.setPrincipleId(newValue));
  const setPurposeId   = (newValue)      => updateFlight(currentFlight => currentFlight.setPurposeId(newValue));
  const setLandingFee  = (newValue)      => updateFlight(currentFlight => currentFlight.setLandingFee(newValue));
  const setHobbs       = ({left, right}) => updateFlight(currentFlight => currentFlight.setHobbs({Out: left, In: right})); 
  const setFuel        = ({left, right}) => updateFlight(currentFlight => currentFlight.setFuel({Out: left, In: right}));
  const setReciepts    = ({left, right}) => updateFlight(currentFlight => currentFlight.setReciepts({Fuel: left, Landing: right}));
  
  const autofill = async tailNumber => {
    const newPlane = await getPlane(tailNumber);
    setHasApu(newPlane);
    const recentFlight = await getMostRecentFlight(tailNumber);
    if (!recentFlight) {
      return;
    }
    setDeparture(recentFlight.getArrival());
    setPilotId(recentFlight.getPilotId());
    setCopilotId(recentFlight.getCopilotId());
    setClientId(recentFlight.getClientId());
    setPrincipleId(recentFlight.getPrincipleId());
    setPurposeId(recentFlight.getPurposeId());
  };

  const setTailNumber = (newValue) => {
    autofill(newValue).catch(error => console.error(error));
    updateFlight(currentFlight => currentFlight.setTailNumber(newValue));
  };

  const clear = () => setFlight(new Flight({}));
  //   ^ ^ ^ ^ Fill Flight Form ^ ^ ^ ^

  const submit = async () => {
    setCanSubmit(false);
    try {
      await recordFlight(flight);
      clear();
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
    setCanSubmit(true);
  };

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
              getLeft={data => data.Out}
              rightField={FlightTrackLabeledNumberInput} 
              rightLabel='In:' 
              getRight={data => data.In}
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
              getLeft={data => data.Out}
              rightField={FlightTrackLabeledNumberInput} 
              rightLabel='In:' 
              getRight={data => data.In}
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
              getRight={data => data.Landing}
              leftField={FlightTrackPhotoButton} 
              leftLabel='Fuel:' 
              getLeft={data => data.Fuel}
              color='#010100'
              data={flight.getReciepts()}
              onUpdate={setReciepts}
            />
            <FlightTrackButton onPress={submit} style={styles.submit} label='Submit' enabled={canSubmit && flight.complete()} />
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
