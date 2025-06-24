import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Header from '../components/Header';
import WordCard from '../components/WordCard';
import QuoteCard from '../components/QuoteCard';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [word, setWord] = useState(null);
  const [quote, setQuote] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const scheme = useColorScheme();  

  useEffect(() => {
    loadData();
    loadFavorites();
    setIsDark(scheme === 'dark');
  }, [scheme]);

  const loadData = async () => {
    try {
      const words = require('../assets/data/words.json');
      const quotes = require('../assets/data/quotes.json');
      const today = new Date().getDate() % words.length;
      const qIndex = new Date().getDate() % quotes.length;
      setWord(words[today]);
      setQuote(quotes[qIndex]);
      setLoading(false);
    } catch (e) {
      Alert.alert('Error', 'Failed to load data.');
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const favs = await AsyncStorage.getItem('favorites');
      setFavorites(favs ? JSON.parse(favs) : []);
    } catch {}
  };

  const toggleFavorite = async () => {
    if (!word) return;
    let updated;
    if (favorites.some(f => f.word === word.word)) {
      updated = favorites.filter(f => f.word !== word.word);
    } else {
      updated = [...favorites, word];
    }
    setFavorites(updated);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  };

  const speakWord = () => {
    if (word) Speech.speak(word.word);
  };

  const handleThemeSwitch = () => {
    setIsDark(!isDark);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#6c63ff" />;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Header
        title="Wordly"
        onFavorites={toggleFavorite}
        onSearch={() => navigation.navigate('Search')}
        onCalendar={() => navigation.navigate('Calendar')}
        onThemeSwitch={handleThemeSwitch}
        isDark={isDark}
        showFavorite={true}
        isFavorite={favorites.some(f => f.word === word.word)}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <WordCard
          {...word}
          onFavorite={toggleFavorite}
          isFavorite={favorites.some(f => f.word === word.word)}
          onSpeak={speakWord}
          isDark={isDark}
        />
        <QuoteCard {...quote} isDark={isDark} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
  },
  containerDark: {
    backgroundColor: '#181a20',
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },
});
