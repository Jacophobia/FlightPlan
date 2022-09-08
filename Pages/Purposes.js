import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from "react-native-paper";
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";
import { addPurpose, getPurposes, patchPurpose, deletePurpose } from "./Firebase/Firestore";
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


export function Purposes({ navigation }) {
  const [purposes, setPurposes] = useState([]);

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


    setPurposes(await getPurposes());


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

  const addNewPurpose = async (purpose) => {
    try {
      await addPurpose(purpose);
      initializeOptions();
    } catch (error) {
      console.error(error);
    }
  }

  const removePurpose = async (id) => {
    try {
      await deletePurpose(id);
      initializeOptions();
    } catch (error) {
      console.error(error);
    }
  };

  const renderEditable = ({item}) => {
    return (
      <FlightTrackEditable data={item} onSubmit={(crewMember) => patchPurpose(item.id, crewMember)} onDelete={() => removePurpose(item.id)} />
    );
  };

  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Purposes' onBackArrowPress={navigation.goBack} />
      <FlatList data={purposes} renderItem={renderEditable} keyExtractor={item => item.id} style={styles.list} contentContainerStyle={styles.listContent} />
      <FlightTrackNewField onSubmit={addNewPurpose} fields={['name']} label='New Purpose' />
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