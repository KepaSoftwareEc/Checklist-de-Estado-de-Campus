import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Dimensions, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { motion } from "framer-motion";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Manejo del inicio de sesión
    const handleLogin = async () => {
        const apiUrl = 'http://34.36.202.38/api/auth/login';
        const payload = { email, password }; // El objeto JSON que espera tu API
    
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
    
          if (!response.ok) {
            throw new Error('Error ${response.status}: ${response.statusText}');
          }
    
          const data = await response.json(); // Procesar respuesta de la API
          console.log('Inicio de sesión exitoso:', data);
          navigation.navigate('HomeScreen', { user: data.user });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    // Componente para el diseño superior
    const SvgTop = () => {
        const { width } = Dimensions.get('window');
        const height = width * 0.8; 

        return (
            <View style={styles.headerContainer}>
                <Svg
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    style={styles.svgCurve}
                >
                    <Path
                        fill="#024873"
                        d={`M0 0h${width}v${height * 0.95}c0 16.569-13.431 30-30 30H30c-16.569 0-30-13.431-30-30V0z`}
                    />
                </Svg>
                <View style={styles.headerContent}>
                    <Text style={styles.welcomeText}>Bienvenido a</Text>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../assets/UTPL.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Image
                            source={require('../assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <SvgTop />
            <View style={styles.formContainer}>
                <Text style={styles.title}>Inicio de sesión</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Correo Institucional"
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder="Contraseña"
                        style={styles.input}
                        secureTextEntry
                        onChangeText={setPassword}
                        value={password}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Recupera tu contraseña</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                        as={motion.button}
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        height: Dimensions.get('window').width * 0.8,
    },
    svgCurve: {
        position: 'absolute',
        width: '100%',
    },
    headerContent: {
        padding: 20,
        alignItems: 'center',
    },
    welcomeText: {
        color: '#fff',
        fontSize: 20,
        marginTop: 40,
        marginBottom: 10,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    logo: {
        width: 200,
        height: 100,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        marginTop: -50,
    },
    title: {
        paddingTop: 80,
        fontSize: 24,
        color: '#024873',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        gap: 20,
    },
    input: {
        backgroundColor: '#F5F6F9',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    forgotPassword: {
        color: '#024873',
        textAlign: 'right',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
    loginButton: {
        backgroundColor: '#024873',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 30,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});