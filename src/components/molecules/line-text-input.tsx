// Modules
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components/native';
import is from 'styled-is';

// Styles
import { Typography, Colors } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Atoms
import Text from 'atoms/text';
import IconButton from 'components/atoms/icon-button';

const Container = styled.View`
  border-width: 1px;
  border-width: 1px;
  border-color: ${props => props.isFocused ? DEFAULT_THEME.black : DEFAULT_THEME.borderColor};
  border-radius: 4px;
  padding-horizontal: 10px;
  background-color: ${DEFAULT_THEME.inputBg};
  ${is('error')`
    border-color: ${DEFAULT_THEME.error};
  `}
  height: 42px;
  flex-direction: row;
`;

const LeftContainer = styled.View`
  flex: 1;
  height: 50px;
`;

const TextInput = styled.TextInput`
  padding: 0;
  padding-bottom: 8px;
  flex: 1px;
  font-size: ${props => props.fontSize ? props.fontSize : Typography.FONT_SIZE_14}px;
  color: ${props => (props.textColor ? props.textColor : DEFAULT_THEME.text)};
`;

const TextArea = styled.TextInput`
  border-radius: 10px;
  padding-left: 16px;
  flex: 1px;
  min-height: 120px;
  font-size: ${props =>
    props.fontSize ? props.fontSize : Typography.FONT_SIZE_14}px;
  color: ${props => (props.textColor ? props.textColor : DEFAULT_THEME.text)};
`;

const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const InputIcon = styled(IconButton)``;

const StyledText = styled(Text)`
  flex: 1;
  right: 0;
  bottom: 0;
  position: absolute;
  margin-bottom: 16px;
  margin-right: 16px;
`;

const TextAreaContainer = styled.View`
  flex: 1px;
`;

const Title = styled(Text)`
  color: ${DEFAULT_THEME.inputLabel};
  ${is('error')`
    color: ${DEFAULT_THEME.error};
  `}
`;

interface IProps {
  onChangeText: Function;
  inputValue: string;
  placeholder?: string;
  placeholderTextColor?: string;
  style?: Object;
  containerStyle?: object;
  fontSize?: Number;
  textColor?: string;
  textArea?: boolean;
  maxLength?: number;
  hasIcon?: boolean;
  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
  secureTextEntry?: boolean;
  iconType?: string;
  iconName?: string;
  isFocused?: boolean;
  error?: boolean | string;
  customRef?: any;
  inputIcon?: ReactNode;
  labelText?: string;
  labelStyle?: object;
  labelFontSize?: Number;
  labelTextColor?: string;
}

const LineTextInput = ({
  onChangeText,
  inputValue,
  placeholder,
  placeholderTextColor,
  fontSize,
  textColor,
  style,
  textArea,
  iconSize = 24,
  iconColor = DEFAULT_THEME.placeHolderText,
  backgroundColor,
  secureTextEntry,
  iconType = 'Ionicons',
  iconName = '',
  isFocused,
  error,
  customRef,
  containerStyle,
  inputIcon,
  labelText,
  labelStyle,
  labelFontSize,
  labelTextColor,
  ...props
}: IProps) => {

  const [showPassword, togglePasswordVisibility] = useState(true);

  const handleIconName = () => {
    if (secureTextEntry) {
      return showPassword ? 'eye-off-outline' : 'eye-outline';
    }
    return iconName;
  };

  if (textArea) {
    return (
      <TextAreaContainer>
        <TextArea
          fontSize={fontSize}
          textColor={textColor}
          style={style}
          multiline
          onChangeText={(text: any) => onChangeText(text)}
          value={inputValue}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderTextColor || DEFAULT_THEME.placeHolderText
          }
          {...props}
        />
        {props?.maxLength && (
          <StyledText color={DEFAULT_THEME.placeHolderText} size={13}>
            {`${inputValue.length}/${props.maxLength}`}
          </StyledText>
        )}
      </TextAreaContainer>
    );
  }
  return (
    <Container error={error} isFocused={isFocused} style={containerStyle}>
      <LeftContainer>
        {labelText ? (
          <Title
            style={labelStyle}
            size={labelFontSize || Typography.FONT_SIZE_12}
            error={error}
          >
            {labelText}
          </Title>
        ) : (<></>)}
        <TextInput
          ref={customRef}
          fontSize={fontSize}
          textColor={textColor}
          style={style}
          onChangeText={(text: any) => onChangeText(text)}
          value={inputValue}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderTextColor || DEFAULT_THEME.placeHolderText
          }
          secureTextEntry={secureTextEntry ? showPassword : false}
          {...props}
        />
      </LeftContainer>
      
      {inputIcon && (
          <IconContainer>
            {inputIcon}
          </IconContainer>
        )}

        {secureTextEntry && (
          <IconContainer>
            <InputIcon
              iconType={iconType}
              name={handleIconName()}
              size={iconSize}
              color={iconColor}
              backgroundColor={backgroundColor}
              onPress={() => togglePasswordVisibility(!showPassword)}
            />
          </IconContainer>
        )}
    </Container>
  );
};

export default LineTextInput;
