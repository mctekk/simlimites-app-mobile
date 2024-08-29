// Modules
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  memo
} from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { trigger } from 'react-native-haptic-feedback';
import { useScrollToTop } from '@react-navigation/native';

// Molecules
import LocalCard from 'components/molecules/local-card';
import RegionalCard from 'components/molecules/regional-card';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

// Context
import { UserContext } from 'components/context/user-context';
import { AuthContext } from 'components/context/auth-context';

// Services
import kanvasService from 'core/services/kanvas-service';

// Utils
import { wait } from 'utils';
import { ProductTypeInterface } from '@kanvas/core';

// Assets
import {} from 'assets/icons';
import { EventRegister } from 'react-native-event-listeners';
import { PRODUCT_TYPES_SLUGS, FLAG_IMAGE_NAME } from 'utils/constants';

// Interface
import { IFile } from 'interfaces/products-interface';

const Container = styled.View`
  flex: 1;
  background-color: ${DEFAULT_THEME.background};
  margin-top: 15px;
  border-radius: 10px;
`;

const ErrorContainer = styled.View``;

export enum LOCAL_LIST_EVENTS {
  ON_LOCAL_LIST_UPDATE = 'ON_LOCAL_LIST_UPDATE',
}

// Interfaces
interface IFeedProps {
  isLoading?: boolean;
  productTypeSlug?: string;
}

const ProductList = (props: IFeedProps) => {

  // Props
  const {
    isLoading = true,
    productTypeSlug = PRODUCT_TYPES_SLUGS.LOCAL_SLUG,
  } = props;

  // Refs
  const items = useRef([]);
  const flatListRef = useRef(null);
  const pages_total = useRef<number>(0);
  const last_page = useRef<number>(0);

  // Hooks
  const navigation = useNavigation();
  useScrollToTop(flatListRef);

  // State
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(isLoading);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasError, setError] = useState(false);

  // Const 
  const { ON_LOCAL_LIST_UPDATE } = LOCAL_LIST_EVENTS;

  // Get the list of memos 
  // in kanvas sdk the info is saved in the messages property as a string.
  const getProducts = debounce(async (pageNumber = 1) => {
    try {
      const productTypesRes = await kanvasService.getProductTypes();
      const localType = productTypesRes?.productTypes?.data?.find(
        (type: ProductTypeInterface) => type?.slug === productTypeSlug
      );
      const productTypeId = localType ? localType?.id : 0;
      const response = await kanvasService.getProductsByType(productTypeId, pageNumber);
      const { paginatorInfo, data } = response?.products;

      if (pageNumber > 1) {
        let currentItems = cloneDeep(items.current);
        currentItems.push(...data);
        items.current = currentItems;
      } else {
        setLoading(true);
        items.current = data;
        setLoading(false);
      }

      console.log('getProducts:', items.current);

      paginatorInfo && (pages_total.current = paginatorInfo.total);
      paginatorInfo && (last_page.current = paginatorInfo.currentPage);

      setRefreshing(false);
      setLoading(false);
      setLoadingMore(false);
      setError(false);
    } catch (error) {
      console.log('getProducts error:', error);
      setError(true);
      setLoading(false);
    }
  }, 500);

  useEffect(() => () => {
    setPage(1);
    items.current = [];
    pages_total.current = 0;
    last_page.current = 0;
    setLoading(true);
    setLoadingMore(false);
  }, []);


  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const updateList = EventRegister.on(ON_LOCAL_LIST_UPDATE, () => {
      setLoading(true);
        pages_total.current = 1;
        setPage(1);
        getProducts(1);
    });

    return () => {
      EventRegister.rm(updateList);
    };
  }, []);


  const loadMoreData = async () => {
    setLoadingMore(true);
    const page_variant = page;
    const newPageNumber = page_variant + 1;

    // handle for when the list is not flatlist and the loading actions are comming from another component
    if (newPageNumber >= pages_total.current) {
      setLoadingMore(false);
      return;
    }

    if (newPageNumber > last_page.current && newPageNumber <= pages_total.current) {
      getProducts(newPageNumber);
      pages_total.current = newPageNumber;
      setPage(newPageNumber);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await wait(1000);
    setPage(1);
    getProducts(1);
  };

  const onCardPress = (item: object) => {
    trigger("impactLight", {});
  };

  const renderItem = useCallback(({ item, index }) => {
    const isFirst = (index === 0);
    const isLast = (index === (items.current.length -1));

    if (productTypeSlug === PRODUCT_TYPES_SLUGS.LOCAL_SLUG) {
      const flag = item?.files?.data?.find(
        (file: IFile) => file?.name === FLAG_IMAGE_NAME
      );

      return (
        <LocalCard
          isFirst={isFirst}
          isLast={isLast}
          label={item?.name}
          flagImageUri={flag?.url}
          onPress={() => onCardPress(item)}
        />
      );
    }

    if (productTypeSlug === PRODUCT_TYPES_SLUGS.REGIONAL_SLUG) {
      return (
        <RegionalCard
          label={item?.name}
          onPress={() => onCardPress(item)}
          style={{ marginBottom: 8 }}
        />
      );
    }

    return (
      <></>
    );
  }, []);

  const ListFooterComponent = (showLoadear: boolean) => {
    {
      loadingMore && (
        <ActivityIndicator
          color={DEFAULT_THEME.title}
          style={{ marginVertical: 20 }}
        />
      )
    }
  }

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <Container>
      {!loading && hasError ? (
        <ErrorContainer>
          {/* <ErrorListComponent
            onRefresh={onRefresh}
            loading={loading}
          /> */}
        </ErrorContainer>
      ) : (<></>)}

      {loading && !hasError && (
        <ActivityIndicator size="small" color={DEFAULT_THEME.subtitle} />
      )}

      {!loading && !hasError && (
        <FlatList
          data={items.current}
          extraData={items.current}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreData}
          scrollEventThrottle={16}
          onEndReachedThreshold={2}
          onRefresh={onRefresh}
          refreshing={refreshing}
          // ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={{ borderRadius: 10 }}
          ListFooterComponent={ListFooterComponent}
        />
      )}

    </Container>
  );
};

export default memo(ProductList);
