
const React = require('react-native');

const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: '#FBFAFA',
  },
  row: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },
  accordionHeader: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 10,
    padding:15
  },
  accordionBody: {
    flex: 1,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: 'grey',
  }
};
