import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { getTestData } from "./Firebase/Firestore";

const App = () => {
  const [greeting, setGreeting] = useState('loading...');

  
  getTestData().then(testVal => {
    setGreeting(testVal);
  })
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
