import React from 'react';
import Pokemon from '../features/pokemon/index';
import { StyleSheet, View, Text } from 'react-native';

export default function MainApp() {
  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>Gen 1 Pokedex</Text>
      <Pokemon />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30
  },
});