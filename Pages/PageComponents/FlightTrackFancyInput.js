import React from "react";
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';

export function FlightTrackFancyInput({style, label, value, onUpdate, hide = false, keyboardType = 'ascii-capable'}) {

  const onTextChange = (text) => {
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
  borderBottomColor: 'transparent',
  borderTopColor: '#b0b0b0',
  height: '100%',
}

const topLeft = Platform.OS === 'ios' ? {
  borderLeftWidth: 3.9,
} : {

}

const topRight = Platform.OS === 'ios' ? {

} : {
  marginRight: .5,
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
    ...topLeft,
    width: 16,
    borderTopLeftRadius: 12,
    borderLeftColor: '#b0b0b0',
    borderRightColor: 'transparent',
  },
  label: {
    ...outline,
    marginTop: 3,
    fontSize: 17,
    color: '#000000',
    paddingHorizontal: 5,
  },
  topRight: {
    ...topRight,
    ...outline,
    ...corners,
    flex: 1,
    borderTopRightRadius: 12,
    borderRightColor: '#b0b0b0',
    borderLeftColor: 'transparent',
  },
  input: {
    ...outline,
    ...borders,
    borderColor: '#b0b0b0',
    borderTopColor: 'transparent',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    paddingLeft: 10,
    paddingBottom: Platform.OS === 'ios' ? 8 : 12,
    flex: 1,
    
  },
});