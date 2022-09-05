import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Checkbox } from "react-native-paper";
import { FlightTrackButton } from "./FlightTrackButton";

/**
 * Flight Track Editable
 * @param onSubmit function with arity of one. Put the user account into there once you are finished.
 */
export function FlightTrackCrewMember({ style, onSubmit, data, key }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(data.name);
  const [admin, setAdmin] = useState(data.admin);

  const submit = () => {
    if (editing) {
      onSubmit({name: name, admin: admin});
    }
    setEditing(!editing);
  };

  return (
    <View key={key} style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <View style={styles.name}>
          <Text style={styles.nameLabel}>Name:</Text>
          <TextInput style={styles.nameInput} value={name} onChangeText={setName} editable={editing} textAlign='center' />
        </View>
        <View style={styles.admin}>
          <Text style={styles.adminLabel}>Admin:</Text>
          <View style={styles.adminInput}>
            <Checkbox status={admin ? 'checked' : 'unchecked'} onPress={() => setAdmin(curr => !curr)} disabled={!editing} color='#4C71C7' />
          </View>
        </View>
      </View>
      <FlightTrackButton style={styles.submit} onPress={submit} label={editing ? 'Submit' : 'Edit'}  />
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
    borderWidth: 1.5,
    borderColor: '#4C71C7',
    borderRadius: 12,
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
    width: '25%',
    margin: '4%',
  },
});