import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const HEADER_MAX_HEIGHT = windowWidth; // max header height
const HEADER_MIN_HEIGHT = 100; // min header height
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT; // header scrolling value
const inputBorderWidth = windowWidth - 96

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 0,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 12,
    marginLeft: 16,
  },
  footerContatiner: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 12
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  inputContainer: {
    // borderBottomColor: '#b4bbbf', 
    // borderBottomWidth: 1, 
    marginTop: 24,
    marginLeft: 16
  },
  titleInput: {
    marginBottom: 6, 
    color: '#000',
    fontWeight: 'bold',
    fontSize: 24
  },
  descriptionInput: {
    marginBottom: 6, 
    color: '#000',
    fontSize: 18
  },
  navigationText: {
    color: '#000', 
    fontSize: 18
  }
});

export default styles