import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from "react-native-paper";
import { FlightTrackHeader } from "./PageComponents/FlightTrackHeader";
import { addPlane, getPlanes, patchPlane, deletePlane } from "./Firebase/Firestore";
import { FlightTrackDualEditable } from "./PageComponents/FlightTrackDualEditable";
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


export function Planes({ navigation }) {
  const [planes, setPlanes] = useState([]);

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


    setPlanes(await getPlanes());


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

  const addNewPlane = async (plane) => {
    try {
      await addPlane(plane);
      initializeOptions();
    } catch (error) {
      console.error(error);
    }
  }

  const removePlane = async (id) => {
    try {
      await deletePlane(id);
      initializeOptions();
    } catch (error) {
      console.error(error);
    }
  };

  const renderEditable = ({item}) => {
    const { name, apu } = item;
    return (
      <FlightTrackDualEditable 
        data={{ first: name, second: apu }} 
        onSubmit={({first, second}) => patchPlane(item.id, {name: first, apu: second})}
        onDelete={() => removePlane(item.id)} 
        field2='APU:' 
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Planes' onBackArrowPress={navigation.goBack} />
      <FlatList data={planes} renderItem={renderEditable} keyExtractor={item => item.id} style={styles.list} contentContainerStyle={styles.listContent} />
      <FlightTrackNewField onSubmit={addNewPlane} fields={['name', 'bool:apu']} label='New Plane' />
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