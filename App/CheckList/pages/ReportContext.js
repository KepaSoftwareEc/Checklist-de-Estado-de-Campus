import React, { createContext, useState, useContext,useEffect  } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportContext = createContext();


export const ReportProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  const [reportData, setReportData] = useState({
    edificios: {},
    aulas: {},
    cuartosServicio: {},
     
  });
  // Cargar el nombre de usuario cuando el componente se monte
  useEffect(() => {
    loadUsername();
  }, []);
  const addReportItem = async (buildingData, areaType, itemData, buildingType) => {
    const buildingId = buildingData.id;
    const currentDate = new Date().toISOString().split('T')[0];
   
    const updatedReportData = {
      ...reportData,
      date: currentDate,
      estado: "pendiente",
      [buildingType]: {
        ...(reportData[buildingType] || {}),
        [buildingId]: {
          nombre: buildingType==="edificios"?buildingData.buildingName:buildingData.buildingNumber,
          ...(reportData[buildingType]?.[buildingId] || {}),
          [`${areaType}Items`]: [
            ...(reportData[buildingType]?.[buildingId]?.[`${areaType}Items`] || []),
            itemData
          ]
        }
      }
    };
   
    try {
      await AsyncStorage.setItem('reportData', JSON.stringify(updatedReportData));
      setReportData(updatedReportData);
    } catch (error) {
      console.error('Error al guardar datos de informe:', error);
    }
  };

  const generateReport = async () => {
    try {
      if (!username) {
        await loadUsername(); // Cargar el username si no está
      }
      
      const reportWithUsername = {
        ...reportData,
        encargado: username,
        estado: "pendiente",
        edificios: Object.entries(reportData.edificios || {}).map(([buildingId, building]) => ({
          id: buildingId,
          ...building
        })),
        aulas: Object.entries(reportData.aulas || {}).map(([buildingId, building]) => ({
          id: buildingId,
          ...building,
          items: building.aulaItems || []
        })),
        cuartosServicio: Object.entries(reportData.cuartosServicio || {}).map(([buildingId, building]) => ({
          id: buildingId,
          ...building,
          items: building.cuartoItems || []
        }))
      };
  
      const reportJson = JSON.stringify(reportWithUsername, null, 2);
      console.log('Informe generado:', reportJson);
      return reportWithUsername;
    } catch (error) {
      console.error('Error al generar informe:', error);
      return null;
    }
  };
  const setUserName = async (name) => {
    try {
      await AsyncStorage.setItem('username', name);
      setUsername(name);
    } catch (error) {
      console.error('Error al guardar nombre de usuario:', error);
    }
  };
  
  const loadUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      console.log('Stored username:', storedUsername); // Add this line
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } catch (error) {
      console.error('Error al cargar nombre de usuario:', error);
    }
  };

  const clearReportData = async () => {
    try {
      await AsyncStorage.removeItem('reportData');
      setReportData({ aulas: {} });
    } catch (error) {
      console.error('Error al limpiar datos de informe:', error);
    }
  };

  return (
    <ReportContext.Provider value={{  reportData, addReportItem, generateReport, clearReportData, username, setUserName, loadUsername }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => useContext(ReportContext);