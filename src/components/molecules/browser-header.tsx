// Modules
import React from 'react';
import styled from 'styled-components/native';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Atoms
import Text from 'atoms/text';
import CloseButton from 'components/atoms/close-button';

// Icons
import { ReloadIcon } from 'assets/icons';

interface IBrowserHeaderProps {
  title: string;
  closeBrowser?: () => void;
  progress: number;
  loading: boolean;
  onReloadPressed: () => void;
}

const Container = styled.View`
  background-color: ${DEFAULT_THEME.background};
`;

const HeaderBar = styled.View`
  padding-vertical: 8px;
  padding-horizontal: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled(Text)`
  color: ${DEFAULT_THEME.title};
  font-size: ${Typography.FONT_SIZE_16}px;
  line-height: ${Typography.FONT_SIZE_24}px;
  font-weight: 600;
  width: 200px;
  text-align: center;
`;

const IconContainer = styled.TouchableOpacity``;

const BrowserHeader = (props: IBrowserHeaderProps) => {
  const { title, closeBrowser, onReloadPressed } = props;

  return (
    <Container>
      <HeaderBar>
        <CloseButton onPress={() => closeBrowser && closeBrowser()} />

        <TitleContainer>{title}</TitleContainer>

        <IconContainer onPress={() => onReloadPressed()}>
          <ReloadIcon color={DEFAULT_THEME.black} />
        </IconContainer>
      </HeaderBar>
    </Container>
  );
};

export default BrowserHeader;
