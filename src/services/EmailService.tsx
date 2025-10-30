// src/services/EmailService.ts
import * as MailComposer from 'expo-mail-composer';
import { Alert, Linking, Platform } from 'react-native';
import { ServiceResponse, LocationData } from '../types';
import { ACTIVE_CONTACTS } from '../utils/constants';
import LocationService from './LocationService';

/**
 * EmailService - wraps expo-mail-composer with fallbacks and structured responses.
 */
class EmailService {
  private static instance: EmailService;

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private constructor() {}

  // --- Utilities ----------------------------------------------------------

  private async openMailTo(recipients: string[], subject: string, body: string) {
    try {
      const to = recipients.join(',');
      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const supported = await Linking.canOpenURL(mailto);
      if (supported) {
        await Linking.openURL(mailto);
        return true;
      }
      return false;
    } catch (err) {
      console.warn('[EmailService] openMailTo failed', err);
      return false;
    }
  }

  // --- Public API --------------------------------------------------------

  /**
   * Check if device has an email composer available
   */
  async isAvailable(): Promise<boolean> {
    try {
      return await MailComposer.isAvailableAsync();
    } catch (error) {
      console.warn('[EmailService] isAvailable check failed', error);
      return false;
    }
  }

  /**
   * Send email using device's composer when available. Falls back to mailto: if not.
   * attachments should be file:// URIs recognized by MailComposer on mobile.
   */
  async sendEmail(
    recipients: string[],
    subject: string,
    body: string,
    attachments?: string[]
  ): Promise<ServiceResponse<boolean>> {
    try {
      const available = await this.isAvailable();
      if (!available) {
        // fallback to mailto (will open mail client without attachments)
        const opened = await this.openMailTo(recipients, subject, body);
        if (opened) {
          return { success: true, data: true, message: 'Opened mail client (mailto) as fallback' };
        }

        Alert.alert(
          'Email Not Available',
          'No email client is configured on this device. Please set up an email account or use another device.'
        );

        return { success: false, error: 'email_not_available', data: false };
      }

      const options: MailComposer.MailComposerOptions = {
        recipients,
        subject,
        body,
        isHtml: false,
      };

      // only include attachments if they look like file URIs
      if (attachments && attachments.length > 0) {
        const safeAttachments = attachments.filter(a => typeof a === 'string' && a.length > 0);
        if (safeAttachments.length) {
          options.attachments = safeAttachments;
        }
      }

      const result = await MailComposer.composeAsync(options);

      // result.status can be 'sent', 'saved', or 'cancelled'. Treat 'sent' as success.
      const success = result.status === 'sent';
      return {
        success,
        data: success,
        message: success ? 'Email sent successfully' : 'Email composer closed/cancelled',
      };
    } catch (error) {
      console.error('[EmailService] sendEmail failed', error);
      return { success: false, error: (error as Error)?.message || 'send_failed', data: false };
    }
  }

  /**
   * Send a formatted cybercrime report by email
   */
  async sendCybercrimeReport(reportData: {
    caseId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    city: string;
    dateOfIncident: Date | string;
    typeOfCybercrime: string;
    details: string;
    location?: LocationData;
    evidencePhotos?: string[]; // file:// URIs preferred
  }): Promise<ServiceResponse<boolean>> {
    try {
      const subject = `Cybercrime Report - Case ID: ${reportData.caseId}`;

      const dateStr =
        reportData.dateOfIncident instanceof Date
          ? reportData.dateOfIncident.toLocaleDateString()
          : new Date(reportData.dateOfIncident).toLocaleDateString();

      let body = `CYBERCRIME REPORT\n===================\n\n`;
      body += `Case ID: ${reportData.caseId}\n\n`;
      body += `REPORTER INFORMATION\n--------------------\n`;
      body += `Full Name: ${reportData.fullName}\n`;
      body += `Email: ${reportData.email}\n`;
      body += `Phone: ${reportData.phoneNumber}\n`;
      body += `City/Location: ${reportData.city}\n\n`;
      body += `INCIDENT INFORMATION\n--------------------\n`;
      body += `Date of Incident: ${dateStr}\n`;
      body += `Type of Cybercrime: ${reportData.typeOfCybercrime}\n\n`;
      body += `INCIDENT DETAILS\n----------------\n`;
      body += `${reportData.details}\n\n`;

      if (reportData.location) {
        body += `GPS LOCATION\n------------\n`;
        body += `Coordinates: ${reportData.location.latitude.toFixed(6)}, ${reportData.location.longitude.toFixed(6)}\n`;
        if (reportData.location.accuracy) {
          body += `Accuracy: ±${Math.round(reportData.location.accuracy)}m\n`;
        }
        body += `Google Maps: https://maps.google.com/?q=${reportData.location.latitude},${reportData.location.longitude}\n\n`;
      }

      if (reportData.evidencePhotos && reportData.evidencePhotos.length > 0) {
        body += `EVIDENCE\n--------\n`;
        body += `${reportData.evidencePhotos.length} photo(s) attached (see attachments)\n\n`;
      }

      body += `Submitted via YCKF Mobile App\n`;
      body += `Timestamp: ${new Date().toLocaleString()}\n`;

      return await this.sendEmail(ACTIVE_CONTACTS.email ? [ACTIVE_CONTACTS.email] : [], subject, body, reportData.evidencePhotos);
    } catch (error) {
      console.error('[EmailService] sendCybercrimeReport failed', error);
      return { success: false, error: (error as Error)?.message || 'failed', data: false };
    }
  }

  /**
   * Send contact form message via email
   */
  async sendContactMessage(contactData: { name: string; email: string; message: string }): Promise<ServiceResponse<boolean>> {
    try {
      const subject = `Contact Form Submission from ${contactData.name}`;

      let body = `CONTACT FORM MESSAGE\n===================\n\n`;
      body += `SENDER INFORMATION\n------------------\n`;
      body += `Name: ${contactData.name}\n`;
      body += `Email: ${contactData.email}\n\n`;
      body += `MESSAGE\n-------\n`;
      body += `${contactData.message}\n\n`;
      body += `Sent via YCKF Mobile App\n`;
      body += `Timestamp: ${new Date().toLocaleString()}\n`;

      return await this.sendEmail(ACTIVE_CONTACTS.email ? [ACTIVE_CONTACTS.email] : [], subject, body);
    } catch (error) {
      console.error('[EmailService] sendContactMessage failed', error);
      return { success: false, error: (error as Error)?.message || 'failed', data: false };
    }
  }

  /**
   * Send location sharing email
   */
  async sendLocationEmail(location: LocationData): Promise<ServiceResponse<boolean>> {
    try {
      const subject = 'Location Shared from YCKF Mobile App';
      const address = await LocationService.getAddressFromLocation?.(location);
      const body = typeof LocationService.formatLocationForSharing === 'function'
        ? LocationService.formatLocationForSharing(location, address || undefined)
        : `Coordinates: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}\nhttps://maps.google.com/?q=${location.latitude},${location.longitude}`;

      return await this.sendEmail(ACTIVE_CONTACTS.email ? [ACTIVE_CONTACTS.email] : [], subject, body);
    } catch (error) {
      console.error('[EmailService] sendLocationEmail failed', error);
      return { success: false, error: (error as Error)?.message || 'failed', data: false };
    }
  }

  /**
   * Send emergency alert email
   */
  async sendEmergencyAlert(location?: LocationData): Promise<ServiceResponse<boolean>> {
    try {
      const subject = '🆘 EMERGENCY ALERT - YCKF Mobile App';
      let body = `EMERGENCY ALERT\n===============\n\nThis is an urgent emergency alert sent from YCKF Mobile App.\n\nUser requires immediate assistance.\n\n`;

      if (location) {
        body += `CURRENT LOCATION\n----------------\n`;
        body += `Coordinates: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}\n`;
        if (location.accuracy) {
          body += `Accuracy: ±${Math.round(location.accuracy)}m\n`;
        }
        body += `Google Maps: https://maps.google.com/?q=${location.latitude},${location.longitude}\n\n`;
      }

      body += `Time: ${new Date().toLocaleString()}\n\nPlease respond immediately.\n`;

      return await this.sendEmail(ACTIVE_CONTACTS.email ? [ACTIVE_CONTACTS.email] : [], subject, body);
    } catch (error) {
      console.error('[EmailService] sendEmergencyAlert failed', error);
      return { success: false, error: (error as Error)?.message || 'failed', data: false };
    }
  }

  /**
   * Send generic feedback
   */
  async sendFeedback(feedbackData: { type: string; subject: string; message: string; userEmail?: string }): Promise<ServiceResponse<boolean>> {
    try {
      const subject = `[${feedbackData.type}] ${feedbackData.subject}`;
      let body = `FEEDBACK SUBMISSION\n==================\n\n`;
      body += `Type: ${feedbackData.type}\n`;
      if (feedbackData.userEmail) body += `User Email: ${feedbackData.userEmail}\n`;
      body += `\nMessage:\n${feedbackData.message}\n\n`;
      body += `Submitted via YCKF Mobile App\n`;
      body += `Timestamp: ${new Date().toLocaleString()}\n`;

      return await this.sendEmail(ACTIVE_CONTACTS.email ? [ACTIVE_CONTACTS.email] : [], subject, body);
    } catch (error) {
      console.error('[EmailService] sendFeedback failed', error);
      return { success: false, error: (error as Error)?.message || 'failed', data: false };
    }
  }
}

// default singleton export for easier import
export default EmailService.getInstance();
