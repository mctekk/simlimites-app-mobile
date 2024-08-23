// Modules
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AuthenticationToken,
  AccessToken,
} from 'react-native-fbsdk-next';
import styled from 'styled-components/native';

// Atoms
import { translate, TextTransform } from 'atoms/localized-label';
import SmallButton from 'atoms/small-button';
import CustomText from 'atoms/text';

// Styles
import { DEFAULT_THEME } from 'styles/theme';
import { Typography, Colors } from 'styles';

// Molecules
import PillButton, { PillButtonProps } from './pill-button';

// Assets
import { FacebookIcon } from 'assets/icons';

interface SocialButtonIconsProps {
  isSmall?: boolean;
  onLogin?: () => void;
  textLocale?: string;
}

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 62px;
  border-color: ${DEFAULT_THEME.borderColor};
  border-width: 1px;
  background-color: ${DEFAULT_THEME.white};
  margin-bottom: 13px;
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
  padding-horizontal: 25px;
`;

const FIcon = () => (
  <FacebookIcon />
);

const SignWithFacebook = (
  props: Partial<PillButtonProps, SocialButtonIconsProps>,
) => {
  const { isSmall = false, onLogin, textLocale ='signInFacebook' } = props;

  const handleLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(
        ['public_profile', 'email'],
        'limited',
        'my_nonce', // Optional
      );
      console.log(result);
      if (Platform.OS === 'ios') {
        const result = await AuthenticationToken.getAuthenticationTokenIOS();
        onLogin?.('facebook', result?.authenticationToken);
      } else {
        // This token can be used to access the Graph API.
        const result = await AccessToken.getCurrentAccessToken();
        console.log(result?.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isSmall) {
    return (
      <Button onPress={handleLogin}>
        {FIcon()}
        <CustomText
          size={Typography.FONT_SIZE_18}
          weight='500'
          style={{ marginLeft: 20 }}
          color={DEFAULT_THEME.black}>
          {translate(textLocale, TextTransform.CAPITAL)}
        </CustomText>
      </Button>
    );
  }

  return <SmallButton icon={FIcon} onPress={handleLogin} {...props} />;
};

export default SignWithFacebook;
