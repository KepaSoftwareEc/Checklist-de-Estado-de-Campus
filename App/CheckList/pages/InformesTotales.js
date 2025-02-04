import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function InformesTotales() {
  const [informes, setInformes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchInformes = async () => {
      try {
        const response = await axios.get('https://checklistutpl.duckdns.org/api/info/obtenerInformes');
        console.log('Respuesta de la API:', response.data);
        
        if (response.data && Array.isArray(response.data)) {
          const allInformes = response.data.flatMap(informeData => {
            if (informeData.edificios) {
              const edificiosArray = Array.isArray(informeData.edificios) 
                ? informeData.edificios 
                : Object.values(informeData.edificios);
  
              return edificiosArray.map((edificio) => ({
                tipo: 'Edificio',
                fecha: informeData.date,
                nombreEdificio: edificio.nombre,
                estado: informeData.estado,
                encargado: informeData.encargado,
                idEdificio: edificio.id,
                electricItems: edificio.electricItems || [],
                waterItems: edificio.waterItems || [],
                furnitureItems: edificio.furnitureItems || [],
                equipmentItems: edificio.equipmentItems || [],
                infrastructureItems: edificio.infrastructureItems || [],
                securityItems: edificio.securityItems || [],
                aulas: informeData.aulas || [],
                cuartosServicio: informeData.cuartosServicio || []
              }));
            }
            return [];
          });
  
          console.log('Informes procesados:', allInformes);
          setInformes(allInformes);
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    
    fetchInformes();
  }, []); 
  

  const filteredInformes = informes.filter((informe) =>
    (informe.tipo && informe.tipo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openModal = (building) => {
    setSelectedBuilding(building);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBuilding(null);
  };

  // Función para generar PDF con expo-print
  const generatePDF = async (building) => {
    const renderItems = (items) => {
      if (!items || items.length === 0) return '<li>No hay items registrados</li>';
      return items.map((item, index) => `
        <li>
          <strong>Item ${index + 1}:</strong> 
          ${item.description || item.descripcion || 'Sin descripción'} 
          - Cantidad: ${item.quantity || item.cantidad || 'N/A'}
        </li>
      `).join('');
    };
  
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #024873; }
            h2 { color: #24A8A2; margin-top: 20px; }
            .section { margin: 20px 0; }
            ul { padding-left: 20px; }
            li { margin: 5px 0; }
          </style>
        </head>
        <body>
          <h1>Informe de Edificio: ${building.nombreEdificio}</h1>
          
          <div class="section">
            <p><strong>Encargado:</strong> ${building.encargado}</p>
            <p><strong>Estado:</strong> ${building.estado}</p>
            <p><strong>ID Edificio:</strong> ${building.idEdificio}</p>
            <p><strong>Fecha:</strong> ${building.fecha}</p>
          </div>
  
          <div class="section">
            <h2>Items Eléctricos</h2>
            <ul>${renderItems(building.electricItems)}</ul>
  
            <h2>Items de Agua</h2>
            <ul>${renderItems(building.waterItems)}</ul>
  
            <h2>Mobiliario</h2>
            <ul>${renderItems(building.furnitureItems)}</ul>
  
            <h2>Equipamiento</h2>
            <ul>${renderItems(building.equipmentItems)}</ul>
  
            <h2>Infraestructura</h2>
            <ul>${renderItems(building.infrastructureItems)}</ul>
  
            <h2>Seguridad</h2>
            <ul>${renderItems(building.securityItems)}</ul>
          </div>
  
          <div class="section">
            <h2>Aulas</h2>
            <ul>
              ${building.aulas && building.aulas.length > 0 ? 
                building.aulas.map((aula, index) => 
                  `<li>
                    <strong>Aula: ${aula.nombre || `Aula ${index + 1}`}</strong>
                    ${aula.electricItems ? `
                      <h4>Items Eléctricos</h4>
                      <ul>${renderItems(aula.electricItems)}</ul>
                    ` : ''}
                  </li>
                `).join('') : 
                '<li>No hay aulas registradas</li>'
              }
            </ul>
          </div>
  
          <div class="section">
            <h2>Cuartos de Servicio</h2>
            <ul>
              ${building.cuartosServicio && building.cuartosServicio.length > 0 ? 
                building.cuartosServicio.map((cuarto, index) => `
                  <li>
                    <strong>Cuarto: ${cuarto.nombre || `Cuarto ${index + 1}`}</strong>
                    ${cuarto.electricItems ? `
                      <h4>Items Eléctricos</h4>
                      <ul>${renderItems(cuarto.electricItems)}</ul>
                    ` : ''}
                  </li>
                `).join('') : 
                '<li>No hay cuartos de servicio registrados</li>'
              }
            </ul>
          </div>
        </body>
      </html>
    `;
  
    try {
      // Generar el PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
  
      // Guardar el archivo en el almacenamiento del dispositivo
      const fileName = `Informe_${building.nombreEdificio}.pdf`;
      const newUri = `${FileSystem.documentDirectory}${fileName}`;
  
      // Copiar el archivo generado a una ubicación permanente
      await FileSystem.copyAsync({
        from: uri,
        to: newUri,
      });
  
      // Mostrar una alerta con opciones para abrir o compartir el archivo
      alert(`PDF generado: ${fileName}`);
      Sharing.shareAsync(newUri); // Compartir o abrir el archivo
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      alert('Error al generar el PDF');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Informes</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar informe..."
          placeholderTextColor="#666"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <ScrollView style={styles.reportList}>
        {filteredInformes.length === 0 ? (
          <Text style={styles.emptyText}>No hay informes disponibles</Text>
        ) : (
          filteredInformes.map((informe, index) => (
            <TouchableOpacity key={index} style={styles.reportCard} onPress={() => openModal(informe)}>
              <View style={styles.reportIcon}>
                <Ionicons name="document-text-outline" size={24} color="#024873" />
              </View>
              <View style={styles.reportContent}>
                <View style={styles.reportHeader}>
                  <Text style={styles.reportType}>{informe.tipo}</Text>
                  <Text style={styles.reportDate}>{informe.fecha}</Text>
                </View>
                <View style={styles.locationContainer}>
                  <Text style={styles.locationText}>Edificio: {informe.nombreEdificio} - {informe.encargado}</Text>
                </View>
                <View style={styles.reportFooter}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{informe.estado}</Text>
                  </View>
                  <Text style={styles.reportId}>{informe.idEdificio}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Modal */}
      {selectedBuilding && (
        <Modal visible={selectedBuilding !== null} onRequestClose={closeModal} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={30} color="black" />
              </TouchableOpacity>
              <ScrollView contentContainerStyle={styles.modalScroll}>
                <Text style={styles.modalTitle}>{selectedBuilding?.nombreEdificio}</Text>
                <Text style={styles.modalSubTitle}>Informe del Edificio:</Text>
                <View style={styles.modalText}>
                  <Text>Encargado: {selectedBuilding?.encargado}</Text>
                  <Text>Estado: {selectedBuilding?.estado}</Text>
                  <Text>ID Edificio: {selectedBuilding?.idEdificio}</Text>
                </View>

                <TouchableOpacity
                  style={styles.generateButton}
                  onPress={() => generatePDF(selectedBuilding)}
                >
                  <Text style={styles.generateButtonText}>Generar PDF</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#024873',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  reportList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
  reportCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  reportIcon: {
    marginRight: 10,
  },
  reportContent: {
    flex: 1,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reportType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#024873',
  },
  reportDate: {
    fontSize: 14,
    color: '#999',
  },
  locationContainer: {
    marginTop: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
  },
  reportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusBadge: {
    backgroundColor: '#24A8A2',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
  },
  reportId: {
    fontSize: 12,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalScroll: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#024873',
  },
  modalSubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
  generateButton: {
    backgroundColor: '#24A8A2',
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 8,
  },
  generateButtonText: {
    fontSize: 16,
    color: 'white',
  },
});