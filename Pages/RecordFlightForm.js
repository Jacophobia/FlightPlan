import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, View, Image, KeyboardAvoidingView } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import LinearGradient from 'react-native-linear-gradient';
import { FlightTrackDatePicker } from "./PageComponents/FlightTrackDatePicker";
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";
import { FlightTrackNumberInput } from "./PageComponents/FlightTrackNumberInput";
import { FlightTrackPhotoButton } from "./PageComponents/FlightTrackPhotoButton";
import { FlightTrackDropDown } from "./PageComponents/FlightTrackDropDown";

export function RecordFlightForm(props) {
  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Flights' />
      <ScrollView>
        <KeyboardAvoidingView style={styles.formList}>
          <FlightTrackDatePicker />
          <FlightTrackNumberInput />
          <FlightTrackPhotoButton />
          <FlightTrackDropDown />
          <Text>Record Flight Form Not Yet Initialized</Text>
          <FlightTrackInput iconPath={true} />
          <FlightTrackInput />
          <FlightTrackInput />
          <FlightTrackInput />
          <FlightTrackInput />
          <FlightTrackInput />
          <FlightTrackInput />
          <FlightTrackInput />
          <FlightTrackInput />
          <FlightTrackInput />
          <FlightTrackInput />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  formList: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
});