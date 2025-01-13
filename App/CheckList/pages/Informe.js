import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, Animated } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function InspectionForm() {
  const route = useRoute();
  const navigation = useNavigation();
  // const { area, checkedItems } = route.params; // Comentado para eliminar la referencia a area
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [description, setDescription] = useState('');
  const [techDescription, setTechDescription] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // Crear objeto con la información del mantenimiento
    const maintenanceInfo = {
      date: new Date().toISOString().split('T')[0],
      building: 'Edificio 1', // Reemplaza con el valor adecuado
      room: 'Aula 101', // Reemplaza con el valor adecuado
      type: 'Mantenimiento',
      description: description,
      techDescription: techDescription,
      isNewMaintenance: true // Flag para identificar nuevo mantenimiento
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess(true);
    
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setLoading(false);
        setSuccess(false);
        navigation.navigate('HomeScreen', { maintenanceInfo });
      });
    }, 2000);
  };

  const openCamera = async () => {
    if (!hasPermission) {
      alert('Se necesitan permisos de cámara para continuar');
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      console.log(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      console.log(result.assets.map(asset => asset.uri));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nuevo informe</Text>
      <Text style={styles.subtitle}>Revisión semanal</Text>

      <View style={styles.titleBox}>
        <Text style={styles.sectionTitle}>Información general</Text>
      </View>

      {/* Aquí lógica de traer información */}
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Edificio:</Text>
          <TextInput 
            style={styles.input} 
            value="Edificio 1" // Reemplaza con el valor adecuado
            editable={false}
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Aula:</Text>
          <TextInput 
            style={styles.input} 
            value="Aula 101" // Reemplaza con el valor adecuado
            editable={false}
          />
        </View>
      </View>

      <Text style={styles.label}>Encargado:</Text>
      <TextInput 
        style={styles.input} 
        value="Encargado" // Reemplaza con el valor adecuado
        editable={false}
      />
      
      <Text style={styles.label}>Fecha:</Text>
      <TextInput 
        style={styles.input} 
        value={new Date().toISOString().split('T')[0]} 
        editable={false}
      />
      
      <View style={styles.titleBox}>
        <Text style={styles.sectionTitle}>Mobiliario e inmobiliario</Text>
      </View>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={4}
        placeholder="Describa el estado del mobiliario e inmobiliario..."
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={openCamera}>
          <Ionicons name="camera-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={openGallery}>
          <Ionicons name="images-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleBox}>
        <Text style={styles.sectionTitle}>Equipamiento tecnológico</Text>
      </View>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={4}
        placeholder="Describa el estado del equipamiento tecnológico..."
        value={techDescription}
        onChangeText={setTechDescription}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={openCamera}>
          <Ionicons name="camera-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={openGallery}>
          <Ionicons name="images-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      {loading && (
        <Animated.View 
          style={[
            styles.modalBackground,
            {
              opacity: fadeAnim
            }
          ]}
        >
          <View style={styles.modalContent}>
            {success ? (
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
              </View>
            ) : (
              <ActivityIndicator size="large" color="#ffffff" />
            )}
          </View>
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#333',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  titleBox: {
    backgroundColor: '#bac8d9',
    padding: 8,
    marginBottom: 16,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
    marginLeft: 16,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 16,
  },
  textArea: {
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    padding: 8,
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
    marginHorizontal: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginBottom: 16,
    marginLeft: 16,
  },
  iconButton: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  saveButton: {
    backgroundColor: '#024873',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: 80,
    marginBottom: 16,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.38)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successIcon: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    padding: 16,
  },
});