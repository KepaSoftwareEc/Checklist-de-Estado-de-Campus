import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useReportContext } from './ReportContext';
const { height } = Dimensions.get('window');

export default function ChecklistScreen() {
  const { addReportItem } = useReportContext();
  const route = useRoute();
  const navigation = useNavigation();
  const { items, title, buildingData, areaType, buildingType } = route.params;

  const [selectedItems, setSelectedItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [savedData, setSavedData] = useState([]);

  const determineAreaType = (items) => {
    if (items[0]?.id.startsWith('electric')) return 'electricItems';
    if (items[0]?.id.startsWith('water')) return 'waterItems';
    if (items[0]?.id.startsWith('furniture')) return 'furnitureItems';
    if (items[0]?.id.startsWith('equipment')) return 'equipmentItems';
    if (items[0]?.id.startsWith('infrastructure')) return 'infrastructureItems';
    if (items[0]?.id.startsWith('security')) return 'securityItems';
  };

  const effectiveBuildingData = buildingData || {
    id: items[0]?.buildingId,
    buildingName: items[0]?.buildingName,
    buildingNumber: items[0]?.buildingNumber
  };

  const effectiveAreaType = areaType || determineAreaType(items);

  const handleSelect = (id, type) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [id]: {
        correct: type === 'correct' ? !prevState[id]?.correct : false,
        incorrect: type === 'incorrect' ? !prevState[id]?.incorrect : false,
      },
    }));

    if (type === 'incorrect') {
      setSelectedItemId(id);
      setModalVisible(true);
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
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      const storage = getStorage();
      const fileName = `images/${Date.now()}.jpg`;
      const storageRef = ref(storage, fileName);

      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImage(downloadURL);
    }
  };

  const saveData = () => {
    const newData = {
      id: selectedItemId,
      description: items.find(item => item.id === selectedItemId)?.description,
      quantity: items.find(item => item.id === selectedItemId)?.quantity,
      imageUrl: image,
      description: description,
    };

    addReportItem(effectiveBuildingData, effectiveAreaType, newData, buildingType);
    setSavedData((prevData) => [...prevData, newData]);
    setModalVisible(false);
    setImage(null);
    setDescription('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>{title}</Text>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="list-outline" size={64} color="#CCCCCC" />
          <Text style={styles.emptyStateText}>No existen elementos registrados</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {items.map((item, index) => {
            const itemState = selectedItems[item.id] || {};
            return (
              <View key={`${item.id}-${index}`} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                  <Text style={styles.cardQuantity}>Cantidad: {item.quantity}</Text>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      styles.incorrectButton,
                      itemState.incorrect ? styles.selectedIncorrect : {},
                    ]}
                    onPress={() => handleSelect(item.id, 'incorrect')}
                  >
                    <Ionicons name="close" size={20} color="white" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      styles.correctButton,
                      itemState.correct ? styles.selectedCorrect : {},
                    ]}
                    onPress={() => handleSelect(item.id, 'correct')}
                  >
                    <Ionicons name="checkmark" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.bottomSheet}>
              <Text style={styles.bottomSheetTitle}>Describe el problema</Text>

              <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.image} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Ionicons name="camera-outline" size={40} color="#666" />
                    <Text style={styles.imagePlaceholderText}>Agregar imagen</Text>
                  </View>
                )}
              </TouchableOpacity>

              <TextInput
                style={styles.textInput}
                placeholder="Agregue aquí la descripción..."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
              />

              <TouchableOpacity style={styles.saveButton} onPress={saveData}>
                <Text style={styles.saveButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 16 },
  headerText: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  scrollView: { paddingBottom: 16 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 16, borderRadius: 8, marginBottom: 16, elevation: 2 },
  cardContent: { flex: 1, marginRight: 16 },
  cardDescription: { fontSize: 16, fontWeight: '500', marginBottom: 8 },
  cardQuantity: { fontSize: 14, color: '#666' },
  actionButtons: { flexDirection: 'row' },
  actionButton: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4 },
  incorrectButton: { backgroundColor: '#D1D1D1' },
  correctButton: { backgroundColor: '#D1D1D1' },
  selectedIncorrect: { backgroundColor: 'red' },
  selectedCorrect: { backgroundColor: '#F2B705' },
  backButton: { backgroundColor: '#0066CC', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  bottomSheet: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, height: height * 0.5, alignItems: 'center' },
  bottomSheetTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  imageContainer: { width: 180, height: 180, marginVertical: 10, borderRadius: 8, overflow: 'hidden', backgroundColor: '#BAC8D9' },
  image: { width: '100%', height: '100%' },
  imagePlaceholder: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#ddd', borderStyle: 'dashed', borderRadius: 8 },
  imagePlaceholderText: { color: '#666', marginTop: 10 },
  textInput: { width: '100%', borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 10, fontSize: 16 },
  saveButton: { backgroundColor: '#28a745', padding: 12, borderRadius: 8, width: '100%', alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  emptyState: { justifyContent: 'center', alignItems: 'center', paddingTop: height * 0.3 },
  emptyStateText: { fontSize: 18, color: '#999' },
});