import React from 'react';
import { View, Text, Button, FlatList,TouchableOpacity } from 'react-native';
import mockPollData from '../data/mockPollData';

const PollListScreen = ({ navigation }: any) => {
  return (
    <View>
      <FlatList
        data={mockPollData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={{marginTop:10,marginBottom:5}}>{item.title}</Text>
            <Button
              title="View Poll"
              onPress={() => navigation.navigate('PollDetail', { pollId: item.id })}
            />
          </View>
        )}
      />
     
     <Text  style={{marginTop:200,marginBottom:5 }}>Dynamic Form creation from json</Text>
     
      <Button
              title="Dynamic Form"
              onPress={() => navigation.navigate('DynamicForm')}
            />
    </View>
  );
};

export default PollListScreen;
