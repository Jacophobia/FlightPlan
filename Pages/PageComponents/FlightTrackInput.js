import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';


const iconWidth = 45;
const iconHeight = 45;

/**
 * Flight Track Input
 * @props onUpdate, initialValue, labelText, labelColor, icon, iconScale, keyboardType, align, errorText, validate
 * @returns A Text Input With FlightTrack Custom Styling
 */
export function FlightTrackInput(props) {
  const [text, setText] = useState(props.initialValue || "");

  const onUpdate = (textValue) => {
    if (props.keyboardType === 'numeric') {
      setText(curr => {
        let isInvalid = false;
        let decimalCount = 0;
        for (const val of textValue) {
          let numVal = Number(val);
          if (val === ' ') {
            isInvalid = true;
          }
          if (val === '.') {
            decimalCount += 1;
            if (decimalCount > 1) {
              isInvalid = true;
            }
          }
          else if (numVal < 0 || numVal > 9 || (numVal !== 0 && !numVal)) {
            isInvalid = true;
          }
        }
        if (isInvalid) {
          return curr;
        }
        return textValue;
      });
    }
    else {
      setText(textValue);
    }
    if (!!props.onUpdate) {
      props.onUpdate(text);
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
    let inputBarStyle = props.align === 'right' ? { right: 0 } : { left: 0 };
    let input = props.input ? props.input : (
      <TextInput 
        style={[styles.input, inputBarStyle]} 
        onChangeText={onUpdate} 
        value={text}  
        keyboardType={props.keyboardType || 'default'}
      />
    );
    let icon = getIcon();
    if (props.align === 'right') {
      return (
        <>
          {icon}
          {input}
        </>
      );
    }
    return (
      <>
        {input}
        {icon}
      </>
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
          {justifyContent: props.align === 'right' ? 'flex-start' : 'flex-end'}
        ]}
      >
        <View style={styles.label}>
          <Text 
            style={[styles.labelText, !!props.labelColor ? {color: props.labelColor} : {}]}
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
    justifyContent: 'flex-end',
    
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
    position: 'absolute',
    bottom: 0,
    width: '85%',
    marginLeft: 3,
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