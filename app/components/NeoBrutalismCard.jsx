import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function NeoBrutalismCard({ children, style }) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white', // slightly transparent white
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'black',
    shadowColor: 'black',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
});

    