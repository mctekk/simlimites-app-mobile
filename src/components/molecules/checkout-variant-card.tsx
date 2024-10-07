// Modules
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

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

interface ICheckoutVariantCardProps {
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

const BottomContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const SubContainer = styled.View`
  margin-right: 26px;
`;

const GroupFlag = styled(FastImage)`
  width: 21px;
  height: 15px;
  background-color: ${DEFAULT_THEME.disabledButton};
`;

const FlagGroupContainer = styled.View`
  background-color: ${DEFAULT_THEME.transparent};
  flex-direction: row;
  width: 40px;
  margin-bottom: 8px;
`;

const CheckoutVariantCard = (props: ICheckoutVariantCardProps) => {
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
      onPress={onCardPress}
      style={{ borderColor: isSelected ? DEFAULT_THEME.black : DEFAULT_THEME.transparent }}>
      <FlagGroupContainer>
        {flagUris?.map((flagUri, index) => {
          return (
            <GroupFlag
              key={index}
              source={{ uri: flagUri || '' }}
              style={{ marginLeft: index > 0 ? -7 : 0 }}
            />
          );
        })}
      </FlagGroupContainer>
      <CustomText
        size={Typography.FONT_SIZE_20}
        weight='600'
        style={{ marginBottom: 8 }}
        color={DEFAULT_THEME.title}>
        {product?.name}
      </CustomText>
      <BottomContainer>
        <SubContainer>
          <CustomText
            size={Typography.FONT_SIZE_10}
            style={{ marginBottom: 4 }}
            color={DEFAULT_THEME.variantSubtitle}>
            {`${translate('data', TextTransform.CAPITAL)}`}
          </CustomText>
          <CustomText size={Typography.FONT_SIZE_15} weight='600' color={DEFAULT_THEME.title}>
            {variant?.name}
          </CustomText>
        </SubContainer>
        <SubContainer>
          <CustomText
            size={Typography.FONT_SIZE_10}
            style={{ marginBottom: 4 }}
            color={DEFAULT_THEME.variantSubtitle}>
            {`${translate('validFor', TextTransform.CAPITAL)}`}
          </CustomText>
          <CustomText size={Typography.FONT_SIZE_15} weight='600' color={DEFAULT_THEME.title}>
            {`${getVariantDuration()} ${translate('days', TextTransform.NONE)}`}
          </CustomText>
        </SubContainer>
        <SubContainer>
          <CustomText
            size={Typography.FONT_SIZE_10}
            style={{ marginBottom: 4 }}
            color={DEFAULT_THEME.variantSubtitle}>
            {`${translate('price', TextTransform.CAPITAL)}`}
          </CustomText>
          <CustomText size={Typography.FONT_SIZE_15} weight='600' color={DEFAULT_THEME.title}>
            {`$${variant?.channel?.price}.00`}
          </CustomText>
        </SubContainer>
      </BottomContainer>
    </Container>
  );
};

export default CheckoutVariantCard;
