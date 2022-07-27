import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput, Image } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";

/**
 * Flight Track Input
 * @props initialValue, labelText, icon
 * @returns A Text Input With FlightTrack Custom Styling
 */
export function FlightTrackInput(props) {
  const [inputText, setInputText] = useState("Hello From Flight Tracker Input!")

  return (
    <View style={styles.container}>
      <Text></Text>
      <Pressable style={styles.button} onPress={() => console.log(inputText)}>
        <TextInput 
          onChangeText={newText => setInputText(newText)} 
          placeholder={props.initialValue}
        >
          {inputText}
          
        </TextInput>
        <View style={styles.iconContainer}>
          {
            () => {
              if (props.icon) {
                return (
                  <Image 
                    source={props.icon} 
                    style={styles.icon}
                  />
                );
              }
              return (<></>);
            }
          }
          
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 2.5,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderWidth: 2.5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  iconContainer: {
    marginLeft: 10,
  },
});