import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
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
    <View>
      <FlightTrackHeader />
      <FlightTrackDatePicker />
      <FlightTrackNumberInput />
      <FlightTrackPhotoButton />
      <FlightTrackDropDown />
      <FlightTrackInput />
      <Text>Record Flight Form Not Yet Initialized</Text>
    </View>
  );
}

const styles = StyleSheet.create({

});