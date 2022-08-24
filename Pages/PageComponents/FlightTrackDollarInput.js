import React from "react";
import { StyleSheet } from 'react-native';
import { FlightTrackInput } from "./FlightTrackInput";

/**
 * Flight Track Number Input
 * @props data, labelText, color, onUpdate
 * @returns A Text Input With FlightTrack Custom Styling
 */
export function FlightTrackDollarInput(props) {

  const onUpdate = (value) => {
    if (!!props.onUpdate) {
      props.onUpdate(Math.round(Number(value) * 100));
    }
  }

  return (
    <FlightTrackInput
      data={props.data || ""}
      labelText={props.labelText}
      color={props.color}
      icon={require('../../assets/DollarSign.png')}
      iconScale={60}
      keyboardType='numeric'
      onUpdate={onUpdate}
      align='right'
    />
  );
}

const styles = StyleSheet.create({

});