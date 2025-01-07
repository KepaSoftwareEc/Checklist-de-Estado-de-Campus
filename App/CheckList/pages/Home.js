import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, Animated, PanResponder } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [proximosEventos, setProximosEventos] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [subMenuEdificiosVisible, setSubMenuEdificiosVisible] = useState(false);
  const [subMenuAulasVisible, setSubMenuAulasVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(-250)).current;
  const navigation = useNavigation();

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
    for(let i = 0; i < 5; i++) {
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
        toValue: -250,
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
          menuAnimation.setValue(Math.min(gestureState.dx - 250, 0));
        } else {
          menuAnimation.setValue(Math.max(gestureState.dx, -250));
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
            toValue: -250,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setMenuVisible(false));
        } else {
          Animated.timing(menuAnimation, {
            toValue: menuVisible ? 0 : -250,
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
  {/* Sección de perfil */}
  <View style={styles.profileSection}>
    <Image
      source={require('../assets/perfilEjemplo.png')} 
      style={styles.profileImage}
    />
    <View style={styles.profileTextContainer}>
      <Text style={styles.profileName}>Byron Josué Castillo Paladines</Text>
      <Text style={styles.profileRole}>Administrador</Text>
    </View>
  </View>

  <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
    <Ionicons name="home" size={24} color="#024873" />
    <Text style={styles.menuText}>Inicio</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
    <Ionicons name="document-text-outline" size={24} color="#024873" />
    <Text style={styles.menuText}>Informes</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.menuItem} onPress={toggleSubMenuEdificios}>
    <Ionicons name="business-outline" size={24} color="#024873" />
    <Text style={styles.menuText}>Edificios</Text>
  </TouchableOpacity>
  {subMenuEdificiosVisible && (
    <View style={styles.subMenuContainer}>
      <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('CrearEdificio')}>
  <Text style={styles.subMenuText}>Registrar Edificio</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('ListaEdificio')}>
  <Text style={styles.subMenuText}>Edificios</Text>
</TouchableOpacity>
    </View>
  )}
  <TouchableOpacity style={styles.menuItem} onPress={toggleSubMenuAulas}>
    <Ionicons name="school-outline" size={24} color="#024873" />
    <Text style={styles.menuText}>Aulas y Cuartos de Servicio</Text>
  </TouchableOpacity>
  {subMenuAulasVisible && (
    <View style={styles.subMenuContainer}>
      <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('CrearAula')}>
        <Text style={styles.subMenuText}>Registrar Aulas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('CrearCuartoServicio')}>
        <Text style={styles.subMenuText}>Registrar Cuartos de Servicio</Text>
      </TouchableOpacity>
    </View>
  )}
  <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
    <Ionicons name="person-outline" size={24} color="#024873" />
    <Text style={styles.menuText}>Perfil</Text>
  </TouchableOpacity>
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
          <Text style={styles.welcomeText}>Bienvenido/a Carolina</Text>
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
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#024873" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="document-text-outline" size={24} color="#666" />
          <Text style={styles.navText}>Informes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={toggleNotifications}
        >
          <Ionicons 
            name={notificationsEnabled ? "notifications" : "notifications-outline"} 
            size={24} 
            color={notificationsEnabled ? "#024873" : "#666"} 
          />
          <Text style={[styles.navText, notificationsEnabled && {color: '#024873'}]}>
            Notificaciones
          </Text>
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
    width: 250,
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 1000,
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  menuItem: {
    display: 'flex',
    width: '100%',
    height: 56,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    color: '#024873',
    marginLeft: 16,
  },
  subMenuContainer: {
    paddingLeft: 16,
    backgroundColor: '#f9f9f9',
  },
  subMenuItem: {
    paddingVertical: 8,
    paddingLeft: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subMenuText: {
    fontSize: 14,
    color: '#024873',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff', // Asegúrate de que el encabezado no tenga color de fondo azul
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
    fontWeight: '500',
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 13, 
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileTextContainer: {
    flexDirection: 'column',
    flexShrink: 1, 
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#024873',
  },
  profileRole: {
    fontSize: 14,
    color: '#666',
  },
});

export default Home;