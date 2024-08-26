// Modules
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import {Welcome} from 'screens/welcome';
import {LogIn} from 'screens/log-in';
import {RegisterEmail} from 'screens/register-email';
import {RegisterName} from 'screens/register-name';
import {RegisterPassword} from 'screens/register-password';
import { ForgotPassword } from 'screens/forgot-password';
import HomeStack from './home-stack';

const Stack = createStackNavigator();

const LoginStack = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="RegisterEmail" component={RegisterEmail} />
      <Stack.Screen name="RegisterName" component={RegisterName} />
      <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
    </Stack.Navigator>
  );
};

export default LoginStack;
