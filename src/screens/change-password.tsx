/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
// Modules
import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert, SafeAreaView } from 'react-native';

// Molecules
import Header from 'components/molecules/header';
import TextInput from 'components/molecules/text-input';
import LoadingModal from 'components/molecules/modals/loading-modal';

// Styles
import { DEFAULT_THEME } from 'styles/theme';
import { Typography } from 'styles';

// Atoms
import CustomButton from 'components/atoms/button';
import { TextTransform, translate } from 'components/atoms/localized-label';

// Api
import { client } from 'core/kanvas_client';

// Context
import { AuthContext } from 'components/context/auth-context';
import { UserContext } from 'components/context/user-context';

// Interfaces
interface IChangePasswordProps {
  navigation: any;
}

const HEADER_HEIGHT = 130;

const Container = styled.View`
  flex: 1;
  background-color: ${DEFAULT_THEME.authBackground};
`;

const ScreenHeader = styled(Header)`
  align-items: center;
  background-color: ${DEFAULT_THEME.authBackground};
  padding-top: 10px;
  height: 60px;
  margin-bottom: 0px;
  padding-horizontal: 22px;
`;

const Content = styled.View`
  padding: 20px;
  flex: 1;
`;

const Input = styled(TextInput)`
  margin-bottom: 15px;
  border-width: 1px;
  border-color: ${DEFAULT_THEME.borderColor};
  border-radius: 5px;
  padding-horizontal: 20px;
  padding-vertical: 12px;
`;

const Button = styled(CustomButton)`
  height: 50px;
  border-radius: 8px;
`;

const initialValues = {
  current_password: '',
  new_password: '',
  new_password_confirmation: '',
};

const validationSchema = yup.object().shape({
  current_password: yup.string().required(translate('fieldRequired', TextTransform.NONE)),
  new_password: yup.string().required(translate('fieldRequired', TextTransform.NONE)),
  new_password_confirmation: yup
    .string()
    .oneOf([yup.ref('new_password')], 'Passwords do not match')
    .required(translate('fieldRequired', TextTransform.NONE)),
});

export const ChangePassword = (props: IChangePasswordProps) => {
  // States
  const [isLoading, setIsLoading] = useState(false);

  // Context
  const { userData } = useContext(UserContext);
  const { signOut } = useContext(AuthContext);

  const onUserLogout = async () => {
    signOut();
  };

  const updatePassword = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await client.auth.changePassword(
        values.current_password,
        values.new_password,
        values.new_password_confirmation,
      );
      setIsLoading(false);
      Alert.alert(
        translate('success', TextTransform.CAPITAL),
        translate('changePasswordMsg', TextTransform.CAPITAL),
        [{ text: 'OK', onPress: () => onUserLogout() }],
      );
    } catch (error) {
      console.log('Error:', error);
      setIsLoading(false);
      Alert.alert('Error', translate('changePasswordError', TextTransform.CAPITAL));
    }
  };

  return (
    <Container>
      <SafeAreaView />
      <ScreenHeader
        title={translate('changePassword', TextTransform.CAPITALIZE)}
        titleProps={{
          style: {
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '600',
            width: '100%',
          },
        }}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => updatePassword(values, actions)}>
        {props => (
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}>
            <Content>
              <Input
                labelText={translate('currentPassword', TextTransform.CAPITAL)}
                textValue={props.values.current_password}
                onChangeText={props.handleChange('current_password')}
                secureTextEntry={true}
                labelStyle={styles.inputLabelStyle}
                containerStyle={styles.inputContainerStyle}
                fontSize={Typography.FONT_SIZE_18}
                textColor={DEFAULT_THEME.black}
                placeholderText={translate(
                  'currentPasswordPlaceHolder',
                  TextTransform.CAPITAL,
                )}
              />

              <Input
                labelText={translate('newPassword', TextTransform.CAPITALIZE)}
                placeholderText={translate('newPasswordPlaceHolder', TextTransform.CAPITAL)}
                onChangeText={props.handleChange('new_password')}
                textValue={props.values.new_password}
                secureTextEntry={true}
                labelStyle={styles.inputLabelStyle}
                containerStyle={styles.inputContainerStyle}
                fontSize={Typography.FONT_SIZE_18}
                textColor={DEFAULT_THEME.black}
              />

              <Input
                labelText={translate('confirmNewPassword', TextTransform.CAPITAL)}
                textValue={props.values.new_password_confirmation}
                onChangeText={props.handleChange('new_password_confirmation')}
                secureTextEntry={true}
                labelStyle={styles.inputLabelStyle}
                containerStyle={styles.inputContainerStyle}
                fontSize={Typography.FONT_SIZE_18}
                textColor={DEFAULT_THEME.black}
                placeholderText={translate(
                  'confirmNewPasswordPlaceHolder',
                  TextTransform.CAPITAL,
                )}
              />

              <Button
                title={translate('changePassword', TextTransform.CAPITALIZE)}
                onPress={props.handleSubmit}
                loading={isLoading}
                disabled={isLoading || !(props.isValid && props.dirty)}
                style={{
                  backgroundColor:
                    props.isValid && props.dirty
                      ? DEFAULT_THEME.primary
                      : DEFAULT_THEME.disabledPrimary,
                }}
              />
            </Content>
          </KeyboardAwareScrollView>
        )}
      </Formik>

      <LoadingModal
        visible={isLoading}
        title={translate('savingChanges', TextTransform.CAPITALIZE)}
      />
    </Container>
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
