import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AulaDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params; // ID del aula

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos del API
  const fetchAulaData = async () => {
    try {
      const response = await fetch(`https://checklistutpl.duckdns.org/api/aulas/${id}`);
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
      <Icon name={iconName} size={30} color="#024873" style={styles.cardIcon} />
      <Text style={styles.cardText}>{title}</Text>
      <Icon name="chevron-forward" size={24} color="#0066a1" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Aula {data.buildingNumber}</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {renderCategory('Instalaciones eléctricas / redes', 'flash-outline', () =>
          navigation.navigate('ChecklistScreen', { 
            items: data.electricItems,
            title: 'Instalaciones eléctricas / redes',
            buildingData: data,  // Pasa todo el objeto de edificio o aula
            areaType: 'electric',
            buildingType: 'aulas'
          })
        )}
        {renderCategory('Instalaciones de agua', 'water-outline', () =>
          navigation.navigate('ChecklistScreen', { 
            items: data.waterItems,
            title: 'Instalaciones de agua',
            buildingData: data,  // Pasa todo el objeto de edificio o aula
            areaType: 'water',
            buildingType: 'aulas'
          })
        )}
        {renderCategory('Mobiliario', 'bed-outline', () =>
          navigation.navigate('ChecklistScreen', { 
            items: data.furnitureItems,
            title: 'Mobiliario',
            buildingData: data,  // Pasa todo el objeto de edificio o aula
            areaType: 'furniture',
            buildingType: 'aulas'
          })
        )}
        {renderCategory('Equipos', 'desktop-outline', () =>
          navigation.navigate('ChecklistScreen', { 
            items: data.equipmentItems,
            title: 'Equipos',
            buildingData: data,  // Pasa todo el objeto de edificio o aula
            areaType: 'equipment',
            buildingType: 'aulas'
          })
        )}
        {renderCategory('Infraestructura física', 'business-outline', () =>
          navigation.navigate('ChecklistScreen', { 
            items: data.infrastructureItems,
            title: 'Infraestructura física',
            buildingData: data,  // Pasa todo el objeto de edificio o aula
            areaType: 'infrastructure',
            buildingType: 'aulas'
          })
        )}
        {renderCategory('Condiciones de seguridad', 'shield-checkmark-outline', () =>
          navigation.navigate('ChecklistScreen', { 
            items: data.securityItems,
            title: 'Condiciones de seguridad',
            buildingData: data,  // Pasa todo el objeto de edificio o aula
            areaType: 'security',
            buildingType: 'aulas'
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
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#024873',
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
