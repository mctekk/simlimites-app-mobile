// Modules
import React from 'react';
import Foundation from 'react-native-vector-icons/Foundation';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import styled from 'styled-components/native';

// Atoms
import { translate, TextTransform } from 'atoms/localized-label';
import SmallButton from 'atoms/small-button';
import CustomText from 'atoms/text';

// Styles
import { DEFAULT_THEME } from 'styles/theme';
import { Typography } from 'styles';

// Molecules
import PillButton, { PillButtonProps } from 'molecules/pill-button';

// Utils
import { isIphoneX } from 'utils/iphone-helpers';

// Assets
import { AppleIcon } from 'assets/icons';

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

const AIcon = () => (
  <AppleIcon />
);

const SignWithApple = (
  props: Partial<PillButtonProps, SocialButtonIconsProps>,
) => {
  const { isSmall = false, onLogin, textLocale ='signInApple' } = props;

  const handleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const { fullName } = appleAuthRequestResponse;
        const user = {
          email: appleAuthRequestResponse.email,
          id: appleAuthRequestResponse.identityToken,
          name: '',
        };
        if (fullName && fullName.givenName) {
          user.name = `${fullName.givenName} ${fullName.familyName}`;
        }
        // HERE: Implement the logic to handle the user data
        onLogin?.('apple', appleAuthRequestResponse.identityToken);
      } else {
        console.log('Apple Login Failed', credentialState);
        throw new Error('Apple Login Failed');
      }
    } catch (error) {
      console.log('Apple Login Error:', error);
    }
  };

  if (!isSmall) {
    return (
      <Button onPress={handleLogin}>
        {AIcon()}
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

  return <SmallButton icon={AIcon} onPress={handleLogin} {...props} />;
};

export default SignWithApple;
