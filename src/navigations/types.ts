import {ScreenKeys} from './ScreenKeys';
import {Product} from '../screens/productList/productList';
import {StackScreenProps} from '@react-navigation/stack';
export type ProductStackParamList = {
  [ScreenKeys.PRODUCT]: undefined;
  [ScreenKeys.PRODUCT_DETAILS]: {product: Product};
};

export type ProductStackScreenProps<T extends keyof ProductStackParamList> =
  StackScreenProps<ProductStackParamList, T>;
