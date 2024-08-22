// Screen
import { ChangePassword } from "screens/change-password";
import { EditProfile } from "screens/edit-profile";
import { Home } from "screens/home";
import { Inventory } from "screens/invetory";
import { Notifications } from "screens/notifications";
import { LogIn } from "screens/log-in";
import { RegisterPassword } from "screens/register-password";
import { RegisterEmail } from "screens/register-email";
import { RegisterName } from "screens/register-name";


const navigationDefaultOptions = {
  headerShown: false,
};

export const navigationScreen = [
  {
    name: 'LogIn',
    screen: LogIn,
    options: {
      navigationDefaultOptions,
    },
  },
  {
    name: 'RegisterEmail',
    screen: RegisterEmail,
    options: {
      navigationDefaultOptions,
    },
  },
  {
    name: 'RegisterName',
    screen: RegisterName,
    options: {
      navigationDefaultOptions,
    },
  },
  {
    name: 'RegisterPassword',
    screen: RegisterPassword,
    options: {
      navigationDefaultOptions,
    },
  },
  {
    name: 'EditProfile',
    screen: EditProfile,
    options: {
      navigationDefaultOptions,
    },
  },
  {
    name: 'ChangePassword',
    screen: ChangePassword,
    options: {
      navigationDefaultOptions,
    },
  },
  {
    name: 'Inventory',
    screen: Inventory,
    options: {
      navigationDefaultOptions,
    },
  },
  {
    name: 'Notifications',
    screen: Notifications,
    options: {
      navigationDefaultOptions,
      presentation: 'modal',
    },
  },
];
