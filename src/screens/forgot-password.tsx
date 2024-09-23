// Modules
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Alert, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';

// Molecules
import Header from 'components/molecules/header';
import TextInput from 'components/molecules/text-input';

// Styles
import { Typography } from 'styles';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';
import CustomText from 'atoms/text';
import { EmailIcon, NextArrow } from 'assets/icons';

// Services
import { client } from 'core/kanvas_client';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

// Interfaces
interface IForgotPasswordProps {
  navigation: any;
}

const Container = styled.View`
  flex: 1;
  background-color: ${DEFAULT_THEME.authBackground};
  padding-horizontal: 30px;
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

const IconContainer = styled.View`
  position: absolute;
  align-self: flex-end;
  padding-right: 50px;
`;

const Content = styled.View``;

const Input = styled(TextInput)`
  margin-bottom: 5px;
  border-width: 1px;
  border-color: ${DEFAULT_THEME.borderColor};
  border-radius: 5px;
  padding-horizontal: 20px;
  padding-vertical: 12px;
`;

const ContinueButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 57px;
  border-radius: 50px;
  margin-top: 32px;
`;

const initialValues = {
  email: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('This field is requiered')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, translate('fieldRequired', TextTransform.NONE)),
});

export const ForgotPassword = (props: IForgotPasswordProps) => {
  // Props
  const { navigation } = props;

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [onFocusInput, setOnFocusInput] = useState({
    email: true,
  });

  const handleForgotPassword = async (values: any, actions: any) => {
    setIsLoading(true);
    try {
      const response = await client.users.forgotPassword(values.email);
      Alert.alert('Success', 'Password reset email sent successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Forgot Password Error:', error);
      Alert.alert('Error', 'An error occurred while sending the email');
    }
  };

  const handleOnFocusInput = (value: string) => {
    setOnFocusInput({ ...onFocusInput, [value]: true });
  };

  const handleOnInputBlur = () => {
    setOnFocusInput('');
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleForgotPassword(values, actions)}>
        {({ values, handleChange, handleSubmit, isValid, dirty }) => {
          const buttonDisabled = !(isValid && dirty);

          return (
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}>
              <Container>
                <SafeAreaView />
                <ScreenHeader
                  title={`${translate('forgotPassword', TextTransform.CAPITAL)}?`}
                  titleProps={{
                    style: {
                      textAlign: 'flex-start',
                      fontSize: 25,
                      fontWeight: 'bold',
                      paddingTop: 6,
                      width: '100%',
                    },
                  }}
                />
                <Content>
                  <CustomText
                    size={Typography.FONT_SIZE_18}
                    lineHeight={Typography.FONT_SIZE_20}
                    style={{ marginBottom: 15 }}
                    color={DEFAULT_THEME.subtitle}>
                    {translate('forgotSubtitle', TextTransform.CAPITAL)}
                  </CustomText>
                  <Input
                    labelText={translate('emailAddress', TextTransform.CAPITAL)}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleOnInputBlur}
                    onFocus={() => handleOnFocusInput('email')}
                    isFocused={onFocusInput.email}
                    returnKeyType="next"
                    keyboardType="email-address"
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
                    weight="600"
                    color={buttonDisabled ? DEFAULT_THEME.white : DEFAULT_THEME.white}>
                    {translate('continue', TextTransform.CAPITAL)}
                  </CustomText>
                  <IconContainer>
                    <NextArrow />
                  </IconContainer>
                </ContinueButton>
              </Container>
            </TouchableWithoutFeedback>
          );
        }}
      </Formik>
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
