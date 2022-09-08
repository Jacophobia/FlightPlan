import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { FlightTrackButton } from "./FlightTrackButton";

/**
 * Flight Track Editable
 * @param onSubmit function with arity of one. Put the user account into there once you are finished.
 */
export function FlightTrackEditable({ style, onSubmit, onDelete, data, key }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(data.name);

  const submit = () => {
    if (editing) {
      onSubmit({name: name});
    }
    setEditing(!editing);
  };

  const deleteEditable = () => {
    if (editing) {
      onDelete();
    }
  };

  return (
    <View key={key} style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <View style={styles.name}>
          <Text style={styles.nameLabel}>Name:</Text>
          <TextInput style={styles.nameInput} value={name} onChangeText={setName} editable={editing} textAlign='center' textAlignVertical='top' multiline={true} />
        </View>
      </View>
      <FlightTrackButton style={styles.submit} onPress={submit} label={editing ? 'Submit' : 'Edit'}  />
      <FlightTrackButton style={[styles.submit, {backgroundColor: editing ? 'red' : 'gray',}]} onPress={deleteEditable} label='delete' enabled={editing} />
    </View>
  );
}

const outline = {
  borderWidth: 1,
  borderColor: 'red',
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 90,
    margin: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#4C71C7',
    borderWidth: 3,
    borderRadius: 18,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  nameLabel: {
    flex: 1,
    textAlign: 'center',
  },
  nameInput: {
    flex: 1,
  },
  submit: {
    width: '21%',
    marginRight: '1.5%',
  },
});