import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigations from './src/navigations/Navigations';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        
        <NavigationContainer>
          <Navigations />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
