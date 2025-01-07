import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './pages/Login';
import HomeScreen from './pages/Home';
import CrearEdificio from './pages/CrearEdificio';
import DentroEdif from './pages/DentroEdif';
import Aula from './pages/Aula';
import Informe from './pages/Informe';
import CrearAula from './pages/CrearAula';
import ListaEdificio from './pages/ListaEdificio';
import CrearCuartoServicio from './pages/CrearCuartoServicio'


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#024873',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false, title: '' }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: '' }}
        />
        
        <Stack.Screen
          name="DentroEdif"
          component={DentroEdif}
          options={{ title: '' }}
        />

        <Stack.Screen
          name="Aula"
          component={Aula}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Informe"
          component={Informe}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="CrearAula"
          component={CrearAula}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="CrearEdificio"
          component={CrearEdificio}
          options={{ title: 'Edificios' }}
        />
        <Stack.Screen
          name="ListaEdificio"
          component={ListaEdificio}
          options={{ title: 'Lista de Edificios' }}
        />
        <Stack.Screen
          name={"CrearCuartoServicio"}
          component={CrearCuartoServicio}
          options={{title:''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

