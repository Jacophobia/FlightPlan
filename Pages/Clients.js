import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from "react-native-paper";
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";
import { addClient, getClients, patchClient, deleteClient } from "./Firebase/Firestore";
import { FlightTrackEditable } from "./PageComponents/FlightTrackEditable";
import { FlightTrackNewField } from "./PageComponents/FlightTrackNewField";


const InitializingBar = ({percent}) => {
  return (
      <View style={{justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
        <ProgressBar
          progress={percent} color="#177cbf" visible={true} style={{width: 300, height: 10}}
        />
      </View>
    );
};


export function Clients({ navigation }) {
  const [clients, setClients] = useState([]);

  //   v v v v Initialize Options v v v v
  const [initializePercent, setInitializePercent] = useState(0.0);
  const [initializeState, setInitializeState] = useState('starting');

  const initializeOptions = async () => {
    setInitializeState('initializing');
    let prev = 100;
    for (let i = 1; i < 100; i++) {
      setTimeout(() => {
        if (initializeState !== 'done') {
          setInitializePercent(i / 100.0);
        }
      }, prev);
      prev *= 1.001;
    }


    setClients(await getClients());


    setInitializeState('done');
  };
  
  if (initializeState === 'done') {
    
  }
  else if (initializeState === 'starting') {
    initializeOptions();
    return (<InitializingBar percent={initializePercent} />);
  }
  else {
    return (<InitializingBar percent={initializePercent} />);
  }
  //   ^ ^ ^ ^ Initialize Options ^ ^ ^ ^

  const addNewClient = async (client) => {
    try {
      await addClient(client);
      initializeOptions();
    } catch (error) {
      console.error(error);
    }
  }

  const removeClient = async (id) => {
    try {
      await deleteClient(id);
      initializeOptions();
    } catch (error) {
      console.error(error);
    }
  };

  const renderEditable = ({item}) => {
    return (
      <FlightTrackEditable data={item} onSubmit={(crewMember) => patchClient(item.id, crewMember)} onDelete={() => removeClient(item.id)} />
    );
  };

  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Clients' onBackArrowPress={navigation.goBack} />
      <FlatList data={clients} renderItem={renderEditable} keyExtractor={item => item.id} style={styles.list} contentContainerStyle={styles.listContent} />
      <FlightTrackNewField onSubmit={addNewClient} fields={['name']} label='New Client' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});