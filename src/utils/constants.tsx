// App-wide constants for YCKF Mobile App
export const APP_CONFIG = {
  name: 'YCKF Mobile',
  version: '1.0.0',
  description: 'Young Cyber Knights Foundation Mobile Application',
  website: 'https://www.youngcyberknightsfoundation.org/',
};

// Contact Information (Testing Phase - Replace after successful testing)
export const CONTACT_INFO = {
  // Testing contacts (replace with YCKF official contacts)
  email: {
    test: 'olawalesossapeter@gmail.com', // Replace with your testing email
    official: 'contact@youngcyberknightsfoundation.org', // YCKF official email
  },
  whatsapp: {
    test: '+2347085389001', // Replace with your testing WhatsApp number
    official: '+2349136710349', // YCKF official WhatsApp number
  },
  phone: '+234-913-671-0349',
  address: 'YCKF Headquarters, Lagos, Nigeria',
};

// Use testing contacts during development
export const ACTIVE_CONTACTS = {
  email: CONTACT_INFO.email.test,
  whatsapp: CONTACT_INFO.whatsapp.test,
};

// App Colors
export const COLORS = {
  primary: '#1e3a8a', // YCKF Blue
  primaryLight: '#3b82f6',
  primaryDark: '#1e40af',
  secondary: '#059669', // Green for success
  accent: '#f59e0b', // Orange for warnings
  error: '#dc2626', // Red for errors
  background: '#f8fafc',
  surface: '#ffffff',
  text: {
    primary: '#1f2937',
    secondary: '#6b7280',
    light: '#9ca3af',
    white: '#ffffff',
  },
  border: '#e5e7eb',
  divider: '#f3f4f6',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

// Typography
export const TYPOGRAPHY = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
  fontWeights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Screen dimensions and responsive breakpoints
export const LAYOUT = {
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

// Cybercrime Types
export const CYBERCRIME_TYPES = [
  'Identity Theft',
  'Online Fraud',
  'Phishing',
  'Cyberbullying',
  'Ransomware',
  'Credit Card Fraud',
  'Romance Scam',
  'Investment Fraud',
  'Online Shopping Scam',
  'Social Media Fraud',
  'Business Email Compromise',
  'Cryptocurrency Fraud',
  'Fake Job Offers',
  'Tech Support Scam',
  'Other',
];

// Case Status Types (Mock for Phase 1)
export const CASE_STATUS = {
  RECEIVED: 'received',
  UNDER_REVIEW: 'under_review',
  INVESTIGATING: 'investigating',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
};

export const CASE_STATUS_LABELS = {
  [CASE_STATUS.RECEIVED]: 'Case Received',
  [CASE_STATUS.UNDER_REVIEW]: 'Under Review',
  [CASE_STATUS.INVESTIGATING]: 'Under Investigation',
  [CASE_STATUS.RESOLVED]: 'Resolved',
  [CASE_STATUS.CLOSED]: 'Closed',
};

// Storage Keys
export const STORAGE_KEYS = {
  EVIDENCE_SAFEBOX: 'evidence_safebox',
  USER_PREFERENCES: 'user_preferences',
  OFFLINE_REPORTS: 'offline_reports',
  CASE_TRACKER: 'case_tracker',
  APP_SETTINGS: 'app_settings',
};

// API Endpoints (Future use)
export const API_ENDPOINTS = {
  BASE_URL: 'https://api.youngcyberknightsfoundation.org',
  SUBMIT_REPORT: '/api/reports/submit',
  TRACK_CASE: '/api/cases/track',
  CONTACT: '/api/contact',
};

// Permissions
export const PERMISSIONS = {
  LOCATION: 'location',
  CAMERA: 'camera',
  MEDIA_LIBRARY: 'mediaLibrary',
  NOTIFICATIONS: 'notifications',
};

// Location Settings
export const LOCATION_CONFIG = {
  accuracy: 6, // High accuracy
  timeout: 10000, // 10 seconds
  maximumAge: 60000, // 1 minute
};

// File Upload Settings
export const FILE_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png'],
  compressionQuality: 0.8,
};

// Animation Durations
export const ANIMATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Screen Names (Navigation)
export const SCREEN_NAMES = {
  HOME: 'Home',
  CYBERCRIME_REPORT: 'CybercrimeReport',
  CONTACT_FORM: 'ContactForm',
  EVIDENCE_SAFEBOX: 'EvidenceSafeBox',
  CASE_TRACKER: 'CaseTracker',
  ABOUT: 'About',
  SETTINGS: 'Settings',
};

// Quick Actions
export const QUICK_ACTIONS = [
  {
    id: 'report_cybercrime',
    title: 'Report Cybercrime',
    subtitle: 'Submit a cybercrime incident',
    icon: 'shield-alert',
    screen: SCREEN_NAMES.CYBERCRIME_REPORT,
    color: COLORS.error,
  },
  {
    id: 'contact_yckf',
    title: 'Contact YCKF',
    subtitle: 'Get in touch with our team',
    icon: 'message-circle',
    screen: SCREEN_NAMES.CONTACT_FORM,
    color: COLORS.primary,
  },
  {
    id: 'share_location',
    title: 'Share Current Location',
    subtitle: 'Send your GPS coordinates',
    icon: 'map-pin',
    action: 'shareCurrentLocation',
    color: COLORS.secondary,
  },
  {
    id: 'live_location',
    title: 'Share Live Location',
    subtitle: 'Share real-time location',
    icon: 'navigation',
    action: 'shareLiveLocation',
    color: COLORS.accent,
  },
];

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  LOCATION_PERMISSION: 'Location permission is required to capture GPS coordinates.',
  CAMERA_PERMISSION: 'Camera permission is required to take photos.',
  FILE_TOO_LARGE: 'File size is too large. Maximum size allowed is 10MB.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  REQUIRED_FIELD: 'This field is required.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  REPORT_SUBMITTED: 'Your cybercrime report has been submitted successfully.',
  CONTACT_SENT: 'Your message has been sent successfully.',
  LOCATION_SHARED: 'Location shared successfully.',
  DATA_SAVED: 'Data saved to Evidence SafeBox.',
};