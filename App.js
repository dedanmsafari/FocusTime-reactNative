import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Focus } from './src/Features/Focus/focus';
import { Timer } from './src/Features/Timer/timer';

import { fontSizes, spacing } from './src/utils/sizes';
import { theme } from './src/utils/colors';
import { FocusHistory } from './src/Features/Focus/focusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [focusSubject, setFocusSubject] = React.useState(null);
  const [focusHistory, setFocusHistory] = React.useState([]);

  const STATUS = {
    COMPLETE: 1,
    CANCELED: 2,
  };

  const addFocusHistoryWithStatus = (focusSubject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject: focusSubject, status },
    ]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log('Error', e);
    }
  };
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log('Error', e);
    }
  };

  React.useEffect(() => {
    loadFocusHistory();
  }, []);

  React.useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimeEnd={() => {
            addFocusHistoryWithStatus(focusSubject, STATUS.COMPLETE);
            setFocusSubject(null);
          }}
          clearFocusSubject={() => {
            addFocusHistoryWithStatus(focusSubject, STATUS.CANCELED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSubject} focusHistory={focusHistory} />
          <FocusHistory
            focusHistory={focusHistory}
            onClear={() => setFocusHistory([])}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: theme.backGround,
    padding: spacing.sm,
  },
});
