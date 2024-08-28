/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// Modules
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import { navigationScreen } from 'navigations/navigation-screen';
import { Home } from 'screens/home';
import { MyeSims } from 'screens/my-esims';
import { Settings } from 'screens/settings';

// Molecules
import TabIcon from 'components/molecules/tab-icon';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

// Utils
import { isAndroid } from 'utils/iphone-helpers';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigatior = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name.toLowerCase()} focused={focused} />,
        tabBarStyle: {
          backgroundColor: DEFAULT_THEME.authBackground,
          borderTopColor: DEFAULT_THEME.transparent,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
          paddingTop: isAndroid() ? 0 : 20,
          height: isAndroid() ? 70 : 85,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="MyeSims" component={MyeSims} />
      <Tab.Screen name="UserProfile" component={Settings} />
    </Tab.Navigator>
  );
};

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TabNavigatior"
        component={TabNavigatior}
      />

      {navigationScreen.map((navScreen, index) => {
        return (
          <Stack.Screen
            key={index}
            name={navScreen.name}
            component={navScreen.screen}
            initialParams={navScreen.initialParams}
            options={({ route, navigation }) => ({
              ...navScreen.options,
            })}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default HomeStack;
