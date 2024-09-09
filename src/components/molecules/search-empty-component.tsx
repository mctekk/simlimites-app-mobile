/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import styled from 'styled-components/native';
import { Typography } from 'styles';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';
import CustomText from 'components/atoms/text';

// Assets
import { SearchIcon } from 'assets/icons';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

const Container = styled.View`
  height: 200px;
  width: 200px;
  align-items: center;
  width: 100%;
  padding-top: 30px;
`;

export interface ISearchEmptyComponent {}

const SearchEmptyComponent = (props: ISearchEmptyComponent) => {

  const {} = props;

  return (
    <Container>
        <SearchIcon size={80}/>
        <CustomText
          size={Typography.FONT_SIZE_16}
          lineHeight={Typography.FONT_SIZE_30}
          weight='400'
          style={{ marginTop: 25 }}
          align='center'
          color={DEFAULT_THEME.subtitle}>
          {translate('noSearchResults', TextTransform.CAPITAL)}
        </CustomText>
    </Container>
  );
};

export default SearchEmptyComponent;
