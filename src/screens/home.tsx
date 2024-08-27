/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
// Modules
import React, { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import kanvasService from 'core/services/kanvas-service';

// Molecules
import Header from 'components/molecules/header';
import NewAccountModal from 'molecules/modals/new-account-modal';

// Styles
import { Typography } from 'styles';

// Context
import { UserContext } from 'components/context/user-context';
import { AuthContext } from 'components/context/auth-context';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

// Utils
import { wait } from 'utils';

const Container = styled.View`
  background-color: ${DEFAULT_THEME.background};
  padding-horizontal: 30px;
  flex: 1;
`;

const ScreenHeader = styled(Header)`
  justify-content: center;
  align-items: center;
  background-color: ${DEFAULT_THEME.background};
  padding-top: 10px;
  padding-horizontal: 0px;
  height: 60px;
  margin-bottom: 0px;
`;

const Content = styled.View`
  flex: 1px;
  margin: 10px;
`;

const Title = styled.Text`
  font-size: ${Typography.FONT_SIZE_24}px;
  font-weight: bold;
  color: ${DEFAULT_THEME.text};
  text-align: center;
  margin-bottom: 20px;
`;

const UserInfoContainer = styled.View`
  justify-content: center;
`;

const InfoText = styled.Text`
  font-size: ${Typography.FONT_SIZE_16}px;
  line-height: ${Typography.FONT_SIZE_18}px;
  color: ${DEFAULT_THEME.text};
  margin-vertical: 2px;
`;

// Interfaces
interface IHomeProps {
  navigation: any;
}

export const Home = (props: IHomeProps) => {
  // Props
  const { navigation } = props;

  // States
  const [showNewAccountModal, setShowNewAccountModal] = React.useState(false);

  // Context
  const { userData, isUserLogged } = useContext(UserContext);
  const { updateUserData } = useContext(AuthContext);

  useEffect(() => {
    verifyNewAccount();
  }, []);

  const updateData = async (values?: object) => {
    try {
      const response = await kanvasService.updateUserData(userData?.id, values);
      // Context
      updateUserData(response);
    } catch (error) {
      console.log('Update User Data Error:', error);
    }
  };

  const onCloseModal = () => {
    setShowNewAccountModal(false);
    isUserLogged && updateData({ welcome: true });
  };

  const verifyNewAccount = async () => {
    try {
      await wait(500);
      const response = await kanvasService.getUserData();
      if (isUserLogged) {
        if (!response?.welcome) {
          setShowNewAccountModal(true);
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <SafeAreaView />
      <ScreenHeader
        title={translate('home', TextTransform.CAPITAL)}
        leftButtonComponent={<></>}
        rightButtonComponent={<></>}
        titleProps={{
          style: {
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 'bold',
            paddingTop: 6,
            width: '100%'
          },
        }}
      />

      <Content>
        <Title>Kanvas Home</Title>

        <UserInfoContainer>
          <InfoText>{translate('firstName', TextTransform.CAPITALIZE)}: {userData?.firstname}</InfoText>
          <InfoText>{translate('lastName', TextTransform.CAPITALIZE)}: {userData?.lastname}</InfoText>
          <InfoText>{translate('email', TextTransform.CAPITALIZE)}: {userData?.email}</InfoText>
        </UserInfoContainer>
      </Content>

      {/* Modals */}

      <NewAccountModal
        visible={showNewAccountModal}
        onPressClose={onCloseModal}
      />

    </Container>
  );
};
