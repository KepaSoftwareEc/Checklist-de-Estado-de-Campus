import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useReportContext } from './ReportContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function ReportView() {
  const { reportData, username } = useReportContext();
  const [reportDetails, setReportDetails] = useState(null); // Cambiado a null
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!reportData) return;
  
    const processReportData = () => {
      console.log("Report Data:", reportData);
  
      const details = {
        edificios: Object.entries(reportData.edificios || {}).map(([id, building]) => ({
          id: id,
          nombre: building.nombre || 'Edificio sin nombre',
          electricItems: building.electricItems || [],
          waterItems: building.waterItems || [],
          furnitureItems: building.furnitureItems || [],
          equipmentItems: building.equipmentItems || [],
          infrastructureItems: building.infrastructureItems || [],
          securityItems: building.securityItems || [],
        })),
        
        aulas: Object.entries(reportData.aulas || {}).map(([id, aula]) => ({
          id: id,
          nombre: aula.nombre || 'Aula sin nombre',
          electricItems: aula.electricItems || [],
          waterItems: aula.waterItems || [],
          furnitureItems: aula.furnitureItems || [],
          equipmentItems: aula.equipmentItems || [],
          infrastructureItems: aula.infrastructureItems || [],
          securityItems: aula.securityItems || [],
        })),
        
        cuartosServicio: Object.entries(reportData.cuartosServicio || {}).map(([id, room]) => ({
          id: id,
          nombre: room.nombre || 'Cuarto sin nombre',
          electricItems: room.electricItems || [],
          waterItems: room.waterItems || [],
          furnitureItems: room.furnitureItems || [],
          equipmentItems: room.equipmentItems || [],
          infrastructureItems: room.infrastructureItems || [],
          securityItems: room.securityItems || [],
        })),
        
        date: reportData.date || new Date().toISOString().split('T')[0],
        estado: reportData.estado || 'pendiente',
        encargado: username || 'No especificado',
      };
  
      console.log("Processed details:", details);
      setReportDetails(details);
    };
  
    processReportData();
  }, [reportData]);

  const handleSaveChanges = async () => {
    if (!reportDetails) {
      alert('No hay datos para guardar.');
      return;
    }
  
    console.log('Datos enviados a la API:', JSON.stringify(reportDetails, null, 2));
  
    try {
      const response = await axios.post('https://checklistutpl.duckdns.org/api/info/crear', reportDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Modificar esta parte para aceptar 201 como respuesta exitosa
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Error en la API: ${response.status}');
      }
  
      console.log('Respuesta de la API:', response.data);
      alert('Informe guardado exitosamente');
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error al guardar el informe:', error);
      let errorMessage = 'Hubo un error al guardar el informe.';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'No se recibió respuesta del servidor. Verifica tu conexión a internet.';
      } else {
        errorMessage = 'Error en la configuración de la solicitud.';
      }
      alert(errorMessage);
    }
  };

  if (!reportDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyState}>No hay informes disponibles</Text>
      </View>
    );
  }


  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Informe</Text>
        <Text style={styles.subtitle}>Fecha: {reportDetails.date}</Text>
  
        {/* Sección de Información General */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Información General</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Encargado: </Text>
            <Text style={styles.value}>{reportDetails.encargado}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.value}>{reportDetails.estado}</Text>
          </View>
        </View>
  
        {/* Sección de Edificios */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Edificios</Text>
          {reportDetails.edificios.map((building, buildingIndex) => (
            <View key={buildingIndex} style={styles.locationContainer}>
              <Text style={styles.locationTitle}>{building.nombre}</Text>
              {Object.entries(building).map(([key, value]) => {
                if (Array.isArray(value) && value.length > 0) {
                  return (
                    <View key={key}>
                      <Text style={styles.itemCategory}>{key}</Text>
                      {value.map((item, itemIndex) => (
                        <View key={itemIndex} style={styles.itemContainer}>
                          <Text style={styles.itemDescription}>{item.description}</Text>
                          <Text style={styles.itemDescription}>Cantidad: {item.quantity}</Text>
                        </View>
                      ))}
                    </View>
                  );
                }
                return null;
              })}
            </View>
          ))}
        </View>
  
        {/* Sección de Aulas */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Aulas</Text>
          {reportDetails.aulas.map((aula, aulaIndex) => (
            <View key={aulaIndex} style={styles.locationContainer}>
              <Text style={styles.locationTitle}>{aula.nombre}</Text>
              {Object.entries(aula).map(([key, value]) => {
                if (Array.isArray(value) && value.length > 0) {
                  return (
                    <View key={key}>
                      <Text style={styles.itemCategory}>{key}</Text>
                      {value.map((item, itemIndex) => (
                        <View key={itemIndex} style={styles.itemContainer}>
                          <Text style={styles.itemDescription}>{item.description}</Text>
                          <Text style={styles.itemDescription}>Cantidad: {item.quantity}</Text>
                        </View>
                      ))}
                    </View>
                  );
                }
                return null;
              })}
            </View>
          ))}
        </View>
  
        {/* Sección de Cuartos de Servicio */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cuartos de Servicio</Text>
          {reportDetails.cuartosServicio.map((room, roomIndex) => (
            <View key={roomIndex} style={styles.locationContainer}>
              <Text style={styles.locationTitle}>{room.nombre}</Text>
              {Object.entries(room).map(([key, value]) => {
                if (Array.isArray(value) && value.length > 0) {
                  return (
                    <View key={key}>
                      <Text style={styles.itemCategory}>{key}</Text>
                      {value.map((item, itemIndex) => (
                        <View key={itemIndex} style={styles.itemContainer}>
                          <Text style={styles.itemDescription}>{item.description}</Text>
                          <Text style={styles.itemDescription}>Cantidad: {item.quantity}</Text>
                        </View>
                      ))}
                    </View>
                  );
                }
                return null;
              })}
            </View>
          ))}
        </View>
      </View>
  
      {/* Botón para guardar cambios */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges} disabled={isLoading}>
        <Text style={styles.saveButtonText}>
          {isLoading ? 'Guardando...' : 'Guardar cambios'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#007AFF',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
    color: '#333',
    width: 100,
  },
  value: {
    flex: 1,
    color: '#666',
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  itemCategory: {
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  itemDescription: {
    color: '#333',
  },
  locationContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});