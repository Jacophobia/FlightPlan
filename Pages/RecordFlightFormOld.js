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

/**
 * Record Flight Form
 * @param props data (type: Flight Object), onSubmit
 * @returns A form which collects info about a single flight
 */
export function RecordFlightForm({navigation, data}) {
  const [flight, setFlight] = useState(data || newFlight);
  const [canSubmit, setCanSubmit] = useState(true);
  const isNewFlight = !data; // to see whether it should auto populate based on the planes last flight

  const [tailNumberOptions, setTailNumberOptions] = useState([]);
  const [crewMemberOptions, setCrewMemberOptions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
  const [principleOptions, setPrincipleOptions] = useState([]);
  const [purposeOptions, setPurposeOptions] = useState([]);
  const [plane, setPlane] = useState({});

  const [initializingOptions, setInitializingOptions] = useState('not-started');
  const initializeOptions = async () => {
    if (tailNumberOptions.length === 0) {
      const planes = await getPlanes();
      setTailNumberOptions(planes);
    }
    if (tailNumberOptions.length === 0) {
      const crewMembers = await getCrewMembers();
      setCrewMemberOptions(crewMembers);
    }
    if (clientOptions.length === 0) {
      const clients = await getClients();
      setClientOptions(clients);
    }
    if (principleOptions.length === 0) {
      const principles = await getPrinciples();
      setPrincipleOptions(principles);
    }
    if (purposeOptions.length === 0) {
      const purposes = await getPurposes();
      setPurposeOptions(purposes);
    }
    setInitializingOptions('done');
  };

  if (initializingOptions === 'done') {

  }
  else if (initializingOptions === 'not-started') {
    setInitializingOptions('initializing');
    initializeOptions();
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
        <ProgressBar
          progress={0.33} color="#177cbf" visible={true} style={{width: 300, height: 10}}
        />
      </View>
    );
  }
  else if (initializingOptions === 'initializing') {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
        <ProgressBar
          progress={0.66} color="#177cbf" visible={true} style={{width: 300, height: 10}}
        />
      </View>
    );
  }

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
    setCanSubmit(false);
    recordFlight(flight)
      .catch(error => console.error(error))
      .then(() => {
        console.log('Flight Uploaded');
        navigation.goBack();
        clear();
        setCanSubmit(true);
    });
  };

  const clear = () => {
    setFlight(new Flight({}));
  };

  const populateFields = async (plane) => {
    const recentFlight = await getMostRecentFlight(plane.id);
    let departure = '';
    let pilotId = {name: '', id: ''};
    let copilotId = {name: '', id: ''};
    let clientId = {name: '', id: ''};
    let principleId = {name: '', id: ''};
    let purposeId = {name: '', id: ''};
    if (!!recentFlight) {
      departure = recentFlight.getArrival();
      pilotId = crewMemberOptions.find(option => option.id === recentFlight.getPilotId());
      copilotId = crewMemberOptions.find(option => option.id === recentFlight.getCopilotId());
      clientId = clientOptions.find(option => option.id === recentFlight.getClientId());
      principleId = principleOptions.find(option => option.id === recentFlight.getPrincipleId());
      purposeId = purposeOptions.find(option => option.id === recentFlight.getPurposeId());
    }
    setDeparture(departure);
    setPilotId(pilotId);
    setCopilotId(copilotId);
    setClientId(clientId);
    setPrincipleId(principleId);
    setPurposeId(purposeId);
  };

  const setTailNumber = async (newVal) => {
    try {
      setFlight(oldFlight => oldFlight.setTailNumber(newVal));
      if (!isNewFlight) {
        return;
      }

      const plane = await getPlane(newVal.id);
      setPlane(plane);
      await populateFields(plane);
    } catch (error) {
      console.error('Error populating fields or getting flight:', error);
    }
  };

  const hasApu = !!plane.apu;

  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Record Flight' onBackArrowPress={() => { clear(); navigation.goBack(); }}/>
      <KeyboardAvoidingView style={styles.scrollable} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled={Platform.OS === 'ios'} >
        <ScrollView>
          <View style={styles.formList}>
            <FlightTrackDropDown 
              labelText='Tail Number' 
              color='#010100' 
              options={tailNumberOptions} 
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
              options={crewMemberOptions} 
              data={flight.getPilotId()} 
              onUpdate={setPilotId}
            />
            <FlightTrackDropDown 
              labelText='Second in Command' 
              color='#010100' 
              options={crewMemberOptions} 
              data={flight.getCopilotId()} 
              onUpdate={setCopilotId}
            />
            <FlightTrackDropDown 
              labelText='Client' 
              color='#010100' 
              options={clientOptions} 
              data={flight.getClientId()} 
              onUpdate={setClientId}
            />
            <FlightTrackDropDown 
              labelText='Principle' 
              color='#010100' 
              options={principleOptions} 
              data={flight.getPrincipleId()} 
              onUpdate={setPrincipleId}
            />
            <FlightTrackDropDown 
              labelText='Purpose' 
              color='#010100' 
              options={purposeOptions} 
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