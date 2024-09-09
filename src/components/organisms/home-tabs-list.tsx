import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import styled from 'styled-components/native';
import { HomeTab } from 'atoms/home-tab';
import { ITabRoutes } from 'screens/home';
import { Typography } from 'styles';

const HomeTabsContainer = styled(FlatList)`
  flex-direction: row;
  padding-horizontal: 2px;
  padding-vertical: 2px;
`;

interface IProps {
  routes: Array;
  selectedCategoryId: Number;
  onCategoryPress: Function;
}

const HomeTabs = (props: IProps) => {
  const { routes, selectedCategoryId, onCategoryPress } = props;

  const renderItem = (e: ListRenderItemInfo<ITabRoutes>) => {
    const { item } = e;
    const active = Number(item.id) === selectedCategoryId;
    return (
      <HomeTab
        onPress={() => onCategoryPress && onCategoryPress(item)}
        label={item.name}
        active={active}
        textSize={Typography.FONT_SIZE_16}
      />
    );
  };
  return (
    <HomeTabsContainer
      data={routes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ justifyContent: 'space-between', width: '100%' }}
    />
  );
};

export default HomeTabs;
