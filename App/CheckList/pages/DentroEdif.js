import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function DentroEdif() {
  const route = useRoute();
  const navigation = useNavigation();
  const { edificio } = route.params;
  
  const [areas, setAreas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    monitorias: false,
    aulas: false,
    servicios: false,
  });
  const [checkedItems, setCheckedItems] = useState({});
  const [newArea, setNewArea] = useState({
    id: '',
    type: 'aula',
    name: '',
    number: '',
    capacity: '',
    description: '',
    image: '',
    equipment: {
      proyector: false,
      computadora: false,
      pantalla: false,
      bocinas: false,
      aire: false
    }
  });

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

  const handleSave = () => {
    const areaToSave = {
      ...newArea,
      id: Date.now().toString(),
    };
    setAreas([...areas, areaToSave]);
    setModalVisible(false);
    setNewArea({
      id: '',
      type: 'aula',
      name: '',
      number: '',
      capacity: '',
      description: '',
      image: '',
      equipment: {
        proyector: false,
        computadora: false,
        pantalla: false,
        bocinas: false,
        aire: false
      }
    });
  };

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handleAreaPress = (area) => {
    navigation.navigate('Aula', { area });
  };

  const filteredAreas = areas.filter(area => 
    area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edificio {edificio.numeroEdificio}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar Edificio</Text>
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
          <Text style={styles.sectionTitle}>Monitorias Edificio</Text>
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
              {['Instalaciones eléctricas/redes', 'Instalaciones de agua', 'Mobiliario', 'Equipos', 'Infraestructura física', 'Condiciones de seguridad'].map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.areaItem}
                  onPress={() => handleAreaPress({ type: 'monitoria', name: item })}
                >
                  <View style={styles.areaItemContent}>
                    <View style={styles.areaTextContent}>
                      <Text style={styles.areaName}>{item}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Classrooms Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aulas</Text>
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
              {filteredAreas
                .filter(area => area.type === 'aula')
                .map(area => (
                  <TouchableOpacity 
                    key={area.id}
                    style={styles.areaItem}
                    onPress={() => handleAreaPress(area)}
                  >
                    <View style={styles.areaItemContent}>
                      <View style={styles.areaTextContent}>
                        <Text style={styles.areaName}>Aula {area.number}</Text>
                        <Text style={styles.areaDetail}>
                          Capacidad: {area.capacity} personas
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>

        {/* Service Rooms Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuartos de Servicio</Text>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('servicios')}
          >
            <Text style={styles.sectionHeaderText}>Selección</Text>
            <Ionicons
              name={expandedSections.servicios ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#F2B705"
            />
          </TouchableOpacity>
          {expandedSections.servicios && (
            <View style={styles.sectionContent}>
              {['Baños', 'Cuartos de limpieza'].map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.areaItem}
                  onPress={() => handleAreaPress({ type: 'servicio', name: item })}
                >
                  <View style={styles.areaItemContent}>
                    <View style={styles.areaTextContent}>
                      <Text style={styles.areaName}>{item}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Generate Report Button */}
      <TouchableOpacity
        style={styles.generateReportButton}
        onPress={() => navigation.navigate('Informe')}
      >
        <Text style={styles.generateReportText}>Generar Informe</Text>
      </TouchableOpacity>

      {/* Bottom Menu */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.menuItem}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Informes')}>
          <Text style={styles.menuItem}>Informes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
          <Text style={styles.menuItem}>Notificaciones</Text>
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
    color: '#0066cc',
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
    flexDirection: 'row',
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
});