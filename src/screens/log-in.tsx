/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
// Modules
import React, { useContext, useEffect, useState } from 'react';
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

// Atoms
import Text from 'components/atoms/text';
import { TextTransform, translate } from 'components/atoms/localized-label';
import CustomText from 'atoms/text';
import { EmailIcon, Check } from 'assets/icons';

// Styles
import { Colors, Typography } from 'styles';
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

const Content = styled.View`
  padding-top: 28px;
`;

const CheckContainer = styled.View`
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${DEFAULT_THEME.borderColor};
  width: 21px;
  height: 19px;
  border-radius: 2px;
  margin-right: 6px;
`;

const ContinueButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 57px;
  border-radius: 50px;
  margin-top: 32px;
`;

const ForgotPasswordButton = styled.TouchableOpacity``;

const RememberMeButton = styled.TouchableOpacity`
  flex-direction: row;
`;
const Container = styled.View`
  flex: 1;
  background-color: ${DEFAULT_THEME.background};
  padding-horizontal: 30px;
`;

const SocialModeTopContainer = styled.View``;

const Input = styled(TextInput)`
  margin-bottom: 15px;
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

const InputBottomContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().required(translate('fieldRequired', TextTransform.NONE)),
  password: yup
    .string()
    .required(translate('fieldRequired', TextTransform.NONE)),
});

export const LogIn = (props: ISignInProps, ref: any) => {
  // Props
  const { navigation, route } = props;

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [isRememberChecked, setIsRememberChecked] = useState(false);
  const [onFocusInput, setOnFocusInput] = useState({
    email: false,
    password: false,
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

  const handleSignIn = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await client.auth.login(values.email, values.password);
      const { token, refresh_token, id } = response;
      await AsyncStorage.setItem(AUTH_TOKEN, token);
      getUserData(token, refresh_token);
    } catch (error) {
      console.log('Login Error:', error);
      setIsLoading(false);
      onLoginError();
    }
  };

  const onLoginError = () => {
    Alert.alert(
      translate('error', TextTransform.CAPITALIZE),
      translate('loginError', TextTransform.CAPITAL),
    );
  };

  const onSocialLogin = async (provider: string, authToken: any) => {
    setIsLoading(true);
    try {
      const response = await client.auth.socialLogin({
        provider,
        token: authToken,
      });
      const { token, refresh_token } = response.socialLogin;
      await AsyncStorage.setItem(AUTH_TOKEN, token);
      getUserData(token, refresh_token);
    } catch (error) {
      console.log('Social Login Error:', error);
      setIsLoading(false);
      throw new Error(`Social Login Error: ${error}`);
    }
  };

  const onForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleSignIn(values, actions)}>
        {({
          values,
          handleChange,
          handleSubmit,
          isValid,
          dirty,
        }) => {
          const buttonDisabled = !(isValid && dirty);

          return (
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}>
              <Container>
                <SafeAreaView />
                <Content>
                  <CustomText
                    size={Typography.FONT_SIZE_25}
                    lineHeight={Typography.FONT_SIZE_30}
                    weight='bold'
                    style={{ marginBottom: 20 }}
                    color={DEFAULT_THEME.black}>
                    {translate('loginTitle', TextTransform.CAPITAL)}
                  </CustomText>
                  <CustomText
                    size={Typography.FONT_SIZE_18}
                    lineHeight={Typography.FONT_SIZE_20}
                    style={{ marginBottom: 15 }}
                    color={DEFAULT_THEME.subtitle}>
                    {translate('loginSubtitle', TextTransform.CAPITAL)}
                  </CustomText>
                  <Input
                    labelText={translate('emailAdress', TextTransform.CAPITAL)}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleOnInputBlur}
                    onFocus={() => handleOnFocusInput('email')}
                    isFocused={onFocusInput.email}
                    returnKeyType='next'
                    keyboardType='email-address'
                    inputProps={{
                      autoCapitalize: 'none',
                      autoFocus: true,
                    }}
                    containerStyle={styles.inputContainerStyle}
                    labelStyle={styles.inputLabelStyle}
                    inputIcon={<EmailIcon />}
                    fontSize={Typography.FONT_SIZE_18}
                    textColor={DEFAULT_THEME.black}
                  />
                  <Input
                    labelText={translate('password', TextTransform.CAPITAL)}
                    value={values.password}
                    onFocus={() => handleOnFocusInput('password')}
                    isFocused={onFocusInput.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleOnInputBlur}
                    returnKeyType='next'
                    secureTextEntry={true}
                    labelStyle={styles.inputLabelStyle}
                    containerStyle={styles.inputContainerStyle}
                    fontSize={Typography.FONT_SIZE_18}
                    textColor={DEFAULT_THEME.black}
                  />
                  <InputBottomContainer>
                    <RememberMeButton
                      onPress={() => setIsRememberChecked(!isRememberChecked)}
                    >
                      <CheckContainer>
                        {isRememberChecked ? <Check /> : <></>}
                      </CheckContainer>

                      <CustomText
                        size={Typography.FONT_SIZE_15}
                        weight='500'
                        color={DEFAULT_THEME.black}
                      >
                        {translate('rememberMe', TextTransform.CAPITAL)}
                      </CustomText>
                    </RememberMeButton>
                    <ForgotPasswordButton
                      onPress={onForgotPassword}
                    >
                      <CustomText
                        size={Typography.FONT_SIZE_13}
                        style={{ textDecorationLine: 'underline' }}
                        color={DEFAULT_THEME.black}
                      >
                        {`${translate('forgotPassword', TextTransform.CAPITAL)}?`}
                      </CustomText>
                    </ForgotPasswordButton>
                  </InputBottomContainer>
                </Content>
                <ContinueButton
                  onPress={() => handleSubmit()}
                  style={{
                    backgroundColor: buttonDisabled ? DEFAULT_THEME.black : DEFAULT_THEME.black
                  }}
                  disabled={buttonDisabled}
                >
                  <CustomText
                    size={Typography.FONT_SIZE_20}
                    lineHeight={Typography.FONT_SIZE_24}
                    weight='600'
                    color={buttonDisabled ? DEFAULT_THEME.white : DEFAULT_THEME.white}>
                    {translate('continue', TextTransform.CAPITAL)}
                  </CustomText>
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
                    <SignWithFacebook onLogin={onSocialLogin} />
                    <SignWithGoogle onLogin={onSocialLogin} />
                    <SignWithApple onLogin={onSocialLogin} />
                  </SocialContainer>
                </SocialModeTopContainer>
              </Container>
            </TouchableWithoutFeedback>
          )
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
}