import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import logo from './assets/logo.png';


export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={{width: 305, height: 159}} />
      <Text style={{color: '#888', fontSize: 18}}>Para compartilhar uma foto do seu telefone com um amigo, basta pressionar o botão abaixo!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
