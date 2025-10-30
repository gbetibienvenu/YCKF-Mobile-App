import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity, Alert } from 'react-native';
import Button from '../components/common/Button';
import { COLORS, SPACING, TYPOGRAPHY, APP_CONFIG } from '../utils/constants';
import { Ionicons } from '@expo/vector-icons';

const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/youngcyberknightsfoundation',
  twitter: 'https://twitter.com/youngcyberknights',
  instagram: 'https://www.instagram.com/youngcyberknightsfoundation',
  linkedin: 'https://www.linkedin.com/company/youngcyberknightsfoundation',
};

const getFullUrl = (path: string) => {
  // Ensure APP_CONFIG.website ends with a slash then join path
  const base = APP_CONFIG.website.endsWith('/') ? APP_CONFIG.website : `${APP_CONFIG.website}/`;
  return `${base}${path.replace(/^\/+/, '')}`;
};

const AboutScreen: React.FC = () => {
  const openUrl = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Cannot open link', 'Your device cannot open this link.');
      }
    } catch (err) {
      console.error('Open URL failed', err);
      Alert.alert('Error', 'Failed to open link.');
    }
  };

  const openWebsite = () => {
    openUrl(APP_CONFIG.website);
  };

  const openEmail = () => {
    openUrl('mailto:contact@youngcyberknightsfoundation.org');
  };

  const openPhone = () => {
    openUrl('tel:+2349136710349');
  };

  const openSocial = (key: keyof typeof SOCIAL_LINKS) => {
    const url = SOCIAL_LINKS[key];
    openUrl(url);
  };

  const openPrivacyPolicy = () => {
    // tries to open site/privacy-policy (adjust path if your site uses a different slug)
    openUrl(getFullUrl('privacy-policy'));
  };

  const openTermsOfService = () => {
    // tries to open site/terms-of-service (adjust path if your site uses a different slug)
    openUrl(getFullUrl('terms-of-service'));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>YCKF</Text>
          </View>
          <Text style={styles.appName}>{APP_CONFIG.name}</Text>
          <Text style={styles.version}>Version {APP_CONFIG.version}</Text>
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.paragraph}>
            Young Cyber Knights Foundation (YCKF) is dedicated to protecting individuals
            and organizations from cyber threats. We provide education, support, and
            resources to combat cybercrime and promote digital safety.
          </Text>
        </View>

        {/* What We Do Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Do</Text>

          <View style={styles.featureItem}>
            <Ionicons name="shield-checkmark" size={24} color={COLORS.primary} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Cybercrime Reporting</Text>
              <Text style={styles.featureText}>
                Easy-to-use platform for reporting cybercrime incidents
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="school" size={24} color={COLORS.primary} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Education & Awareness</Text>
              <Text style={styles.featureText}>
                Programs to educate the public about cyber threats and prevention
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="people" size={24} color={COLORS.primary} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Victim Support</Text>
              <Text style={styles.featureText}>
                Assistance and guidance for cybercrime victims
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="globe" size={24} color={COLORS.primary} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Advocacy</Text>
              <Text style={styles.featureText}>
                Working with authorities to strengthen cybersecurity policies
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>

          <TouchableOpacity style={styles.contactItem} onPress={openWebsite}>
            <Ionicons name="globe-outline" size={24} color={COLORS.primary} />
            <View style={styles.contactContent}>
              <Text style={styles.contactLabel}>Website</Text>
              <Text style={styles.contactValue}>{APP_CONFIG.website}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text.light} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={openEmail}>
            <Ionicons name="mail-outline" size={24} color={COLORS.primary} />
            <View style={styles.contactContent}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>contact@youngcyberknightsfoundation.org</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text.light} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={openPhone}>
            <Ionicons name="call-outline" size={24} color={COLORS.primary} />
            <View style={styles.contactContent}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>+234-9136710349</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text.light} />
          </TouchableOpacity>
        </View>

        {/* Social Media Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => openSocial('facebook')}
              accessibilityLabel="Open Facebook"
            >
              <Ionicons name="logo-facebook" size={28} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => openSocial('twitter')}
              accessibilityLabel="Open Twitter"
            >
              <Ionicons name="logo-twitter" size={28} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => openSocial('instagram')}
              accessibilityLabel="Open Instagram"
            >
              <Ionicons name="logo-instagram" size={28} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => openSocial('linkedin')}
              accessibilityLabel="Open LinkedIn"
            >
              <Ionicons name="logo-linkedin" size={28} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              This app is designed to make cybercrime reporting faster and more accessible.
              All reports are securely transmitted to YCKF and relevant authorities.
            </Text>
          </View>

          <Button
            title="Visit Our Website"
            onPress={openWebsite}
            variant="primary"
            icon="open-outline"
            fullWidth
          />
        </View>

        {/* Legal Section */}
        <View style={styles.legalSection}>
          <Text style={styles.legalText}>© 2025 Bien Bien DevPro</Text>
          <Text style={styles.legalText}>All rights reserved</Text>

          <View style={styles.legalLinks}>
            <TouchableOpacity onPress={openPrivacyPolicy}>
              <Text style={styles.legalLink}>Privacy Policy</Text>
            </TouchableOpacity>

            <Text style={styles.legalSeparator}>•</Text>

            <TouchableOpacity onPress={openTermsOfService}>
              <Text style={styles.legalLink}>Terms of Service</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Spacing */}
        <View style={styles.footer} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.lg,
  },

  // Logo Section
  logoSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text.white,
    letterSpacing: 2,
  },
  appName: {
    fontSize: TYPOGRAPHY.fontSizes.xxl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  version: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text.secondary,
  },

  // Sections
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  paragraph: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text.secondary,
    lineHeight: 24,
  },

  // Features
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  featureContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  featureTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  featureText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },

  // Contact
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  contactContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  contactLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    color: COLORS.text.primary,
  },

  // Social Media
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.lg,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: SPACING.sm,
  },

  // Info Card
  infoCard: {
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  infoText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text.secondary,
    lineHeight: 22,
  },

  // Legal
  legalSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  legalText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text.light,
    marginBottom: SPACING.xs,
  },
  legalLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  legalLink: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  legalSeparator: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text.light,
    marginHorizontal: SPACING.sm,
  },

  // Footer
  footer: {
    height: SPACING.xl,
  },
});

export default AboutScreen;
