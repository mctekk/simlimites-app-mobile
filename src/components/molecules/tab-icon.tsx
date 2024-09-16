/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Icons
import { NextArrow, HomeIcon, MyeSimsIcon, AccountIcon } from 'assets/icons';

// Atoms
import CustomText from 'atoms/text';
import { TextTransform, translate } from 'components/atoms/localized-label';

interface IProps {
  name: string;
  focused: boolean;
}

const Button = styled.TouchableOpacity`
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  `;

const TabIcon = (props: IProps) => {

  const {
    name,
    focused,
  } = props;

  const navigation = useNavigation();

  const tintColor = focused ? DEFAULT_THEME.primary : DEFAULT_THEME.black;

  switch (name) {
    case 'home':
      return (
        <>
          <HomeIcon
            color={tintColor}
            isTabActive={focused}
          />
          <CustomText
            size={Typography.FONT_SIZE_10}
            weight='500'
            style={{ marginTop: 7 }}
            color={tintColor}>
            {translate('home', TextTransform.CAPITAL)}
          </CustomText>
        </>
      );
    case 'myesims':
      return (
        <>
          <MyeSimsIcon
            color={tintColor}
            isTabActive={focused}
          />
          <CustomText
            size={Typography.FONT_SIZE_10}
            weight='500'
            style={{ marginTop: 7 }}
            color={tintColor}>
            {translate('myeSims', TextTransform.CAPITAL)}
          </CustomText>
        </>
      );
    case 'userprofile':
      return (
        <>
          <AccountIcon
            color={tintColor}
            isTabActive={focused}
          />
          <CustomText
            size={Typography.FONT_SIZE_10}
            weight='500'
            style={{ marginTop: 7 }}
            color={tintColor}>
            {translate('account', TextTransform.CAPITAL)}
          </CustomText>
        </>
      );
    default:
      return null;
  }
};

export default TabIcon;
