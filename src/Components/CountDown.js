import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { fontSizes } from '../utils/sizes';
import { spacing } from '../utils/sizes';
import { theme } from '../utils/colors';

const minToMilli = (min) => min * 60 * 1000;

export const CountDown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const [milli, setMilli] = React.useState(null);
  // console.log(minutes);
  // console.log(milli);

  const minute = Math.floor(milli / 1000 / 60) % 60;
  const seconds = Math.floor(milli / 1000) % 60;

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const interval = React.useRef(null);

  const countDown = () => {
    setMilli((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;

      return timeLeft;
    });
  };

  React.useEffect(() => {
    onProgress(milli / minToMilli(minutes));
    if (milli === 0) {
      onEnd();
    }
  }, [milli]);

  React.useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);

      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  React.useEffect(() => {
    setMilli(minToMilli(minutes));
  }, [minutes]);

  return (
    <Text style={styles.text}>
      {' '}
      {formatTime(minute)} : {formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: fontSizes.xxl,
    color: theme.grey,
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
