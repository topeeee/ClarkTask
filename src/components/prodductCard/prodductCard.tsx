import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Image, Text, TouchableOpacity, View, ViewToken} from 'react-native';
import React, {memo} from 'react';
import {Product} from '../../screens/productList/productList';

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
    <Animated.View testID={`productList_${item.id}`} style={[{ padding: 10, backgroundColor: '#f9f9f9', flex: 1, margin: 8, borderRadius: 4}, rStyle]}>
      <TouchableOpacity onPress={() => onPress(item)}>
        <View style={{ alignItems: 'center'}}>
          <Image
            resizeMode='contain'
            source={{uri: item.image}}
            style={{width: '100%', height: 100}}
          />
          <View style={{flex: 1}}>
            <Text numberOfLines={1} style={{fontSize: 16, marginTop: 4}}>{item.title}</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>
              ${item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(ProductCard);
