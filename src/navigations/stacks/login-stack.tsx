// Modules
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import {Welcome} from 'screens/welcome';
import {LogIn} from 'screens/log-in';
import {SignUp} from 'screens/sign-up';
import { ForgotPassword } from 'screens/forgot-password';
import HomeStack from './home-stack';

const Stack = createStackNavigator();

const LoginStack = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
    </Stack.Navigator>
  );
};

export default LoginStack;
