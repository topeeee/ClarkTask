import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  search: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
    borderRadius: 4,
    marginTop: 16,
  },
  content: {paddingBottom: 50},
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {styles};
