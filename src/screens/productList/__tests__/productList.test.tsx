import {describe, expect, it, jest, beforeEach} from '@jest/globals';
import {render, screen} from '@testing-library/react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScreenKeys} from '../../../navigations/ScreenKeys';
import {ProductStackParamList} from '../../../navigations/types';
import {generateStackNavigation} from '../../../../utils/testing/generators/navigations';
import {RouteProp} from '@react-navigation/native';
import ProductList from '../productList';
import {TestWrapper} from '../../../../utils/testing/testWrapper';
import {useGetProducts} from '../../../hooks/productActions';

const mockProductList = [
  {
    id: 1,
    title: 'Product one',
    price: 19.99,
    description: 'This is a sample product description one',
    image: 'https://example.com/sample-image.jpg',
  },
  {
    id: 2,
    title: 'Product two',
    price: 50,
    description: 'This is a sample product description two',
    image: 'https://example.com/sample-image2.jpg',
  },
];

const mockNavigation =
  generateStackNavigation() as unknown as StackNavigationProp<
    ProductStackParamList,
    ScreenKeys.PRODUCT
  >;

jest.mock('../../../hooks/productActions', () => ({
  __esModule: true,
  useGetProducts: jest.fn(() => ({})),
}));

const route = {} as RouteProp<ProductStackParamList, ScreenKeys.PRODUCT>;

describe('ProductList', () => {
  beforeEach(() => {
    (useGetProducts as jest.Mock).mockClear();
  });
  it('should call the product endpoint', () => {
    render(<ProductList navigation={mockNavigation} route={route} />, {
      wrapper: TestWrapper,
    });
    expect(useGetProducts).toHaveBeenCalled();
  });
  it('show the loading view when still fetching product list', () => {
    (useGetProducts as jest.Mock).mockImplementation(() => ({
      isLoading: true,
    }));
    render(<ProductList navigation={mockNavigation} route={route} />, {
      wrapper: TestWrapper,
    });
    expect(screen.getByTestId('products-loading')).toBeTruthy();
  });
  it('show error message when the api call fails', () => {
    const errorMsg = 'Something went wrong';
    (useGetProducts as jest.Mock).mockImplementation(() => ({
      isError: true,
      error: new Error(errorMsg),
    }));
    render(<ProductList navigation={mockNavigation} route={route} />, {
      wrapper: TestWrapper,
    });
    expect(screen.getByTestId('products-error')).toBeTruthy();
    expect(screen.getByText(`Error: ${errorMsg}`)).toBeTruthy();
  });
  it('displays the fetched data', () => {
    (useGetProducts as jest.Mock).mockImplementation(() => ({
      data: mockProductList,
    }));
    render(<ProductList navigation={mockNavigation} route={route} />, {
      wrapper: TestWrapper,
    });
    expect(
      screen.getByTestId(`productList_${mockProductList[0].id}`),
    ).toBeTruthy();
    expect(
      screen.getByTestId(`productList_${mockProductList[1].id}`),
    ).toBeTruthy();
  });
});
