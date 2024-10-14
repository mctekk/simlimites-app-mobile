// Modules
import React, { useEffect } from 'react';
import styled from 'styled-components';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { initStripe } from '@stripe/stripe-react-native';
import Config from 'react-native-config';

// Navigations
import { MainStack } from 'navigations';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  useEffect(() => {
    initStripe({
      publishableKey: Config.STRIPE_PUBLISHABLE_KEY || '',
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator>
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
