
// Modules
import React from 'react';
import styled from 'styled-components/native';

// Atoms
import CustomText from 'atoms/text';
import { CardArrow } from 'assets/icons';
import LocalizedLabel, { TextTransform } from 'components/atoms/localized-label';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

interface IRegionalCardProps {
  onPress?: () => void;
  label: string;
  countriesQty?: string;
  style?: object;
}

const Container = styled.TouchableOpacity`
  height: 78px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  backgroundColor: ${DEFAULT_THEME.authBackground};
  justify-content: space-between;
  padding-right: 24px;
  padding-left: 18px;
  border-bottom-width: 1px;
  border-color: ${DEFAULT_THEME.background};
  border-radius: 10px;
`;

const LeftContainer = styled.View``;

const RegionalCard = (props: IRegionalCardProps) => {

  const {
    onPress,
    label,
    style,
    countriesQty = '0',
  } = props;

  const onCardPress = () => {
    onPress?.();
  };

  return (
    <Container onPress={onCardPress} style={style}>
      <LeftContainer>
        <CustomText
          size={Typography.FONT_SIZE_17}
          weight='600'
          style={{ marginBottom: 1 }}
          color={DEFAULT_THEME.title}>
          {label}
        </CustomText>
        <LocalizedLabel
          localeKey="countriesCoverage"
          size={Typography.FONT_SIZE_10}
          color={DEFAULT_THEME.title}
          interpolate={{ number: countriesQty }}
          textTransform={TextTransform.CAPITAL}
        />
      </LeftContainer>
      <CardArrow />
    </Container>
  )
};

export default RegionalCard;