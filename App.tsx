import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
// import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Alert, Platform, View, Text, Button } from 'react-native';


// Components and Navigation
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/common/ErrorBoundary';
import LoadingScreen from './src/components/common/LoadingScreen';

// Contexts
import { AppProvider } from './src/contexts/AppContext';
import { LocationProvider } from './src/contexts/LocationContext';
import { StorageProvider } from './src/contexts/StorageContext';

// Services
import NotificationService from './src/services/NotificationService';
import { requestPermissions } from './src/services/PermissionService';

// Utils
import { STORAGE_KEYS, APP_CONFIG } from './src/utils/constants';




// ----------------------- DEBUG HELPERS -----------------------
// Attach global error handlers to surface otherwise-silent runtime errors
// Paste this below your imports (after the last import statement).
try {
  // @ts-ignore window may not be typed in RN TS env
  if (typeof window !== 'undefined' && window.addEventListener) {
    // catch unhandled promise rejections
    // @ts-ignore
    window.addEventListener('unhandledrejection', (ev: any) => {
      console.error('UNHANDLED REJECTION ->', ev?.reason ?? ev);
    });
    // catch uncaught errors
    // @ts-ignore
    window.addEventListener('error', (ev: any) => {
      console.error('UNCAUGHT ERROR EVENT ->', ev?.error ?? ev?.message ?? ev);
    });
  }
} catch (e) {
  // don't crash if environment doesn't support window events
  // eslint-disable-next-line no-console
  console.warn('Failed to attach global error handlers', e);
}
// -------------------------------------------------------------



// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      console.log('🚀 Initializing YCKF Mobile App...');

      // Load fonts (if you have custom fonts)
      await loadFonts();

      // Initialize services
      await initializeServices();

      // Check app permissions
      await checkPermissions();

      // Load app settings
      await loadAppSettings();

      // Setup network listener
      setupNetworkListener();

      console.log('✅ App initialization completed');
    } catch (error) {
      console.error('❌ App initialization failed:', error);
      // Show user-friendly error message
      Alert.alert(
        'Initialization Error',
        'Failed to start the app properly. Please restart the application.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsReady(true);
      setInitializing(false);
      // Hide splash screen
      await SplashScreen.hideAsync();
    }
  };

  const loadFonts = async () => {
    try {
      // Add custom fonts here if needed
      // await Font.loadAsync({
      //   'custom-font': require('./assets/fonts/custom-font.ttf'),
      // });
      console.log('✅ Fonts loaded');
    } catch (error) {
      console.log('⚠️ Font loading failed:', error);
      // App can continue without custom fonts
    }
  };

  const initializeServices = async () => {
    try {
      // Initialize notification service
      await NotificationService.initialize();

      // Initialize other services as needed
      console.log('✅ Services initialized');
    } catch (error) {
      console.log('⚠️ Service initialization failed:', error);
      // App can continue with limited functionality
    }
  };

  const checkPermissions = async () => {
    try {
      // Request critical permissions
      const permissions = await requestPermissions();
      
      // Log permission status
      console.log('📋 Permission status:', permissions);

      // Handle permission denials if necessary
      if (!permissions.location.granted) {
        console.log('⚠️ Location permission denied - some features may be limited');
      }
    } catch (error) {
      console.log('⚠️ Permission check failed:', error);
    }
  };

  const loadAppSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
      if (settings) {
        console.log('✅ App settings loaded');
      }
    } catch (error) {
      console.log('⚠️ Failed to load app settings:', error);
    }
  };

  const setupNetworkListener = () => {
    NetInfo.addEventListener(state => {
      console.log('🌐 Network state:', state.isConnected ? 'Online' : 'Offline');
    });
  };

  // Show loading screen while initializing
  if (!isReady || initializing) {
    return <LoadingScreen />;
  }

  return (


<ErrorBoundary>
  <SafeAreaProvider>
    <AppProvider>
      <LocationProvider>
        <StorageProvider>
          {(() => {
            try {
              return (
                <NavigationContainer>
                  <StatusBar style="auto" />
                  <AppNavigator />
                </NavigationContainer>
              );
            } catch (err) {
              // log full error to Metro/console
              console.error('NAVIGATOR RENDER ERROR ->', err);
              // friendly fallback UI
              return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                  <Text style={{ fontWeight: '700', marginBottom: 8 }}>App failed to load</Text>
                  <Text selectable style={{ color: '#444', marginBottom: 12 }}>
                    {(err && (err as any).message) || JSON.stringify(err)}
                  </Text>
                  <Button
                    title="Reload App"
                    onPress={() => {
                      try {
                        // Dev reload
                        // @ts-ignore
                        if (typeof DevSettings !== 'undefined' && DevSettings.reload) {
                          // eslint-disable-next-line no-undef
                          DevSettings.reload();
                        } else {
                          // fallback: instruct developer to restart Metro
                          console.log('Please restart Metro: expo start -c');
                        }
                      } catch (e) {
                        console.warn('Reload failed', e);
                      }
                    }}
                  />
                </View>
              );
            }
          })()}
        </StorageProvider>
      </LocationProvider>
    </AppProvider>
  </SafeAreaProvider>
</ErrorBoundary>

    // <ErrorBoundary>
    //   <SafeAreaProvider>
    //     <AppProvider>
    //       <LocationProvider>
    //         <StorageProvider>
    //           <NavigationContainer>
    //             <StatusBar style="auto" />
    //             <AppNavigator />
    //           </NavigationContainer>
    //         </StorageProvider>
    //       </LocationProvider>
    //     </AppProvider>
    //   </SafeAreaProvider>
    // </ErrorBoundary>
  );
}
