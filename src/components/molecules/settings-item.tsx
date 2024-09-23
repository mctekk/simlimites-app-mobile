/* eslint-disable react-native/no-inline-styles */
// Modules
import React from 'react';
import styled from 'styled-components/native';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Atoms
import Text from 'components/atoms/text';

// Icons
import { CardArrow } from 'assets/icons';

interface ISettingsItemsProps {
  title: string;
  icon?: React.ElementType;
  onPress: () => void;
  isFirst: boolean;
  isLast: boolean;
  showRightIcon?: boolean;
}

const Container = styled.TouchableOpacity`
  background-color: ${DEFAULT_THEME.authBackground};
  padding-horizontal: 18px;
`;

const Content = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding-vertical: 14px;
  border-bottom-width: 1px;
  border-color: ${DEFAULT_THEME.tabsBg};
`;

const Title = styled(Text)`
  font-size: ${Typography.FONT_SIZE_15}px;
  color: ${DEFAULT_THEME.black};
  font-weight: 500;
`;

const RightContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconContainer = styled.View`
  margin-bottom: 2px;
`;

const SettingsItems = (props: ISettingsItemsProps) => {
  // Props
  const { title, icon, onPress, isFirst, isLast, showRightIcon = true } = props;

  const Icon = icon;

  return (
    <Container
      onPress={onPress}
      style={{
        borderTopLeftRadius: isFirst ? 10 : 0,
        borderTopRightRadius: isFirst ? 10 : 0,
        borderBottomLeftRadius: isLast ? 10 : 0,
        borderBottomRightRadius: isLast ? 10 : 0,
      }}>
      <Content style={{ borderBottomWidth: isLast ? 0 : 1 }}>
        <LeftContainer>
          {Icon && (
            <IconContainer>
              <Icon />
            </IconContainer>
          )}
          <Title style={{ marginLeft: Icon ? 9 : 0 }}>{title}</Title>
        </LeftContainer>
        <RightContainer>{showRightIcon ? <CardArrow /> : <></>}</RightContainer>
      </Content>
    </Container>
  );
};

export default SettingsItems;
