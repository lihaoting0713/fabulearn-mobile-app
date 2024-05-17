// Card.js
import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const Card = ({ title, count, imageSource }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={imageSource} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardCount}>{count}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardImage: {
    width: 64,
    height: 64,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
  },
  cardCount: {
    fontSize: 14,
    color: '#666',
  }
});

export default Card;
