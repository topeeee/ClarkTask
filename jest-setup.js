import '@testing-library/jest-native/extend-expect';
require('react-native-reanimated').setUpTests();

global.ReanimatedDataMock = {
  now: () => Date.now(),
};
