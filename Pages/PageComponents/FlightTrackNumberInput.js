import React from "react";
import { StyleSheet } from 'react-native';
import { FlightTrackInput } from "./FlightTrackInput";

/**
 * Flight Track Number Input
 * @props data, labelText, color, onUpdate, display
 * @returns A Text Input With FlightTrack Custom Styling
 */
export function FlightTrackNumberInput({display = true, data, labelText, color, onUpdate}) {
  if (display) {
    return (
      <FlightTrackInput
        data={data}
        labelText={labelText}
        color={color}
        icon={require('../../assets/NumberSign.png')}
        iconScale={45}
        keyboardType='numeric'
        onUpdate={onUpdate}
        align='right'
      />
    );
  }
  return (
    <></>
  );
}

const styles = StyleSheet.create({

});