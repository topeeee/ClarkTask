import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Image, Text, TouchableOpacity, View, ViewToken} from 'react-native';
import React, {memo} from 'react';
import {Product} from '../../screens/productList/productList';
import {styles} from './prodductCard.styles';

export interface ProductCardProps {
  item: Product;
  viewableItems: SharedValue<ViewToken[]>;
  onPress: (arg: Product) => void;
}

const ProductCard = ({item, onPress, viewableItems}: ProductCardProps) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter(itemValue => itemValue.isViewable)
        .find(viewableItem => viewableItem.item.id === item.id),
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0.2),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, []);

  return (
    <Animated.View
      testID={`productList_${item.id}`}
      style={[styles.container, rStyle]}>
      <TouchableOpacity onPress={() => onPress(item)}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={{uri: item.image}}
            style={styles.image}
          />
          <View style={{flex: 1}}>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(ProductCard);
