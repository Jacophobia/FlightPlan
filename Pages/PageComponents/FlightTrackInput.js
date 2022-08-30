import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';


const iconWidth = 45;
const iconHeight = 45;

/**
 * Flight Track Input
 * @props onUpdate, data, labelText, color, icon, iconScale, keyboardType, align, errorText, validate, hide
 * @returns A Text Input With FlightTrack Custom Styling
 */
export function FlightTrackInput(props) {
  const [text, setText] = useState(props.data || "");

  const onUpdate = (textValue) => {
    if (props.keyboardType === 'numeric') {
      setText(curr => {
        let decimalCount = 0;
        for (const val of textValue) {
          let numVal = Number(val);
          if (val === ' ') {
            return curr;
          }
          if (val === '.') {
            decimalCount += 1;
            if (decimalCount > 1) {
              return curr;
            }
          }
          else if (numVal < 0 || numVal > 9 || (numVal !== 0 && !numVal)) {
            return curr;
          }
        }
        props.onUpdate(textValue);
        return textValue;
      });
    }
    else {
      props.onUpdate(textValue);
      setText(textValue);
    }
  };

  const getIcon = () => {
    if (!!props.icon) {
      let scale = {
        width: iconWidth,
        height: iconHeight,
      };
      if (!!props.iconScale) {
        scale = {
          width: iconWidth * (props.iconScale / 100.0),
          height: iconHeight * (props.iconScale / 100.0),
        };
      }

      return (
        <Image style={[styles.icon, scale]} source={props.icon} />
      );
    }
    return (<></>);
  };

  const getInputContent = () => {
    let inputBarStyle = props.align === 'right' ? { width: '87%' } : {};
    let input = props.input ? props.input : (
      <TextInput 
        style={[styles.input, inputBarStyle]} 
        onChangeText={onUpdate} 
        value={text}  
        keyboardType={props.keyboardType || 'default'}
        secureTextEntry={props.hide || false}
      />
    );
    let icon = getIcon();
    if (props.align === 'right') {
      return (
        <View style={styles.inputContent}>
          {icon}
          {input}
        </View>
      );
    }
    return (
      <View style={styles.inputContent}>
        {input}
        {icon}
      </View>
    );
  };

  const getError = () => {
    if (!props.validate || props.validate(text)) {
      return (<></>);
    }
    return (
      <Text style={styles.errorText}>{props.errorText || 'Invalid Input'}</Text>
    );
  };
  
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.inputContainer, 
        ]}
      >
        <View style={styles.label}>
          <Text 
            style={[styles.labelText, !!props.color ? {color: props.color} : {}]}
          >
            {props.labelText || "No label prop provided"}
          </Text>
        </View>
        {getInputContent()}
      </View>
      {getError()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    height: 55,
    marginTop: 15,
    borderWidth: 2.5,
    borderColor: '#b0b0b0',
    borderRadius: 12,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  label: {
    position: 'absolute',
    left: 16,
    top: -13,
    backgroundColor: 'white',
    paddingHorizontal: 2,
  },
  labelText: {
    fontSize: 17,
    color: '#b0b0b0',
  },
  input: {
    marginLeft: 10,
    width: '80%',
    height: '100%',
  },
  inputContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  icon: {
    resizeMode: "contain",
    margin: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
  },
});