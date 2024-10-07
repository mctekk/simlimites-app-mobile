// Modules
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { trigger } from 'react-native-haptic-feedback';

// Styles
import { Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Atoms
import CustomText from 'atoms/text';
import { translate, TextTransform } from 'atoms/localized-label';
import { DetaileSimsIcon } from 'assets/icons';

// Molecules
import VariantCard from 'components/molecules/variant-card';
import CountriesCard from 'components/molecules/countries-card';

// Interface
import { ProductInterface, VariantInterface } from '@kanvas/core';
import kanvasService from 'core/services/kanvas-service';
import { PRODUCT_TYPES_SLUGS } from 'utils/constants';
import { DUMMY_FLAGS_URLS } from 'utils/dummy-data';

// Context
import { UserContext } from 'components/context/user-context';

const Container = styled.ScrollView``;

const VariantsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const PurchaseButton = styled.TouchableOpacity`
  width: 100%;
  padding-vertical: 12px;
  background-color: ${DEFAULT_THEME.primary};
  margin-top: 20px;
  border-radius: 50px;
  align-items: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 25px;
`;

interface IProductVariantsProps {
  style?: object;
  product?: ProductInterface;
}

const ProductVariants = (props: IProductVariantsProps) => {
  // Props
  const { style, product } = props;

  // State
  const [includedCountries, setIncludedCountries] = useState([]);
  const [flagUris, setFlagUris] = useState(['']);
  const [selectedVariant, setSelectedVariant] = useState({});

  // Hooks
  const navigation = useNavigation();

  // Context
  const { isUserLogged } = useContext(UserContext);

  const isLocal = product?.productsTypes?.slug == PRODUCT_TYPES_SLUGS.LOCAL_SLUG;

  useEffect(() => {
    console.log('Product Variants:', product);
    !isLocal && getCountriesIncluded();
  }, []);

  const getCountriesIncluded = async () => {
    const countriesAttribute = product?.attributes?.find(
      (attribute: any) => attribute?.slug === 'countries',
    );

    if (countriesAttribute) {
      const countriesIncluded = await kanvasService.getCountriesByIds(
        countriesAttribute?.value,
      );
      setIncludedCountries(countriesIncluded?.countries?.data);
      setButtonFlags(countriesIncluded?.countries?.data);
    }
  };

  const setButtonFlags = (countriesIncluded: any) => {
    let buttonFlags: string[] = [];
    countriesIncluded?.length &&
      countriesIncluded?.map((country: any) => {
        buttonFlags?.push(country?.flag);
      });
    // ** enmanuel-mctekk **
    // ** Commented until Max adds flags to countries in @kanvas/core **
    //setFlagUris(buttonFlags);
    setFlagUris(DUMMY_FLAGS_URLS);
  };

  const onVariantPress = (variant: VariantInterface, isSelected: boolean) => {
    trigger('impactLight', {});
    if (isUserLogged) {
      isSelected ? setSelectedVariant({}) : setSelectedVariant(variant);
    }
    console.log(variant);
  };

  return (
    <Container style={style}>
      <VariantsContainer>
        {product?.variants &&
          product?.variants?.map((variant: VariantInterface, index: number) => {
            const isSelected = selectedVariant?.id === variant?.id;

            return (
              <VariantCard
                key={index}
                variant={variant}
                onPress={() => onVariantPress(variant, isSelected)}
                isSelected={isSelected}
              />
            );
          })}
      </VariantsContainer>
      <CustomText
        size={Typography.FONT_SIZE_12}
        weight='300'
        style={{ marginBottom: 6 }}
        color={DEFAULT_THEME.title}>
        {translate('countriesIncluded', TextTransform.CAPITAL)}
      </CustomText>
      <CountriesCard
        label={
          isLocal
            ? product.name
            : translate('countriesCoverage', TextTransform.CAPITAL, {
                interpolate: { number: includedCountries?.length },
              })
        }
        isLocal={isLocal}
        flagImageUris={flagUris}
        style={{ marginBottom: 12 }}
        onPress={() => {}}
      />
      <CountriesCard
        label={translate('eSimDetails', TextTransform.NONE)}
        isLocal={isLocal}
        flagImageUris={flagUris}
        onPress={() => {}}
        iconComponent={<DetaileSimsIcon />}
      />
      <PurchaseButton
        disabled={!selectedVariant?.id && isUserLogged}
        onPress={() =>
          isUserLogged
            ? navigation?.navigate('Checkout', {variant: selectedVariant, product: product, flagUris: flagUris})
            : navigation.navigate('RegisterEmail', { showLogin: true })
        }
        style={{
          backgroundColor:
            !selectedVariant?.id && isUserLogged
              ? DEFAULT_THEME.disabledPrimary
              : DEFAULT_THEME.primary,
        }}>
        <CustomText size={Typography.FONT_SIZE_20} weight='700' color={DEFAULT_THEME.white}>
          {isUserLogged
            ? `${translate('buySelectedPlan', TextTransform.CAPITAL)} $${
                selectedVariant?.channel?.price ? selectedVariant?.channel?.price : '0'
              }`
            : translate('registerToBuyPlans', TextTransform.CAPITAL)}
        </CustomText>
      </PurchaseButton>
    </Container>
  );
};

export default ProductVariants;
