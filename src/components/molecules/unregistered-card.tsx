// Modules
import React from 'react';
import styled from 'styled-components/native';

// Atoms
import CustomText from 'atoms/text';
import { MyeSimsIcon, DefaultProfileIcon } from 'assets/icons';
import { TextTransform, translate } from 'components/atoms/localized-label';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Constants
import { UNREGISTERED_TYPES } from 'utils/constants';

interface IUnregisteredCardProps {
  onButtonPress?: () => void;
  type?: string;
  style?: object;
}

const UnregisteredContainer = styled.View`
  align-items: center;
  margin-top: 100px;
  background-color: ${DEFAULT_THEME.white};
  padding-top: 48px;
  border-radius: 10px;
`;

const RegisterButton = styled.TouchableOpacity`
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

const UnregisteredCard = (props: IUnregisteredCardProps) => {
  const { onButtonPress, type = UNREGISTERED_TYPES.PROFILE, style } = props;

  const getIcon = () => {
    if (type === UNREGISTERED_TYPES.PROFILE) {
      return <DefaultProfileIcon />;
    }
    if (type === UNREGISTERED_TYPES.MY_ESIMS) {
      return <MyeSimsIcon color={DEFAULT_THEME.placeHolderText} size={84} />;
    }
    return <></>;
  };

  const getTitleLocale = () => {
    if (type === UNREGISTERED_TYPES.PROFILE) {
      return 'unregisteredProfileTitle';
    }
    if (type === UNREGISTERED_TYPES.MY_ESIMS) {
      return 'unregisteredMyeSimsTitle';
    }
    return '';
  };

  const getSubtitleLocale = () => {
    if (type === UNREGISTERED_TYPES.PROFILE) {
      return 'unregisteredProfileSubtitle';
    }
    if (type === UNREGISTERED_TYPES.MY_ESIMS) {
      return 'unregisteredMyeSimsSubtitle';
    }
    return '';
  };

  return (
    <UnregisteredContainer style={style}>
      {getIcon()}
      <CustomText
        color={DEFAULT_THEME.title}
        size={Typography.FONT_SIZE_24}
        weight='700'
        style={{ marginBottom: 10, marginTop: 16 }}>
        {translate(getTitleLocale(), TextTransform.CAPITAL)}
      </CustomText>
      <CustomText
        color={DEFAULT_THEME.subtitle}
        size={Typography.FONT_SIZE_18}
        weight='500'
        style={{ marginBottom: 16 }}>
        {translate(getSubtitleLocale(), TextTransform.CAPITAL)}
      </CustomText>
      <RegisterButton onPress={onButtonPress}>
        <CustomText color={DEFAULT_THEME.white} size={Typography.FONT_SIZE_13} weight='500'>
          {translate('createAccount', TextTransform.NONE)}
        </CustomText>
      </RegisterButton>
    </UnregisteredContainer>
  );
};

export default UnregisteredCard;
