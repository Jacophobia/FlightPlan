import React from "react";
import { StyleSheet } from 'react-native';
import { FlightTrackInput } from "./FlightTrackInput";

/**
 * Flight Track Number Input
 * @props initialValue, labelText, labelColor, onUpdate
 * @returns A Text Input With FlightTrack Custom Styling
 */
export function FlightTrackNumberInput(props) {
  return (
    <FlightTrackInput
      initialValue={props.initialValue}
      labelText={props.labelText}
      labelColor={props.labelColor}
      icon={require('../../assets/NumberSign.png')}
      iconScale={45}
      keyboardType='numeric'
      onUpdate={props.onUpdate}
      align='right'
    />
  );
}

const styles = StyleSheet.create({

});