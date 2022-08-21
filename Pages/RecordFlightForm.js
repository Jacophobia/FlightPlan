import React from "react";
import { StyleSheet, Text, ScrollView, View, Image, KeyboardAvoidingView } from 'react-native';
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import { FlightTrackDatePicker } from "./PageComponents/FlightTrackDatePicker";
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";
import { FlightTrackNumberInput } from "./PageComponents/FlightTrackNumberInput";
import { FlightTrackPhotoButton } from "./PageComponents/FlightTrackPhotoButton";
import { FlightTrackDropDown } from "./PageComponents/FlightTrackDropDown";
import { FlightTrackDollarInput } from "./PageComponents/FlightTrackDollarInput";
import { launchCamera } from "react-native-image-picker";

export function RecordFlightForm(props) {
  const openCamera = () => {
    launchCamera({includeBase64: true, mediaType: 'photo', quality: 0.5}).then(data => console.log(data));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FlightTrackHeader headerText='Record Flight' onBackArrowPress={openCamera}/>
      </View>
      <KeyboardAvoidingView style={styles.scrollable}>
        <ScrollView>
          <View style={styles.formList}>
            <FlightTrackInput labelText='Tail Number' icon={require('../assets/DropDownArrow.png')} labelColor='#010100' validate={value => value != 'panda'} />
            <FlightTrackInput labelText='Date' icon={require('../assets/Calendar.png')} labelColor='#010100' />
            <FlightTrackDropDown data={['Option 1', 'Option 2', 'Option 3', 'Option 4']} onUpdate={console.log} />
            <FlightTrackInput labelText='Departure' icon={require('../assets/DepartingPlane.png')} labelColor='#010100' />
            <FlightTrackInput labelText='Arrival' icon={require('../assets/ArrivingPlane.png')} labelColor='#010100' />
            <FlightTrackInput labelText='Hobbs' labelColor='#010100' />
            <FlightTrackNumberInput labelText='Flight Hours' icon={require('../assets/NumberSign.png')} labelColor='#010100' />
            <FlightTrackNumberInput labelText='APU Hours' icon={require('../assets/NumberSign.png')} labelColor='#010100' />
            <FlightTrackInput labelText='Fuel' labelColor='#010100' />
            <FlightTrackNumberInput labelText='Gallons' icon={require('../assets/NumberSign.png')} labelColor='#010100' />
            <FlightTrackDollarInput labelText='Fuel Price' labelColor='#010100' />
            <FlightTrackInput labelText='Pilot in Command' icon={require('../assets/DropDownArrow.png')} labelColor='#010100' />
            <FlightTrackInput labelText='Second in Command' icon={require('../assets/DropDownArrow.png')} labelColor='#010100' />
            <FlightTrackInput labelText='Client' icon={require('../assets/DropDownArrow.png')} labelColor='#010100' />
            <FlightTrackInput labelText='Principle' icon={require('../assets/DropDownArrow.png')} labelColor='#010100' />
            <FlightTrackInput labelText='Purpose' icon={require('../assets/DropDownArrow.png')} labelColor='#010100' />
            <FlightTrackDollarInput labelText='Landing Fee' labelColor='#010100' />
            <FlightTrackInput labelText='Receipts' icon={require('../assets/Camera.png')} labelColor='#010100' />
            <FlightTrackDatePicker />
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