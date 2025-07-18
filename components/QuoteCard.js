gyobimport React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuoteCard({ quote, author, isDark }) {
  return (
    <View style={[styles.card, isDark && styles.cardDark]}>
      <Ionicons name="chatbubble-ellipses" size={28} color={isDark ? '#ffd700' : '#6c63ff'} style={{ marginBottom: 8 }} />
      <Text style={[styles.quote, isDark && styles.quoteDark]}>
        "{quote}"
      </Text>
      <Text style={[styles.author, isDark && styles.authorDark]}>- {author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eaf0fb',
    borderRadius: 18,
    padding: 18,
    marginVertical: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardDark: {
    backgroundColor: '#23242a',
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
  },
  quoteDark: {
    color: '#fff',
  },
  author: {
    fontSize: 15,
    color: '#6c63ff',
    fontWeight: 'bold',
  },
  authorDark: {
    color: '#ffd700',
  },
});
