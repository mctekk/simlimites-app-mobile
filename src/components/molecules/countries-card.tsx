// Modules
import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

// Atoms
import CustomText from 'atoms/text';
import { CardArrow } from 'assets/icons';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

interface ICountriesCardProps {
  onPress?: () => void;
  label: string;
  flagImageUris?: string[];
  style?: any;
  isLocal?: boolean;
  iconComponent?: any;
}

const Container = styled.TouchableOpacity`
  height: 50px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  background-color: ${DEFAULT_THEME.authBackground};
  justify-content: space-between;
  padding-horizontal: 24px;
  border-bottom-width: 1px;
  border-color: ${DEFAULT_THEME.background};
  border-radius: 10px;
`;

const LeftContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Flag = styled(FastImage)`
  width: 38px;
  height: 21px;
  background-color: ${DEFAULT_THEME.disabledButton};
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
`;

const CountriesCard = (props: ICountriesCardProps) => {
  const { onPress, label, style, flagImageUris, isLocal, iconComponent } = props;

  const onCardPress = () => {
    onPress?.();
  };

  return (
    <Container onPress={onCardPress} style={style} disabled={isLocal}>
      <LeftContainer>
        {isLocal ? (
          <Flag source={{ uri: flagImageUris?.[0] || '' }} />
        ) : (
          <FlagGroupContainer>
            {iconComponent ? (
              <>{iconComponent}</>
            ) : (
              flagImageUris?.map((flagUri, index) => {
                return (
                  <GroupFlag
                    key={index}
                    source={{ uri: flagUri || '' }}
                    style={{ marginLeft: -7 }}
                  />
                );
              })
            )}
          </FlagGroupContainer>
        )}

        <CustomText
          size={Typography.FONT_SIZE_15}
          weight='600'
          style={{ marginLeft: 10 }}
          color={DEFAULT_THEME.title}>
          {label}
        </CustomText>
      </LeftContainer>

      {isLocal ? <></> : <CardArrow />}
    </Container>
  );
};

export default CountriesCard;
