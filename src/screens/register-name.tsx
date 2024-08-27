/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
// Modules
import React, { useState, useEffect } from 'react';
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
import Config from 'react-native-config';

// Molcules
import TextInput from 'components/molecules/text-input';
import LoadingModal from 'components/molecules/modals/loading-modal';
import Header from 'components/molecules/header';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';
import CustomText from 'atoms/text';
import { EmailIcon, NextArrow } from 'assets/icons';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Constants
import { AUTH_TOKEN, REFRESH_TOKEN, USER_DATA } from 'utils/constants';

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

const Input = styled(TextInput)`
  margin-bottom: 5px;
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
  name: '',
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(translate('fieldRequired', TextTransform.NONE)),
});

export const RegisterName = (props: ISignInProps, ref: any) => {
  // Props
  const { navigation, route } = props;

  // Params
  const { email } = route.params;

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [onFocusInput, setOnFocusInput] = useState({
    name: false,
  });

  useEffect(() => {}, []);


  const handleOnFocusInput = (value: string) => {
    setOnFocusInput({ ...onFocusInput, [value]: true });
  };

  const handleOnInputBlur = () => {
    setOnFocusInput('');
  };

  const onContinuePress = async (values: any) => {
    console.log('email: ', email, 'name: ', values.name)
    navigation.navigate('RegisterPassword', { email: email, name: values.name });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => onContinuePress(values)}>
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
                <ScreenHeader
                  title={translate('enterYourName', TextTransform.CAPITAL)}
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
                  <CustomText
                    size={Typography.FONT_SIZE_18}
                    lineHeight={Typography.FONT_SIZE_20}
                    style={{ marginBottom: 15 }}
                    color={DEFAULT_THEME.subtitle}>
                    {translate('loginSubtitle', TextTransform.CAPITAL)}
                  </CustomText>
                  <Input
                    labelText={translate('nameLastname', TextTransform.CAPITAL)}
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleOnInputBlur}
                    onFocus={() => handleOnFocusInput('name')}
                    isFocused={onFocusInput.name}
                    returnKeyType='next'
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