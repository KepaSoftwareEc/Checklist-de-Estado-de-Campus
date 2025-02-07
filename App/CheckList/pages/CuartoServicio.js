import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function CuartoDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params; // ID del aula

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos del API
  const fetchAulaData = async () => {
    try {
      const response = await fetch(`https://checklistutpl.duckdns.org/api/cuarto-servicio/${id}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAulaData();
  }, []);

  // Si los datos están cargando
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </SafeAreaView>
    );
  }

  // Renderizar cada categoría con su respectivo botón e icono
  const renderCategory = (title, iconName, onPress) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Icon name={iconName} size={40} color="#0066CC" style={styles.cardIcon} />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Cuartos {data.buildingNumber}</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {renderCategory('Instalaciones eléctricas / redes', 'power-plug', () =>
          navigation.navigate('ChecklistScreen', {
            items: data.electricItems,
            title: 'Instalaciones eléctricas / redes',
            buildingData: data,
            areaType: 'electric',
            buildingType: 'cuartosServicio',
          })
        )}
        {renderCategory('Instalaciones de agua', 'water-pump', () =>
          navigation.navigate('ChecklistScreen', {
            items: data.waterItems,
            title: 'Instalaciones de agua',
            buildingData: data,
            areaType: 'water',
            buildingType: 'cuartosServicio',
          })
        )}
        {renderCategory('Mobiliario', 'chair-rolling', () =>
          navigation.navigate('ChecklistScreen', {
            items: data.furnitureItems,
            title: 'Mobiliario',
            buildingData: data,
            areaType: 'furniture',
            buildingType: 'cuartosServicio',
          })
        )}
        {renderCategory('Equipos', 'tools', () =>
          navigation.navigate('ChecklistScreen', {
            items: data.equipmentItems,
            title: 'Equipos',
            buildingData: data,
            areaType: 'equipment',
            buildingType: 'cuartosServicio',
          })
        )}
        {renderCategory('Infraestructura física', 'home', () =>
          navigation.navigate('ChecklistScreen', {
            items: data.infrastructureItems,
            title: 'Infraestructura física',
            buildingData: data,
            areaType: 'infrastructure',
            buildingType: 'cuartosServicio',
          })
        )}
        {renderCategory('Condiciones de seguridad', 'shield-check', () =>
          navigation.navigate('ChecklistScreen', {
            items: data.securityItems,
            title: 'Condiciones de seguridad',
            buildingData: data,
            areaType: 'security',
            buildingType: 'cuartosServicio',
          })
        )}
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0066CC',
  },
  scrollView: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  cardIcon: {
    marginRight: 16,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  backButton: {
    backgroundColor: '#0066CC',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
