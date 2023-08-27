import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { colors } from './src/theme/colors';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
import RootNav from './src/navigation/root_nav/RootNav';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ContextProvider } from './src/data_storage/context_api/AppContext';
import Toast from 'react-native-toast-message';
import { setIsFirstLaunch } from './src/data_storage/local_storage/LocalStorage';


const queryClient = new QueryClient();

function App() {

  useEffect(() => { setIsFirstLaunch(false) }, [])
  useEffect(() => {
    setTimeout(() => { SplashScreen.hide(); }, 2000)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar
              barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
              backgroundColor={colors.black}
              animated={true} />
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootNav />
            </GestureHandlerRootView>
            <Toast />
          </NavigationContainer>
        </SafeAreaProvider>
      </ContextProvider>
    </QueryClientProvider>
  );
}


export default App;
