import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import Header from '../components/Header';
import WordCard from '../components/WordCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favs = await AsyncStorage.getItem('favorites');
        setFavorites(favs ? JSON.parse(favs) : []);
      } catch {
        Alert.alert('Error', 'Failed to load favorites.');
      }
    };
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const removeFavorite = async (word) => {
    const updated = favorites.filter(f => f.word !== word);
    setFavorites(updated);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  };

  const speakWord = (word) => {
    Speech.speak(word);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Favorites"
        onFavorites={() => {}}
        onSearch={() => navigation.navigate('Search')}
        onCalendar={() => navigation.navigate('Calendar')}
        onThemeSwitch={() => {}}
      />
      <FlatList
        data={favorites}
        keyExtractor={item => item.word}
        renderItem={({ item }) => (
          <WordCard
            {...item}
            onFavorite={() => removeFavorite(item.word)}
            isFavorite={true}
            onSpeak={() => speakWord(item.word)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No favorites yet.</Text>}
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
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 18,
  },
});
