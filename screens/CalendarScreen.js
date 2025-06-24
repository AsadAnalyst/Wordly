import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import WordCard from '../components/WordCard';
import QuoteCard from '../components/QuoteCard';

const words = require('../assets/data/words.json');
const quotes = require('../assets/data/quotes.json');

function getDayIndex(date) {
  return date.getDate() % words.length;
}

function getQuoteIndex(date) {
  return date.getDate() % quotes.length;
}

function getPastDays(numDays) {
  const days = [];
  for (let i = 0; i < numDays; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(new Date(d));
  }
  return days;
}

export default function CalendarScreen({ navigation }) {
  const [days] = useState(getPastDays(30));

  return (
    <View style={styles.container}>
      <Header
        title="Calendar"
        onFavorites={() => navigation.navigate('Favorites')}
        onSearch={() => navigation.navigate('Search')}
        onCalendar={() => {}}
        onThemeSwitch={() => {}}
      />
      <FlatList
        data={days}
        keyExtractor={item => item.toISOString()}
        renderItem={({ item }) => {
          const w = words[getDayIndex(item)];
          const q = quotes[getQuoteIndex(item)];
          return (
            <View style={styles.dayCard}>
              <Text style={styles.date}>{item.toDateString()}</Text>
              <WordCard {...w} onFavorite={() => {}} isFavorite={false} onSpeak={() => {}} />
              <QuoteCard {...q} />
            </View>
          );
        }}
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
  dayCard: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    elevation: 2,
  },
  date: {
    fontWeight: 'bold',
    color: '#6c63ff',
    marginBottom: 6,
    fontSize: 16,
    textAlign: 'center',
  },
});
