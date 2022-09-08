import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { Dialog, Portal, Checkbox } from 'react-native-paper';
import { FlightTrackButton } from "./FlightTrackButton";
import Icon from "react-native-vector-icons/FontAwesome";

export function FlightTrackNewField({ onSubmit, fields, label }) {
  const [isOpen, setIsOpen] = useState(false);

  const RenderFields = ({fields}) => {
    const [data, setData] = useState({});

    const submit = () => {
      onSubmit(data);
      setIsOpen(false);
    };

    return (
      <>
        {
          fields.map(field => {
            const splitField = field.split(':');
            let isBool = false;

            if (splitField.length > 1) {
              field = splitField[1];
              isBool = splitField[0] === 'bool';
            }

            const onChangeText = (newText) => {
              setData(curr => {
                curr[field] = newText; 
                return { ...curr }; 
              })
            };

            const onCheckBoxPress = () => {
              setData(curr => {
                curr[field] = !curr[field]; 
                return { ...curr }; 
              });
            }

            return (
              <View key={field} style={styles.horizontalCentered}>
                <View style={styles.inputLabel}>
                  <Text style={styles.fieldName}>{field}:</Text>
                </View>
                <View style={styles.inputContainer}>
                  {
                    isBool ?
                      <Checkbox
                        status={data[field] ? 'checked' : 'unchecked'}
                        onPress={onCheckBoxPress}
                        color='#4C71C7'
                      />
                    :
                      <TextInput
                        value={data[field]}
                        onChangeText={newVal => onChangeText(newVal)}
                        style={styles.input}
                      />
                  }
                </View>
              </View>
          );})
        }
        <View style={[styles.horizontalCentered, styles.gimmeSpace]}>
          <FlightTrackButton onPress={() => setIsOpen(false)} label='Cancel' style={styles.button} />
          <FlightTrackButton onPress={submit} label='Submit' style={styles.button} />
        </View>
      </>
    );
  };

  const [isExtended, setIsExtended] = useState(true);

  if (isExtended) {
    setTimeout(() => {
      if (isExtended) {
        setIsExtended(false);
      }
    }, 2000);
  }

  return (
    <>
      <Portal>
        <Dialog visible={isOpen} onDismiss={() => setIsOpen(false)} style={styles.dialog}>
          <Dialog.Title style={styles.label}>{label}</Dialog.Title>
          <RenderFields fields={fields} />
        </Dialog>
      </Portal>
      <Pressable
        style={[styles.fabStyle]}
        onPress={() => setIsOpen(true)}
      >
        <Icon name="plus" size={20} color={'#4C71C7'} style={styles.plus} />
      </Pressable>
    </>
  );
}

const outline = {
  borderWidth: 1,
  borderColor: 'red',
};

const centered = {
  justifyContent: 'center', 
  alignItems: 'center',
}

const styles = StyleSheet.create({
  dialog: {
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
    // ...outline,
    ...centered,
    marginVertical: '2.5%',
    flex: 1,
  },
  inputLabel: {
    ...centered,
    marginVertical: '2.5%',
    width: '40%',
  },
  input: {
    width: '90%',
    borderColor: '#4C71C7',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
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
  gimmeSpace: {
    margin: 10,
  },
  fabStyle: {
    bottom: 15,
    left: 15,
    position: 'absolute',
    backgroundColor: '#62C9EF',
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ffffff',
    borderWidth: 0.5,
  },
  plus: {
    // ...outline,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});