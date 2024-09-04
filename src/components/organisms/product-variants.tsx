// Modules
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

// Styles
import { Colors, Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Atoms
import CustomText from 'atoms/text';

// Molecules
import VariantCard from 'components/molecules/variant-card';

// Interface
import { ProductInterface, VariantInterface } from '@kanvas/core';

const Container = styled.ScrollView``;

const VariantsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface IProductVariantsProps {
  style?: object;
  product?: ProductInterface;
}

const ProductVariants = (props: IProductVariantsProps) => {
  // Props
  const { style, product } = props;

  // Hooks
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Product Variants:", product);
  }, []);

  return (
    <Container style={style}>
      <VariantsContainer>
        {product?.variants && product?.variants?.map((variant: VariantInterface, index: number) => {
          return (
            <VariantCard
              key={index}
              label={variant?.name}
              price={variant?.channel?.price}
            />
          )
        })}
      </VariantsContainer>
    </Container>
  );
};

export default ProductVariants;

