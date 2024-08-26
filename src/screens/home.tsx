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

// Styles
import { Typography } from 'styles';

// Context
import { UserContext } from 'components/context/user-context';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

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

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  padding-right: 16px;
  margin-top: 10px;
`;

// Interfaces
interface IHomeProps {
  navigation: any;
}

export const Home = (props: IHomeProps) => {
  // Props
  const { navigation } = props;

  // Context
  const { userData } = useContext(UserContext);

  useEffect(() => {
    console.log('User Data:', userData);
    getProductsData();
  }, []);

  const getProductsData = async () => {
    try {
      const response = await kanvasService.getProducts();
      console.log("products===", response)
    } catch (error) {
      console.log('Get Products Data Error:', error);
    }
  };

  const openNotifications = () => {
    navigation.navigate('Notifications');
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
    </Container>
  );
};
