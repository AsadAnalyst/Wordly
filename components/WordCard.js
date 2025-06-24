import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WordCard({ word, meaning_urdu, meaning_sindhi, example, onFavorite, isFavorite, onSpeak, isDark }) {
  return (
    <View style={[styles.card, isDark && styles.cardDark]}>
      <View style={styles.row}>
        <Text style={[styles.word, isDark && styles.wordDark]}>{word}</Text>
        <TouchableOpacity onPress={onSpeak}>
          <Ionicons name="volume-high" size={22} color={isDark ? '#ffd700' : '#3498db'} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onFavorite}>
          <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={22} color={isFavorite ? '#e74c3c' : isDark ? '#fff' : '#aaa'} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.meaning, isDark && styles.meaningDark]}><Text style={styles.label}>Urdu:</Text> {meaning_urdu}</Text>
      <Text style={[styles.meaning, isDark && styles.meaningDark]}><Text style={styles.label}>Sindhi:</Text> {meaning_sindhi}</Text>
      <Text style={[styles.example, isDark && styles.exampleDark]}>{example}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8ff',
    borderRadius: 18,
    padding: 18,
    marginVertical: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardDark: {
    backgroundColor: '#23242a',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  word: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  wordDark: {
    color: '#fff',
  },
  meaning: {
    fontSize: 16,
    marginTop: 2,
    color: '#444',
  },
  meaningDark: {
    color: '#e0e0e0',
  },
  label: {
    fontWeight: 'bold',
    color: '#3498db',
  },
  example: {
    fontStyle: 'italic',
    color: '#888',
    marginTop: 8,
  },
  exampleDark: {
    color: '#b0b0b0',
  },
});
