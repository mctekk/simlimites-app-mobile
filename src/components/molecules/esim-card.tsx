// Modules
import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

// Atoms
import CustomText from 'atoms/text';
import { translate, TextTransform } from 'atoms/localized-label';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';
import { ISimCard } from 'interfaces/products-interface';

interface IeSimCardProps {
  onPress?: () => void;
  simCardData?: ISimCard;
  style?: any;
}

const Container = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  background-color: ${DEFAULT_THEME.authBackground};
  justify-content: space-between;
  padding: 10px;
  border-bottom-width: 1px;
  border-color: ${DEFAULT_THEME.background};
  border-radius: 20px;
`;

const TopContainer = styled.View`
  background-color: ${DEFAULT_THEME.cardBg};
  width: 100%;
  padding-vertical: 16px;
  padding-horizontal: 22px;
  border-radius: 10px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
`;

const RowChildContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const Flag = styled(FastImage)`
  width: 25px;
  height: 14px;
  background-color: ${DEFAULT_THEME.disabledButton};
`;

const Button = styled.TouchableOpacity`
  padding-vertical: 7px;
  width: 48%;
  border-radius: 8px;
  align-items: center;
`;

const Circle = styled.View`
  height: 4px;
  width: 4px;
  border-radius: 2px;
  background-color: ${DEFAULT_THEME.title};
  margin-horizontal: 7px;
`;

const SimCard = (props: IeSimCardProps) => {
  const { onPress, simCardData, style } = props;

  const onCardPress = () => {
    onPress?.();
  };

  return (
    <Container onPress={onCardPress} style={style}>
      <TopContainer>
        <RowContainer>
          <RowChildContainer>
            <Flag source={{ uri: simCardData?.flagImageUri || '' }} />
            <CustomText
              size={Typography.FONT_SIZE_12}
              weight='600'
              style={{ marginLeft: 7 }}
              color={DEFAULT_THEME.title}>
              {simCardData?.countryName}
            </CustomText>
          </RowChildContainer>
          {simCardData?.active ? (
            <CustomText
              size={Typography.FONT_SIZE_12}
              weight='600'
              style={{}}
              color={DEFAULT_THEME.title}>
              {translate('active', TextTransform.CAPITAL)}
            </CustomText>
          ) : (
            <RowChildContainer style={{ alignItems: 'center' }}>
              <CustomText
                size={Typography.FONT_SIZE_20}
                weight='700'
                style={{ marginBottom: -2 }}
                color={DEFAULT_THEME.title}>
                {simCardData?.dataPlan}
              </CustomText>
              <Circle />
              <CustomText
                size={Typography.FONT_SIZE_12}
                weight='600'
                color={DEFAULT_THEME.title}>
                {`${simCardData?.planDays} ${translate('days', TextTransform.NONE)}`}
              </CustomText>
            </RowChildContainer>
          )}
        </RowContainer>
        {simCardData?.active ? (
          <RowContainer style={{ marginTop: 37 }}>
            <RowChildContainer>
              <CustomText
                size={Typography.FONT_SIZE_20}
                weight='700'
                style={{ marginBottom: -2 }}
                color={DEFAULT_THEME.title}>
                {simCardData?.usedData}
              </CustomText>
              <CustomText
                size={Typography.FONT_SIZE_10}
                weight='500'
                style={{ marginLeft: 3 }}
                color={DEFAULT_THEME.title}>
                {translate('dataMsg', TextTransform.NONE, {
                  interpolate: { dataPlan: simCardData?.dataPlan },
                })}
              </CustomText>
            </RowChildContainer>
            <CustomText
              size={Typography.FONT_SIZE_10}
              weight='500'
              color={DEFAULT_THEME.title}>
              {translate('daysLeft', TextTransform.CAPITAL, {
                interpolate: { days: simCardData?.daysLeft },
              })}
            </CustomText>
          </RowContainer>
        ) : (
          <></>
        )}
      </TopContainer>
      <ButtonsContainer>
        {simCardData?.active ? (
          <>
            <Button style={{ backgroundColor: DEFAULT_THEME.primary }}>
              <CustomText
                size={Typography.FONT_SIZE_12}
                weight='600'
                color={DEFAULT_THEME.white}>
                {translate('buyMoreData', TextTransform.CAPITAL)}
              </CustomText>
            </Button>
            <Button style={{ backgroundColor: DEFAULT_THEME.simMoreInfo }}>
              <CustomText
                size={Typography.FONT_SIZE_12}
                weight='600'
                color={DEFAULT_THEME.white}>
                {translate('moreInformation', TextTransform.CAPITAL)}
              </CustomText>
            </Button>
          </>
        ) : (
          <Button style={{ backgroundColor: DEFAULT_THEME.primary, width: '100%' }}>
            <CustomText
              size={Typography.FONT_SIZE_12}
              weight='600'
              color={DEFAULT_THEME.white}>
              {translate('letsActivateSim', TextTransform.CAPITAL)}
            </CustomText>
          </Button>
        )}
      </ButtonsContainer>
    </Container>
  );
};

export default SimCard;
