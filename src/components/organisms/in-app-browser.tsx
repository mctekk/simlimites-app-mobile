/* eslint-disable max-len */

// Modules
import React, { useRef, useState } from 'react';
import { Modal, SafeAreaView, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewProgressEvent } from 'react-native-webview/lib/WebViewTypes';
import styled from 'styled-components/native';

// Molecules
import Toolbar from 'molecules/browser-toolbar';
import BrowserHeader from 'molecules/browser-header';
import { DEFAULT_THEME } from 'styles/theme';
import { ShareUtil } from 'utils';

interface IInAppBrowserProps {
  url?: string;
  visible?: boolean;
  closeBrowser?: () => void;
  title?: string;
  onClose?: () => void;
  onNavigationStateChange?: (state: IInAppBrowserState) => void;
}

interface IInAppBrowserState {
  canGoBack: boolean;
  canGoForward: boolean;
  loading: boolean;
  progress: number;
}

const Container = styled.View`
  background-color: ${DEFAULT_THEME.background};
  flex: 1;
`;

const InAppBrowser = (props: IInAppBrowserProps) => {
  const { visible = false, url = '', onClose, title = '', onNavigationStateChange } = props;

  const webView = useRef<WebView>(null);

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onBackPressed = () => {
    webView?.current?.goBack();
  };

  const onForwardPressed = () => {
    webView?.current?.goForward();
  };

  const onOpenInBrowserPressed = async () => {
    if (await Linking.canOpenURL(url)) {
      Linking.openURL(url);
    }
  };

  const onReloadPressed = () => {
    webView?.current?.reload();
  };

  const onLoadStart = () => {
    setLoading(true);
  };

  const onLoadProgress = (e: WebViewProgressEvent) => {
    setCanGoBack(e.nativeEvent.canGoBack);
    setCanGoForward(e.nativeEvent.canGoForward);
    setProgress(e.nativeEvent.progress);
    setLoading(true);
  };

  const onLoadEnd = () => {
    setLoading(false);
  };

  const handleRef = (e: WebView) => {
    webView.current = e;
  };

  const onSharePressed = () => {
    ShareUtil(title, url);
  };

  return (
    <Modal visible={visible} animationType='slide'>
      <Container>
        <SafeAreaView />

        <BrowserHeader
          title={title}
          closeBrowser={onClose}
          progress={progress}
          loading={loading}
          onReloadPressed={onReloadPressed}
        />

        <WebView
          ref={handleRef}
          source={{ uri: url }}
          style={{ flex: 1 }}
          onLoadProgress={onLoadProgress}
          onLoadEnd={onLoadEnd}
          onLoadStart={onLoadStart}
          limitsNavigationsToAppBoundDomains
          onNavigationStateChange={onNavigationStateChange}
        />

        <Toolbar
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onBackPressed={onBackPressed}
          onForwardPressed={onForwardPressed}
          onSharePressed={onSharePressed}
          onOpenInBrowserPressed={onOpenInBrowserPressed}
        />

        <SafeAreaView />
      </Container>
    </Modal>
  );
};

export default InAppBrowser;
