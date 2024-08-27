import React from 'react';
import styled from 'styled-components/native';
import CustomText from 'atoms/text';
import { TouchableOpacityProps } from 'react-native';
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';
import { deviceWidth } from 'utils/constants';

export interface IButtonProps {
  label: string;
  active?: boolean;
  backgroundColor?: string;
  activeBackgroundColor?: string;
  textSize?: number;
  disabled?: boolean;
  disabledBackgroundColor?: string
}

const Tab = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${deviceWidth*0.43}px;
  border-radius: 50px;
  padding-vertical: 10px;
`;

// eslint-disable-next-line import/prefer-default-export
export const MyeSimsTab = (props: IButtonProps & TouchableOpacityProps) => {
  const {
    label,
    style,
    disabled,
    active,
  } = props;
  return (
    <Tab
      disabled={disabled}
      style={[
        {
          backgroundColor: active ? DEFAULT_THEME.white : DEFAULT_THEME.transparent,
        },
        style,
      ]}
      {...props}
    >
      <CustomText
        color={DEFAULT_THEME.title}
        size={Typography.FONT_SIZE_15}
        weight='700'
        //style={{ align }}
      >
        {label}
      </CustomText>
    </Tab>
  );
};
