/* eslint-disable prettier/prettier */
// Modules
import React from 'react';
import styled from 'styled-components/native';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Atoms
import CustomText from 'atoms/text';

const Container = styled.View``;

const SectionTitle = styled(CustomText)`
  background-color: ${DEFAULT_THEME.background};
  color: ${DEFAULT_THEME.settingsGray};
  margin-bottom: 5px;
`;

interface IProps {
  title: string;
  style?: object;
}

const SectionHeader = ({ title, style }: IProps) => (
  <Container
    style={style}
  >
    <SectionTitle
      size={Typography.FONT_SIZE_12}
    >
      {title}
    </SectionTitle>
  </Container>
);

export default SectionHeader;
