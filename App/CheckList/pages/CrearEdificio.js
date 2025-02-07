import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from './firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from "firebase/app";


export default function CrearEdificio() {
  const [buildingName, setBuildingName] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [image, setImage] = useState(null);
  const [electricItems, setElectricItems] = useState([]);
  const [waterItems, setWaterItems] = useState([]);
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [infrastructureItems, setInfrastructureItems] = useState([]);
  const [securityItems, setSecurityItems] = useState([]);

  const [isElectricOpen, setIsElectricOpen] = useState(false);
  const [isEquipmentOpen, setIsEquipmentOpen] = useState(false);
  const [isInfrastructureOpen, setIsInfrastructureOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isWaterOpen, setIsWaterOpen] = useState(false);
  const [isFurnitureOpen, setIsFurnitureOpen] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesitan permisos para acceder a la galería');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Convertir la URI a Blob
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      // Inicializar storage y crear referencia
      const storage = getStorage(app);
      const fileName = `images/${Date.now()}.jpg`;
      const storageRef = ref(storage, fileName);

      // Subir imagen
      const snapshot = await uploadBytes(storageRef, blob);

      // Obtener URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Guardar URL en estado
      setImage(downloadURL);
      await sendImageToAPI(downloadURL);

      console.log('URL de la imagen:', downloadURL);
      return downloadURL; // Por si necesitas usar la URL en otro lugar
    }

};


//esto tambien es nuevo
const sendImageToAPI = async (imageUrl) => {
  try {
    const response = await fetch('https://checklistutpl.duckdns.org/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error al enviar la imagen a la API:', error);
  }
};
const sendBuildingToAPI = async () => {
    const newBuilding = {
      id: `building-${Date.now()}`, // Unique identifier for each building
      buildingName,
      buildingNumber,
      image,
      electricItems: electricItems.map(item => ({ ...item, id: `electric-${Date.now()}` })),
      waterItems: waterItems.map(item => ({ ...item, id: `water-${Date.now()}` })),
      furnitureItems: furnitureItems.map(item => ({ ...item, id: `furniture-${Date.now()}` })),
      equipmentItems: equipmentItems.map(item => ({ ...item, id: `equipment-${Date.now()}` })),
      infrastructureItems: infrastructureItems.map(item => ({ ...item, id: `infrastructure-${Date.now()}` })),
      securityItems: securityItems.map(item => ({ ...item, id: `security-${Date.now()}` })),
    };

    try {
      const response = await fetch('https://checklistutpl.duckdns.org/api/edificio/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBuilding),
      });
      const data = await response.json();
      console.log(data);
      // Navegar a la página principal después de crear el edificio
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error al enviar el edificio a la API:', error);
    }
  };

  const addItem = (type) => {
    const newItem = { id: Date.now(), description: '', quantity: '' };
    switch (type) {
      case 'electric':
        setElectricItems([...electricItems, newItem]);
        break;
      case 'water':
        setWaterItems([...waterItems, newItem]);
        break;
      case 'furniture':
        setFurnitureItems([...furnitureItems, newItem]);
        break;
      case 'equipment':
        setEquipmentItems([...equipmentItems, newItem]);
        break;
      case 'infrastructure':
        setInfrastructureItems([...infrastructureItems, newItem]);
        break;
      case 'security':
        setSecurityItems([...securityItems, newItem]);
        break;
    }
  };

  
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agregar Edificio</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Información general</Text>
        </View>

        <TouchableOpacity style={[styles.imageContainer, { alignSelf: 'center' }]} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={[styles.imagePlaceholder, { alignItems: 'center' }]}>
              <Ionicons name="camera-outline" size={40} color="#666" />
              <Text style={styles.imagePlaceholderText}>Agregar imagen</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Nombre del edificio y Número del edificio en la misma fila */}
  <View style={styles.inputRow}>
    <View style={styles.halfWidth}>
      <Text style={styles.label}>Nombre del edificio:</Text>
      <TextInput
        style={styles.input}
        value={buildingName}
        onChangeText={setBuildingName}
        placeholder="Ingrese nombre del edificio"
      />
    </View>
    <View style={styles.halfWidth}>
      <Text style={styles.label}>Número del edificio:</Text>
      <TextInput
        style={styles.input}
        value={buildingNumber}
        onChangeText={setBuildingNumber}
        placeholder="Ingrese número del edificio"
      />
    </View>
  </View>
      </View>

      {/* Instalaciones eléctricas */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsElectricOpen(!isElectricOpen)}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Instalaciones eléctricas</Text>
          </View>
        </TouchableOpacity>
        {isElectricOpen && (
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.addButton} onPress={() => addItem('electric')}>
              <Ionicons name="add-circle" size={40} color="#0066a1" />
            </TouchableOpacity>
            {electricItems.map((item, index) => (
              <View key={item.id} style={styles.inputRowAligned}>
                <TextInput
                  style={[styles.input, { flex: 2, marginRight: 8 }]}
                  placeholder="Descripción de la instalación eléctrica"
                  value={item.description}
                  onChangeText={(text) => {
                    const newItems = [...electricItems];
                    newItems[index].description = text;
                    setElectricItems(newItems);
                  }}
                />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Cantidad"
                  keyboardType="numeric"
                  value={item.quantity}
                  onChangeText={(text) => {
                    const newItems = [...electricItems];
                    newItems[index].quantity = text;
                    setElectricItems(newItems);
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Instalaciones de agua */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsWaterOpen(!isWaterOpen)}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Instalaciones de agua</Text>
          </View>
        </TouchableOpacity>
        {isWaterOpen && (
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.addButton} onPress={() => addItem('water')}>
              <Ionicons name="add-circle" size={40} color="#0066a1" />
            </TouchableOpacity>
            {waterItems.map((item, index) => (
              <View key={item.id} style={styles.inputRowAligned}>
                <TextInput
                  style={[styles.input, { flex: 2, marginRight: 8 }]}
                  placeholder="Descripción de la instalación de agua"
                  value={item.description}
                  onChangeText={(text) => {
                    const newItems = [...waterItems];
                    newItems[index].description = text;
                    setWaterItems(newItems);
                  }}
                />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Cantidad"
                  keyboardType="numeric"
                  value={item.quantity}
                  onChangeText={(text) => {
                    const newItems = [...waterItems];
                    newItems[index].quantity = text;
                    setWaterItems(newItems);
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Mobiliario */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsFurnitureOpen(!isFurnitureOpen)}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Mobiliario</Text>
          </View>
        </TouchableOpacity>
        {isFurnitureOpen && (
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.addButton} onPress={() => addItem('furniture')}>
              <Ionicons name="add-circle" size={40} color="#0066a1" />
            </TouchableOpacity>
            {furnitureItems.map((item, index) => (
              <View key={item.id} style={styles.inputRowAligned}>
                <TextInput
                  style={[styles.input, { flex: 2, marginRight: 8 }]}
                  placeholder="Descripción del mobiliario"
                  value={item.description}
                  onChangeText={(text) => {
                    const newItems = [...furnitureItems];
                    newItems[index].description = text;
                    setFurnitureItems(newItems);
                  }}
                />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Cantidad"
                  keyboardType="numeric"
                  value={item.quantity}
                  onChangeText={(text) => {
                    const newItems = [...furnitureItems];
                    newItems[index].quantity = text;
                    setFurnitureItems(newItems);
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Equipos */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsEquipmentOpen(!isEquipmentOpen)}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Equipos</Text>
          </View>
        </TouchableOpacity>
        {isEquipmentOpen && (
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.addButton} onPress={() => addItem('equipment')}>
              <Ionicons name="add-circle" size={40} color="#0066a1" />
            </TouchableOpacity>
            {equipmentItems.map((item, index) => (
              <View key={item.id} style={styles.inputRowAligned}>
                <TextInput
                  style={[styles.input, { flex: 2, marginRight: 8 }]}
                  placeholder="Descripción del equipo"
                  value={item.description}
                  onChangeText={(text) => {
                    const newItems = [...equipmentItems];
                    newItems[index].description = text;
                    setEquipmentItems(newItems);
                  }}
                />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Cantidad"
                  keyboardType="numeric"
                  value={item.quantity}
                  onChangeText={(text) => {
                    const newItems = [...equipmentItems];
                    newItems[index].quantity = text;
                    setEquipmentItems(newItems);
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Infraestructura */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsInfrastructureOpen(!isInfrastructureOpen)}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Infraestructura</Text>
          </View>
        </TouchableOpacity>
        {isInfrastructureOpen && (
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.addButton} onPress={() => addItem('infrastructure')}>
              <Ionicons name="add-circle" size={40} color="#0066a1" />
            </TouchableOpacity>
            {infrastructureItems.map((item, index) => (
              <View key={item.id} style={styles.inputRowAligned}>
                <TextInput
                  style={[styles.input, { flex: 2, marginRight: 8 }]}
                  placeholder="Descripción de infraestructura"
                  value={item.description}
                  onChangeText={(text) => {
                    const newItems = [...infrastructureItems];
                    newItems[index].description = text;
                    setInfrastructureItems(newItems);
                  }}
                />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Cantidad"
                  keyboardType="numeric"
                  value={item.quantity}
                  onChangeText={(text) => {
                    const newItems = [...infrastructureItems];
                    newItems[index].quantity = text;
                    setInfrastructureItems(newItems);
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Seguridad */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsSecurityOpen(!isSecurityOpen)}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Seguridad</Text>
          </View>
        </TouchableOpacity>
        {isSecurityOpen && (
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.addButton} onPress={() => addItem('security')}>
              <Ionicons name="add-circle" size={40} color="#0066a1" />
            </TouchableOpacity>
            {securityItems.map((item, index) => (
              <View key={item.id} style={styles.inputRowAligned}>
                <TextInput
                  style={[styles.input, { flex: 2, marginRight: 8 }]}
                  placeholder="Descripción de seguridad"
                  value={item.description}
                  onChangeText={(text) => {
                    const newItems = [...securityItems];
                    newItems[index].description = text;
                    setSecurityItems(newItems);
                  }}
                />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Cantidad"
                  keyboardType="numeric"
                  value={item.quantity}
                  onChangeText={(text) => {
                    const newItems = [...securityItems];
                    newItems[index].quantity = text;
                    setSecurityItems(newItems);
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={sendBuildingToAPI}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004270', // Color azul específico para el título
    marginTop: 10,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10, // Bordes redondeados
    shadowColor: '#000', // Sombra para efecto de elevación
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#004270', // Color azul específico para los círculos
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18, // Tamaño de fuente más grande
    fontWeight: '600',
    color: '#004270', // Color azul específico para el título de la sección
  },
  sectionContent: {
    marginTop: 10,
    padding: 15,
  },
  label: {
    fontSize: 16, // Tamaño de fuente más grande
    color: '#333333', // Texto más oscuro
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc', // Borde más suave
    borderRadius: 8, // Bordes más redondeados
    padding: 12, // Más padding para mejor legibilidad
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal: 15,
    flex: 1,
    backgroundColor: '#f9f9f9', // Fondo más claro para los inputs
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputRowAligned: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  halfWidth: {
    flex: 1,
    marginRight: 10, // Espacio entre los campos
  },
  button: {
    backgroundColor: '#004270', // Color azul específico para los botones
    padding: 15,
    borderRadius: 8, // Bordes más redondeados
    margin: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    width: 180,
    height: 180,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10, // Bordes más redondeados
    overflow: 'hidden',
    backgroundColor: '#caf0f8', // Fondo más claro para el contenedor de la imagen
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#90e0ef', // Borde más claro
    borderStyle: 'dashed',
    borderRadius: 10, // Bordes más redondeados
  },
  imagePlaceholderText: {
    color: '#666666',
    marginTop: 10,
  },
  addButtonLeft: {
    alignItems: 'start',
    marginTop: 8,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#004270', // Color azul específico para el botón de guardar
    padding: 15,
    borderRadius: 8, // Bordes más redondeados
    margin: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18, // Tamaño de fuente más grande
    fontWeight: '600',
  },
});