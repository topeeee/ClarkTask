import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ProductDetails from '../screens/productDetails/productDetails';
import ProductList from '../screens/productList/productList';
import {ProductStackParamList} from './types';
import {ScreenKeys} from './ScreenKeys';

const Stack = createStackNavigator<ProductStackParamList>();

const Router = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={ScreenKeys.PRODUCT}
            component={ProductList}
            options={{
              title: 'Products',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ScreenKeys.PRODUCT_DETAILS}
            component={ProductDetails}
            options={{
              title: 'Product Details',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Router;
