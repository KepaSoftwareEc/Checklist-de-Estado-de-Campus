import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, Animated, PanResponder, Button } from 'react-native';
import { Ionicons,FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [proximosEventos, setProximosEventos] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [subMenuEdificiosVisible, setSubMenuEdificiosVisible] = useState(false);
  const [subMenuAulasVisible, setSubMenuAulasVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(-200)).current;
  const navigation = useNavigation();

  const route = useRoute();
  const { user } = route.params || {};//obtiene los datos del usuario

  React.useEffect(() => {
    updateWeekDays(selectedDate);
    obtenerEventos();
  }, [selectedDate]);

  const obtenerEventos = async () => {
    try {
      const eventosGuardados = await AsyncStorage.getItem('eventos');
      if (eventosGuardados !== null) {
        const eventos = JSON.parse(eventosGuardados);
        setProximosEventos(eventos);
      } else {
        const eventosPrueba = [
          {
            titulo: 'Mantenimiento a computadoras',
            fecha: '25/10/2024',
            edificio: 'Edificio 05',
            sala: 'Sala E',
            horaInicio: '7:00 am',
            horaFin: '10:00 am'
          }
        ];
        await AsyncStorage.setItem('eventos', JSON.stringify(eventosPrueba));
        setProximosEventos(eventosPrueba);
      }
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      setProximosEventos([]);
    }
  };

  const updateWeekDays = (date) => {
    const days = [];
    const curr = new Date(date);
    curr.setDate(curr.getDate() - curr.getDay() + 1);
    for (let i = 0; i < 5; i++) {
      days.push(new Date(curr));
      curr.setDate(curr.getDate() + 1);
    }
    setCurrentWeek(days);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction * 7));
    setSelectedDate(newDate);
  };

  const formatMonth = (date) => {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${months[date.getMonth()]}, ${date.getFullYear()}`;
  };

  const dias = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE'];

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(menuAnimation, {
        toValue: -300, // Ajusta el valor según el ancho del menú
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleLogout = async () => {
    // Limpiar cualquier dato de sesión almacenado
    await AsyncStorage.clear();
    // Redirigir al usuario a la pantalla de inicio de sesión
    navigation.navigate('LoginScreen');
  };

  const toggleSubMenuEdificios = () => {
    setSubMenuEdificiosVisible(!subMenuEdificiosVisible);
  };

  const toggleSubMenuAulas = () => {
    setSubMenuAulasVisible(!subMenuAulasVisible);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 0) {
          menuAnimation.setValue(Math.min(gestureState.dx - 300, 0));
        } else {
          menuAnimation.setValue(Math.max(gestureState.dx, -300));
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 100) {
          Animated.timing(menuAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setMenuVisible(true));
        } else if (gestureState.dx < -100) {
          Animated.timing(menuAnimation, {
            toValue: -300,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setMenuVisible(false));
        } else {
          Animated.timing(menuAnimation, {
            toValue: menuVisible ? 0 : -300,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
      {/* Menú Desplegable */}
      <Animated.View style={[styles.menuContainer, { transform: [{ translateX: menuAnimation }] }]}>
        <ScrollView contentContainerStyle={styles.menuScrollContainer}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image source={require("../assets/perfilEjemplo.png")} style={styles.profileImage} />
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileName}>{user?.name || "Usuario"}</Text>
              <Text style={styles.profileRole}>Administrador</Text>
            </View>
          </View>

          {/* Menu Items */}
          <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
            <Ionicons name="home-outline" size={24} color="#024873" />
            <Text style={styles.menuText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
            <Ionicons name="document-text-outline" size={24} color="#024873" />
            <Text style={styles.menuText}>Informes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={toggleSubMenuEdificios}>
            <Ionicons name="business-outline" size={24} color="#024873" />
            <Text style={styles.menuText}>Edificios</Text>
            <Ionicons name={subMenuEdificiosVisible ? "chevron-up" : "chevron-down"} size={24} style={styles.arrowIcon} />
          </TouchableOpacity>
          {subMenuEdificiosVisible && (
            <View style={styles.subMenuContainer}>
              <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate("CrearEdificio")}>
                <Text style={styles.subMenuText}> · Registrar edificio</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate("ListaEdificio")}>
                <Text style={styles.subMenuText}> · Edificios</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.menuItem} onPress={toggleSubMenuAulas}>
            <Ionicons name="school-outline" size={24} color="#024873" />
            <Text style={styles.menuText}>Aulas y cuartos de servicio</Text>
            <Ionicons name={subMenuAulasVisible ? "chevron-up" : "chevron-down"} size={24} style={styles.arrowIcon} />
          </TouchableOpacity>
          {subMenuAulasVisible && (
            <View style={styles.subMenuContainer}>
              <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate("CrearAula")}>
                <Text style={styles.subMenuText}> · Registrar aulas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate("CrearCuartoServicio")}>
                <Text style={styles.subMenuText}> · Registrar cuartos de servicio</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
            <Ionicons name="person-outline" size={24} color="#024873" />
            <Text style={styles.menuText}>Perfil</Text>
          </TouchableOpacity>
          {/* Botón de Salir */}
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="red" />
            <Text style={[styles.menuText, { color: "red" }]}>Cerrar sesión</Text>
          </TouchableOpacity>

          {/* Version number */}
          <Text style={styles.versionText}>V1.0.1.0</Text>
        </ScrollView>
      </Animated.View>

      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={24} color="#024873" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/logounido.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.welcomeText}>Bienvenido/a {user?.name || 'Usuario'}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Calendario */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={() => navigateWeek(-1)}>
              <Ionicons name="chevron-back" size={24} color="#024873" />
            </TouchableOpacity>
            <Text style={styles.monthText}>{formatMonth(selectedDate)}</Text>
            <TouchableOpacity onPress={() => navigateWeek(1)}>
              <Ionicons name="chevron-forward" size={24} color="#024873" />
            </TouchableOpacity>
          </View>

          <View style={styles.diasContainer}>
            {dias.map((day, index) => (
              <View key={day} style={styles.dayColumn}>
                <Text style={styles.dayText}>{day}</Text>
                <TouchableOpacity
                  style={[
                    styles.dateCircle,
                    currentWeek[index]?.toDateString() === selectedDate.toDateString() &&
                    styles.activeDateCircle
                  ]}
                  onPress={() => setSelectedDate(currentWeek[index])}
                >
                  <Text style={[
                    styles.dateText,
                    currentWeek[index]?.toDateString() === selectedDate.toDateString() &&
                    styles.activeDateText
                  ]}>
                    {currentWeek[index]?.getDate()}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Proximos Eventos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitleAmarillo}>Próximos eventos</Text>
          {proximosEventos.length > 0 ? (
            proximosEventos.map((evento, index) => (
              <View key={index} style={styles.eventCard}>
                <View style={styles.eventIcon}>
                  <Ionicons name="warning" size={24} color="#F2B705" />
                </View>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{evento.titulo}</Text>
                  <View style={styles.eventDetails}>
                    <Text>{evento.fecha}</Text>
                    <Text>{evento.edificio}</Text>
                    <Text>{evento.sala}</Text>
                  </View>
                </View>
                <View style={styles.eventTime}>
                  <Text style={styles.eventTimeText}>{`${evento.horaInicio} a ${evento.horaFin}`}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.eventCard}>
              <Text style={styles.noEventsText}>No hay eventos próximos</Text>
              
            </View>
          )}
        </View>
        

        {/* Solicitudes Recientes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Solicitudes recientes</Text>
          <View style={styles.solicitudesContainer}>
            <Text style={styles.noRequestsText}>Aún no hay solicitudes</Text>
            <Image
              source={require('../assets/vacio.png')}
              style={styles.noRequestsImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>

      {/* Navegación */}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300, // Aumenta el ancho del menú
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1000,
    paddingVertical: 20, // Aumenta el padding vertical
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 17,
    color: "#024873",
    marginLeft: 20,
  },
  subMenuContainer: {
    backgroundColor: "#f0f0f0",
    paddingLeft: 20, // Aumenta el padding izquierdo
  },
  subMenuItem: {
    paddingVertical: 15, // Aumenta el padding vertical
    paddingHorizontal: 25, // Aumenta el padding horizontal
  },
  subMenuText: {
    fontSize: 16,
    color: "#024873",
  },
  activeDateCircle: {
    backgroundColor: '#024873',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  arrowIcon: {
    marginLeft: "auto",
    color: "#F2B705",
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 30,
    marginLeft: 28,
  },
  logoU: {
    width: 100,
    height: 30,
    marginRight: 28,
    paddingStart: 28,
  },
  welcomeText: {
    color: '#024873',
    fontSize: 16,
    marginTop: 4,
  },
  content: {
    flex: 1,
    marginLeft:11,
  },
  calendarContainer: {
    backgroundColor: '#F5F6FA',
    padding: 16,
    margin: 16,
    borderRadius: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 16,
    color: '#024873',
    fontWeight: '500',
  },
  diasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDateCircle: {
    backgroundColor: '#024873',
  },
  dateText: {
    fontSize: 16,
    color: '#024873',
  },
  activeDateText: {
    color: '#fff',
  },
  section: {
    padding: 16,
    alignItems: 'right',
    color: '#F2B705',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginBottom: 16,
    alignItems: 'left',
  },
  sectionTitleAmarillo: {
    fontSize: 16,
    color: '#F2B705',
    fontWeight: '50',
    marginBottom: 16,
    alignItems: 'center',
  },
  eventCard: {
    backgroundColor: '#F5F6FA',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
  },
  eventIcon: {
    marginRight: 16,
    color: '#f2b705 ',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    color: '#024873',
    fontWeight: '500',
    marginBottom: 8,
  },
  eventDetails: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  eventTime: {
    alignItems: 'flex-end',
  },
  eventTimeText: {
    fontSize: 14,
    color: '#666',
  },
  noEventsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  solicitudesContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  noRequestsText: {
    fontSize: 16,
    color: '#666',
  },
  noRequestsImage: {
    width: 200,
    height: 200,
    marginTop: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  versionText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileRole: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  menuScrollContainer: {
    flexGrow: 1,
  },
});

export default Home;