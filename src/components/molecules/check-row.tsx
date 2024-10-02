// Modules
import React from 'react';
import styled from 'styled-components/native';

// Atoms
import CustomText from 'atoms/text';
import { TextTransform, translate } from 'components/atoms/localized-label';
import { Check } from 'assets/icons';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

interface ICheckRowProps {
  isSelected?: boolean;
  onCheckPress?: () => void;
  labelLocale?: string;
}

const Container = styled.View`
  background-color: ${DEFAULT_THEME.authBackground};
  padding-horizontal: 20px;
  padding-vertical: 14px;
  margin-bottom: 8px;
  width: 32%;
  border-radius: 10px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const CheckContainer = styled.TouchableOpacity`
  margin-right: 24px;
  width: 18px;
  height: 18px;
`;

const EmptyCheck = styled.View`
  border-radius: 5px;
  border-width: 1px;
  width: 18px;
  height: 18px;
  border-color: ${DEFAULT_THEME.placeHolderText};
`;

const PrimaryCheck = styled.View`
  border-radius: 5px;
  width: 18px;
  height: 18px;
  background-color: ${DEFAULT_THEME.primary};
  align-items: center;
  justify-content: center;
`;

const CheckRow = (props: ICheckRowProps) => {
  const { isSelected, onCheckPress, labelLocale = '' } = props;

  return (
    <Container>
      <CheckContainer onPress={onCheckPress}>
        {isSelected ? (
          <PrimaryCheck>
            <Check width={10} height={10} color={DEFAULT_THEME.white} />
          </PrimaryCheck>
        ) : (
          <EmptyCheck />
        )}
      </CheckContainer>
      <CustomText size={Typography.FONT_SIZE_12} weight='500' color={DEFAULT_THEME.title}>
        {`${translate(labelLocale, TextTransform.CAPITAL)}`}
      </CustomText>
    </Container>
  );
};

export default CheckRow;
