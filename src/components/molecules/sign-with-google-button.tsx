// Modules
import React from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import styled from 'styled-components/native';

// Molecules
import PillButton, { PillButtonProps } from 'molecules/pill-button';

// Atoms
import SmallButton from 'atoms/small-button';
import { translate, TextTransform } from 'atoms/localized-label';
import CustomText from 'atoms/text';

// Styles
import { DEFAULT_THEME } from 'styles/theme';
import { Typography } from 'styles';

// Assets
import { GoogleIcon } from 'assets/icons';

interface SocialButtonIconsProps {
  isSmall?: boolean;
  onLogin?: () => void;
  textLocale?: string;
}

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 62px;
  border-color: ${DEFAULT_THEME.primary};
  border-width: 1px;
  background-color: ${DEFAULT_THEME.white};
  margin-bottom: 13px;
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
  padding-horizontal: 25px;
`;

const GIcon = () => <GoogleIcon />;

const SignWithGoogle = (props: Partial<PillButtonProps, SocialButtonIconsProps>) => {
  const { isSmall = false, onLogin, textLocale = 'signInGoogle' } = props;

  const handleLogin = async () => {
    try {
      GoogleSignin.configure({
        webClientId: Config.GOOGLE_WEB_CLIENT_ID,
        iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
      });

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (Object.keys(userInfo).length === 0) {
        console.log('Google Auth Error: Empty userInfo');
        return;
      }

      if (Object.keys(userInfo?.user).length !== 0) {
        console.log('Google Auth Success', userInfo);
        // HERE: Implement the logic to handle the user data
        onLogin?.('google', userInfo?.idToken);
      }
    } catch (error) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
      } else if (error?.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS');
      } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.log('Google Auth Error', error);
        throw new Error(`Google Auth Error: ${error}`);
      }
    }
  };

  if (!isSmall) {
    return (
      <Button onPress={handleLogin}>
        {GIcon()}
        <CustomText
          size={Typography.FONT_SIZE_18}
          weight="500"
          style={{ marginLeft: 20 }}
          color={DEFAULT_THEME.black}>
          {translate(textLocale, TextTransform.CAPITAL)}
        </CustomText>
      </Button>
    );
  }

  return <SmallButton icon={GIcon} onPress={handleLogin} {...props} />;
};

export default SignWithGoogle;
