import axios from 'axios';
import {apiHelper} from '../../utils/apiHelper';

const baseUrl = 'https://fakestoreapi.com/products';

const getProducts = () => {
  return apiHelper(axios.get(baseUrl));
};

export {getProducts};
