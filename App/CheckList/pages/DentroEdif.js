import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Platform,
  Image,
  PanResponder,
  Animated
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useReportContext } from './ReportContext';
import { FontAwesome } from '@expo/vector-icons';

export default function DentroEdif() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const toggleNotifications = () => {
    setNotificationsEnabled(prevState => !prevState);
  };
  const route = useRoute();
  const { generateReport } = useReportContext();
  const { buildingId, buildingId1 } = route.params;
  const [building, setBuilding] = useState(null);
  
  
  const [aulas, setAulas] = useState([]);
  const [cuartos, setCuartos] = useState([]);
  
  const navigation = useNavigation();
  
  const [areas, setAreas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({aulas:false});
  const [newArea, setNewArea] = useState({ name: '', capacity: '', description: '',floor: '' });

  const panY = new Animated.Value(0);
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  });

  const closeAnim = Animated.timing(panY, {
    toValue: 1000,
    duration: 200,
    useNativeDriver: true,
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderMove: (e, gs) => {
      panY.setValue(gs.dy);
    },
    onPanResponderRelease: (e, gs) => {
      if(gs.dy > 50) {
        closeAnim.start(() => {
          setModalVisible(false);
          panY.setValue(0);
        });
      } else {
        resetPositionAnim.start();
      }
    },
  });
  // Función para obtener los detalles del edificio
  useEffect(() => {
    fetchBuildingDetails();
    loadAulas();
    loadCuartos();
  }, []);

  const loadAulas = async () => {
    try {
      const response = await fetch('https://checklistutpl.duckdns.org/api/aulas/obtenerAulas');
      const data = await response.json();
      console.log('Aulas obtenidas:', data); // Log para depuración
      const filteredAulas = data.filter(aula => aula.buildingName === buildingId);
      console.log('Aulas filtradas:', filteredAulas); // Log para depuración
      setAulas(filteredAulas);
    } catch (error) {
      console.error('Error al cargar aulas:', error);
    }
  };

  const loadCuartos = async () => {
    try {
      const response = await fetch('https://checklistutpl.duckdns.org/api/cuarto-servicio/obtenerCuartos');
      const data = await response.json();
      console.log('Cuartos obtenidas:', data); // Log para depuración
      const filteredCuartos = data.filter(cuartos => cuartos.buildingName === buildingId);
      console.log('Cuartos filtradas:', filteredCuartos); // Log para depuración
      setCuartos(filteredCuartos);
    } catch (error) {
      console.error('Error al cargar cuartos:', error);
    }
  };

  const fetchBuildingDetails = async () => {
    try {
      console.log('Obteniendo detalles del edificio:', buildingId1); // Añadir log para depuración
      const response = await fetch(`https://checklistutpl.duckdns.org/api/edificio/${buildingId1}`);
      const data = await response.json();
      console.log('Detalles del edificio:', data); // Añadir log para depuración
      setBuilding(data);
    } catch (error) {
      console.error('Error al obtener los detalles del edificio:', error);
    }
  };

  if (!building) {
    return (
      <View style={styles.container}>
        <Text>Cargando detalles del edificio...</Text>
      </View>
    );
  }
  const aulaOptions = aulas.map(aula => ({
    key: aula.id,
    value: `Aula ${aula.classroomNumber}`
  }));
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewArea({ ...newArea, image: result.assets[0].uri });
    }
  };

  const handleGenerateReport = () => {
    const buildingData = {
      id: buildingId,
      buildingName: building.nombre,
      buildingNumber: building.numeroEdificio
    };

    const reportData = generateReport(buildingData);
    reportData.encargado = 'Nombre del Encargado';
    navigation.navigate('Informe', { reportData: reportData});
  };

  const handleMonitorBuilding = () => {
    navigation.navigate('MonitorBuilding', { buildingId, items: building });
  };

  const handleMonitorAulas = () => {
    navigation.navigate('MonitorAulas', { buildingId });
  };

  const handleMonitorCuartos = () => {
    navigation.navigate('MonitorCuartos', { buildingId });
  };

  const toggleSection = (section) => {
    setExpandedSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  const handleAreaPress = (area) => {
    navigation.navigate(area.type, { id: area.id });
  };
  

  const handleSave = () => {
    // Lógica para guardar los cambios
    console.log('Guardar cambios:', newArea);
    setModalVisible(false);
  };

  const filteredAreas = areas.filter(area => 
    area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edificio {building.numeroEdificio}</Text>
        <TouchableOpacity style={styles.editButton}>
          {/*<Text style={styles.editButtonText}>Editar Edificio</Text>*/}
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#024873" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar aula"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Areas List */}
      <ScrollView style={styles.content}>
        {/* Monitorias Edificio Section */}
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Monitorear Edificio</Text>
    <TouchableOpacity
      style={styles.sectionHeader}
      onPress={() => toggleSection('monitorias')}
    >
      <Text style={styles.sectionHeaderText}>Selección</Text>
      <Ionicons
        name={expandedSections.monitorias ? 'chevron-up' : 'chevron-down'}
        size={24}
        color="#F2B705"
      />
    </TouchableOpacity>

    {expandedSections.monitorias && (
      <View style={styles.sectionContent}>
        {['Instalaciones eléctricas / redes', 'Instalaciones de agua', 'Mobiliario', 'Equipos', 'Infraestructura física', 'Condiciones de seguridad'].map((item, index) => {
          const itemMap = {
            'Instalaciones eléctricas / redes': building.electricItems,
            'Instalaciones de agua': building.waterItems,
            'Mobiliario': building.furnitureItems,
            'Equipos': building.equipmentItems,
            'Infraestructura física': building.infrastructureItems,
            'Condiciones de seguridad': building.securityItems
          };

          return (
            <TouchableOpacity 
              key={index}
              style={styles.areaItem}
              onPress={() => navigation.navigate('ChecklistScreen', { 
                items: itemMap[item] || [],
                title: item,
                buildingData: building,
                areaType: item === 'Instalaciones eléctricas / redes' ? 'electric' :
                          item === 'Instalaciones de agua' ? 'water' :
                          item === 'Mobiliario' ? 'furniture' :
                          item === 'Equipos' ? 'equipment' :
                          item === 'Infraestructura física' ? 'infrastructure' :
                          item === 'Condiciones de seguridad' ? 'security' : '',
                buildingType: 'edificios'
              })}
            >
              <View style={styles.areaItemContent}>
                <Text style={styles.areaItemText}>{item}</Text>
                <Ionicons name="chevron-forward" size={24} color="#0066a1" />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    )}
  </View>

        {/* Aulas Section */}
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monitorear Aulas</Text>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection('aulas')}
        >
          <Text style={styles.sectionHeaderText}>Selección</Text>
          <Ionicons
            name={expandedSections.aulas ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#F2B705"
          />
        </TouchableOpacity>
        {expandedSections.aulas && (
          <View style={styles.sectionContent}>
            {aulas.length === 0 ? (
              <Text style={styles.noAulasText}>No hay aulas asociadas a este edificio.</Text>
            ) : (
              aulas.map((aula, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.areaItem}
                  onPress={() => handleAreaPress({ type: 'Aula', id: aula.id })}
                >
                  <View style={styles.areaItemContent}>
                    <Text style={styles.areaItemText}>Aula: {aula.buildingNumber} - Piso: {aula.floor || 'No especificado'}</Text>
                    <Ionicons name="chevron-forward" size={24} color="#0066a1" />
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      </View>

        {/* Cuartos de Servicio Section */}
        <View style={styles.section}>
  <Text style={styles.sectionTitle}>Monitorear Cuartos de Servicio</Text>
  <TouchableOpacity
    style={styles.sectionHeader}
    onPress={() => toggleSection('cuartos')}
  >
    <Text style={styles.sectionHeaderText}>Selección</Text>
    <Ionicons
      name={expandedSections.cuartos ? 'chevron-up' : 'chevron-down'}
      size={24}
      color="#F2B705"
    />
  </TouchableOpacity>
  {expandedSections.cuartos && (
  <View style={styles.sectionContent}>
    {cuartos.length === 0 ? (
      <Text style={styles.noAulasText}>No hay cuartos de servicio asociados a este edificio.</Text>
    ) : (
      cuartos.map((cuarto, index) => (
        <TouchableOpacity 
          key={index}
          style={styles.areaItem}
          onPress={() => handleAreaPress({ type: 'Cuarto', id: cuarto.id })}
        >
          <View style={styles.areaItemContent}>
            <Text style={styles.areaItemText}>Cuarto: {cuarto.buildingNumber}</Text>
            <Ionicons name="chevron-forward" size={24} color="#0066a1" />
          </View>
        </TouchableOpacity>
      ))
    )}
  </View>
)}
</View>
      </ScrollView>


      {/* Generate Report Button */}
      <TouchableOpacity
        style={styles.generateReportButton}
        onPress={handleGenerateReport}
        //onPress={() => navigation.navigate('Informe')}
      >
        <Text style={styles.generateReportText}>Generar Informe</Text>
      </TouchableOpacity>

      {/* Bottom Menu */}
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
      {/* Botón para navegar a la pantalla "Home" */}
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HomeScreen')}>
        <FontAwesome name="home" size={24} color="#0066a1" />
        <Text style={styles.navText}>Inicio</Text>
      </TouchableOpacity>

      {/* Botón para navegar a la pantalla "Informes" */}
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('InformesTotales')}>
        <FontAwesome name="file-text-o" size={24} color="#666" />
        <Text style={styles.navText}>Informes</Text>
      </TouchableOpacity>

      {/* Botón para navegar a la pantalla "Notificaciones" */}
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Notificaciones')}>
        <FontAwesome name="bell-o" size={24} color="#666" />
        <Text style={styles.navText}>Notificaciones</Text>
      </TouchableOpacity>
    </View>

      {/* cuadro emergente para agregar area */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Animated.View 
            style={[styles.modalContent, { transform: [{ translateY }] }]}
            {...panResponder.panHandlers}
          >
            <View style={styles.modalDragBar} />
            <ScrollView>
              <Text style={styles.modalTitle}>Agregar área</Text>

              {/* Image Picker */}
              <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
                {newArea.image ? (
                  <Image
                    source={{ uri: newArea.image }}
                    style={styles.selectedImage}
                  />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Ionicons name="add" size={40} color="#0066cc" />
                    <Text style={styles.addImageText}>Agregar imagen</Text>
                  </View>
                )}
              </TouchableOpacity>

              <Text style={styles.sectionTitle}>Información general</Text>

              {/* Area Type Selector */}
              <Text style={styles.label}>Tipo de área</Text>
              <TouchableOpacity
                style={styles.selector}
                onPress={() => {
                  setNewArea({
                    ...newArea,
                    type: newArea.type === 'aula' ? 'servicio' : 'aula',
                  });
                }}
              >
                <Text style={styles.selectorText}>
                  {newArea.type === 'aula' ? 'Aulas' : 'Cuartos de servicio'}
                </Text>
                <Ionicons name="chevron-down" size={24} color="#666" />
              </TouchableOpacity>

              {/* Form Fields */}
              <Text style={styles.label}>
                {newArea.type === 'aula' ? 'Nombre de aula' : 'Número de cuarto'}:
              </Text>
              <TextInput
                style={styles.input}
                value={newArea.number}
                onChangeText={(text) => setNewArea({ ...newArea, number: text })}
              />

              {newArea.type === 'aula' && (
                <>
                  <Text style={styles.label}>Capacidad de personas:</Text>
                  <TextInput
                    style={styles.input}
                    value={newArea.capacity}
                    onChangeText={(text) => setNewArea({ ...newArea, capacity: text })}
                    keyboardType="numeric"
                  />
                </>
              )}

              <Text style={styles.label}>Descripción:</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newArea.description}
                onChangeText={(text) => setNewArea({ ...newArea, description: text })}
                multiline
                numberOfLines={4}
                placeholder="Agregue aquí la descripción..."
              />

              {/* Save Button */}
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#024873',
  },
  editButton: {
    marginLeft: 16,
  },
  editButtonText: {
    fontSize: 14,
    color: '#024873',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#024873',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    paddingHorizontal: 16,
    color: '#024873',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  sectionHeaderText: {
    fontSize: 16,
    color: 'black',
  },
  sectionContent: {
    backgroundColor: '#fff',
    marginTop: 1,
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
  },
  areaContainer: {
    marginBottom: 16,
  },
  areaItem: {
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  areaItemContent: {
    flexDirection: 'row',      // Alinea el texto y la flecha en una fila.
    justifyContent: 'space-between', // Separa el texto a la izquierda y la flecha a la derecha.
    alignItems: 'center', 
  },
  areaTextContent: {
    marginLeft: 12,
    flex: 1,
  },
  areaName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  areaDetail: {
    fontSize: 14,
    color: '#666',
  },
  generateReportButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  generateReportText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  menuItem: {
    fontSize: 16,
    color: '#024873',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '90%',
  },
  modalDragBar: {
    width: 40,
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    color: '#0066cc',
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  selectorText: {
    fontSize: 16,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribuye el espacio de manera uniforme
    alignItems: 'center', // Alinea los elementos verticalmente al centro
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee', // Borde superior de color claro
  },
  navItem: {
    alignItems: 'center', // Centra los elementos dentro de cada item
  },
  navText: {
    fontSize: 12,  // Tamaño de la fuente más pequeño
    color: '#666',  // Color gris para el texto
    marginTop: 4,  // Espacio superior entre el ícono y el texto
  },
});