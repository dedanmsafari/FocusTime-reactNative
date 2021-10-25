import * as React from 'react';
import { StyleSheet, View, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { CountDown } from '../../Components/CountDown';
import { useKeepAwake } from 'expo-keep-awake';
import { RoundedButton } from '../../Components/RoundedButton';
import { Timing } from './timing';
import { fontSizes } from '../../utils/sizes';
import { spacing } from '../../utils/sizes';
import { theme } from '../../utils/colors';

export const Timer = ({ focusSubject,onTimeEnd,clearFocusSubject }) => {
  useKeepAwake();
  const DEFAULT_TIME = 0.1;
  const [isStarted, setIsStarted] = React.useState(false);
  const [progress, setProgress] = React.useState(1);
  const [mins, setMins] = React.useState(DEFAULT_TIME);

  const onEnd = () => {
    vibrate();
    setMins(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    //Call Vibrate
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 3000);
      setTimeout(() => clearInterval(interval), 3000);
      setTimeout( onTimeEnd, 3000);
    } else {
      Vibration.vibrate(3000);
      setTimeout( onTimeEnd, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: spacing.xxl, paddingBottom: spacing.xxl }}>
        <Text style={styles.title}> Focusing On : </Text>
        <Text style={styles.task}> {focusSubject} </Text>
      </View>
      <View>
        <ProgressBar
          style={{ height: 5 }}
          color={theme.purple}
          progress={progress}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing
          changeTime={(min) => {
            setMins(min);
            setProgress(1);
            setIsStarted(false);
          }}
        />
      </View>
      <View style={styles.countDown}>
        <CountDown
          isPaused={!isStarted}
          onProgress={(progress) => setProgress(progress)}
          minutes={mins}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.buttons}>
        {!isStarted ? (
          <RoundedButton
            title="start"
            size={80}
            onPress={() => setIsStarted(true)}
          />
        ) : (
          <RoundedButton
            title="pause"
            size={80}
            onPress={() => setIsStarted(false)}
          />
        )}
      </View>
      <View style={styles.clear}>
      <RoundedButton
            title="clear"
            size={50}
            onPress={clearFocusSubject}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flex: 0.5,
    alignItems: 'center',
    marginTop: 10,
  },
  clear:{
    marginLeft:30,
  }
  ,
  buttonWrapper: {
    flex: 0.3,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
    color: theme.grey,
  },
  task: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSizes.xl,
    color: theme.green,
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
