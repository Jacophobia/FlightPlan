import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from "react-native-paper";
import { FlightTrackEditable } from "./PageComponents/FlightTrackEditable";
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";
import { getCrewMembers, patchCrewMember } from "./Firebase/Firestore";


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
        setInitializePercent(i / 100.0);
      }, prev);
      prev *= 1.04;
    }


    setCrewMembers(await getCrewMembers());


    setInitializeState('done');
  };
  
  if (initializeState === 'done') {
    
  }
  else if (initializeState === 'starting') {
    setInitializePercent(0.2);
    initializeOptions();
    return (<InitializingBar percent={initializePercent} />);
  }
  else {
    return (<InitializingBar percent={initializePercent} />);
  }
  //   ^ ^ ^ ^ Initialize Options ^ ^ ^ ^

  const renderEditable = ({item}) => {
    return (
      <FlightTrackEditable data={item} onSubmit={(crewMember) => patchCrewMember(item.id, crewMember)} />
    );
  };

  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Crew Members' onBackArrowPress={navigation.goBack} />
      <FlatList data={crewMembers} renderItem={renderEditable} keyExtractor={item => item.id || item.uid} style={styles.list} contentContainerStyle={styles.listContent} />
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