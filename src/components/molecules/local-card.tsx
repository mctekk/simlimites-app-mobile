
// Modules
import React from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

// Atoms
import CustomText from 'atoms/text';
import { CardArrow } from 'assets/icons';

// Styles
import { Typography } from "styles";
import { DEFAULT_THEME } from "styles/theme";

interface ILocalCardProps {
  onPress?: () => void;
  label: string;
  flagImageUri?: string;
  isFirst: boolean;
  isLast: boolean;
}

const Container = styled.TouchableOpacity`
  height: 50px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  backgroundColor: ${DEFAULT_THEME.authBackground};
  justify-content: space-between;
  padding-horizontal: 24px;
  border-bottom-width: 1px;
  border-color: ${DEFAULT_THEME.background};
`;

const LeftContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Flag = styled(FastImage)`
  width: 38px;
  height: 21px;
  background-color: ${DEFAULT_THEME.disabledButton};
`;

const LocalCard = (props: ILocalCardProps) => {

  const { onPress, label, isFirst, isLast, flagImageUri } = props;

  const onCardPress = () => {
    onPress?.();
  };

  return (
    <Container
      onPress={onCardPress}
      style={{
        borderTopLeftRadius: isFirst ? 10 : 0,
        borderTopRightRadius: isFirst ? 10 : 0,
        borderBottomLeftRadius: isLast ? 10 : 0,
        borderBottomRightRadius: isLast ? 10 : 0,
      }}
    >
      <LeftContainer>
        <Flag
          source={{ uri: flagImageUri || '' }}
        />
        <CustomText
          size={Typography.FONT_SIZE_15}
          weight='600'
          style={{ marginLeft: 10 }}
          color={DEFAULT_THEME.title}>
          {label}
        </CustomText>
      </LeftContainer>
      <CardArrow />
    </Container>
  )
};

export default LocalCard;