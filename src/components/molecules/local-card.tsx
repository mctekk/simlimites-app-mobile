
// Modules
import React from "react";
import styled from "styled-components/native";

// Atoms
import CustomText from 'atoms/text';
import { CardArrow } from 'assets/icons';

// Styles
import { Typography } from "styles";
import { DEFAULT_THEME } from "styles/theme";

interface ILocalCardProps {
  onPress?: () => void;
  label: string;
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
`;

const LeftContainer = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

const FlagPlaceholder = styled.View`
  width: 38px;
  height: 21px;
  background-color: gray;
`;

const LocalCard = (props: ILocalCardProps) => {

  const { onPress, label, isFirst, isLast } = props;

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
        <FlagPlaceholder />
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