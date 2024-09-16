
// Modules
import React from "react";
import styled from "styled-components/native";

// Atoms
import CustomText from 'atoms/text';
import { TextTransform, translate } from 'components/atoms/localized-label';

// Styles
import { Typography } from "styles";
import { DEFAULT_THEME } from "styles/theme";

// Utils
import { isIphoneSE, isIphone14 } from 'utils/iphone-helpers';

interface IVariantCardProps {
  onPress?: () => void;
  label: string;
  price?: string | number;
  isSelected?: boolean;
}

const Container = styled.TouchableOpacity`
  backgroundColor: ${DEFAULT_THEME.authBackground};
  padding-horizontal: 20px;
  padding-vertical: 17px;
  margin-bottom: 8px;
  width: 32%;
  border-radius: 10px;
  border-width: 2px;
`;

const VariantCard = (props: IVariantCardProps) => {

  const { onPress, label, price, isSelected } = props;

  const onCardPress = () => {
    onPress?.();
  };

  return (
    <Container
      onPress={onCardPress}
      style={{ borderColor: isSelected ? DEFAULT_THEME.black : DEFAULT_THEME.transparent }}
    >
      <CustomText
        size={(isIphoneSE() || isIphone14()) ? Typography.FONT_SIZE_22 : Typography.FONT_SIZE_28}
        weight='700'
        style={{ marginBottom: 1 }}
        color={DEFAULT_THEME.title}>
        {label}
      </CustomText>
      <CustomText
        size={Typography.FONT_SIZE_12}
        style={{ marginBottom: 24 }}
        color={DEFAULT_THEME.variantSubtitle}>
        {translate('dataOnly', TextTransform.CAPITAL)}
      </CustomText>
      <CustomText
        size={Typography.FONT_SIZE_15}
        weight='700'
        color={DEFAULT_THEME.variantSubtitle}>
        {`$${price}.00`}
      </CustomText>
    </Container>
  )
};

export default VariantCard;