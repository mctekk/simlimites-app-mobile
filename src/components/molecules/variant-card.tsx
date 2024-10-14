// Modules
import React, { useEffect } from 'react';
import styled from 'styled-components/native';

// Atoms
import CustomText from 'atoms/text';
import { TextTransform, translate } from 'components/atoms/localized-label';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Utils
import { isIphoneSE, isIphone14 } from 'utils/iphone-helpers';

// Interface
import { VariantInterface, AttributesInterface } from '@kanvas/core';

// Contants
import { VARIANT_ATTRIBUTE_SLUGS } from 'utils/constants';

interface IVariantCardProps {
  onPress?: () => void;
  isSelected?: boolean;
  variant?: VariantInterface;
}

const Container = styled.TouchableOpacity`
  background-color: ${DEFAULT_THEME.authBackground};
  padding-horizontal: 20px;
  padding-vertical: 17px;
  margin-bottom: 8px;
  width: 32%;
  border-radius: 10px;
  border-width: 2px;
`;

const VariantCard = (props: IVariantCardProps) => {
  const { onPress, isSelected, variant } = props;

  const onCardPress = () => {
    onPress?.();
  };

  const getVariantDuration = () => {
    let variantDuration = '';
    const durationAttribute = variant?.attributes?.find(
      (attribute: any) => attribute?.slug === VARIANT_ATTRIBUTE_SLUGS.DURATION_SLUG,
    );

    if (durationAttribute) {
      variantDuration = durationAttribute?.value;
    }

    return variantDuration;
  };

  return (
    <Container
      onPress={onCardPress}
      style={{ borderColor: isSelected ? DEFAULT_THEME.primary : DEFAULT_THEME.transparent }}>
      <CustomText
        size={isIphoneSE() || isIphone14() ? Typography.FONT_SIZE_22 : Typography.FONT_SIZE_28}
        weight='700'
        style={{ marginBottom: 1 }}
        color={DEFAULT_THEME.title}>
        {variant?.name}
      </CustomText>
      <CustomText
        size={Typography.FONT_SIZE_12}
        style={{ marginBottom: 24 }}
        color={DEFAULT_THEME.variantSubtitle}>
        {`${getVariantDuration()} ${translate('days', TextTransform.NONE)}`}
      </CustomText>
      <CustomText
        size={Typography.FONT_SIZE_15}
        weight='700'
        color={DEFAULT_THEME.variantSubtitle}>
        {`$${variant?.channel?.price}.00`}
      </CustomText>
    </Container>
  );
};

export default VariantCard;
