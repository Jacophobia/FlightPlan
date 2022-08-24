import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera } from "react-native-image-picker";

/**
 * Flight Track Labeled Number Input
 * @param props label, data, onUpdate
 * @returns A small numerical input with a label
 */
export function FlightTrackLabeledNumberInput(props) {
  const [value, setValue] = useState(props.data || '');

  const onUpdate = newValue => {
    setValue(curr => {
      let decimalCount = 0;
      for (const val of newValue) {
        let numVal = Number(val);
        if (val === ' ') {
          props.onUpdate(curr);
          return curr;
        }
        if (val === '.') {
          decimalCount += 1;
          if (decimalCount > 1) {
            props.onUpdate(curr);
            return curr;
          }
        }
        else if (numVal < 0 || numVal > 9 || (numVal !== 0 && !numVal)) {
          props.onUpdate(curr);
          return curr;
        }
      }
      props.onUpdate(newValue);
      return newValue;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{color: props.color}}>{props.label || ''}</Text>
      <View style={styles.textContainer}>
        <TextInput 
          style={styles.text} 
          value={value} 
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
    height: '75%',
    width: '40%',
    marginLeft: 10,
    marginRight: 20,
    marginTop: 14,
    backgroundColor: 'transparent',
    margin: 10,
  },
  text: {
    backgroundColor: 'transparent',
  },
});