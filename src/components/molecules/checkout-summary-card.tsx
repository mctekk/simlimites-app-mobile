/* eslint-disable react-native/no-inline-styles */
// Modules
import React, { useEffect } from 'react';
import styled from 'styled-components/native';

// Atoms
import CustomText from 'atoms/text';
import { TextTransform, translate } from 'components/atoms/localized-label';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Interface
import { VariantInterface, ProductInterface } from '@kanvas/core';

// Contants
import { VARIANT_ATTRIBUTE_SLUGS } from 'utils/constants';

interface ICheckoutSummaryCardProps {
  onPress?: () => void;
  isSelected?: boolean;
  variant?: VariantInterface;
  product?: ProductInterface;
  flagUris?: string[];
}

const Container = styled.View`
  background-color: ${DEFAULT_THEME.authBackground};
  padding-horizontal: 20px;
  padding-vertical: 25px;
  margin-bottom: 10px;
  width: 32%;
  border-radius: 10px;
  border-width: 2px;
  width: 100%;
`;

const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
`;

const BottomContainer = styled.View`
  border-top-width: 0.5px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-color: ${DEFAULT_THEME.placeHolderText};
  padding-top: 11px;
`;

const CouponButton = styled.TouchableOpacity``;

const CheckoutSummaryCard = (props: ICheckoutSummaryCardProps) => {
  const { onPress, isSelected, variant, product, flagUris } = props;

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
      style={{ borderColor: isSelected ? DEFAULT_THEME.black : DEFAULT_THEME.transparent }}>
      <TopContainer>
        <CustomText size={Typography.FONT_SIZE_15} weight='600' color={DEFAULT_THEME.title}>
          {translate('orderSummary', TextTransform.CAPITAL)}
        </CustomText>
        <CouponButton onPress={() => {}}>
          <CustomText
            size={Typography.FONT_SIZE_12}
            weight='600'
            style={{
              textDecorationLine: 'underline',
            }}
            color={DEFAULT_THEME.title}>
            {translate('applyCoupon', TextTransform.CAPITAL)}
          </CustomText>
        </CouponButton>
      </TopContainer>
      <SummaryRow>
        <CustomText size={Typography.FONT_SIZE_12} color={DEFAULT_THEME.title}>
          {`${translate('eSimCost', TextTransform.NONE)}`}
        </CustomText>
        <CustomText size={Typography.FONT_SIZE_12} weight='700' color={DEFAULT_THEME.title}>
          {`$${variant?.channel?.price}.00`}
        </CustomText>
      </SummaryRow>
      {/* <SummaryRow>
        <CustomText size={Typography.FONT_SIZE_12} color={DEFAULT_THEME.title}>
          {`${translate('coupon', TextTransform.CAPITAL)}`}
        </CustomText>
        <CustomText size={Typography.FONT_SIZE_12} weight='700' color={DEFAULT_THEME.title}>
          {`- $${variant?.channel?.price}.00`}
        </CustomText>
      </SummaryRow> */}
      <BottomContainer>
        <CustomText size={Typography.FONT_SIZE_12} weight='700' color={DEFAULT_THEME.title}>
          {`${translate('total', TextTransform.CAPITAL)}`}
        </CustomText>
        <CustomText size={Typography.FONT_SIZE_12} weight='700' color={DEFAULT_THEME.title}>
          {`$${variant?.channel?.price}.00`}
        </CustomText>
      </BottomContainer>
    </Container>
  );
};

export default CheckoutSummaryCard;
