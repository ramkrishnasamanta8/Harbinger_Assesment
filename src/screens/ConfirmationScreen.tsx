import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const ConfirmationScreen = ({ navigation }: any) => {
  const votes = useSelector((state: RootState) => state.polls.votes);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Poll Completed!</Text>
      <Text style={styles.subheader}>Your responses:</Text>
      <View style={styles.resultsContainer}>
        {Object.keys(votes).map((questionId, index) => (
          <Text key={index} style={styles.resultText}>
            Question {index + 1}: {votes[questionId]}
          </Text>
        ))}
      </View>
      <Button
        title="Back to Poll List"
        onPress={() => navigation.navigate('PollList')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    marginBottom: 20,
  },
  resultsContainer: {
    marginBottom: 20,
    alignItems: 'flex-start',
    width: '100%',
  },
  resultText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ConfirmationScreen;
