import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EvidenceItem, SafeBoxData } from '../types';
import { STORAGE_KEYS } from '../utils/constants';

interface StorageContextType {
  safeBoxData: SafeBoxData | null;
  isLoading: boolean;
  error: string | null;
  loadSafeBoxData: () => Promise<void>;
  saveEvidenceItem: (item: EvidenceItem) => Promise<boolean>;
  removeEvidenceItem: (itemId: string) => Promise<boolean>;
  clearSafeBox: () => Promise<boolean>;
  getStorageInfo: () => Promise<{ used: number; available: number }>;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [safeBoxData, setSafeBoxData] = useState<SafeBoxData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSafeBoxData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.EVIDENCE_SAFEBOX);
      if (data) {
        const safeBox: SafeBoxData = JSON.parse(data);
        setSafeBoxData(safeBox);
      } else {
        // Initialize empty safe box
        const emptySafeBox: SafeBoxData = {
          items: [],
          totalItems: 0,
          totalSize: 0,
          lastUpdated: Date.now(),
        };
        setSafeBoxData(emptySafeBox);
        await AsyncStorage.setItem(STORAGE_KEYS.EVIDENCE_SAFEBOX, JSON.stringify(emptySafeBox));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load safe box data';
      setError(errorMessage);
      console.error('Storage loading error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveEvidenceItem = useCallback(async (item: EvidenceItem): Promise<boolean> => {
    try {
      setError(null);
      
      const currentData = safeBoxData || {
        items: [],
        totalItems: 0,
        totalSize: 0,
        lastUpdated: Date.now(),
      };

      // Check if item already exists (update scenario)
      const existingIndex = currentData.items.findIndex(existing => existing.id === item.id);
      
      let updatedItems: EvidenceItem[];
      if (existingIndex >= 0) {
        // Update existing item
        updatedItems = [...currentData.items];
        updatedItems[existingIndex] = item;
      } else {
        // Add new item
        updatedItems = [...currentData.items, item];
      }

      // Calculate total size
      const totalSize = updatedItems.reduce((sum, item) => sum + (item.fileSize || 0), 0);

      const updatedSafeBox: SafeBoxData = {
        items: updatedItems,
        totalItems: updatedItems.length,
        totalSize,
        lastUpdated: Date.now(),
      };

      await AsyncStorage.setItem(STORAGE_KEYS.EVIDENCE_SAFEBOX, JSON.stringify(updatedSafeBox));
      setSafeBoxData(updatedSafeBox);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save evidence item';
      setError(errorMessage);
      console.error('Storage save error:', err);
      return false;
    }
  }, [safeBoxData]);

  const removeEvidenceItem = useCallback(async (itemId: string): Promise<boolean> => {
    try {
      setError(null);
      
      if (!safeBoxData) {
        return false;
      }

      const updatedItems = safeBoxData.items.filter(item => item.id !== itemId);
      const totalSize = updatedItems.reduce((sum, item) => sum + (item.fileSize || 0), 0);

      const updatedSafeBox: SafeBoxData = {
        items: updatedItems,
        totalItems: updatedItems.length,
        totalSize,
        lastUpdated: Date.now(),
      };

      await AsyncStorage.setItem(STORAGE_KEYS.EVIDENCE_SAFEBOX, JSON.stringify(updatedSafeBox));
      setSafeBoxData(updatedSafeBox);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove evidence item';
      setError(errorMessage);
      console.error('Storage remove error:', err);
      return false;
    }
  }, [safeBoxData]);

  const clearSafeBox = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      
      const emptySafeBox: SafeBoxData = {
        items: [],
        totalItems: 0,
        totalSize: 0,
        lastUpdated: Date.now(),
      };

      await AsyncStorage.setItem(STORAGE_KEYS.EVIDENCE_SAFEBOX, JSON.stringify(emptySafeBox));
      setSafeBoxData(emptySafeBox);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to clear safe box';
      setError(errorMessage);
      console.error('Storage clear error:', err);
      return false;
    }
  }, []);

  const getStorageInfo = useCallback(async (): Promise<{ used: number; available: number }> => {
    try {
      // This is a rough estimation since AsyncStorage doesn't provide exact storage info
      const allKeys = await AsyncStorage.getAllKeys();
      let totalUsed = 0;

      for (const key of allKeys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalUsed += new Blob([value]).size;
        }
      }

      // Rough estimation of available storage (assuming 50MB limit for AsyncStorage)
      const estimatedLimit = 50 * 1024 * 1024; // 50MB
      const available = Math.max(0, estimatedLimit - totalUsed);

      return {
        used: totalUsed,
        available,
      };
    } catch (err) {
      console.error('Failed to get storage info:', err);
      return {
        used: 0,
        available: 0,
      };
    }
  }, []);

  const contextValue: StorageContextType = {
    safeBoxData,
    isLoading,
    error,
    loadSafeBoxData,
    saveEvidenceItem,
    removeEvidenceItem,
    clearSafeBox,
    getStorageInfo,
  };

  return (
    <StorageContext.Provider value={contextValue}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = (): StorageContextType => {
  const context = useContext(StorageContext);
  if (context === undefined) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
};