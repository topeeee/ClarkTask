import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ProductDetails from '../productDetails';
import {it, expect, describe} from '@jest/globals';
import {generateStackNavigation} from '../../../../utils/testing/generators/navigations';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductStackParamList} from '../../../navigations/types';
import {ScreenKeys} from '../../../navigations/ScreenKeys';
import {RouteProp} from '@react-navigation/native';
import {TestWrapper} from '../../../../utils/testing/testWrapper';

const mockProduct = {
  title: 'Sample Product',
  price: 19.99,
  description: 'This is a sample product description',
  image: 'https://example.com/sample-image.jpg',
};

const mockNavigation =
  generateStackNavigation() as unknown as StackNavigationProp<
    ProductStackParamList,
    ScreenKeys.PRODUCT_DETAILS
  >;

const route = {
  params: {
    product: mockProduct,
  },
} as RouteProp<ProductStackParamList, ScreenKeys.PRODUCT_DETAILS>;

describe('ProductDetails', () => {
  it('renders product details correctly', () => {
    render(<ProductDetails route={route} navigation={mockNavigation} />, {
      wrapper: TestWrapper,
    });

    const title = screen.getByText(mockProduct.title);
    const price = screen.getByText(`Price: $${mockProduct.price}`);
    const description = screen.getByText(mockProduct.description);

    expect(title).toBeTruthy();
    expect(price).toBeTruthy();
    expect(description).toBeTruthy();
  });
});
