import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ title, onFavorites, onSearch, onCalendar, onThemeSwitch, isDark, showFavorite, isFavorite }) {
  return (
    <View style={[styles.headerWrap, isDark && styles.headerWrapDark]}>
      <View style={[styles.header, isDark && styles.headerDark, Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight || 24 }]}>
        <Text style={[styles.title, isDark && styles.titleDark]}>{title}</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={onSearch}>
            <Ionicons name="search" size={24} color={isDark ? '#fff' : '#333'} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onCalendar}>
            <Ionicons name="calendar" size={24} color={isDark ? '#fff' : '#333'} style={styles.icon} />
          </TouchableOpacity>
          {showFavorite && (
            <TouchableOpacity onPress={onFavorites}>
              <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? '#e74c3c' : isDark ? '#fff' : '#e74c3c'} style={styles.icon} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onThemeSwitch}>
            <Ionicons name={isDark ? 'sunny' : 'moon'} size={24} color={isDark ? '#ffd700' : '#333'} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    backgroundColor: '#fff',
  },
  headerWrapDark: {
    backgroundColor: '#222',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 48 : 24,
    backgroundColor: '#fff',
    elevation: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerDark: {
    backgroundColor: '#222',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  titleDark: {
    color: '#fff',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
  },
});
