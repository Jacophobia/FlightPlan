import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
// import { TextInput } from 'react-native-paper';



/**
 * Flight Track Input
 * @props initialValue, labelText, iconName
 * @returns A Text Input With FlightTrack Custom Styling
 */
export function FlightTrackInput(props) {
  const [text, setText] = useState(props.initialValue || "");
  
  return (
    <View style={styles.inputContainer}>
      <View style={styles.label}>
        <Text>{props.labelText || "No label prop provided"}</Text>
      </View>
      <TextInput style={styles.input} onChangeText={setText} value={text} />
      <Image style={styles.logo} source={require("../../assets/Logo.png")} />
    </View>
  );











  return (
    <View style={styles.usernameContainer}>
      <View style={styles.divider} />
      <TextInput
        label={props.labelText || "No Label ;-;"}
        value={text}
        onChangeText={text => setText(text)}
        mode='outlined'
        activeOutlineColor="gray"
        right={<TextInput.Icon name={props.iconName} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    height: 55,
    marginTop: 10,
    paddingBottom: 50,
    borderWidth: 2.5,
    borderColor: 'gray',
    borderRadius: 12,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignContent: 'center',
    
  },
  label: {
    position: 'absolute',
    left: 10,
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 2,
  },
  input: {
    // borderColor: 'red',
    // borderWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '85%',
    marginLeft: 3,
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    marginRight: 2.5,
  },
});