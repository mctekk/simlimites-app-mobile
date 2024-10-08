/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
// Modules
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { SafeAreaView, Dimensions, TextInput } from 'react-native';
import styled from 'styled-components/native';
import kanvasService from 'core/services/kanvas-service';
import { TabView } from 'react-native-tab-view';

// Molecules
import Header from 'components/molecules/header';
import NewAccountModal from 'molecules/modals/new-account-modal';

// Organisms
import HomeTabsList from 'organisms/home-tabs-list';
import ProductList from 'components/organisms/product-list';

// Styles
import { Typography } from 'styles';

// Context
import { UserContext } from 'components/context/user-context';
import { AuthContext } from 'components/context/auth-context';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';
import CustomText from 'atoms/text';
import { SearchIcon, CloseIconv2 } from 'assets/icons';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

// Utils
import { wait } from 'utils';

// Constants
import { PRODUCT_TYPES_SLUGS } from 'utils/constants';

const initialLayout = { width: Dimensions.get('window').width };

const Container = styled.View`
  background-color: ${DEFAULT_THEME.background};
  flex: 1;
`;

const ScreenHeader = styled(Header)`
  align-items: center;
  background-color: ${DEFAULT_THEME.background};
  padding-top: 10px;
  height: 60px;
  margin-bottom: 0px;
  padding-horizontal: 22px;
`;

const TabsContainer = styled.View`
  background-color: ${DEFAULT_THEME.tabsBg};
  justify-content: center;
  border-radius: 50px;
  margin-horizontal: 22px;
`;

const TopSection = styled.View`
  padding-horizontal: 22px;
`;

const Content = styled.View`
  flex: 1px;
`;

const SearchContainer = styled.View`
  width: 100%;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding-vertical: 10px;
  padding-horizontal: 16px;
`;

const SearchInput = styled.TextInput`
  padding: 0;
  margin-horizontal: 8px;
  flex: 1px;
  font-size: ${Typography.FONT_SIZE_15}px;
  font-weight: 300px;
  color: ${DEFAULT_THEME.black};
`;

const CancelButton = styled.TouchableOpacity``;

const BalanceSection = styled.View`
  width: 100%;
  background-color: ${DEFAULT_THEME.white};
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const Balance = styled.View``;

const AddFundsButton = styled.TouchableOpacity`
  background-color: ${DEFAULT_THEME.addFundsBg};
  padding-vertical: 6px;
  padding-horizontal: 12px;
  border-radius: 10px;
`;


// Interfaces
interface IHomeProps {
  navigation: any;
}

export interface ITabRoutes {
  id: number;
  name: string;
  key: string;
}

const routes: ITabRoutes[] = [
  {
    id: 0,
    name: translate('local', TextTransform.CAPITAL),
    key: '0',
  },
  {
    id: 1,
    name: translate('regional', TextTransform.CAPITAL),
    key: '1',
  },
  {
    id: 2,
    name: translate('global', TextTransform.CAPITAL),
    key: '2',
  },
];

export const Home = (props: IHomeProps) => {
  // Props
  const { navigation } = props;

  // States
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(routes[0]);
  const [searchText, setSearchText] = useState('');

  // Context
  const { userData, isUserLogged } = useContext(UserContext);
  const { updateUserData } = useContext(AuthContext);

  let inputRef: TextInput;

  const searchDisabled = index === 2;

  const handleInputRef = (input: TextInput) => {
    inputRef = input;
  };

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
    if (isUserLogged) {
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
    }
  };

  const setNewIndex = async (index: number): Promise<void | null> => {
    setIndex(index);
    setSelectedTab(routes[index]);
  };

  const renderScene = useCallback(({ route }) => {
    switch (route.id) {
      case 0:
        return (
          <ProductList
            productTypeSlug={PRODUCT_TYPES_SLUGS.LOCAL_SLUG}
            isSearching={!!searchText?.length}
            searchText={searchText}
          />
        );
      case 1:
        return (
          <ProductList
            productTypeSlug={PRODUCT_TYPES_SLUGS.REGIONAL_SLUG}
            isSearching={!!searchText?.length}
            searchText={searchText}
          />
        );
      case 2:
        return (
          <ProductList
            productTypeSlug={PRODUCT_TYPES_SLUGS.GLOBAL_SLUG}
          />
        );
      default:
        return null;
    }
  }, [searchText]);

  const renderTabBar = () => {
    return (
      <>
        <TabsContainer>
          <HomeTabsList
            onCategoryPress={(item: ITabRoutes) => setNewIndex(item.id)}
            routes={routes}
            selectedCategoryId={selectedTab.id}
          />
        </TabsContainer>
      </>
    );
  };

  return (
    <Container>
      <SafeAreaView />
      <ScreenHeader
        hasBackButton={!isUserLogged}
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
        <TopSection>
          <CustomText
            size={Typography.FONT_SIZE_25}
            lineHeight={Typography.FONT_SIZE_30}
            weight='700'
            style={{ marginBottom: 8 }}
            color={DEFAULT_THEME.title}>
            {translate('nextDestinations', TextTransform.CAPITAL)}
          </CustomText>
          <SearchContainer style={{ backgroundColor: !searchDisabled ? DEFAULT_THEME.white : DEFAULT_THEME.disabledSearch }}>
            <SearchIcon />
            <SearchInput
              placeholder={translate('enterYourDestination', TextTransform.CAPITAL)}
              placeholderTextColor={DEFAULT_THEME.placeHolderText}
              onChangeText={(text: string) => setSearchText(text)}
              value={searchText}
              editable={!searchDisabled}
              ref={handleInputRef}
            />
            {searchText?.length ? (
              <CancelButton
                onPress={() => {
                  setSearchText('');
                  inputRef.blur();
                }}
                disabled={searchDisabled}
              >
                <CloseIconv2 />
              </CancelButton>
            ) : <></>}
          </SearchContainer>
        </TopSection>   

        {/* @enmanuel-mctekk - COMMENTED ADD FUNDS SECTION, FEATURE IS NOT GOIN TO BE ENABLED FOR NOW */}
        {/* <BalanceSection>
          <Balance>
            <CustomText
              size={Typography.FONT_SIZE_10}
              weight='300'
              color={DEFAULT_THEME.title}>
              {translate('balance', TextTransform.CAPITAL)}
            </CustomText>
            <CustomText
              size={Typography.FONT_SIZE_20}
              weight='500'
              style={{ marginTop: 1 }}
              color={DEFAULT_THEME.title}>
              {`$00.00`}
            </CustomText>
          </Balance>
          <AddFundsButton>
            <CustomText
              size={Typography.FONT_SIZE_12}
              weight='500'
              color={DEFAULT_THEME.white}>
              {translate('addFunds', TextTransform.CAPITAL)}
            </CustomText>
          </AddFundsButton>
        </BalanceSection> */}

        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setNewIndex}
          initialLayout={initialLayout}
          lazy
        />
      </Content>

      {/* Modals */}

      <NewAccountModal
        visible={showNewAccountModal}
        onPressClose={onCloseModal}
      />

    </Container>
  );
};
