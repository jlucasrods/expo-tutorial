import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing'; 
import AnonymousFiles from 'anonymous-files'; 
import logo from './assets/logo.png';


export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if(permission.granted === false) {
      alert("É necessário conceder acesso ao rolo da câmera!")
      return;
    }

    const picker = await ImagePicker.launchImageLibraryAsync();
    
    if(picker.cancelled === true) {
      return;
    }

    if (Platform.OS === 'web') {
      const remoteUri = await AnonymousFiles(picker.uri);
      setSelectedImage({ localUri: picker.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: picker.uri, remoteUri: null });
    } 
  }

  const openShareDialog = async () => { 
    if (!(await Sharing.isAvailableAsync())) {
      alert(`A imagem está disponível em: ${selectedImage.remoteUri}`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  }

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialog} style={styles.button}>
          <Text style={styles.buttonText}>Compartilhar essa foto</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.instructions}>Para compartilhar uma foto do seu telefone com um amigo, basta pressionar o botão abaixo!</Text>
      <StatusBar style="auto" />
      <TouchableOpacity
        onPress={openImagePicker}
        style={styles.button}>
        <Text style={styles.buttonText}>escolha uma foto</Text>
      </TouchableOpacity>
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
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  }, 
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },  
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
