import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Alert 
} from 'react-native';
import { 
  Ionicons,
  MaterialIcons,
  FontAwesome 
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Component() {
  const navigation = useNavigation();
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    loadBuildings();
  }, []);

  const loadBuildings = async () => {
    try {
      const savedBuildings = await AsyncStorage.getItem('edificios');
      if (savedBuildings) {
        setBuildings(JSON.parse(savedBuildings));
      }
    } catch (error) {
      console.error('Error al cargar edificios:', error);
    }
  };

  const handleBuildingPress = (building) => {
    navigation.navigate('DentroEdif', { edificio: building });
  };

  const handleBuildingLongPress = (building) => {
    Alert.alert(
      'Opciones de Edificio',
      `¿Qué deseas hacer con el edificio ${building.numeroEdificio}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Borrar',
          onPress: () => handleDeleteBuilding(building.id),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteBuilding = async (id) => {
    try {
      const updatedBuildings = buildings.filter((building) => building.id !== id);
      setBuildings(updatedBuildings);
      await AsyncStorage.setItem('edificios', JSON.stringify(updatedBuildings));
    } catch (error) {
      console.error('Error al borrar edificio:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de edificios</Text>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar edificio..."
          placeholderTextColor="#666"
        />
      </View>

      {/* Building List */}
      <ScrollView style={styles.buildingList}>
        {buildings.map((building) => (
          <TouchableOpacity 
            key={building.id} 
            style={styles.buildingCard}
            onPress={() => handleBuildingPress(building)}
            onLongPress={() => handleBuildingLongPress(building)}
          >
            <Image
              source={building.imagen ? { uri: building.imagen } : require('../assets/UTPL.png')}
              style={styles.buildingImage}
            />
            <View style={styles.buildingInfo}>
              <Text style={styles.buildingName}>Edificio {building.numeroEdificio}</Text>
              <View style={styles.buildingDetails}>
                <Text style={styles.detailText}>Número aulas: {building.numeroAulas || 'N/A'}</Text>
                <Text style={styles.detailText}>Cuartos especiales: {building.cuartosEspeciales || 'N/A'}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#0066a1" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('CrearEdificio')}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="home" size={24} color="#0066a1" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="file-text-o" size={24} color="#666" />
          <Text style={styles.navText}>Informes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="bell-o" size={24} color="#666" />
          <Text style={styles.navText}>Notificaciones</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066a1',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  buildingList: {
    flex: 1,
  },
  buildingCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buildingImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  buildingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  buildingName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066a1',
    marginBottom: 4,
  },
  buildingDetails: {
    gap: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    backgroundColor: '#0066a1',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
});