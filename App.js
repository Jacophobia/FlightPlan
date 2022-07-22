import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';

import firestore from "@react-native-firebase/firestore";

const App = () => {
  const [greeting, setGreeting] = useState('loading...');

  const getTestData = async () => {
    const userDocument = await firestore().collection("Test").doc("123").get()
      .catch(error => console.error(error));
    console.log(userDocument);
    setGreeting(userDocument._data.greeting);
  };
  getTestData();
  return (
    <View style={styles.enclosingView}>
      <Text style={styles.helloWorldText}>Hello World!</Text>
      <Text style={styles.helloWorldText}>{greeting}</Text>
    </View>
  );
};

export default App;

const styles = new StyleSheet.create({
  enclosingView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#348CCB',
  },
  helloWorldText: {
    color: '#CB7334',
  },
});
