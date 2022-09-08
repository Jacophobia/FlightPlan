import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from "react-native-paper";
import { FlightTrackDualEditable } from "./PageComponents/FlightTrackDualEditable";
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";
import { getCrewMembers, patchCrewMember, deleteCrewMember, addCrewMember } from "./Firebase/Firestore";
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


export function CrewMembers({ navigation }) {
  const [crewMembers, setCrewMembers] = useState([]);

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


    setCrewMembers(await getCrewMembers());


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

  const addNewCrewMember = async (crewMember) => {
    try {
      await addCrewMember(crewMember);
      initializeOptions();
    } catch (error) {
      console.error(error);
    }
  }

  const removeCrewMember = async (id) => {
    try {
      await deleteCrewMember(id);
      initializeOptions();
    } catch (error) {
      console.error(error);
    }
  };

  const renderEditable = ({item}) => {
    return (
      <FlightTrackDualEditable 
        data={item} 
        onSubmit={({first, second}) => patchCrewMember(item.id, {name: first, admin: second})} 
        onDelete={() => removeCrewMember(item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Crew Members' onBackArrowPress={navigation.goBack} />
      <FlatList data={crewMembers} renderItem={renderEditable} keyExtractor={item => item.id} style={styles.list} contentContainerStyle={styles.listContent} />
      <FlightTrackNewField onSubmit={addNewCrewMember} fields={['name', 'uid', 'bool:admin']} label='New CrewMember' />
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