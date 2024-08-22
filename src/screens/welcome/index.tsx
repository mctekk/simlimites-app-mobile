/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
// Modules
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import SplashScreen from 'react-native-splash-screen';

// Molcules
import LoadingModal from 'components/molecules/modals/loading-modal';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';
import CustomText from 'atoms/text';
//import InAppBrowser from 'components/atoms/in-app-browser';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Utils
import { isAndroid } from 'utils/iphone-helpers';

// Interfaces
interface ISignInProps {
  navigation: any;
}

const Container = styled.View`
  flex: 1;
  background-color: ${DEFAULT_THEME.background};
  align-items: center;
`;

const BottomContainer = styled.View`
  padding-bottom: ${isAndroid() ? '40' : '90'}px;
  justify-content: space-between;
  padding-horizontal: 16px;
  margin-top: 28px;
  flex: 1;
`;

const Image = styled(FastImage)``;

const ImageContainer = styled.View`
  width: 100%;
  height: 43%;
  background-color: ${DEFAULT_THEME.secondaryButton};
`;

const TitlesContainer = styled.View``;

const ButtonsContainer = styled.View``;

const Button = styled.TouchableOpacity`
  width: 335px;
  height: 66px;
  margin-vertical: 8.5px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const SkipButton = styled.TouchableOpacity`
  padding-left: 16px;
  padding-right: 8px;
  margin-top: 18px;
`;

export const Welcome = (props: ISignInProps) => {
  // Props
  const { navigation } = props;

  // States
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const skipButton = (
    <SkipButton
      onPress={() => navigation.navigate('HomeStack')}
    >
      <CustomText
        size={Typography.FONT_SIZE_18}
        align='center'
        weight='600'
        color={DEFAULT_THEME.black}>
        {translate('skipText', TextTransform.CAPITAL)}    
      </CustomText>
    </SkipButton>
  );

  return (
    <Container>
      <ImageContainer>
        
      </ImageContainer>
      <BottomContainer>
        <TitlesContainer>
          <CustomText
            size={Typography.FONT_SIZE_40}
            lineHeight={Typography.LINE_HEIGHT_48}
            align='center'
            color={DEFAULT_THEME.black}
            weight='800'
          >
            {`${translate('welcomeTitle', TextTransform.CAPITAL)} `}
          </CustomText>
          <CustomText
            size={Typography.FONT_SIZE_13}
            align='center'
            color={DEFAULT_THEME.black}
            weight='300'
            style={{ marginTop: 17 }}
          >
            {translate('welcomeSubtitle', TextTransform.CAPITAL)}
          </CustomText>
        </TitlesContainer>
        <ButtonsContainer>
          <Button
            onPress={() => {
              navigation.navigate('LogIn');
            }}
            style={{ backgroundColor: DEFAULT_THEME.black }}>
            <CustomText
              size={Typography.FONT_SIZE_20}
              weight='600'
              align='center'
              color={DEFAULT_THEME.white}>
              {translate('login', TextTransform.CAPITAL)}
            </CustomText>
          </Button>
          <Button
            onPress={() => {
              navigation.navigate('RegisterEmail');
            }}
            style={{ backgroundColor: DEFAULT_THEME.secondaryButton }}>
            <CustomText
              size={Typography.FONT_SIZE_20}
              weight='600'
              align='center'
              color={DEFAULT_THEME.black}>
              {translate('register', TextTransform.CAPITAL)}
            </CustomText>
          </Button>
          {skipButton}

        </ButtonsContainer>
      </BottomContainer>
      
      {/* ================= Modals ================= */}
      
      <LoadingModal
        visible={isLoading}
        title={translate('signingIn', TextTransform.CAPITALIZE)}
      />

    </Container>
  );
};
