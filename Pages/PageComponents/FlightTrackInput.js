import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { TextInput } from 'react-native-paper';



/**
 * Flight Track Input
 * @props initialValue, labelText, iconName
 * @returns A Text Input With FlightTrack Custom Styling
 */
export function FlightTrackInput(props) {
  const [text, setText] = useState(props.initialValue || "");
  
  return (
    <View style={styles.usernameContainer}>
      <View style={styles.divider} />
      <TextInput
        label={props.labelText || "No Label ;-;"}
        value={text}
        onChangeText={text => setText(text)}
        style={styles.username}
        mode='outlined'
        activeOutlineColor="gray"
        right={<TextInput.Icon name={props.iconName} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  usernameContainer: {
    width: 250,
  },
  username: {
    // todo: round corners and see if you can get label to
    //  stay in the top left
  },
  divider: {
    height: 10,
  },
});