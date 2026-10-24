

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Switch,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Catalogo local de cursos
const cursos = [
  {
    id: '1',
    nombre: 'React Native',
    horas: 20,
    descripcion: 'Desarrollo de aplicaciones móviles.',
  },
  {
    id: '2',
    nombre: 'Diseño Web',
    horas: 18,
    descripcion: 'Creación de interfaces para sitios web.',
  },
  {
    id: '3',
    nombre: 'Ofimática',
    horas: 16,
    descripcion:
      'Uso de documentos, presentaciones y hojas de cálculo.',
  },
  {
    id: '4',
    nombre: 'Marketing Digital',
    horas: 12,
    descripcion: 'Estrategias de comunicación digital.',
  },
];

// Pantalla Inicio
function Inicio({ navigation }) {
  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.tarjeta,
        pressed && styles.tarjetaPresionada,
      ]}
      onPress={() =>
        navigation.navigate('Detalle', { curso: item })
      }
    >
      <View style={styles.fila}>
        <View style={styles.infoCurso}>
          <Text style={styles.nombreCurso}>{item.nombre}</Text>
          <Text style={styles.horas}>{item.horas} horas</Text>
        </View>

        <Text style={styles.flecha}>›</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.contenedor}>
      <View style={styles.encabezadoInicio}>
        <Text style={styles.etiquetaSuperior}>
          APRENDE ALGO NUEVO
        </Text>

        <Text style={styles.titulo}>Catálogo de Cursos</Text>

        <Text style={styles.subtitulo}>
          Encuentra el curso ideal para ti.
        </Text>
      </View>

      <FlatList
        data={cursos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// Pantalla Detalle y formulario
function Detalle({ route }) {
  const { curso } = route.params;

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [acepta, setAcepta] = useState(false);

  const confirmarInteres = () => {
    if (nombre.trim() === '') {
      Alert.alert(
        'Nombre requerido',
        'Por favor, ingresa tu nombre completo.'
      );
      return;
    }

    if (
      correo.trim() === '' ||
      !correo.includes('@')
    ) {
      Alert.alert(
        'Correo no válido',
        'Ingresa un correo que contenga el carácter @.'
      );
      return;
    }

    if (!acepta) {
      Alert.alert(
        'Condiciones',
        'Debes aceptar las condiciones para continuar.'
      );
      return;
    }

    Alert.alert(
      '¡Registro exitoso!',
      `Hola ${nombre.trim()}, tu interés en el curso ${curso.nombre} ha sido registrado.`,
      [{ text: 'Aceptar' }]
    );
  };

  return (
    <ScrollView
      style={styles.contenedor}
      contentContainerStyle={styles.detalleContenido}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.tarjetaDetalle}>
        <View style={styles.iconoCurso}>
          <Text style={styles.iconoTexto}>✓</Text>
        </View>

        <Text style={styles.nombreDetalle}>
          {curso.nombre}
        </Text>

        <View style={styles.etiquetaHoras}>
          <Text style={styles.horasDetalle}>
            {curso.horas} horas de formación
          </Text>
        </View>

        <Text style={styles.descripcion}>
          {curso.descripcion}
        </Text>
      </View>

      <View style={styles.formulario}>
        <Text style={styles.tituloFormulario}>
          Formulario de interés
        </Text>

        <Text style={styles.textoAyuda}>
          Completa tus datos para registrar tu interés.
        </Text>

        <Text style={styles.etiqueta}>
          Nombre completo
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          placeholderTextColor="#8A9B8D"
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Text style={styles.etiqueta}>
          Correo electrónico
        </Text>

        <TextInput
          style={styles.input}
          placeholder="ejemplo@correo.com"
          placeholderTextColor="#8A9B8D"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.filaCondiciones}>
          <View style={styles.textoCondicionesContenedor}>
            <Text style={styles.textoCondiciones}>
              Acepto las condiciones
            </Text>
            <Text style={styles.ayudaCondiciones}>
              Necesario para continuar
            </Text>
          </View>

          <Switch
            value={acepta}
            onValueChange={setAcepta}
            trackColor={{
              false: '#D5DDD6',
              true: '#A8CDB0',
            }}
            thumbColor={acepta ? '#426B4C' : '#FFFFFF'}
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado,
          ]}
          onPress={confirmarInteres}
        >
          <Text style={styles.textoBoton}>
            Confirmar interés
          </Text>
        </Pressable>

        <Text style={styles.nota}>
          Tu registro es una simulación académica.
        </Text>
      </View>
    </ScrollView>
  );
}

// Aplicacion y navegacion
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#DDEFE2',
          },
          headerTintColor: '#294B38',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: '#F5FAF5',
          },
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{
            title: 'Catálogo de Cursos',
          }}
        />

        <Stack.Screen
          name="Detalle"
          component={Detalle}
          options={{
            title: 'Detalle del curso',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos de la aplicacion
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F5FAF5',
    padding: 20,
  },

  encabezadoInicio: {
    marginTop: 8,
    marginBottom: 24,
  },

  etiquetaSuperior: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#6B9B79',
    marginBottom: 10,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#294B38',
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 15,
    color: '#687C6C',
    lineHeight: 22,
  },

  lista: {
    paddingBottom: 20,
  },

  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E1ECE2',
    elevation: 2,
    shadowColor: '#426B4C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },

  tarjetaPresionada: {
    backgroundColor: '#EAF4EC',
    transform: [{ scale: 0.99 }],
  },

  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  infoCurso: {
    flex: 1,
  },

  nombreCurso: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#294B38',
  },

  horas: {
    fontSize: 14,
    color: '#6B9B79',
    marginTop: 7,
  },

  flecha: {
    fontSize: 30,
    color: '#6B9B79',
    marginLeft: 12,
  },

  detalleContenido: {
    paddingBottom: 30,
  },

  tarjetaDetalle: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E1ECE2',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#426B4C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  iconoCurso: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#DDEFE2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  iconoTexto: {
    color: '#426B4C',
    fontSize: 24,
    fontWeight: 'bold',
  },

  nombreDetalle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#294B38',
    marginBottom: 12,
  },

  etiquetaHoras: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAF4EC',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 14,
  },

  horasDetalle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#426B4C',
  },

  descripcion: {
    fontSize: 16,
    lineHeight: 24,
    color: '#687C6C',
  },

  formulario: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E1ECE2',
  },

  tituloFormulario: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#294B38',
    marginBottom: 8,
  },

  textoAyuda: {
    fontSize: 14,
    color: '#687C6C',
    lineHeight: 21,
    marginBottom: 22,
  },

  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#426B4C',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#F8FBF8',
    borderWidth: 1,
    borderColor: '#C9DCCB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 20,
    fontSize: 15,
    color: '#294B38',
  },

  filaCondiciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 4,
  },

  textoCondicionesContenedor: {
    flex: 1,
    marginRight: 12,
  },

  textoCondiciones: {
    fontSize: 14,
    fontWeight: '600',
    color: '#294B38',
  },

  ayudaCondiciones: {
    fontSize: 12,
    color: '#829286',
    marginTop: 4,
  },

  boton: {
    backgroundColor: '#6B9B79',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botonPresionado: {
    backgroundColor: '#426B4C',
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  nota: {
    fontSize: 12,
    color: '#829286',
    textAlign: 'center',
    marginTop: 16,
  },
});
