import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostsListScreen from  '../screens/PostsListScreen'
import PostScreen from '../screens/PostScreen'
import UserScreen from '../screens/UserScreen'
const Stack = createNativeStackNavigator();

const Navigations = () => {
return (
<Stack.Navigator screenOptions={{ headerShown: false }}>
<Stack.Screen name="Posts" component={PostsListScreen} />
<Stack.Screen name="Post" component={PostScreen} />
<Stack.Screen name="User" component={UserScreen} />
</Stack.Navigator>
  )
}

export default Navigations