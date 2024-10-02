// Modules
import React from 'react';
import styled from 'styled-components/native';

// Atoms
import CustomText from 'atoms/text';
import { TextTransform, translate } from 'components/atoms/localized-label';
import BackArrow from 'assets/icons/back-arrow';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

interface ICheckoutVariantCardProps {
  deviceSelected?: any;
}

const Container = styled.View`
  background-color: ${DEFAULT_THEME.authBackground};
  padding-horizontal: 20px;
  padding-vertical: 14px;
  margin-bottom: 32px;
  width: 32%;
  border-radius: 10px;
  border-width: 2px;
  width: 100%;
`;

const ConfirmDeviceButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const ArrowContainer = styled.View`
  margin-left: 6px;
`;

const CheckoutVariantCard = (props: ICheckoutVariantCardProps) => {
  const { deviceSelected } = props;

  return (
    <Container
      style={{
        borderColor: deviceSelected?.id ? DEFAULT_THEME.transparent : DEFAULT_THEME.warning,
      }}>
      <CustomText
        size={Typography.FONT_SIZE_13}
        style={{ marginBottom: 8 }}
        color={DEFAULT_THEME.title}>
        {`${translate('checkDeviceMsg', TextTransform.CAPITAL)}`}
      </CustomText>
      <ConfirmDeviceButton>
        <CustomText
          size={Typography.FONT_SIZE_15}
          weight='700'
          color={DEFAULT_THEME.variantSubtitle}>
          {`${translate('confirmYourDevice', TextTransform.CAPITAL)}`}
        </CustomText>
        <ArrowContainer style={{ transform: [{ rotate: '180deg' }] }}>
          <BackArrow color={DEFAULT_THEME.title} width={7} height={11} />
        </ArrowContainer>
      </ConfirmDeviceButton>
    </Container>
  );
};

export default CheckoutVariantCard;
