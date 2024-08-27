/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
// Modules
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import kanvasService from 'core/services/kanvas-service';

// Molecules
import Header from 'components/molecules/header';
import TextInput from 'components/molecules/text-input';

// Styles
import { Typography } from 'styles';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';
import CustomText from 'atoms/text';
import { NextArrow } from 'assets/icons';

// Api
import { client } from 'core/kanvas_client';

// Utils
import { AUTH_TOKEN } from 'utils/constants';

// Context
import { AuthContext } from 'components/context/auth-context';

// Styles
import { DEFAULT_THEME } from 'styles/theme';
import LoadingModal from 'components/molecules/modals/loading-modal';

// Interfaces
interface ISignUpProps {
  navigation: any;
  route: any;
}

const ContinueButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 57px;
  border-radius: 50px;
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

const Content = styled.View``;

const Input = styled(TextInput)`
  margin-bottom: 15px;
  border-width: 1px;
  border-color: ${DEFAULT_THEME.borderColor};
  border-radius: 5px;
  padding-horizontal: 20px;
  padding-vertical: 12px;
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
  password: '',
  password_confirmation: '',
};

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required(translate('fieldRequired', TextTransform.NONE))
    .min(8),
  password_confirmation: yup
    .string()
    .required(translate('fieldRequired', TextTransform.NONE))
    .min(8)
    .oneOf([yup.ref('password')], translate('passwordNotMatch', TextTransform.NONE)),
});

export const RegisterPassword = (props: ISignUpProps) => {
  // Props
  const { navigation, route } = props;

  // Params
  const { email, name } = route.params;

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [onFocusInput, setOnFocusInput] = useState({
    password: true,
    password_confirmation: false,
  });

  // Context
  const { signUp } = useContext(AuthContext);

  useEffect(() => {
    console.log(email, name)
  }, []);

  const handleOnFocusInput = (value: string) => {
    setOnFocusInput({ ...onFocusInput, [value]: true });
  };

  const handleOnInputBlur = () => {
    setOnFocusInput('');
  };

  const getUserData = async (token: string, refresh_token: string) => {
    try {
      const response = await kanvasService.getUserData();
      signUp({ token, refresh_token, user: response });
      setIsLoading(false);
    } catch (error) {
      console.log('getUserData Error:', error);
    }
  };

  const handleRegistration = async (values: any, actions: any) => {
    setIsLoading(true);

    const data = {
      email: email.trim(),
      password: values.password,
      password_confirmation: values.password_confirmation,
      firstname: name,
    }

    try {
      const response = await client.users.register(data);
      const { token, user } = response?.register;
      await AsyncStorage.setItem(AUTH_TOKEN, token?.token);
      onRegisterSuccess(token?.token, token?.refresh_token);
    } catch (error) {
      console.log('Register Error:', error);

      onRegisterError(error);
      setIsLoading(false);
    }
  };

  const onRegisterSuccess = (token: string, refresh_token: string) => {
    getUserData(token, refresh_token);
  };

  const onRegisterError = (error: object) => {
    const msg = translate('registerErrorMsg', TextTransform.CAPITALIZE);

    Alert.alert(
      translate('error', TextTransform.CAPITALIZE),
      msg,
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => handleRegistration(values, actions)}>
      {({
        values,
        handleChange,
        handleSubmit,
        errors,
        isValid,
        dirty,
      }) => {
        const buttonDisabled = !(isValid && dirty);

        return (
          <Container>
            <SafeAreaView />
            <ScreenHeader
              title={translate('enterYourPass', TextTransform.CAPITAL)}
              titleProps={{
                style: {
                  textAlign: 'flex-start',
                  fontSize: 25,
                  fontWeight: 'bold',
                  paddingTop: 6,
                  width: '100%'
                },
              }}
            />

            <Content>
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
                inputProps={{
                  autoFocus: true,
                }}
              />

              <Input
                labelText={translate('reEnterPassword', TextTransform.NONE)}
                //placeholderText={translate('createPassword', TextTransform.NONE)}
                value={values.password}
                onFocus={() => handleOnFocusInput('password_confirmation')}
                isFocused={onFocusInput.password}
                onChangeText={handleChange('password_confirmation')}
                onBlur={handleOnInputBlur}
                returnKeyType='next'
                secureTextEntry={true}
                labelStyle={styles.inputLabelStyle}
                containerStyle={styles.inputContainerStyle}
                fontSize={Typography.FONT_SIZE_18}
                textColor={DEFAULT_THEME.black}
              />
            </Content>
            <ContinueButton
              onPress={() => handleSubmit()}
              style={{
                backgroundColor: buttonDisabled ? DEFAULT_THEME.disabledButton : DEFAULT_THEME.black
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
              <IconContainer>
                <NextArrow />
              </IconContainer>
            </ContinueButton>

            <LoadingModal
              visible={isLoading}
              title={translate('creatingAccount', TextTransform.CAPITAL)}
            />

          </Container>
        )
      }}
    </Formik>
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
