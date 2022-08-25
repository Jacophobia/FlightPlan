import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera } from "react-native-image-picker";

export function FlightTrackFancyInput({style, label, onUpdate, hide = false, data, keyboardType = 'ascii-capable'}) {
  const [value, setValue] = useState(data || '');

  const onTextChange = (text) => {
    setValue(text);
    onUpdate(text);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header} >
        <View style={styles.topLeft} />
        <Text style={styles.label} >{label}</Text>
        <View style={styles.topRight} />
      </View>
      <TextInput 
        style={styles.input} 
        secureTextEntry={hide} 
        onChangeText={onTextChange} 
        value={value}
        keyboardType={keyboardType}
        autoCorrect={false}
        textContentType='oneTimeCode'
      />
    </View>
  );
}

const outline = {
  // borderWidth: 1,
  // borderColor: 'red',
}

const borders = {
  borderWidth: 2.5,
}

const corners = {
  ...borders,
  marginTop: 15,
  borderColor: 'transparent',
  borderTopColor: '#b0b0b0',
  height: '100%',
}

const styles = StyleSheet.create({
  container: {
    ...outline,
    width: '90%',
    height: 70,
  },
  header: {
    ...outline,
    flexDirection: 'row',
  },
  topLeft: {
    ...outline,
    ...corners,
    width: 16,
    borderLeftWidth: 3.9,
    borderTopLeftRadius: 12,
    borderLeftColor: '#b0b0b0',
  },
  label: {
    ...outline,
    marginTop: 3,
    fontSize: 17,
    color: '#b0b0b0',
    paddingHorizontal: 5,
  },
  topRight: {
    ...outline,
    ...corners,
    flex: 1,
    borderTopRightRadius: 12,
    borderRightColor: '#b0b0b0',
  },
  input: {
    ...outline,
    ...borders,
    borderColor: '#b0b0b0',
    borderTopColor: 'transparent',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    paddingLeft: 10,
    paddingBottom: 8,
    flex: 1,
    
  },
});