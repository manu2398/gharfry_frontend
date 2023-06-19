import {QueryClient, QueryClientProvider} from 'react-query';

import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/navigation';
import {CurreLocationContextProvider} from './src/context/CurrentLocationContext';
import DataProvider from './src/redux/store';
import FlashMessages from './src/components/FlashMessages';
import {
  requestUserPermission,
  notificationListener,
} from './src/utils/notificationService';
import {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {ThemeProvider} from './src/context/ThemeProvider';
import NavigationService from './src/navigation/NavigationService';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const App = () => {
  const queryClient = new QueryClient();

  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    let id = link.url.split('=').pop();
    NavigationService.navigate('PropertyDetailScreen', {id});
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (!!link?.url) {
          let id = link.url.split('=').pop();
          setTimeout(() => {
            NavigationService.navigate('PropertyDetailScreen', {id});
          }, 1000);
        }
      });
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )
        .then(res => {
          if (res === 'granted' || 'never_ask_again') {
            requestUserPermission();
            notificationListener();
          }
        })
        .catch(err => {});
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CurreLocationContextProvider>
        <DataProvider>
          <NavigationContainer
            ref={ref => NavigationService.setTopLevelNavigator(ref)}>
            <ThemeProvider>
              <FlashMessages />
              <RootNavigation />
            </ThemeProvider>
          </NavigationContainer>
        </DataProvider>
      </CurreLocationContextProvider>
    </QueryClientProvider>
  );
};

export default App;
