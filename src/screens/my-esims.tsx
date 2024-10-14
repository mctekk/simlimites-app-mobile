/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
// Modules
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { SafeAreaView, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import kanvasService from 'core/services/kanvas-service';
import { TabView } from 'react-native-tab-view';

// Molecules
import Header from 'components/molecules/header';
import SimCard from 'components/molecules/esim-card';
import UnregisteredCard from 'components/molecules/unregistered-card';

// Organisms
import MyeSimsTabsList from 'organisms/my-esims-tabs-list';
import MyeSimsList from 'components/organisms/esims-list';

// Styles
import { Typography } from 'styles';

// Context
import { UserContext } from 'components/context/user-context';
import { AuthContext } from 'components/context/auth-context';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';
import CustomText from 'atoms/text';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

// Constants
import { UNREGISTERED_TYPES } from 'utils/constants';

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

const TopSection = styled.View`
  padding-horizontal: 22px;
`;

const TabsContainer = styled.View`
  background-color: ${DEFAULT_THEME.tabsBg};
  justify-content: center;
  border-radius: 50px;
  margin-horizontal: 22px;
`;

const Content = styled.View`
  flex: 1px;
`;


// Interfaces
interface IMyeSimsProps {
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
    name: translate('active', TextTransform.CAPITAL),
    key: '0',
  },
  {
    id: 1,
    name: translate('expired', TextTransform.CAPITAL),
    key: '1',
  },
];

export const MyeSims = (props: IMyeSimsProps) => {
  // Props
  const { navigation } = props;

  // States
  const [index, setIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(routes[0]);

  // Context
  const { userData, isUserLogged } = useContext(UserContext);

  useEffect(() => {}, []);

  const setNewIndex = async (index: number): Promise<void | null> => {
    setIndex(index);
    setSelectedTab(routes[index]);
  };

  const renderScene = useCallback(({ route }) => {
    switch (route.id) {
      case 0:
        return (
          <MyeSimsList />
        );
      case 1:
        return (
          <MyeSimsList isExpiredList />
        );
      default:
        return null;
    }
  }, []);

  const renderTabBar = () => {
    return (
      <>
        <TabsContainer>
          <MyeSimsTabsList
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
        hasBackButton={false}
        title={isUserLogged ? '' : translate('myeSims', TextTransform.CAPITAL)}
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
        {isUserLogged ? (
          <>
            <TopSection>
              <CustomText
                size={Typography.FONT_SIZE_25}
                lineHeight={Typography.FONT_SIZE_30}
                weight='700'
                style={{ marginBottom: 8 }}
                color={DEFAULT_THEME.title}>
                {translate('myeSims', TextTransform.CAPITAL)}
              </CustomText>
            </TopSection>
            <TabView
              renderTabBar={renderTabBar}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setNewIndex}
              initialLayout={initialLayout}
              lazy
            />
          </>
        ) : (
          <UnregisteredCard
            onButtonPress={() => navigation.navigate('RegisterEmail', { showLogin: true })}
            type={UNREGISTERED_TYPES.MY_ESIMS}
            style={{ marginHorizontal: 16 }}
          />
        )}
      </Content>

      {/* Modals */}

    </Container>
  );
};
