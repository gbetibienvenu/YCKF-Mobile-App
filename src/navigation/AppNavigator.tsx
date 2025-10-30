// src/navigation/AppNavigator.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SCREEN_NAMES } from '../utils/constants';

// Screens (ensure these default-export files exist)
import HomeScreen from '../screens/HomeScreen';
import CybercrimeReportScreen from '../screens/CybercrimeReportScreen';
import ContactFormScreen from '../screens/ContactFormScreen';
import EvidenceSafeBoxScreen from '../screens/EvidenceSafeBoxScreen';
import CaseTrackerScreen from '../screens/CaseTrackerScreen';
import AboutScreen from '../screens/AboutScreen';
import LocationShareScreen from '../screens/LocationShareScreen';

// Placeholder used when a screen import is missing/falsy
const MissingScreenPlaceholder: React.FC<{ name: string }> = ({ name }) => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderTitle}>Missing Screen</Text>
    <Text style={styles.placeholderText}>
      The screen "{name}" was not found or failed to import. Check the file and export.
    </Text>
  </View>
);

function ensureScreen(component: any, name: string) {
  if (!component) {
    console.warn(`[AppNavigator] Screen component for "${name}" is missing — using placeholder.`);
    return () => <MissingScreenPlaceholder name={name} />;
  }
  return component;
}

// Use SCREEN_NAMES constants for typing clarity
type TabParamList = {
  [SCREEN_NAMES.HOME]: undefined;
  [SCREEN_NAMES.CYBERCRIME_REPORT]: undefined;
  [SCREEN_NAMES.CONTACT_FORM]: undefined;
  [SCREEN_NAMES.EVIDENCE_SAFEBOX]: undefined;
  [SCREEN_NAMES.CASE_TRACKER]: undefined;
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAMES.HOME}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let name: any = 'home';
          if (route.name === SCREEN_NAMES.HOME) name = 'home';
          else if (route.name === SCREEN_NAMES.CYBERCRIME_REPORT) name = 'document-text';
          else if (route.name === SCREEN_NAMES.CONTACT_FORM) name = 'chatbubble';
          else if (route.name === SCREEN_NAMES.EVIDENCE_SAFEBOX) name = 'archive';
          else if (route.name === SCREEN_NAMES.CASE_TRACKER) name = 'search';
          return <Ionicons name={name} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text?.secondary ?? '#666',
        tabBarStyle: { backgroundColor: COLORS.surface },
      })}
    >
      <Tab.Screen
        name={SCREEN_NAMES.HOME}
        component={ensureScreen(HomeScreen, 'HomeScreen')}
        options={{ title: 'Home' }}
      />

      <Tab.Screen
        name={SCREEN_NAMES.CYBERCRIME_REPORT}
        component={ensureScreen(CybercrimeReportScreen, 'CybercrimeReportScreen')}
        options={{ title: 'Report' }}
      />

      <Tab.Screen
        name={SCREEN_NAMES.CONTACT_FORM}
        component={ensureScreen(ContactFormScreen, 'ContactFormScreen')}
        options={{ title: 'Contact' }}
      />

      <Tab.Screen
        name={SCREEN_NAMES.EVIDENCE_SAFEBOX}
        component={ensureScreen(EvidenceSafeBoxScreen, 'EvidenceSafeBoxScreen')}
        options={{ title: 'Evidence' }}
      />

      <Tab.Screen
        name={SCREEN_NAMES.CASE_TRACKER}
        component={ensureScreen(CaseTrackerScreen, 'CaseTrackerScreen')}
        options={{ title: 'Tracker' }}
      />
    </Tab.Navigator>
  );
}

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={MainTabs} />
      <Stack.Screen
        name={SCREEN_NAMES.ABOUT}
        component={ensureScreen(AboutScreen, 'AboutScreen')}
        options={{ title: 'About' }}
      />
      <Stack.Screen
        name="LocationShare"
        component={ensureScreen(LocationShareScreen, 'LocationShareScreen')}
        options={{ title: 'Share Location' }}
      />
      {/* add other stack screens here */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: COLORS?.background ?? '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  placeholderTitle: { fontSize: 20, fontWeight: '700', marginBottom: 12, color: COLORS?.text?.primary ?? '#111' },
  placeholderText: { color: COLORS?.text?.secondary ?? '#666', textAlign: 'center' },
});

export default AppNavigator;
