import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { submitVote } from '../store/slices/pollSlice';
import mockPollData from '../data/mockPollData';

const PollDetailScreen = ({ route, navigation }: any) => {
  const { pollId } = route.params;
  const poll = mockPollData.find((p) => p.id === pollId);

  const dispatch = useDispatch();

  const handleVote = (questionId: string, optionId: string) => {
    dispatch(submitVote({ questionId, optionId }));
  };

  return (
    <View>
      {poll?.questions.map((question) => (
        <View key={question.id}>
          <Text>{question.questionText}</Text>
          {question.options.map((option) => (
            <Button
              key={option.id}
              title={option.text}
              onPress={() => handleVote(question.id, option.id)}
            />
          ))}
        </View>
      ))}
      <Button
        title="Submit Poll"
        onPress={() => navigation.navigate('Confirmation')}
      />
    </View>
  );
};

export default PollDetailScreen;
