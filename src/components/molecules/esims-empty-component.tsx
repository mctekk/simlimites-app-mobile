/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import styled from 'styled-components/native';
import { Typography } from 'styles';

// Atoms
import CustomText from 'components/atoms/text';

// Assets
import { MyeSimsIcon } from 'assets/icons';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

const Container = styled.View`
  height: 200px;
  width: 200px;
  align-items: center;
  width: 100%;
  padding-top: 30px;
`;

export interface IESimsEmptyComponent {
  label: string;
}

const ESimsEmptyComponent = (props: IESimsEmptyComponent) => {

  const { label } = props;

  return (
    <Container>
        <MyeSimsIcon size={80} color={DEFAULT_THEME.placeHolderText} />
        <CustomText
          size={Typography.FONT_SIZE_16}
          lineHeight={Typography.FONT_SIZE_30}
          weight='400'
          style={{ marginTop: 25 }}
          align='center'
          color={DEFAULT_THEME.subtitle}>
          {label}
        </CustomText>
    </Container>
  );
};

export default ESimsEmptyComponent;
