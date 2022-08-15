import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import FlightTrackDatePickerDialog from "./FlightTrackDatePickerDialog";


export function FlightTrackDatePicker(props) {
  const [text, setText] = useState(props.initialValue || "");

  const onUpdate = (textValue) => {
    setText(textValue);
    props.onUpdate(text);
  };

  const getIcon = () => {
    if (!!props.icon) {
      return (
        <Image style={styles.icon} source={props.icon} />
      );
    }
    return (<></>);
  };
  
  return (
    <View style={styles.inputContainer}>
      <View style={styles.label}>
        <Text 
          style={[styles.labelText, !!props.labelColor ? {color: props.labelColor} : {}]}
        >
          {props.labelText || "No label prop provided"}
          </Text>
      </View>
      <TextInput style={styles.input} onChangeText={onUpdate} value={text} />
      {getIcon()}
      <FlightTrackDatePickerDialog />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    height: 55,
    marginTop: 15,
    paddingBottom: 50,
    borderWidth: 2.5,
    borderColor: '#b0b0b0',
    borderRadius: 12,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'flex-end',
    
  },
  label: {
    position: 'absolute',
    left: 16,
    top: -13,
    backgroundColor: 'white',
    paddingHorizontal: 2,
  },
  labelText: {
    fontSize: 17,
    color: '#b0b0b0',
  },
  input: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '85%',
    marginLeft: 3,
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    marginRight: 2.5,
  },
});