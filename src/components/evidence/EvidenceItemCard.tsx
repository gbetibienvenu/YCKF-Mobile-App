import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT } from '../../utils/constants';
import { EvidenceItem } from '../../types';

interface EvidenceItemCardProps {
  item: EvidenceItem;
  onPress: () => void;
  onDelete: () => void;
  onSubmit: () => void;
  isSelected?: boolean;
  isSelectionMode?: boolean;
}

const EvidenceItemCard: React.FC<EvidenceItemCardProps> = ({
  item,
  onPress,
  onDelete,
  onSubmit,
  isSelected = false,
  isSelectionMode = false,
}) => {
  // safe destructuring with defaults
  const {
    type = 'report',
    title,
    filename,
    thumbnail,
    description,
    date,
  } = item || {};

  const getTypeIcon = (t: string) => {
    switch (t) {
      case 'report':
        return 'document-text';
      case 'photo':
        return 'image';
      case 'document':
        return 'document';
      case 'audio':
        return 'mic';
      case 'video':
        return 'videocam';
      default:
        return 'file-tray';
    }
  };

  const getTypeColor = (t: string) => {
    switch (t) {
      case 'report':
        return COLORS.primary;
      case 'photo':
        return COLORS.secondary;
      case 'document':
        return (COLORS as any).accent || COLORS.primary;
      case 'audio':
        return '#8b5cf6';
      case 'video':
        return '#ef4444';
      default:
        return COLORS.text.secondary;
    }
  };

  const typeIcon = getTypeIcon(type);
  const typeColor = getTypeColor(type);

  // Format date safely
  const formattedDate = (() => {
    if (!date) return null;
    try {
      const d = date instanceof Date ? date : new Date(date);
      if (isNaN(d.getTime())) return null;
      return d.toLocaleString();
    } catch {
      return null;
    }
  })();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selected,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {/* Left: thumbnail or icon */}
      <View style={styles.left}>
        {thumbnail ? (
          <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.iconWrap, { backgroundColor: `${typeColor}15` }]}>
            <Ionicons name={typeIcon as any} size={22} color={typeColor} />
          </View>
        )}
      </View>

      {/* Middle: title / meta */}
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {title ?? filename ?? 'Untitled evidence'}
        </Text>

        {formattedDate ? (
          <Text style={styles.meta} numberOfLines={1}>
            {formattedDate}
          </Text>
        ) : null}

        {description ? (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        ) : null}
      </View>

      {/* Right: actions */}
      <View style={styles.actions}>
        {isSelectionMode ? (
          <View style={styles.checkbox}>
            {isSelected ? (
              <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
            ) : (
              <Ionicons name="ellipse-outline" size={22} color={COLORS.text.secondary} />
            )}
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.iconButton} onPress={onSubmit} testID="evidence-submit">
              <Ionicons name="cloud-upload" size={20} color={COLORS.primary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={onDelete} testID="evidence-delete">
              <Ionicons name="trash" size={20} color={COLORS.error} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: (LAYOUT && LAYOUT.borderRadius && LAYOUT.borderRadius.md) || 10,
    padding: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
    ...(LAYOUT?.shadows?.small || {}),
  },
  selected: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  left: {
    marginRight: SPACING.md,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.fontSizes?.md ?? 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  meta: {
    fontSize: TYPOGRAPHY.fontSizes?.sm ?? 12,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSizes?.sm ?? 12,
    color: COLORS.text.secondary,
  },

  actions: {
    marginLeft: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 6,
    borderRadius: 8,
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EvidenceItemCard;
