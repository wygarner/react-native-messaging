import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Chat from './components/Chat'
import Rooms from './components/Rooms'
import { View, SafeAreaView, Text } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Rooms'
          component={Rooms}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Chat'
          component={Chat}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
  // return (
  //   <View>
  //     <SafeAreaView>
  //       <Text>Hello World</Text>
  //     </SafeAreaView>
  //   </View>
  // )
}