import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";

const App = () => {
  const [greeting, setGreeting] = useState(<Text style={styles.helloWorldText}>loading...</Text>);
  const isDatabaseConnected = async () => {
    if (await testFirestoreConnection() === true) {
      setGreeting(
        <Text style={styles.helloWorldText}>
          We are connected and ready to go!
        </Text>
      );
    }
    else {
      setGreeting(
        <Text style={styles.helloWorldText}>
          Unable to connect to database.. Very sad.
        </Text>
      );
    }
  };
  
  isDatabaseConnected();
  
  return (
    <View style={styles.enclosingView}>
      {greeting}
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
