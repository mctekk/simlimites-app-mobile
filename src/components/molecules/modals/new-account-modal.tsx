/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

// Modules
import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

// Atoms
import CustomText from 'atoms/text';
import { TextTransform, translate } from 'atoms/localized-label';

// Assets
import { Check, NextArrow } from 'assets/icons';
import { isIphoneSE, isRegularIphone } from 'utils/iphone-helpers';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

interface IProps {
  onPressClose(): void;
  visible: boolean;
  titleLocale?: string;
  subTitleLocale?: string;
  btnTextLocale?: string;
}

const Container = styled.View`
  height: 100%;
  background-color: ${DEFAULT_THEME.white};
  padding-top: ${(isRegularIphone() || isIphoneSE()) ? '80' : '170'}px;
  align-items: center;
`;

const ConfigureButton = styled.TouchableOpacity`
  padding-top: 26px;
  margin-right: 14px;
  border-bottom-width: 1px;
  border-color: ${DEFAULT_THEME.subtitle};
`;

const ContinueButton = styled.TouchableOpacity`
  width: 80%;
  align-items: center;
  justify-content: center;
  height: 57px;
  border-radius: 8px;
  margin-top: 32px;
`;

const IconContainer = styled.View`
  position: absolute;
  align-self: flex-end;
  padding-right: ${(isRegularIphone() || isIphoneSE()) ? '20' : '40'}px;
`;

const NewAccountModal = ({
  visible = false,
  onPressClose,
}: IProps) => {
  const closeModal = () => {
    onPressClose();
  };

  const onConfigurePress = () => {
    // NAVIGATE TO CONFIGURE
    onPressClose();
  };

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{ width: '100%', margin: 0 }}
      onBackdropPress={closeModal}
      swipeDirection={null}
      onSwipeComplete={closeModal}
    >
      <Container>
        <CustomText
          size={Typography.FONT_SIZE_25}
          lineHeight={Typography.FONT_SIZE_30}
          weight='700'
          style={{ marginBottom: 30 }}
          color={DEFAULT_THEME.title}>
          {translate('accountCreated', TextTransform.CAPITAL)}
        </CustomText>
        <Check width={130} height={130} color={DEFAULT_THEME.primary} />
        <CustomText
          size={Typography.FONT_SIZE_18}
          lineHeight={Typography.FONT_SIZE_20}
          align='center'
          style={{ marginTop: 25, marginBottom: 35 }}
          color={DEFAULT_THEME.subtitle}>
          {`${translate('accountCreatedMsg', TextTransform.CAPITAL)} `}
            <CustomText
              size={Typography.FONT_SIZE_18}
              lineHeight={Typography.FONT_SIZE_20}
              align='center'
              weight='700'
              color={DEFAULT_THEME.subtitle}>
              {translate('accountCreatedMsg2', TextTransform.NONE)}
            </CustomText>
        </CustomText>
        <ConfigureButton onPress={onConfigurePress}>
          <CustomText
            size={Typography.FONT_SIZE_18}
            lineHeight={Typography.FONT_SIZE_20}
            align='center'
            weight='600'
            color={DEFAULT_THEME.subtitle}>
            {translate('configureDevice', TextTransform.NONE)}
          </CustomText>
        </ConfigureButton>
        <CustomText
          size={Typography.FONT_SIZE_15}
          lineHeight={Typography.FONT_SIZE_20}
          style={{ marginVertical: 35 }}
          color={DEFAULT_THEME.subtitle}>
          {translate('or', TextTransform.CAPITAL)}
        </CustomText>
        <ContinueButton
          onPress={closeModal}
          style={{ backgroundColor: DEFAULT_THEME.primary }}
        >
          <CustomText
            size={20}
            lineHeight={Typography.FONT_SIZE_24}
            weight='600'
            color={DEFAULT_THEME.white}>
            {translate('goToHomepage', TextTransform.CAPITAL)}
          </CustomText>
          <IconContainer>
            <NextArrow />
          </IconContainer>
        </ContinueButton>
      </Container>
    </Modal>
  );
};

export default NewAccountModal;
