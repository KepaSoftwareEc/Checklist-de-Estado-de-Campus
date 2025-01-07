import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function Component() {
  const route = useRoute();
  const navigation = useNavigation();
  const { area } = route.params;
  
  const [checkedItems, setCheckedItems] = useState(area.equipment || {});
  const [allChecked, setAllChecked] = useState(false);

  const equipments = [
    { id: 1, name: 'Sillas', quantity: 20, icon: 'seat', iconSet: 'MaterialCommunityIcons' },
    { id: 2, name: 'Mesas', quantity: 8, icon: 'table', iconSet: 'MaterialCommunityIcons' },
    { id: 3, name: 'Computador', quantity: 20, icon: 'laptop', iconSet: 'Ionicons' },
    { id: 4, name: 'Proyector', quantity: 1, icon: 'videocam', iconSet: 'Ionicons' },
  ];

  const handleCheck = (id, status) => {
    const newCheckedItems = {
      ...checkedItems,
      [id]: status === 'ok'
    };
    setCheckedItems(newCheckedItems);

    // Verificar si todos los items están marcados como OK
    const allItemsOk = equipments.every(item => newCheckedItems[item.id] === true);
    setAllChecked(allItemsOk);

    // Actualizar el estado en la pantalla anterior
    area.equipment = newCheckedItems;
  };

  useEffect(() => {
    // Verificar estado inicial
    const allItemsOk = equipments.every(item => checkedItems[item.id] === true);
    setAllChecked(allItemsOk);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, allChecked && styles.headerChecked]}>
        <Text style={styles.title}>Aula {area.number}</Text>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.subtitle}>
        *Verifique el estado de los equipos en la sala. Si detecta alguna irregularidad, desmarque el equipo correspondiente
      </Text>

      <ScrollView style={styles.scrollView}>
        {equipments.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                {item.iconSet === 'MaterialCommunityIcons' ? (
                  <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
                ) : (
                  <Ionicons name={item.icon} size={24} color="#fff" />
                )}
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
              </View>
              <View style={styles.checkContainer}>
                <TouchableOpacity 
                  style={[
                    styles.checkButton,
                    checkedItems[item.id] === true && styles.checkButtonActive
                  ]}
                  onPress={() => handleCheck(item.id, 'ok')}
                >
                  <Ionicons 
                    name="checkmark" 
                    size={20} 
                    color={checkedItems[item.id] === true ? '#F2B705' : '#D1D1D1'} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.checkButton,
                    checkedItems[item.id] === false && styles.checkButtonError
                  ]}
                  onPress={() => handleCheck(item.id, 'error')}
                >
                  <Ionicons 
                    name="close" 
                    size={20} 
                    color={checkedItems[item.id] === false ? '#F44336' : '#D1D1D1'} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.generateReportButton}
        onPress={() => navigation.navigate('Informe', { area, checkedItems })}
      >
        <Text style={styles.generateReportText}>Generar Informe</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#000" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="document-text" size={24} color="#000" />
          <Text style={styles.navText}>Informes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="notifications" size={24} color="#000" />
          <Text style={styles.navText}>Notificaciones</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerChecked: {
    backgroundColor: '#F2B705',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  checkContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  checkButton: {
    padding: 4,
  },
  checkButtonActive: {
    backgroundColor: '#F2B70533',
    borderRadius: 4,
  },
  checkButtonError: {
    backgroundColor: '#F4433633',
    borderRadius: 4,
  },
  generateReportButton: {
    backgroundColor: '#0066CC',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  generateReportText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#f5f5f5',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});