import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Component() {
  const [building, setBuilding] = useState('');
  const [classroomNumber, setClassroomNumber] = useState('');
  const [isElectricOpen, setIsElectricOpen] = useState(false);
  const [isFurnitureOpen, setIsFurnitureOpen] = useState(false);
  const [isEquipmentOpen, setIsEquipmentOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [electricItems, setElectricItems] = useState([]);
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [equipmentItems, setEquipmentItems] = useState([]);

  useEffect(() => {
    loadBuildings();
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesitan permisos para acceder a la galería');
    }
  };

  const loadBuildings = async () => {
    try {
      const savedBuildings = await AsyncStorage.getItem('edificios');
      if (savedBuildings) {
        const parsedBuildings = JSON.parse(savedBuildings).map(edificio => ({
          key: edificio.id,
          value: `Edificio ${edificio.numeroEdificio}`
        }));
        setBuildings(parsedBuildings);
      }
    } catch (error) {
      console.error('Error al cargar edificios:', error);
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
      setImage(result.assets[0].uri);
    }
  };

  const addItem = (type) => {
    const newItem = { id: Date.now(), name: '', description: '' };
    switch(type) {
      case 'electric':
        setElectricItems([...electricItems, newItem]);
        break;
      case 'furniture':
        setFurnitureItems([...furnitureItems, newItem]);
        break;
      case 'equipment':
        setEquipmentItems([...equipmentItems, newItem]);
        break;
    }
  };

  const handleSave = () => {
    console.log('Saving...', { 
      building, 
      classroomNumber,
      image,
      electricItems,
      furnitureItems,
      equipmentItems 
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agregar cuarto especial</Text>
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

        <Text style={styles.label}>Edificio:</Text>
        <SelectList
          setSelected={setBuilding}
          data={buildings}
          placeholder="Seleccionar edificio"
          boxStyles={styles.select}
        />
      </View>

      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => setIsElectricOpen(!isElectricOpen)}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Servicio eléctrico</Text>
          </View>
        </TouchableOpacity>
        {isElectricOpen && (
          <View style={styles.sectionContent}>
            {electricItems.map((item, index) => (
              <TextInput
                key={item.id}
                style={styles.input}
                placeholder="Descripción del servicio eléctrico"
                value={item.description}
                onChangeText={(text) => {
                  const newItems = [...electricItems];
                  newItems[index].description = text;
                  setElectricItems(newItems);
                }}
              />
            ))}
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => addItem('electric')}
            >
              <Ionicons name="add-circle" size={40} color="#0066a1" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => setIsFurnitureOpen(!isFurnitureOpen)}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Mobiliario e inmobiliario</Text>
          </View>
        </TouchableOpacity>
        {isFurnitureOpen && (
          <View style={styles.sectionContent}>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => addItem('furniture')}
            >
              <Ionicons name="add-circle" size={40} color="#0066a1" />
            </TouchableOpacity>
            {furnitureItems.map((item, index) => (
              <TextInput
                key={item.id}
                style={styles.input}
                placeholder="Descripción del mobiliario"
                value={item.description}
                onChangeText={(text) => {
                  const newItems = [...furnitureItems];
                  newItems[index].description = text;
                  setFurnitureItems(newItems);
                }}
              />
            ))}
          </View>
        )}
      </View>

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
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => addItem('equipment')}
            >
              <Ionicons name="add-circle" size={40} color="#0066a1" />
            </TouchableOpacity>
            {equipmentItems.map((item, index) => (
              <TextInput
                key={item.id}
                style={styles.input}
                placeholder="Descripción del equipo"
                value={item.description}
                onChangeText={(text) => {
                  const newItems = [...equipmentItems];
                  newItems[index].description = text;
                  setEquipmentItems(newItems);
                }}
              />
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Guardar Cambios</Text>
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
    color: '#0066a1',
    marginTop: 10,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: '#BAC8D9',
    padding: 10,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  sectionContent: {
    marginTop: 10,
    padding: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  select: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: '#0066a1',
    padding: 15,
    borderRadius: 4,
    margin: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    width: '180',
    height: 180,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#BAC8D9',
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
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  imagePlaceholderText: {
    color: '#666',
    marginTop: 10,
  },
  addButton: {
    marginBottom: 10,
  },
});