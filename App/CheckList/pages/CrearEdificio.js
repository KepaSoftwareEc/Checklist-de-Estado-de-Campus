import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CrearEdificio() {
  const [buildingNumber, setBuildingNumber] = useState('');
  const [isElectricOpen, setIsElectricOpen] = useState(false);
  const [isWaterOpen, setIsWaterOpen] = useState(false);
  const [isFurnitureOpen, setIsFurnitureOpen] = useState(false);
  const [isEquipmentOpen, setIsEquipmentOpen] = useState(false);
  const [isInfrastructureOpen, setIsInfrastructureOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [electricItems, setElectricItems] = useState([]);
  const [waterItems, setWaterItems] = useState([]);
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [infrastructureItems, setInfrastructureItems] = useState([]);
  const [securityItems, setSecurityItems] = useState([]);
  const [image, setImage] = useState(null);
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
    let result = await ImagePicker.launchImageLibraryAsync({
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
    const newItem = { id: Date.now(), description: '' };
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
      default:
        break;
    }
  };

  const handleSave = async () => {
    try {
      const newBuilding = {
        id: Date.now().toString(),
        numeroEdificio: buildingNumber,
        imagen: image,
        serviciosElectricos: electricItems,
        instalacionesAgua: waterItems,
        mobiliario: furnitureItems,
        equipos: equipmentItems,
        infraestructuraFisica: infrastructureItems,
        condicionesSeguridad: securityItems,
      };

      const savedBuildings = await AsyncStorage.getItem('edificios');
      const buildings = savedBuildings ? JSON.parse(savedBuildings) : [];
      buildings.push(newBuilding);

      await AsyncStorage.setItem('edificios', JSON.stringify(buildings));
      console.log('Edificio guardado:', newBuilding);
      navigation.navigate('ListaEdificio');
    } catch (error) {
      console.error('Error al guardar edificio:', error);
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

        <Text style={styles.label}>Número de Edificio:</Text>
        <TextInput
          style={styles.input}
          value={buildingNumber}
          onChangeText={setBuildingNumber}
          placeholder="Ingrese número de edificio"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => setIsElectricOpen(!isElectricOpen)}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Instalaciones eléctricas / redes</Text>
          </View>
        </TouchableOpacity>
        {isElectricOpen && (
          <View style={styles.sectionContent}>
            <View style={styles.inputRow}>
              <TouchableOpacity 
                style={styles.addButtonLeft}
                onPress={() => addItem('electric')}
              >
                <Ionicons name="add-circle" size={40} color="#0066a1" />
              </TouchableOpacity>
              {electricItems.length > 0 && (
                <TextInput
                  style={styles.input}
                  placeholder="Descripción del servicio eléctrico / redes"
                  value={electricItems[0].description}
                  onChangeText={(text) => {
                    const newItems = [...electricItems];
                    newItems[0].description = text;
                    setElectricItems(newItems);
                  }}
                />
              )}
            </View>
            {electricItems.slice(1).map((item, index) => (
              <View key={item.id} style={styles.inputRowAligned}>
                <TextInput
                  style={styles.input}
                  placeholder="Descripción del servicio eléctrico / redes"
                  value={item.description}
                  onChangeText={(text) => {
                    const newItems = [...electricItems];
                    newItems[index + 1].description = text;
                    setElectricItems(newItems);
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

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
            <View style={styles.inputRow}>
              <TouchableOpacity 
                style={styles.addButtonLeft}
                onPress={() => addItem('water')}
              >
                <Ionicons name="add-circle" size={40} color="#0066a1" />
              </TouchableOpacity>
              {waterItems.length > 0 && (
                <TextInput
                  style={styles.input}
                  placeholder="Descripción de instalaciones de agua"
                  value={waterItems[0].description}
                  onChangeText={(text) => {
                    const newItems = [...waterItems];
                    newItems[0].description = text;
                    setWaterItems(newItems);
                  }}
                />
              )}
            </View>
            {waterItems.slice(1).map((item, index) => (
              <View key={item.id} style={styles.inputRowAligned}>
                <TextInput
                  style={styles.input}
                  placeholder="Descripción de instalaciones de agua"
                  value={item.description}
                  onChangeText={(text) => {
                    const newItems = [...waterItems];
                    newItems[index + 1].description = text;
                    setWaterItems(newItems);
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

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
            <View style={styles.inputRow}>
              <TouchableOpacity 
                style={styles.addButtonLeft}
                onPress={() => addItem('furniture')}
              >
                <Ionicons name="add-circle" size={40} color="#0066a1" />
              </TouchableOpacity>
              {furnitureItems.length > 0 && (
                <TextInput
                  style={styles.input}
                  placeholder="Descripción del mobiliario"
                  value={furnitureItems[0].description}
                  onChangeText={(text) => {
                    const newItems = [...furnitureItems];
                    newItems[0].description = text;
                    setFurnitureItems(newItems);
                  }}
                />
              )}
            </View>
            {furnitureItems.slice(1).map((item, index) => (
              <View key={item.id} style={styles.inputRowAligned}>
                <TextInput
                  style={styles.input}
                  placeholder="Descripción del mobiliario"
                  value={item.description}
                  onChangeText={(text) => {
                    const newItems = [...furnitureItems];
                    newItems[index + 1].description = text;
                    setFurnitureItems(newItems);
                  }}
                />
              </View>
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
            <View style={styles.inputRow}>
              <TouchableOpacity 
                style={styles.addButtonLeft}
                onPress={() => addItem('equipment')}
              >
                <Ionicons name="add-circle" size={40} color="#0066a1" />
              </TouchableOpacity>
              {equipmentItems.length > 0 && (
                <TextInput
                  style={styles.input}
                  placeholder="Descripción de los equipos"
                  value={equipmentItems[0].description}
                  onChangeText={(text) => {
                    const newItems = [...equipmentItems];
                    newItems[0].description = text;
                    setEquipmentItems(newItems);
                  }}
                />
              )}
            </View>
            {equipmentItems.slice(1).map((item, index) => (
              <View key={item.id} style={styles.inputRowAligned}>
                <TextInput
                  style={styles.input}
                  placeholder="Descripción de los equipos"
                  value={item.description}
                  onChangeText={(text) => {
                    const newItems = [...equipmentItems];
                    newItems[index + 1].description = text;
                    setEquipmentItems(newItems);
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => setIsInfrastructureOpen(!isInfrastructureOpen)}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Infraestructura Física</Text>
          </View>
        </TouchableOpacity>
        {isInfrastructureOpen && (
          <View style={styles.sectionContent}>
            <View style={styles.inputRow}>
              <TouchableOpacity 
                style={styles.addButtonLeft}
                onPress={() => addItem('infrastructure')}
              >
                <Ionicons name="add-circle" size={40} color="#0066a1" />
              </TouchableOpacity>
              {infrastructureItems.length > 0 && (
                <TextInput
                  style={styles.input}
                  placeholder="Descripción de la infraestructura física"
                  value={infrastructureItems[0].description}
                  onChangeText={(text) => {
                    const newItems = [...infrastructureItems];
                    newItems[0].description = text;
                    setInfrastructureItems(newItems);
                  }}
                />
              )}
            </View>
            {infrastructureItems.slice(1).map((item, index) => (
              <View key={item.id} style={styles.inputRowAligned}>
                <TextInput
                  style={styles.input}
                  placeholder="Descripción de la infraestructura física"
                  value={item.description}
                  onChangeText={(text) => {
                    const newItems = [...infrastructureItems];
                    newItems[index + 1].description = text;
                    setInfrastructureItems(newItems);
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => setIsSecurityOpen(!isSecurityOpen)}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Condiciones de Seguridad</Text>
          </View>
        </TouchableOpacity>
        {isSecurityOpen && (
          <View style={styles.sectionContent}>
            <View style={styles.inputRow}>
              <TouchableOpacity 
                style={styles.addButtonLeft}
                onPress={() => addItem('security')}
              >
                <Ionicons name="add-circle" size={40} color="#0066a1" />
              </TouchableOpacity>
              {securityItems.length > 0 && (
                <TextInput
                  style={styles.input}
                  placeholder="Descripción de las condiciones de seguridad"
                  value={securityItems[0].description}
                  onChangeText={(text) => {
                    const newItems = [...securityItems];
                    newItems[0].description = text;
                    setSecurityItems(newItems);
                  }}
                />
              )}
            </View>
            {securityItems.slice(1).map((item, index) => (
              <View key={item.id} style={styles.inputRowAligned}>
                <TextInput
                  style={styles.input}
                  placeholder="Descripción de las condiciones de seguridad"
                  value={item.description}
                  onChangeText={(text) => {
                    const newItems = [...securityItems];
                    newItems[index + 1].description = text;
                    setSecurityItems(newItems);
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Guardar Edificio</Text>
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
    flex: 1,
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
    marginLeft: 50, // Align with the first input
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
    width: 180,
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
  addButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  addButtonLeft: {
    alignItems: 'center',
    marginTop: 8,
    marginRight: 10,
  },
});

