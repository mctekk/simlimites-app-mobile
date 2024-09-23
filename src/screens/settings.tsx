/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

// Modules
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { SectionList, SafeAreaView } from 'react-native';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';
import SectionHeader from 'components/atoms/section-header';
import { OrdersIcon, EditIcon, MyeSimsIcon } from 'assets/icons';
import CustomText from 'atoms/text';

// Context
import { AuthContext } from 'components/context/auth-context';
import { UserContext } from 'components/context/user-context';

// Molecules
import Header from 'components/molecules/header';
import SettingsItem from 'components/molecules/settings-item';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Utils
import { isIphoneX } from 'utils/iphone-helpers';

// Interfaces
interface ISettingsProps {
  navigation: any;
}

const Container = styled.View`
  flex: 1;
  background-color: ${DEFAULT_THEME.background};
  padding-horizontal: 16px;
`;

const ScreenHeader = styled(Header)`
  align-items: center;
  background-color: ${DEFAULT_THEME.background};
  padding-top: 10px;
  height: 60px;
  margin-bottom: 0px;
  padding-horizontal: 22px;
`;

const Content = styled.ScrollView`
  flex: 1px;
`;

const ListFooterContainer = styled.View`
  margin-top: ${isIphoneX() ? 45 : 0}px;
  height: 100px;
  background-color: ${DEFAULT_THEME.background};
`;

const FooterContainer = styled.View`
  bottom: ${isIphoneX() ? 40 : 100}px;
`;

const FooterButton = styled.TouchableOpacity`
  margin-vertical: 20px;
`;

const EditButton = styled.TouchableOpacity`
  background-color: ${DEFAULT_THEME.primary};
  align-self: center;
  border-radius: 8px;
  padding-vertical: 6px;
  padding-horizontal: 16px;
  align-items: center;
  margin-bottom: 58px;
  flex-direction: row;
`;

export const SettingsItemList = [
  {
    title: translate('settings', TextTransform.CAPITAL),
    data: [
      {
        title: translate('myPlans', TextTransform.CAPITALIZE),
        key: 'myPlans',
        goTo: '',
        icon: () => <MyeSimsIcon size={18} />,
      },
      {
        title: translate('myOrders', TextTransform.CAPITALIZE),
        key: 'myOrders',
        goTo: '',
        icon: () => <OrdersIcon />,
      },
    ],
  },
  {
    title: translate('account', TextTransform.CAPITAL),
    data: [
      {
        title: translate('changePassword', TextTransform.CAPITALIZE),
        key: 'changePassword',
        goTo: 'ChangePassword',
      },
    ],
    headerStyle: {
      marginTop: 50,
    },
  },
  {
    title: translate('help', TextTransform.CAPITAL),
    data: [
      {
        title: translate('userGuide', TextTransform.CAPITALIZE),
        key: 'userGuide',
        goTo: '',
      },
      {
        title: translate('aboutUs', TextTransform.CAPITALIZE),
        key: 'aboutUs',
        goTo: '',
      },
      {
        title: translate('termsAndConditions', TextTransform.CAPITALIZE),
        key: 'termsAndConditions',
        goTo: '',
      },
    ],
    headerStyle: {
      marginTop: 50,
    },
  },
];


export const Settings = (props: ISettingsProps) => {
  // Props
  const { navigation } = props;

  // Context
  const { signOut } = useContext(AuthContext);
  const { userData } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      signOut();
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  const renderItem = useCallback(({ item, index, section }) => {
    const isFirst = index === 0;
    const isLast = index === (section?.data?.length - 1);

    return (
      <SettingsItem
        key={index}
        title={item.title}
        icon={item.icon}
        onPress={() => navigation.navigate(item.goTo ?? '')}
        isFirst={isFirst}
        isLast={isLast}
      />
    );
  }, []);

  const renderSectionHeader = useCallback(({ section: { title, headerStyle } }) => {
    return (
      <SectionHeader
        title={title}
        style={headerStyle}
      />
    );
  }, []);

  const ListFooterComponent = useCallback(() => {
    return (
      <ListFooterContainer>
        <FooterContainer>
          <FooterButton
            onPress={handleLogout}
          >
            <SettingsItem
              title={translate('logout', TextTransform.CAPITALIZE)}
              onPress={handleLogout}
              showRightIcon={false}
              isFirst
              isLast
            />
          </FooterButton>
        </FooterContainer>

      </ListFooterContainer>
    )
  }, []);

  const keyExtractor = useCallback(item => item.key.toString(), []);

  return (
    <Container>
      <SafeAreaView />
      <ScreenHeader
        hasBackButton={false}
        title={translate('profile', TextTransform.CAPITALIZE)}
        titleProps={{
          style: {
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '600',
            width: '100%',
          },
        }}
      />
      <Content>
        <EditButton onPress={() => navigation.navigate('EditProfile')}>
          <EditIcon />
          <CustomText
            color={DEFAULT_THEME.white}
            size={Typography.FONT_SIZE_13}
            weight='500'
            style={{ marginLeft: 5 }}
          >
            {translate('editProfile', TextTransform.CAPITALIZE)}
          </CustomText>
        </EditButton>
        <SectionList
          sections={SettingsItemList}
          extraData={SettingsItemList}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          ListFooterComponent={ListFooterComponent}
          style={{
            backgroundColor: DEFAULT_THEME.background,
          }}
        />
      </Content>
    </Container>
  );
};
