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

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';

// Molecules
import SimCard from 'components/molecules/esim-card';
import ESimsEmptyComponent from 'components/molecules/esims-empty-component';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

// Context
import { UserContext } from 'components/context/user-context';
import { AuthContext } from 'components/context/auth-context';

// Services
import kanvasService from 'core/services/kanvas-service';

// Utils
import { wait } from 'utils';
import { DUMMY_SIM_CARDS } from 'utils/dummy-data';

// Assets
import {} from 'assets/icons';
import { EventRegister } from 'react-native-event-listeners';

const Container = styled.View`
  flex: 1;
  background-color: ${DEFAULT_THEME.background};
  margin-top: 15px;
  border-radius: 10px;
  margin-horizontal: 22px;
`;

const ErrorContainer = styled.View``;

export enum LOCAL_LIST_EVENTS {
  ON_LOCAL_LIST_UPDATE = 'ON_LOCAL_LIST_UPDATE',
}

// Interfaces
interface IFeedProps {
  isLoading?: boolean;
  isExpiredList?: boolean;
}

const MyeSimsList = (props: IFeedProps) => {

  // Props
  const {
    isLoading = true,
    isExpiredList = false,
  } = props;

  // Refs
  const items = useRef([]);
  const searchedItems = useRef([]);
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

  // Get the list of products
  const getSims = debounce(async (pageNumber = 1) => {
    try {
      //const response = await kanvasService.getSimsByType(productTypeId, pageNumber);

      //const { paginatorInfo, data } = response?.products;

      if (pageNumber > 1) {
        // let currentItems = cloneDeep(items.current);
        // currentItems.push(...data);
        // items.current = currentItems;
      } else {
        setLoading(true);
        items.current = DUMMY_SIM_CARDS; //Replace with {{data}} once API data is setup
        setLoading(false);
      }

      // paginatorInfo && (pages_total.current = paginatorInfo.total);
      // paginatorInfo && (last_page.current = paginatorInfo.currentPage);

      setRefreshing(false);
      setLoading(false);
      setLoadingMore(false);
      setError(false);
    } catch (error) {
      console.log('getSims error:', error);
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
    getSims();
  }, []);

  useEffect(() => {
    const updateList = EventRegister.on(ON_LOCAL_LIST_UPDATE, () => {
      setLoading(true);
        pages_total.current = 1;
        setPage(1);
        getSims(1);
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
      getSims(newPageNumber);
      pages_total.current = newPageNumber;
      setPage(newPageNumber);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await wait(1000);
    setPage(1);
    getSims(1);
  };

  const onCardPress = (item: object) => {
    trigger("impactLight", {});
  };

  const renderItem = useCallback(({ item, index }) => {
    if (isExpiredList) {
      return (
        <SimCard
          simCardData={item}
          style={{ marginBottom: 10 }}
          onPress={() => onCardPress(item)}
        />
      );
    }

    return (
      <SimCard
        simCardData={item}
        style={{ marginBottom: 10 }}
        onPress={() => onCardPress(item)}
      />
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

  const EmptyComponent = () => {
    return(
      <ESimsEmptyComponent
        label={translate(isExpiredList ? 'expiredSimsHere' : 'purchasedSimsHere', TextTransform.CAPITAL)}
      />
    )
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
          ListEmptyComponent={EmptyComponent}
          contentContainerStyle={{ borderRadius: 10 }}
          ListFooterComponent={ListFooterComponent}
        />
      )}
    </Container>
  );
};

export default memo(MyeSimsList);
