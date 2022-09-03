import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';

/**
 * Flight Track Labeled Number Input
 * @param props label, data, onUpdate
 * @returns A small numerical input with a label
 */
export function FlightTrackLabeledNumberInput(props) {
  const onUpdate = (textValue) => {
    let number = '';
    let decimalCount = 0;
    for (const val of textValue) {
      let numVal = Number(val);
      if (val === ' ') {
        continue;
      }
      if (val === '.') {
        decimalCount += 1;
        if (decimalCount > 1) {
          continue;
        }
      }
      else if (numVal < 0 || numVal > 9 || (numVal !== 0 && !numVal)) {
        continue;
      }
      number += val;
    }
    props.onUpdate(number);
  };

  return (
    <View style={styles.container}>
      <Text style={{color: props.color}}>{props.label || ''}</Text>
      <View style={styles.textContainer}>
        <TextInput 
          style={styles.text} 
          value={props.data} 
          onChangeText={onUpdate} 
          keyboardType='numeric' 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    width: '40%',
  },
  textContainer: {
    height: Platform.OS === 'ios' ? '100%' : '75%',
    width: '40%',
    marginLeft: 10,
    marginRight: 20,
    marginTop: Platform.OS === 'ios' ? 0 : 14,
    backgroundColor: 'transparent',
    margin: Platform.OS === 'ios' ? 0 : 10,
  },
  text: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
});