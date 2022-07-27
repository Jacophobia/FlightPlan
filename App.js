import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { LoginPage } from "./Pages/LoginPage";

const App = () => {
  const [greeting, setGreeting] = useState(
    <View><Text style={styles.helloWorldText}>loading...</Text></View>
  );
  const isDatabaseConnected = async () => {
    let view = (
      <Text style={styles.helloWorldText}>
        An Error Occurred. Please tell Jacob to fix the code.
      </Text>
    );
    if (await testFirestoreConnection() === true) {
      view = (
        <LoginPage/>
      );
    }
    else {
      view = (
        <Text style={styles.helloWorldText}>
          Unable to connect to database.. Very sad.
        </Text>
      );
    }
    setGreeting(<>{view}</>);
  };
  
  isDatabaseConnected();

  return (
    <>{greeting}</>
  );
};

export default App;

const styles = new StyleSheet.create({
  helloWorldText: {
    color: '#CB7334',
  },
});
