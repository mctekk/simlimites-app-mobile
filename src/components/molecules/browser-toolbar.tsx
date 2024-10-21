// Modules
import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Atoms
import IconButton from 'atoms/icon-button';
import { SafariIcon, ShareIconV2 } from 'assets/icons';
import { DEFAULT_THEME } from 'styles/theme';

interface IBrowserToolbarProps {
  onSharePressed?: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  onBackPressed: () => void;
  onForwardPressed: () => void;
  onOpenInBrowserPressed: () => void;
}

const Toolbar = styled.View`
  background-color: ${DEFAULT_THEME.background};
  padding-vertical: 16px;
  padding-horizontal: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const ICON_SIZE = 22;

const BrowserToolbar = (props: IBrowserToolbarProps) => {
  // Props
  const {
    onSharePressed,
    onBackPressed,
    onForwardPressed,
    onOpenInBrowserPressed,
    canGoBack = false,
    canGoForward = false,
  } = props;

  return (
    <Toolbar>
      <IconButton
        iconType='SimpleLineIcons'
        name='arrow-left'
        color={DEFAULT_THEME.black}
        size={ICON_SIZE}
        onPress={onBackPressed}
        style={{ marginTop: 8 }}
        disabled={canGoBack === false}
      />

      <IconButton
        iconType='SimpleLineIcons'
        name='arrow-right'
        color={DEFAULT_THEME.black}
        size={ICON_SIZE}
        onPress={onForwardPressed}
        style={{ marginTop: 8 }}
        disabled={canGoForward === false}
      />

      <TouchableOpacity onPress={() => onSharePressed && onSharePressed()}>
        <ShareIconV2 color={DEFAULT_THEME.black} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onOpenInBrowserPressed}>
        <SafariIcon color={DEFAULT_THEME.black} />
      </TouchableOpacity>
    </Toolbar>
  );
};

export default BrowserToolbar;
