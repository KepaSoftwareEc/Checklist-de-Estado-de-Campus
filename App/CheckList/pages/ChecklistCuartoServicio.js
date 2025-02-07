import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';
import { useRoute } from '@react-navigation/native';

export default function ChecklistCuartoServicio() {
  const route = useRoute();
  const { area } = route.params;
  const [checklistItems, setChecklistItems] = useState([]);

  useEffect(() => {
    // Define los ítems del checklist según el área seleccionada
    const items = area === 'Baños' ? [
      { id: 1, description: 'Limpieza de inodoros' },
      { id: 2, description: 'Limpieza de lavamanos' },
      { id: 3, description: 'Limpieza de espejos' },
      { id: 4, description: 'Reposición de papel higiénico' },
      { id: 5, description: 'Reposición de jabón' },
    ] : [
      { id: 1, description: 'Limpieza de pisos' },
      { id: 2, description: 'Limpieza de ventanas' },
      { id: 3, description: 'Limpieza de estantes' },
      { id: 4, description: 'Reposición de productos de limpieza' },
      { id: 5, description: 'Limpieza de equipos' },
    ];
    setChecklistItems(items);
  }, [area]);

  const handleCheck = (item) => {
    setChecklistItems((prevItems) =>
      prevItems.map(i => i.id === item.id ? { ...i, checked: !i.checked } : i)
    );
  };

  const handleSave = async () => {
    const checklistData = checklistItems.map(item => ({
      id: item.id,
      description: item.description,
      checked: item.checked || false,
    }));

    console.log('Datos del checklist:', JSON.stringify(checklistData, null, 2));

    // Aquí puedes enviar los datos del checklist al servidor
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checklist - {area}</Text>
      {checklistItems.map((item) => (
        <View key={item.id} style={styles.checklistItem}>
          <CheckBox value={item.checked || false} onValueChange={() => handleCheck(item)} />
          <Text style={styles.itemText}>{item.description}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemText: {
    marginLeft: 8,
  },
  saveButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#0066a1',
    alignItems: 'center',
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});