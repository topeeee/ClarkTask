import React from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {ScreenKeys} from '../../navigations/ScreenKeys';
import {ProductStackScreenProps} from '../../navigations/types';
import {styles} from './productDetails.styles';

type ProductDetailsProps = ProductStackScreenProps<ScreenKeys.PRODUCT_DETAILS>;

const ProductDetails = ({route}: ProductDetailsProps) => {
  const {product} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          resizeMode="contain"
          source={{uri: product.image}}
          style={styles.image}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.product}>Price: ${product.price}</Text>
          <Text style={styles.desc}>{product.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
