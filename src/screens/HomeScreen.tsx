import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';

// Components
import Button from '../components/common/Button';
import QuickActionCard from '../components/home/QuickActionCard';
import StatsCard from '../components/home/StatsCard';
import WelcomeHeader from '../components/home/WelcomeHeader';

// Services
import LocationService from '../services/LocationService';
import WhatsAppService from '../services/WhatsAppService';

// Utils
import {
  COLORS,
  SPACING,
  SCREEN_NAMES,
  QUICK_ACTIONS,
  APP_CONFIG,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from '../utils/constants';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isOnline, setIsOnline] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(!!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // placeholder for any data refresh logic
    setTimeout(() => setRefreshing(false), 800);
  };

  const handleQuickAction = async (actionId: string) => {
    try {
      switch (actionId) {
        case 'report_cybercrime':
          navigation.navigate(SCREEN_NAMES.CYBERCRIME_REPORT as never);
          break;

        case 'contact_yckf':
          navigation.navigate(SCREEN_NAMES.CONTACT_FORM as never);
          break;

        case 'share_location':
          await handleShareCurrentLocation();
          break;

        case 'live_location':
          await handleShareLiveLocation();
          break;

        default:
          console.warn('Unknown action:', actionId);
      }
    } catch (error) {
      console.error('Action failed:', error);
      Alert.alert('Error', 'Failed to perform action. Please try again.');
    }
  };

  const handleShareCurrentLocation = async () => {
    setLocationLoading(true);
    try {
      const location = await LocationService.getCurrentLocation();
      if (!location) {
        Alert.alert('Location', ERROR_MESSAGES.LOCATION_PERMISSION);
        return;
      }

      // WhatsAppService might be an object with a function, defensively call it
      if (WhatsAppService && typeof WhatsAppService.shareCurrentLocation === 'function') {
        const res = await WhatsAppService.shareCurrentLocation(location);
        if (res && res.success !== false) {
          Alert.alert('Success', SUCCESS_MESSAGES.LOCATION_SHARED);
        }
      } else {
        // fallback: format message and attempt to open via Linking inside the service is recommended
        Alert.alert('Unavailable', 'WhatsApp integration is not configured in the app.');
      }
    } catch (err) {
      console.error('Location sharing failed:', err);
      Alert.alert('Error', ERROR_MESSAGES.LOCATION_PERMISSION);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleShareLiveLocation = async () => {
    try {
      if (WhatsAppService && typeof WhatsAppService.shareLiveLocation === 'function') {
        await WhatsAppService.shareLiveLocation();
        Alert.alert(
          'Live Location Sharing',
          'WhatsApp will open. Please start sharing your live location in the chat with YCKF.'
        );
      } else {
        Alert.alert('Unavailable', 'WhatsApp live-sharing integration is not configured.');
      }
    } catch (error) {
      console.error('Live location sharing failed:', error);
      Alert.alert('Error', 'Failed to open WhatsApp for live location sharing.');
    }
  };

  const navigateToEvidenceSafeBox = () => {
    navigation.navigate(SCREEN_NAMES.EVIDENCE_SAFEBOX as never);
  };

  const navigateToCaseTracker = () => {
    navigation.navigate(SCREEN_NAMES.CASE_TRACKER as never);
  };

  const navigateToAbout = () => {
    navigation.navigate(SCREEN_NAMES.ABOUT as never);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={COLORS.primary} />

      <WelcomeHeader isOnline={isOnline} />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Text style={styles.sectionSubtitle}>Report incidents and get help instantly</Text>

          <View style={styles.quickActionsGrid}>
            {QUICK_ACTIONS.map(action => (
              <QuickActionCard
                key={action.id}
                action={action}
                onPress={() => handleQuickAction(action.id)}
                loading={locationLoading && action.id.includes('location')}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Activity</Text>
          <View style={styles.statsGrid}>
            <StatsCard
              title="Reports Submitted"
              value="0"
              icon="document-text-outline"
              color={COLORS.primary}
              onPress={navigateToEvidenceSafeBox}
            />
            <StatsCard
              title="Cases Tracked"
              value="0"
              icon="search-outline"
              color={COLORS.secondary}
              onPress={navigateToCaseTracker}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cybersecurity Tips</Text>
          <View style={styles.infoCard}>
            <Ionicons name="shield-checkmark-outline" size={24} color={COLORS.secondary} style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Stay Protected</Text>
              <Text style={styles.infoText}>
                Always verify suspicious emails, use strong passwords, and report cybercrime incidents immediately.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Button
            title="About YCKF"
            onPress={navigateToAbout}
            variant="outline"
            icon="information-circle-outline"
            fullWidth
          />
        </View>

        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1 },

  section: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.xl },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: COLORS.text.primary, marginBottom: SPACING.xs },
  sectionSubtitle: { fontSize: 16, color: COLORS.text.secondary, marginBottom: SPACING.lg, lineHeight: 22 },

  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // gap is not supported, so we rely on card width & margins
  },

  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  infoIcon: { marginRight: SPACING.md, marginTop: 2 },
  infoContent: { flex: 1 },
  infoTitle: { fontSize: 18, fontWeight: '600', color: COLORS.text.primary, marginBottom: SPACING.sm },
  infoText: { fontSize: 16, color: COLORS.text.secondary, lineHeight: 22 },

  footer: { height: SPACING.xl },
});

export default HomeScreen;
