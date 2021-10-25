import * as React from 'react';
import { Text, View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../Components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!!focusHistory.length && (
        <>
          <Text style={styles.title}> History </Text>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1, alignItems: 'center' }}
            data={focusHistory}
            renderItem={HistoryItem}
          />
          <View style={styles.clearContainer}>
            <RoundedButton title="clear" size={50} onPress={onClear} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
  }),
  title: {
    color: 'grey',
    fontSize: fontSizes.xl,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  clearContainer: {
    alignItems: 'center',
  
  },
});
