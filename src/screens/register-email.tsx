/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
// Modules
import React, { useContext, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput as RnInput,
} from 'react-native';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

// Molcules
import TextInput from 'components/molecules/text-input';
import SignWithApple from 'components/molecules/sign-with-apple-button';
import SignWithFacebook from 'components/molecules/sign-with-facebook-button';
import SignWithGoogle from 'components/molecules/sign-with-google-button';
import LoadingModal from 'components/molecules/modals/loading-modal';
import Header from 'components/molecules/header';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';
import CustomText from 'atoms/text';
import { EmailIcon, NextArrow } from 'assets/icons';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Services
import { client } from 'core/kanvas_client';

// Constants
import { AUTH_TOKEN, REFRESH_TOKEN, USER_DATA } from 'utils/constants';

// Context
import { AuthContext } from 'components/context/auth-context';

// Modules
import kanvasService from 'core/services/kanvas-service';

// Interfaces
interface ISignInProps {
  navigation: any;
  route: any;
}

const Content = styled.View``;

const ContinueButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 57px;
  border-radius: 8px;
  margin-top: 32px;
`;

const IconContainer = styled.View`
  position: absolute;
  align-self: flex-end;
  padding-right: 50px;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${DEFAULT_THEME.authBackground};
  padding-horizontal: 30px;
`;

const SocialModeTopContainer = styled.View``;

const Input = styled(TextInput)`
  margin-bottom: 5px;
  border-width: 1px;
  border-color: ${DEFAULT_THEME.borderColor};
  border-radius: 5px;
  padding-horizontal: 20px;
  padding-vertical: 12px;
`;

const SeparatorContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-vertical: 44px;
`;

const SocialContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const ScreenHeader = styled(Header)`
  justify-content: flex-start;
  align-items: center;
  background-color: ${DEFAULT_THEME.authBackground};
  padding-top: 10px;
  padding-horizontal: 0px;
  height: 60px;
  margin-bottom: 0px;
`;

const initialValues = {
  email: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(translate('fieldRequired', TextTransform.NONE))
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, translate('fieldRequired', TextTransform.NONE)),
});

export const RegisterEmail = (props: ISignInProps, ref: any) => {
  // Props
  const { navigation, route } = props;

  // Params
  const showLogin = route?.params?.showLogin;

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [onFocusInput, setOnFocusInput] = useState({
    email: true,
  });

  // Context
  const { signIn } = useContext(AuthContext);

  const handleOnFocusInput = (value: string) => {
    setOnFocusInput({ ...onFocusInput, [value]: true });
  };

  const handleOnInputBlur = () => {
    setOnFocusInput('');
  };

  const getUserData = async (token: string, refresh_token: string) => {
    try {
      const response = await kanvasService.getUserData();
      signIn({ token, refresh_token, user: response });
      setIsLoading(false);
    } catch (error) {
      console.log('Get User Data Error:', error);
      setIsLoading(false);
      onLoginError();
    }
  };

  const onLoginError = () => {
    Alert.alert(
      translate('error', TextTransform.CAPITALIZE),
      translate('errorMsg', TextTransform.CAPITAL),
    );
  };

  const onSocialLogin = async (provider: string, authToken: any) => {
    setIsLoading(true);
    try {
      const response = await client.auth.socialLogin({
        provider,
        token: authToken,
      });
      const { token, refresh_token } = response;
      await AsyncStorage.setItem(AUTH_TOKEN, token);
      getUserData(token, refresh_token);
    } catch (error) {
      console.log('Social Login Error:', error);
      setIsLoading(false);
      throw new Error(`Social Login Error: ${error}`);
    }
  };

  const onContinuePress = async (values: any) => {
    const response = await kanvasService.getUserByEmail(values.email.trim());
    if (response?.id) {
      Alert.alert(
        translate('error', TextTransform.CAPITALIZE),
        translate('emailExists', TextTransform.CAPITAL),
      );
      return;
    }

    navigation.navigate('RegisterName', { email: values.email });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => onContinuePress(values)}>
        {({ values, handleChange, handleSubmit, isValid, dirty }) => {
          const buttonDisabled = !(isValid && dirty);

          return (
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}>
              <Container>
                <SafeAreaView />
                <ScreenHeader />
                <Content>
                  <CustomText
                    size={Typography.FONT_SIZE_25}
                    style={{ marginBottom: 15 }}
                    weight='700'
                    color={DEFAULT_THEME.title}>
                    {translate('registerTitle', TextTransform.CAPITAL)}
                  </CustomText>
                  <CustomText
                    size={Typography.FONT_SIZE_18}
                    lineHeight={Typography.FONT_SIZE_20}
                    style={{ marginBottom: 15 }}
                    color={DEFAULT_THEME.subtitle}>
                    {translate('registerSubtitle', TextTransform.CAPITAL)}
                  </CustomText>
                  <Input
                    labelText={translate('emailAddress', TextTransform.CAPITAL)}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleOnInputBlur}
                    onFocus={() => handleOnFocusInput('email')}
                    isFocused={onFocusInput.email}
                    returnKeyType='next'
                    keyboardType='email-address'
                    inputProps={{
                      autoCapitalize: 'none',
                      autoFocus: false,
                    }}
                    containerStyle={styles.inputContainerStyle}
                    labelStyle={styles.inputLabelStyle}
                    inputIcon={<EmailIcon />}
                    fontSize={Typography.FONT_SIZE_18}
                    textColor={DEFAULT_THEME.black}
                  />
                  <CustomText size={Typography.FONT_SIZE_12} color={DEFAULT_THEME.subtitle}>
                    {translate('confirmEmail', TextTransform.CAPITAL)}
                  </CustomText>
                </Content>
                <ContinueButton
                  onPress={() => handleSubmit()}
                  style={{
                    backgroundColor: buttonDisabled
                      ? DEFAULT_THEME.disabledPrimary
                      : DEFAULT_THEME.primary,
                  }}
                  disabled={buttonDisabled}>
                  <CustomText
                    size={Typography.FONT_SIZE_20}
                    lineHeight={Typography.FONT_SIZE_24}
                    weight='600'
                    color={buttonDisabled ? DEFAULT_THEME.white : DEFAULT_THEME.white}>
                    {translate('continue', TextTransform.CAPITAL)}
                  </CustomText>
                  <IconContainer>
                    <NextArrow />
                  </IconContainer>
                </ContinueButton>
                <SocialModeTopContainer>
                  <SeparatorContainer>
                    <CustomText
                      size={Typography.FONT_SIZE_15}
                      lineHeight={Typography.FONT_SIZE_16}
                      color={DEFAULT_THEME.separatorText}>
                      {translate('or', TextTransform.CAPITAL)}
                    </CustomText>
                  </SeparatorContainer>
                  <SocialContainer>
                    <SignWithFacebook onLogin={onSocialLogin} textLocale={'signUpFacebook'} />
                    <SignWithGoogle onLogin={onSocialLogin} textLocale={'signUpGoogle'} />
                    {/* <SignWithApple onLogin={onSocialLogin} textLocale={'signUpApple'} /> */}
                  </SocialContainer>
                </SocialModeTopContainer>
                {showLogin ? (
                  <>
                    <CustomText
                      size={Typography.FONT_SIZE_16}
                      style={{ marginTop: 40 }}
                      align='center'
                      color={DEFAULT_THEME.title}>
                      {`${translate('haveAnAccount', TextTransform.CAPITAL)} `}
                      <CustomText
                        size={Typography.FONT_SIZE_16}
                        onPress={() => navigation.navigate('LogIn')}
                        style={{
                          textDecorationLine: 'underline',
                        }}
                        color={DEFAULT_THEME.primary}>
                        {translate('login', TextTransform.CAPITAL)}
                      </CustomText>
                    </CustomText>
                  </>
                ) : (
                  <></>
                )}
              </Container>
            </TouchableWithoutFeedback>
          );
        }}
      </Formik>
      <LoadingModal
        visible={isLoading}
        title={translate('signingIn', TextTransform.CAPITALIZE)}
      />
    </>
  );
};

const styles = {
  inputContainerStyle: {
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  inputLabelStyle: {
    marginBottom: 0,
  },
};
