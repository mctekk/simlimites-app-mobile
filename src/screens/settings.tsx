/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

// Modules
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components/native';
import { SectionList, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import Config from 'react-native-config';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';
import SectionHeader from 'components/atoms/section-header';
import { OrdersIcon, EditIcon, MyeSimsIcon, DefaultProfileIcon } from 'assets/icons';
import CustomText from 'atoms/text';

// Context
import { AuthContext } from 'components/context/auth-context';
import { UserContext } from 'components/context/user-context';

// Molecules
import Header from 'components/molecules/header';
import SettingsItem from 'components/molecules/settings-item';
import UnregisteredCard from 'components/molecules/unregistered-card';

// Organisms
import InAppBrowser from 'components/organisms/in-app-browser';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Utils
import { isIphoneX, isIphoneSE } from 'utils/iphone-helpers';

// Constants
import { UNREGISTERED_TYPES } from 'utils/constants';

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

const UserInfoContainer = styled.View`
  align-items: center;
`;

const ProfileImageContainer = styled.View`
  width: 84px;
  height: 84px;
  border-radius: 42px;
  margin-bottom: 16px;
`;

const Image = styled(FastImage)`
  width: 84px;
  height: 84px;
  border-radius: 42px;
`;

const UserNameText = styled(CustomText)`
  font-size: ${Typography.FONT_SIZE_24}px;
  line-height: ${Typography.LINE_HEIGHT_24}px;
  color: ${DEFAULT_THEME.title};
  font-weight: 700;
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
  bottom: ${isIphoneX() ? 40 : (isIphoneSE() ? 0 : 100)}px;
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
  margin-top: 8px;
`;

const UnregisteredContainer = styled.View`
  align-items: center;
  margin-top: 100px;
  background-color: ${DEFAULT_THEME.white};
  padding-top: 48px;
  border-radius: 10px;
`;

export const SettingsItemList = [
  {
    title: translate('settings', TextTransform.CAPITAL),
    data: [
      {
        title: translate('myPlans', TextTransform.CAPITALIZE),
        key: 'myPlans',
        goTo: 'MyeSims',
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
        //goTo: 'ChangePassword',
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
        browserLink: Config.USER_GUIDE_LINK,
        browserTitleLocale: 'userGuide',
      },
      {
        title: translate('aboutUs', TextTransform.CAPITALIZE),
        key: 'aboutUs',
        goTo: '',
        browserLink: Config.ABOUT_US_LINK,
        browserTitleLocale: 'aboutUs',
      },
      {
        title: translate('termsAndConditions', TextTransform.CAPITALIZE),
        key: 'termsAndConditions',
        goTo: '',
        browserLink: Config.TERMS_AND_CONDITIONS_LINK,
        browserTitleLocale: 'termsAndConditions',
      },
    ],
    headerStyle: {
      marginTop: 50,
    },
  },
  {
    title: '',
    data: [
      {
        title: translate('logout', TextTransform.CAPITALIZE),
        key: 'logout',
        goTo: 'logout',
      },
    ],
    headerStyle: {
      marginTop: 10,
    },
  },
];


export const Settings = (props: ISettingsProps) => {
  // Props
  const { navigation } = props;

  // States
  const [openBrowser, setOpenBrowser] = useState({ visible: false, url: '', title: '' });

  // Context
  const { signOut } = useContext(AuthContext);
  const { userData, isUserLogged } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      signOut();
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  const handleItemPress = async (item?: any) => {
    if (item?.browserLink?.length) {
      openInAppBrowser(item?.browserLink, translate(item?.browserTitleLocale, TextTransform.CAPITAL));
      return;
    }
    if (item?.goTo?.length) {
      if (item?.goTo === 'logout') {
        handleLogout();
        return;
      };
      navigation.navigate(item?.goTo);
      return;
    }
  };

  const renderItem = useCallback(({ item, index, section }) => {
    const isFirst = index === 0;
    const isLast = index === (section?.data?.length - 1);
    const showArrow = (item?.key !== 'logout');

    return (
      <SettingsItem
        key={index}
        title={item.title}
        icon={item.icon}
        onPress={() => handleItemPress(item)}
        isFirst={isFirst}
        isLast={isLast}
        showRightIcon={showArrow}
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

  const keyExtractor = useCallback(item => item.key.toString(), []);

  const getProfileImageUri = () => {
    console.log('userdata==', userData);
    if (userData?.photo?.url) {
      return userData?.photo?.url;
    }
    return '';
  };

  const openInAppBrowser = (url: string, title: string) => {
    const inAppBrowserOptions = {
      url,
      title,
      visible: !openBrowser.visible,
    };
    setOpenBrowser(inAppBrowserOptions);
  };

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
      <Content showsVerticalScrollIndicator={false}>
        {isUserLogged ? (
          <>
            <UserInfoContainer>
              <ProfileImageContainer>
                {getProfileImageUri() ? (
                  <Image
                    source={{ uri: getProfileImageUri()}}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                ) : (
                  <DefaultProfileIcon />
                )}
              </ProfileImageContainer>
              <UserNameText>{userData?.firstname} {userData?.lastname}</UserNameText>
            </UserInfoContainer>
            <EditButton
              //onPress={() => navigation.navigate('EditProfile')}
            >
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
              style={{
                backgroundColor: DEFAULT_THEME.background,
                paddingBottom: 50,
              }}
            />
          </>
        ) : (
          <UnregisteredCard
            onButtonPress={() => navigation.navigate('RegisterEmail', { showLogin: true })}
            type={UNREGISTERED_TYPES.PROFILE}
          />
        )}
      </Content>

      {/* Modals */}
      <InAppBrowser
        visible={openBrowser.visible}
        url={openBrowser.url}
        title={openBrowser.title}
        onClose={() => setOpenBrowser({ visible: !openBrowser.visible, url: '', title: '' })}
      />

    </Container>
  );
};
