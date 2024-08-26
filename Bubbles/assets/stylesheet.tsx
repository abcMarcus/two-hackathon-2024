import { StyleSheet } from 'react-native';
import { FadeInRight } from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#484A47',
  },  
  textWrapper: {
    alignSelf: 'stretch', // Make the wrapper take the full width of the container
    paddingHorizontal: 15, // Optional: Add padding if needed
  },
  welcome_title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 400,
    color: '#F0F0F0',
    textAlign: 'left',

  },
  buttonTextWrapper: {
    alignSelf: 'stretch', // Make the wrapper take the full width of the container
    paddingHorizontal: 20, // Optional: Add padding if needed
  },
  button: {
    width: '100%',
    padding: 0,
    marginVertical: 5,
    alignSelf: 'flex-end'
  },
  signup_button: {
    width: '50vw',
  },
  buttonText: {
    paddingHorizontal: '5vw',
    paddingVertical: '2vh',
    color: '#fff',
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'right'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    color: 'white'
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default styles;