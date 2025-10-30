import React, { useState } from 'react';
import {View,Text,ScrollView,StyleSheet,Alert,KeyboardAvoidingView,Platform,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Components
import Button from '../components/common/Button';
import Input from '../components/common/Input';

// Services
import EmailService from '../services/EmailService';
import WhatsAppService from '../services/WhatsAppService';
import NotificationService from '../services/NotificationService';

// Contexts
import { useApp } from '../contexts/AppContext';

// Utils
import {
  COLORS,
  SPACING,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from '../utils/constants';

// Types
import { ContactForm } from '../types';

// Validation schema
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters'),
});

const ContactFormScreen: React.FC = () => {
  const navigation = useNavigation();
  const { state } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const submitViaEmail = async (data: ContactForm) => {
    try {
      const result = await EmailService.sendContactMessage(data);
      return result.success;
    } catch (error) {
      console.error('Email submission failed:', error);
      return false;
    }
  };

  const submitViaWhatsApp = async (data: ContactForm) => {
    try {
      const result = await WhatsAppService.sendContactMessage(data);
      return result.success;
    } catch (error) {
      console.error('WhatsApp submission failed:', error);
      return false;
    }
  };

  const onSubmit = async (data: ContactForm) => {
    if (!state.isOnline) {
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Send Message',
      'How would you like to send your message?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Email',
          onPress: async () => {
            setIsSubmitting(true);
            try {
              const success = await submitViaEmail(data);
              if (success) {
                Alert.alert('Success', SUCCESS_MESSAGES.CONTACT_SENT, [
                  {
                    text: 'OK',
                    onPress: () => {
                      reset();
                      navigation.goBack();
                    },
                  },
                ]);
              } else {
                Alert.alert('Error', 'Failed to send message via email. Please try again.');
              }
            } finally {
              setIsSubmitting(false);
            }
          },
        },
        {
          text: 'WhatsApp',
          onPress: async () => {
            setIsSubmitting(true);
            try {
              const success = await submitViaWhatsApp(data);
              if (success) {
                Alert.alert('Success', SUCCESS_MESSAGES.CONTACT_SENT, [
                  {
                    text: 'OK',
                    onPress: () => {
                      reset();
                      navigation.goBack();
                    },
                  },
                ]);
              } else {
                Alert.alert('Error', 'Failed to send message via WhatsApp. Please try again.');
              }
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Contact YCKF</Text>
            <Text style={styles.subtitle}>
              Get in touch with our team. We're here to help with any questions or concerns.
            </Text>
          </View>

          {/* Contact Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>📧</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>contact@bien.org</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>📱</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>WhatsApp</Text>
                <Text style={styles.infoValue}>+234-913-671-0349</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>🌐</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Website</Text>
                <Text style={styles.infoValue}>cyberfoundation.org</Text>
              </View>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Send us a message</Text>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Name"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your full name"
                  error={errors.name?.message}
                  required
                  testID="name-input"
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email Address"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email?.message}
                  required
                  testID="email-input"
                />
              )}
            />

            <Controller
              control={control}
              name="message"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Message"
                  value={value}
                  onChangeText={onChange}
                  placeholder="How can we help you? Please provide details about your inquiry..."
                  multiline
                  numberOfLines={6}
                  error={errors.message?.message}
                  required
                  testID="message-input"
                />
              )}
            />
          </View>

          {/* Submit Section */}
          <View style={styles.submitSection}>
            <Button
              title={isSubmitting ? 'Sending Message...' : 'Send Message'}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isSubmitting || !state.isOnline}
              loading={isSubmitting}
              icon="send"
              fullWidth
              size="large"
              testID="submit-button"
            />

            {!state.isOnline && (
              <View style={styles.offlineNotice}>
                <Text style={styles.offlineText}>
                  ⚠️ You're offline. Please connect to the internet to send messages.
                </Text>
              </View>
            )}
          </View>

          {/* Response Time Notice */}
          <View style={styles.noticeCard}>
            <Text style={styles.noticeTitle}>📬 Response Time</Text>
            <Text style={styles.noticeText}>
              We typically respond within 24-48 hours during business days. For urgent
              matters, please call our emergency hotline.
            </Text>
          </View>

          {/* Footer Spacing */}
          <View style={styles.footer} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.lg,
  },

  // Header
  header: {
    paddingVertical: SPACING.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.md,
  },

  // Info Card
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  iconText: {
    fontSize: 24,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.sm,
  },

  // Form
  formSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },

  // Submit
  submitSection: {
    paddingVertical: SPACING.lg,
  },
  offlineNotice: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    backgroundColor: `${COLORS.accent}15`,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  offlineText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },

  // Notice Card
  noticeCard: {
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  noticeText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },

  // Footer
  footer: {
    height: SPACING.xl,
  },
});

export default ContactFormScreen;
