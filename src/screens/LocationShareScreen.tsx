// src/screens/LocationShareScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/common/Button';
import { COLORS, SPACING, TYPOGRAPHY, LAYOUT } from '../utils/constants';
import LocationService from '../services/LocationService';
import { LocationData, LocationAddress } from '../types';
// src/screens/LocationShareScreen.tsx
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { COLORS, SPACING, TYPOGRAPHY } from '../utils/constants';



const LocationShareScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [lastLocation, setLastLocation] = useState<LocationData | null>(null);
  const [lastAddress, setLastAddress] = useState<LocationAddress | null>(null);

  const fetchAndShareCurrentLocation = async () => {
    try {
      setLoading(true);
      const loc = await LocationService.getInstance().getCurrentLocation();
      if (!loc) {
        Alert.alert('Location', 'Unable to get current location.');
        setLoading(false);
        return;
      }
      setLastLocation(loc);

      const addr = await LocationService.getInstance().getAddressFromLocation(loc);
      setLastAddress(addr || null);

      const message = LocationService.getInstance().formatLocationForSharing(loc, addr);

      // during testing you can put your phone number here, later replace with YCKF number
      const phone = ''; 
      const encoded = encodeURIComponent(message);
      const whatsappUrl = phone
        ? `whatsapp://send?phone=${encodeURIComponent(phone)}&text=${encoded}`
        : `whatsapp://send?text=${encoded}`;

      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        const mailto = `mailto:?subject=${encodeURIComponent('YCKF - Current Location')}&body=${encoded}`;
        const canOpenMail = await Linking.canOpenURL(mailto);
        if (canOpenMail) {
          await Linking.openURL(mailto);
        } else {
          Alert.alert(
            'Share Location',
            'Unable to open WhatsApp or Mail on this device. Copy the following message manually.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (err: any) {
      console.error('Share current location failed', err);
      Alert.alert('Error', err?.message || 'Failed to share location');
    } finally {
      setLoading(false);
    }
  };

  const openLiveShareInstructions = async () => {
    const mapsUrl = Platform.select({
      ios: 'https://maps.apple.com',
      android: 'https://maps.google.com',
      default: 'https://maps.google.com',
    });

    Alert.alert(
      'Share Live Location — Instructions',
      'To share live location via Google Maps:\n\n1. Open Google Maps on your phone.\n2. Tap your profile icon (top right) → "Location sharing".\n3. Tap "Share location" and choose the contact (or copy link) and send to YCKF via WhatsApp.\n\nWould you like to open Google Maps now?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open Maps',
          onPress: async () => {
            try {
              if (!mapsUrl) return;
              const can = await Linking.canOpenURL(mapsUrl);
              if (can) await Linking.openURL(mapsUrl);
              else Alert.alert('Error', 'Unable to open Maps on this device.');
            } catch (err) {
              console.error('Open maps failed', err);
              Alert.alert('Error', 'Failed to open Maps.');
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Share Your Location</Text>
      <Text style={styles.description}>
        Use these quick actions to share your current coordinates or learn how to share your live location via Google Maps.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.buttonRow}>
          <Button
            title="Share Current Location (WhatsApp)"
            onPress={fetchAndShareCurrentLocation}
            icon="location"
            fullWidth
            loading={loading}
          />
        </View>

        <View style={styles.buttonRow}>
          <Button
            title="How to Share Live Location"
            onPress={openLiveShareInstructions}
            icon="share-social"
            variant="outline"
            fullWidth
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Last Location</Text>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : lastLocation ? (
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Coordinates: {lastLocation.latitude.toFixed(6)}, {lastLocation.longitude.toFixed(6)}
            </Text>
            {lastAddress?.name ? <Text style={styles.infoTextSmall}>Place: {lastAddress.name}</Text> : null}
            <Text style={styles.infoTextSmall}>
              Accuracy: ±{Math.round(lastLocation.accuracy || 0)}m
            </Text>
            <Text style={styles.infoTextSmall}>
              Timestamp: {new Date(lastLocation.timestamp || Date.now()).toLocaleString()}
            </Text>
          </View>
        ) : (
          <Text style={styles.emptyText}>You haven't shared a location yet.</Text>
        )}
      </View>
    </ScrollView>
  );
};




const styles = StyleSheet.create({
  container: { padding: SPACING.lg, backgroundColor: COLORS.background, flexGrow: 1 },
  title: { fontSize: TYPOGRAPHY.fontSizes.lg, fontWeight: '700', color: COLORS.text.primary, marginBottom: SPACING.sm },
  description: { color: COLORS.text.secondary, marginBottom: SPACING.md, lineHeight: 20 },
  section: { marginTop: SPACING.lg, marginBottom: SPACING.lg },
  sectionTitle: { fontSize: TYPOGRAPHY.fontSizes.md, fontWeight: '600', color: COLORS.text.primary, marginBottom: SPACING.md },
  buttonRow: { marginBottom: SPACING.md },
  infoCard: { backgroundColor: COLORS.surface, padding: SPACING.md, borderRadius: LAYOUT.borderRadius.md || 10 },
  infoText: { color: COLORS.text.primary, fontSize: TYPOGRAPHY.fontSizes.sm, marginBottom: 4 },
  infoTextSmall: { color: COLORS.text.secondary, fontSize: TYPOGRAPHY.fontSizes.xs || 12 },
  emptyText: { color: COLORS.text.secondary },
});


export default LocationShareScreen;
