import React from "react";
import { StyleSheet } from 'react-native';
import { FlightTrackInput } from "./FlightTrackInput";

/**
 * Flight Track Number Input
 * @props data, labelText, color, onUpdate
 * @returns A Text Input With FlightTrack Custom Styling
 */
export function FlightTrackNumberInput(props) {
  return (
    <FlightTrackInput
      data={props.data}
      labelText={props.labelText}
      color={props.color}
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