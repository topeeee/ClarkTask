import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
  ViewabilityConfigCallbackPair,
  ViewToken,
  RefreshControl, SafeAreaView
} from "react-native";

import {useSharedValue} from 'react-native-reanimated';
import ProductCard from '../../components/prodductCard/prodductCard';
import {styles} from './productList.styles';
import {ProductStackScreenProps} from '../../navigations/types';
import {ScreenKeys} from '../../navigations/ScreenKeys';
import {useGetProducts} from '../../hooks/productActions';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface ViewableItemsProps {
  viewableItems: ViewToken[];
}

interface RenderItemProps {
  item: Product;
}

type ProductListProps = ProductStackScreenProps<ScreenKeys.PRODUCT>;

const ProductList = ({navigation}: ProductListProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const {
    isLoading,
    data: products,
    error,
    refetch,
    isRefetching,
    isError,
  } = useGetProducts();

  const filteredProducts =
    products &&
    (products as Product[]).filter((product: Product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase()),
    );

  const onPress = useCallback(
    (product: Product) => {
      navigation.navigate(ScreenKeys.PRODUCT_DETAILS, {product});
    },
    [navigation],
  );

  const onViewableItemsChanged = useCallback(
    ({viewableItems: vItems}: ViewableItemsProps) => {
      viewableItems.value = vItems;
    },
    [viewableItems],
  );

  const viewabilityConfigCallbackPairs = useRef<
    ViewabilityConfigCallbackPair[]
  >([
    {
      onViewableItemsChanged,
      viewabilityConfig: {
        viewAreaCoveragePercentThreshold: 50,
      },
    },
  ]);

  if (isLoading) {
    return (
      <View testID="products-loading" style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
    return (
      <View testID="products-error">
        <Text>
          Error: {error instanceof Error ? error.message : 'An error occurred'}
        </Text>
      </View>
    );
  }

  function renderItem({item}: RenderItemProps) {
    return (
      <ProductCard
        item={item}
        viewableItems={viewableItems}
        onPress={onPress}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search products by name"
        value={searchText}
        onChangeText={text => setSearchText(text)}
        style={styles.search}
      />
      <FlatList
        contentContainerStyle={styles.content}
        numColumns={2}
        data={filteredProducts as Product[]}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      />
    </SafeAreaView>
  );
};

export default ProductList;
