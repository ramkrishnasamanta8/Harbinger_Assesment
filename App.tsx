import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import PollListScreen from './src/screens/PollListScreen';
import PollDetailScreen from './src/screens/PollDetailScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import DynamicForm from './src/screens/DynamicForm';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="PollList">
      <Stack.Screen name="PollList" component={PollListScreen} />
      <Stack.Screen name="PollDetail" component={PollDetailScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      <Stack.Screen name="DynamicForm" component={DynamicForm} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
