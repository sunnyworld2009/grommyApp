
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
    marginTop: 10,
    padding: 15,
    backgroundColor: '#3F51B5',
  },
  accordionBody: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'white',
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1
  },
  accordionText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  accordionHeadText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
};
