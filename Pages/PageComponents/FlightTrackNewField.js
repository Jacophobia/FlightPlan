import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Dialog, Portal, TextInput } from 'react-native-paper';
import { FlightTrackButton } from "./FlightTrackButton";

export function FlightTrackNewField({ onSubmit, fields, Label }) {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState({});

  const RenderFields = ({fields, setData}) => {
    return fields.map(field => {
      const onChangeText = (newText) => {
        setData(curr => { 
          curr[field] = newText; 
          return {...curr,}; 
        })
      }
      return (
        <View style={styles.horizontalCentered}>
          <View style={styles.inputContainer}>
            <Text style={styles.fieldName}>{field}:</Text>
          </View>
          <Dialog.Actions style={styles.inputContainer}>
            <TextInput value={data[field]} onChangeText={onChangeText} style={styles.input} />
          </Dialog.Actions>
        </View>
      );
    });
  };

  const submit = () => {
    onSubmit(data);
    setIsOpen(false);
  };

  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={() => setIsOpen(false)} style={styles.dialog}>
        <Text style={styles.label}>Hello World</Text>
        <RenderFields fields={fields} setData={setData} />
        <View style={styles.horizontalCentered}>
          <FlightTrackButton onPress={() => setIsOpen(false)} label='Cancel' style={styles.button} />
          <FlightTrackButton onPress={submit} label='Submit' style={styles.button} />
        </View>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 35,
  },
  label: {
    marginBottom: '5%',
  },
  fieldName: {

  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfdfd'
  },
  input: {
    width: '90%',
    backgroundColor: 'red'
  },
  horizontalCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button: {
    width: '40%',
  },
});