import {jest} from '@jest/globals';
const generateStackNavigation = () => ({
  dispatch: jest.fn(),
  goBack: jest.fn(),
  dismiss: jest.fn(),
  navigate: jest.fn(),
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
  toggleDrawer: jest.fn(),
  getParam: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  isFocused: jest.fn(),
  setOptions: jest.fn(),
  reset: jest.fn(),
  jumpTo: jest.fn(),
  navigationActionSet: jest.fn(),
});

export {generateStackNavigation}
