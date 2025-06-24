import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, Alert } from 'react-native';
import Header from '../components/Header';
import WordCard from '../components/WordCard';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';

const words = require('../assets/data/words.json');

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favs = await AsyncStorage.getItem('favorites');
      setFavorites(favs ? JSON.parse(favs) : []);
    } catch {
      Alert.alert('Error', 'Failed to load favorites.');
    }
  };

  const toggleFavorite = async (wordObj) => {
    let updated;
    if (favorites.some(f => f.word === wordObj.word)) {
      updated = favorites.filter(f => f.word !== wordObj.word);
    } else {
      updated = [...favorites, wordObj];
    }
    setFavorites(updated);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  };

  // Only show results if query is not empty
  const filtered = query.trim().length > 0
    ? words.filter(w =>
        w.word.toLowerCase().includes(query.toLowerCase()) ||
        w.meaning_urdu.includes(query) ||
        w.meaning_sindhi.includes(query)
      )
    : [];

  return (
    <View style={styles.container}>
      <Header
        title="Search"
        onFavorites={() => navigation.navigate('Favorites')}
        onSearch={() => {}}
        onCalendar={() => navigation.navigate('Calendar')}
        onThemeSwitch={() => {}}
      />
      <TextInput
        style={styles.input}
        placeholder="Search word, Urdu or Sindhi..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.word}
        renderItem={({ item }) => (
          <WordCard
            {...item}
            onFavorite={() => toggleFavorite(item)}
            isFavorite={favorites.some(f => f.word === item.word)}
            onSpeak={() => Speech.speak(item.word)}
          />
        )}
        ListEmptyComponent={
          query.trim().length === 0
            ? <Text style={styles.empty}>Type to search for a word.</Text>
            : <Text style={styles.empty}>No results found.</Text>
        }
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
  },
  input: {
    margin: 20,
    marginBottom: 0,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    elevation: 2,
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 18,
  },
});
