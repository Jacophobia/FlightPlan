import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Checkbox } from "react-native-paper";
import { FlightTrackButton } from "./FlightTrackButton";

/**
 * Flight Track Editable
 * @param onSubmit function with arity of one. Put the user account into there once you are finished.
 */
export function FlightTrackDualEditable({ style, onSubmit, onDelete, data, key, field1 = 'Name:', field2 = 'Admin:' }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(data.first || data.name);
  const [admin, setAdmin] = useState(data.second || data.admin);

  const submit = () => {
    if (editing) {
      onSubmit({first: name, second: admin});
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
          <Text style={styles.nameLabel}>{field1}</Text>
          <TextInput style={styles.nameInput} value={name} onChangeText={setName} editable={editing} textAlign='center' multiline={true} />
        </View>
        <View style={styles.admin}>
          <Text style={styles.adminLabel}>{field2}</Text>
          <View style={styles.adminInput}>
            <Checkbox status={admin ? 'checked' : 'unchecked'} onPress={() => setAdmin(curr => !curr)} disabled={!editing} color='#4C71C7' />
          </View>
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
  admin: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  adminLabel: {
    flex: 1,
    textAlign: 'center',
  },
  adminInput: {
    flex: 1,
    alignItems: 'center',
  },
  submit: {
    width: '21%',
    marginRight: '1.5%',
  },
});