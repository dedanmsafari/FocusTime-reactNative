import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../Components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { theme } from '../../utils/colors';

export const Focus = ({ addSubject, focusHistory }) => {
  const [subject, setSubject] = React.useState('');
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: fontSizes.sm }}
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
 
  title: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: theme.black,
  },
  inputContainer: {
    paddingTop: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
