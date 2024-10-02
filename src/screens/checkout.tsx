/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
// Modules
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { SafeAreaView, TextInput } from 'react-native';
import styled from 'styled-components/native';
import kanvasService from 'core/services/kanvas-service';

// Molecules
import Header from 'components/molecules/header';
import CheckoutVariantCard from 'components/molecules/checkout-variant-card';
import CheckoutSummaryCard from 'components/molecules/checkout-summary-card';
import CheckoutDeviceCard from 'components/molecules/checkout-device-card';

// Styles
import { Typography } from 'styles';

// Context
import { UserContext } from 'components/context/user-context';
import { AuthContext } from 'components/context/auth-context';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';
import CustomText from 'atoms/text';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

// Utils
import { wait } from 'utils';

// Constants
import { PRODUCT_TYPES_SLUGS } from 'utils/constants';
import { VariantInterface } from '@kanvas/core';

const Container = styled.View`
  background-color: ${DEFAULT_THEME.background};
  flex: 1;
`;

const ScreenHeader = styled(Header)`
  align-items: center;
  background-color: ${DEFAULT_THEME.background};
  padding-top: 10px;
  height: 60px;
  margin-bottom: 0px;
  padding-horizontal: 22px;
`;

const Content = styled.ScrollView`
  flex: 1px;
  padding-horizontal: 16px;
`;

const Footer = styled.View`
  position: absolute;
  background-color: ${DEFAULT_THEME.white};
  width: 100%;
  bottom: 0;
  padding-horizontal: 16px;
  padding-top: 30px;
  padding-bottom: 50px;
`;

const PurchaseButton = styled.TouchableOpacity`
  width: 100%;
  padding-vertical: 12px;
  background-color: ${DEFAULT_THEME.primary};
  border-radius: 50px;
  align-items: center;
`;

const FooterText = styled(CustomText)`
  font-size: ${Typography.FONT_SIZE_12}px;
  line-height: ${Typography.FONT_SIZE_15}px;
  color: ${DEFAULT_THEME.title};
  font-weight: 400;
`;

const FooterTextBlack = styled(CustomText)`
  font-size: ${Typography.FONT_SIZE_12}px;
  line-height: ${Typography.FONT_SIZE_15}px;
  color: ${DEFAULT_THEME.title};
  font-weight: 700;
`;

// Interfaces
interface ICheckoutProps {
  navigation: any;
  variant: VariantInterface;
  route?: any;
}

export const Checkout = (props: ICheckoutProps) => {
  // Props
  const { navigation, route } = props;

  // Params
  const variant = route?.params?.variant;
  const product = route?.params?.product;
  const flagUris = route?.params?.flagUris;

  const [deviceSelected, setDeviceSelected] = useState({});
  const [acceptCompatible, setAcceptCompatible] = useState(false);
  const [acceptUnlocked, setAcceptUnlocked] = useState(false);

  useEffect(() => () => {
    console.log("checkout product===", variant, product, flagUris);
  }, [product]);

  return (
    <Container>
      <SafeAreaView />
      <ScreenHeader
        title={translate('checkout', TextTransform.CAPITALIZE)}
        titleProps={{
          style: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '700',
          },
        }}
      />
      <Content>
        <CheckoutVariantCard variant={variant} product={product} flagUris={flagUris} />
        <CheckoutDeviceCard deviceSelected={deviceSelected} />
        <CheckoutSummaryCard variant={variant} product={product} flagUris={flagUris} />
      </Content>
      <Footer>
        <PurchaseButton
          disabled={!variant?.id}
          onPress={() => {console.log('Stripe implementation')}}
          style={{
            backgroundColor: !variant?.id
              ? DEFAULT_THEME.disabledPrimary
              : DEFAULT_THEME.primary,
          }}>
          <CustomText size={Typography.FONT_SIZE_20} weight='700' color={DEFAULT_THEME.white}>
            {`${translate('buyPlan', TextTransform.CAPITAL)} $${
              variant?.channel?.price ? variant?.channel?.price : '0'
            }`}
          </CustomText>
        </PurchaseButton>
        <CustomText style={{ marginTop: 10 }}>
          <FooterText>{`${translate('checkoutFooterMsg1', TextTransform.NONE)}`}</FooterText>
          <FooterTextBlack>{` ${translate('terms', TextTransform.NONE)} `}</FooterTextBlack>
          <FooterText>{`${translate('checkoutFooterMsg2', TextTransform.NONE)}`}</FooterText>
          <FooterTextBlack>{` ${translate('privacyPolicy', TextTransform.NONE)} `}</FooterTextBlack>
          <FooterText>{`${translate('checkoutFooterMsg3', TextTransform.NONE)}`}</FooterText>
        </CustomText>
      </Footer>
    </Container>
  );
};
