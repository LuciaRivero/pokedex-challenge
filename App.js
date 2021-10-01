import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainStack from './src/Navigation/MainStack'


export default function App() {
  return (
      <MainStack style={styles.container}/>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center'
  },
});
