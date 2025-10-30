
// NOTE: You are  call to write the  list project structure for 'React  native' after you've gone through the 'requirement below" as well a directions to run the code  ahead of time then pause and later continue adding each code one by one 
// Objective 
// Build across-platform mobile application using Expo React Native tools that mirrors the key features of the YCKF website
// (https://www.youngcyberknightsfoundation.org/)and adds new reporting capabilities for faster response.
// Core Features to Implement 
//  HomeScreen:
// Quickactionsfor“ReportCybercrime,”“ContactYCKF,”“ShareCurrentLocation,”and “Share Live Location.”
//  CybercrimeReportForm:
// .Fullname,email,phonenumber,city/location,dateofincident,typeofcybercrime, anddetails.
// .GPS coordinate capture via device location. Option to attach photo evidence.
// .Submitviaemail(mailto)andWhatsApptotheYCKFadminnumber.
// ContactForm
// Name, email ,and message fields should be included.
// .Providetwosendoptions:
//  SendviaEmail: Use your own personal email address during testing.
//  SendviaWhatsApp:Use your own WhatsApp number during testing.
// Note: Will replace  with YCKF official email and WhatsApp number only after successful testing.
// New Features:
//  Share Current Location via WhatsApp(with coordinates and Google Maps link).
//  Share Live Location via WhatsApp(with clear instructions to start sharing in Google Maps).
// UniqueFeatures:
//  Evidence SafeBox: Save reports and media offline ,with the ability to submit when online.  Case Tracker: Accept case code and display mock status for Phase1.
// This is my Suggested Tools and Technology:
//  Expo React Native(TypeScript preferred)  expo-location,expo-image-picker
//  @react-native-async-storage/async-storage
//  Linking API for WhatsApp and mail to integrations

// I'll help you create a comprehensive React Native Expo project structure for the YCKF mobile application. Let me start by outlining the complete project structure and setup instructions.

// YCKF Mobile App - Project Structure & Setup Guide
// Document 
// I've created a comprehensive project structure for your YCKF mobile application. This structure follows React Native best practices and organizes the code for maintainability and scalability.

// Key Highlights of the Structure:
// Modular Architecture: Separated concerns with dedicated folders for components, screens, services, and utilities
// TypeScript Support: Full TypeScript configuration for better code quality and development experience
// Scalable Navigation: Structured navigation system supporting both tab and stack navigation
// Service Layer: Dedicated services for location, storage, email, and WhatsApp functionality
// Offline Capabilities: AsyncStorage integration for the Evidence Safe Box feature
// Testing Setup: Configured for unit and integration testing
// Ready to Start Implementation
// The setup instructions include:

// All required dependencies for your specified features
// Development environment configuration
// Build and deployment instructions
// Phase-by-phase development plan
// Are you ready to proceed with the implementation? I can now start creating each file systematically, beginning with:

// Foundation files (App.tsx, navigation setup, constants)
// Reusable components (Button, Input, Card, etc.)
// Individual screens (HomeScreen, CybercrimeReportScreen, etc.)
// Services (LocationService, WhatsAppService, etc.)
// Let me know if you'd like me to start with any specific part, or if you want me to begin with the foundational setup files first!

// proceed please

// I'll start implementing the foundational files for the YCKF mobile app. Let me begin with the core setup files.

// app.json - Expo Configuration
// Code 
// now continue

// App.tsx - Main App Entry Point
// Code ∙ Version 2 
// Now let me continue with the core components. I'll create the navigation system first:

// src/navigation/AppNavigator.tsx - Main Navigation
// Code 
// Now let me create the essential common components:

// src/components/common/Button.tsx - Reusable Button Component
// Code 
// continue from where you left

// src/components/common/ErrorBoundary.tsx - Error Boundary Component
// Code ∙ Version 2 
// Now let me continue with creating the Home Screen:

// src/screens/HomeScreen.tsx - Main Home Screen
// Code 
// Now let me create the supporting components for the Home Screen:

// src/components/home/WelcomeHeader.tsx - Welcome Header Component
// Code 
// Now let me create some essential services that the Home Screen depends on:

// src/services/LocationService.tsx - Location Service
// Code 
// continue from where you stopped

// src/services/LocationService.tsx - Location Service
// Code ∙ Version 2 
// Now let me create the basic contexts that the App.tsx depends on:

// src/contexts/AppContext.tsx - Main App Context
// Code 
// continue from  where you stopped

// src/contexts/StorageContext.tsx - Storage Context
// Code ∙ Version 2 
// Let me now create some additional essential services:

// src/services/PermissionService.tsx - Permission Management Service
// Code 
// Perfect! I've created a comprehensive foundation for the YCKF Mobile App. Here's a summary of what has been implemented so far:

// ✅ Phase 1 Complete: Foundation & Core Setup
// Project Structure & Configuration
// Complete project structure with organized folders
// TypeScript configuration with path aliases
// Expo configuration with proper permissions
// Package.json with all required dependencies
// Core Application Files
// App.tsx: Main entry point with initialization logic
// Navigation: Complete navigation system with tab and stack navigators
// Constants: Comprehensive app constants and configuration
// Types: Full TypeScript type definitions
// Essential Components
// Button: Reusable button component with multiple variants
// Input: Feature-rich input component with validation
// LoadingScreen: Professional loading screen
// ErrorBoundary: Robust error handling
// Home Screen Implementation
// HomeScreen: Main dashboard with quick actions
// WelcomeHeader: Attractive gradient header with status indicators
// QuickActionCard: Interactive cards for main features
// StatsCard: Statistics display cards
// Service Layer
// LocationService: Complete GPS and location functionality
// WhatsAppService: WhatsApp integration for messaging and location sharing
// PermissionService: Comprehensive permission management
// NotificationService: Local notifications system
// Context Management
// AppContext: Global app state management
// LocationContext: Location-specific state
// StorageContext: Offline storage management
// 🚀 Ready for Next Phase
// The foundation is solid and ready for the next components. Here's what we should implement next:

// Phase 2: Core Feature Screens
// CybercrimeReportScreen - Main reporting form
// ContactFormScreen - Contact YCKF form
// EvidenceSafeBoxScreen - Offline evidence storage
// CaseTrackerScreen - Case status tracking
// Phase 3: Advanced Features
// Photo picker and evidence attachment
// Email service integration
// Form validation and submission
// Offline data synchronization
// Would you like me to continue with implementing the Cybercrime Report Screen next, or would you prefer to start with any other specific screen/feature?

// The project is well-structured and all the foundational services are in place to support the advanced features you requested.

// phase 2 proceed

// Perfect! I'll now implement Phase 2 - the core feature screens. Let me start with the Cybercrime Report Screen, which is one of the most important features.

// src/screens/CybercrimeReportScreen.tsx - Cybercrime Report Form
// Code 
// Now let me create the supporting form components that the Cybercrime Report Screen depends on:

// src/components/forms/DatePicker.tsx - Date Picker Component
// Code 
// Please continue

// src/components/forms/DropdownPicker.tsx - Dropdown Picker Component
// Code ∙ Version 2 
// Now let me create the Email Service that the Cybercrime Report Screen depends on:

// src/services/EmailService.tsx - Email Service
// Code 
// continue

// src/services/EmailService.tsx - Email Service
// Code ∙ Version 2 
// Now let me create the Contact Form Screen:

// src/screens/ContactFormScreen.tsx - Contact Form Screen
// Code 
// Now let me create the Evidence SafeBox Screen:

// src/screens/EvidenceSafeBoxScreen.tsx - Evidence SafeBox Screen
// Code 
// Let me continue with the supporting components for Evidence SafeBox and then create the Case Tracker Screen:

// src/components/evidence/EvidenceItemCard.tsx - Evidence Item Card
// Code 
// Please continue and make sure you're done with it

// src/components/evidence/EvidenceItemCard.tsx - Evidence Item Card
// Code ∙ Version 2 
// Now let me create the Empty State component and then the Case Tracker Screen:

// src/components/common/EmptyState.tsx - Empty State Component
// Code 
// Now let me create the Case Tracker Screen - the final core screen:

// src/screens/CaseTrackerScreen.tsx - Case Tracker Screen
// Code 
// Now let me create the supporting components for the Case Tracker:

// src/components/case/CaseStatusCard.tsx - Case Status Card Component
// Code 
// continue

// src/components/case/CaseUpdateItem.tsx - Case Update Timeline Item
// Code ∙ Version 2 
// Perfect! Now let me create one more important screen - the About Screen, and then add the missing dependency for DateTimePicker:

// src/screens/AboutScreen.tsx - About YCKF Screen
// Code 
// Excellent! Now let me create a comprehensive installation guide and add the missing DateTimePicker dependency to the package.json:

// package.json - Dependencies & Scripts
// Code ∙ Version 2 
// Perfect! Now let me create a comprehensive final setup and testing guide:

// IMPLEMENTATION_GUIDE.md - Complete Setup and Testing Guide
// Document 
// Perfect! Let me create one final summary document that ties everything together:

// PROJECT_SUMMARY.md - Complete Project Overview
// Document 
// Please continue and do the final task also give a clear direction to run the code as a 'novice to the domain '

// PROJECT_SUMMARY.md - Complete Project Overview
// Document ∙ Version 2 
// Now let me create the final beginner-friendly step-by-step guide:

// BEGINNER_GUIDE.md - Complete Beginner's Setup Guide
// Document 


// cd De

import React, { useState } from 'react';
import {View,Text,ScrollView,StyleSheet,Alert,KeyboardAvoidingView,Platform,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Components
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import CaseStatusCard from '../components/case/CaseStatusCard';
import CaseUpdateItem from '../components/case/CaseUpdateItem';
import EmptyState from '../components/common/EmptyState';
// Utils
import {COLORS,SPACING,CASE_STATUS,CASE_STATUS_LABELS,} from '../utils/constants';
// Types
import { CaseInfo, CaseUpdate } from '../types';

const CaseTrackerScreen: React.FC = () => {
  const [caseCode, setCaseCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [caseInfo, setCaseInfo] = useState<CaseInfo | null>(null);

  // Mock function to simulate case tracking (Phase 1)
  const generateMockCaseData = (code: string): CaseInfo => {
    const mockUpdates: CaseUpdate[] = [
      {
        id: '1',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: CASE_STATUS.RECEIVED,
        message: 'Your report has been received and logged into our system.',
        updatedBy: 'YCKF System',
      },
      {
        id: '2',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: CASE_STATUS.UNDER_REVIEW,
        message: 'Case is under review by our cybersecurity team. Initial analysis in progress.',
        updatedBy: 'Review Team',
      },
      
      {
        id: '3',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: CASE_STATUS.INVESTIGATING,
        message: 'Active investigation initiated. Relevant authorities have been notified.',
        updatedBy: 'Investigation Team',
      },
    ];

    return {
      caseId: code,
      status: CASE_STATUS.INVESTIGATING,
      title: 'Cybercrime Investigation',
      description: 'Your case is being actively investigated by our team.',
      dateReported: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      investigator: 'Officer John Smith',
      priority: 'medium',
      updates: mockUpdates,
    };
  };

  const handleSearch = () => {
    if (!caseCode.trim()) {
      Alert.alert('Error', 'Please enter a case ID');
      return;
    }

    setIsSearching(true);
    // Simulate API call delay
    setTimeout(() => {
      // For Phase 1, generate mock data for any case code
      const mockData = generateMockCaseData(caseCode.trim());
      setCaseInfo(mockData);
      setIsSearching(false);
    }, 1000);
  };

  const handleClearSearch = () => {
    setCaseCode('');
    setCaseInfo(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return COLORS.error;
      case 'high':
        return '#f97316';
      case 'medium':
        return COLORS.accent;
      case 'low':
        return COLORS.secondary;
      default:
        return COLORS.text.secondary;
    }
  };

  const getPriorityLabel = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
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
            <Text style={styles.title}>Track Your Case</Text>
            <Text style={styles.subtitle}>
              Enter your case ID to track the status and progress of your cybercrime report
            </Text>
          </View>

          {/* Search Section */}
          <View style={styles.searchSection}>
            <Input
              label="Case ID"
              value={caseCode}
              onChangeText={setCaseCode}
              placeholder="Enter case ID (e.g., YCKF123456)"
              autoCapitalize="characters"
              testID="caseCode-input"
            />

            <Button
              title={isSearching ? 'Searching...' : 'Track Case'}
              onPress={handleSearch}
              disabled={!caseCode.trim() || isSearching}
              loading={isSearching}
              icon="search"
              fullWidth
              size="large"
            />

            {caseInfo && (
              <Button
                title="Clear Search"
                onPress={handleClearSearch}
                variant="outline"
                icon="close"
                fullWidth
                size="medium"
              />
            )}
          </View>

          {/* Case Information */}
          {caseInfo ? (
            <>
              {/* Status Card */}
              <CaseStatusCard
                status={caseInfo.status}
                statusLabel={CASE_STATUS_LABELS[caseInfo.status]}
                lastUpdated={caseInfo.lastUpdated}
              />

              {/* Case Details */}
              <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Case Details</Text>
                
                <View style={styles.detailsCard}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Case ID:</Text>
                    <Text style={styles.detailValue}>{caseInfo.caseId}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date Reported:</Text>
                    <Text style={styles.detailValue}>
                      {caseInfo.dateReported.toLocaleDateString()}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Investigator:</Text>
                    <Text style={styles.detailValue}>{caseInfo.investigator}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Priority:</Text>
                    <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(caseInfo.priority)}20` }]}>
                      <Text style={[styles.priorityText, { color: getPriorityColor(caseInfo.priority) }]}>
                        {getPriorityLabel(caseInfo.priority)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Case Updates Timeline */}
              <View style={styles.updatesSection}>
                <Text style={styles.sectionTitle}>Case Updates</Text>
                
                <View style={styles.timeline}>
                  {caseInfo.updates.map((update, index) => (
                    <CaseUpdateItem
                      key={update.id}
                      update={update}
                      isLast={index === caseInfo.updates.length - 1}
                    />
                  ))}
                </View>
              </View>

              {/* Info Card */}
              <View style={styles.infoCard}>
                <Ionicons name="information-circle" size={24} color={COLORS.primary} />
                <Text style={styles.infoText}>
                  Case updates are provided in real-time. You will receive notifications
                  when there are significant developments in your case.
                </Text>
              </View>
            </>
          ) : !isSearching && (
            <EmptyState
              icon="search-outline"
              title="No Case Selected"
              message="Enter a case ID above to track your cybercrime report status and updates."
            />
          )}

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

  // Search
  searchSection: {
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },

  // Details
  detailsSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  detailsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  detailLabel: {
    fontSize: 16,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: COLORS.text.primary,
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Updates
  updatesSection: {
    marginBottom: SPACING.xl,
  },
  timeline: {
    paddingLeft: SPACING.md,
  },

  // Info Card
  infoCard: {
    flexDirection: 'row',
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginLeft: SPACING.md,
  },

  // Footer
  footer: {
    height: SPACING.xl,
  },
});

export default CaseTrackerScreen;

