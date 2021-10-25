import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { RoundedButton } from '../../Components/RoundedButton';

export const Timing = ({ changeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton title="10" size={60} onPress={() => changeTime(10)} />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton title="15" size={60} onPress={() => changeTime(15)} />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton title="20" size={60} onPress={() => changeTime(20)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
     flex: 1,
     alignItems: 'center',
  },
});
