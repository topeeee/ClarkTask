import {useQuery} from 'react-query';
import {getProducts} from '../services/productService';

const useGetProducts = () => useQuery(['products'], () => getProducts());

export {useGetProducts};
