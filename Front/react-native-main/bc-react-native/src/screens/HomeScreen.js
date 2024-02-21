/**
 * Arquivo: HomeScreen.js
 * Descrição: Tela inicial do aplicativo com um mapa exibindo marcadores de notepads.
 */

import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, MapMarker } from "react-native-maps";
import * as Location from "expo-location";
import Toast from "react-native-root-toast";
import { api } from "../api";
import screens from "../screens.json";

// Delta de coordenadas para ajustar a visualização do mapa
const coordsDelta = 0.03;

// Coordenadas iniciais do mapa
const initialCoords = {
  latitude: 0,
  longitude: 0,
};

// Estado inicial da lista de notepads
const initialNotepadList = {
  count: 0,
  notepads: [],
};

/**
 * Tela inicial do aplicativo.
 * Exibe um mapa com marcadores de notepads e permite adicionar um novo notepad com um toque longo no mapa.
 */
export function HomeScreen({ navigation }) {
  const [coords, setCoords] = useState(initialCoords);
  const [{ count, notepads }, setNotepadList] = useState(initialNotepadList);

  // Configura a região do mapa com base nas coordenadas
  const region = {
    ...coords,
    latitudeDelta: coordsDelta,
    longitudeDelta: coordsDelta,
  };

  // Filtra os notepads que possuem coordenadas válidas para exibir no mapa
  const notepadsInMap = notepads.filter(
    notepad => notepad.latitude !== undefined && notepad.longitude !== undefined
  );

  // Carrega os notepads da API
  async function loadNotepads() {
    const response = await api.get("/notepads", {
      params: {
        limit: Infinity,
      },
    });
    setNotepadList(response.data);
  }

  // Carrega as coordenadas de geolocalização do dispositivo
  async function loadGeolocation() {
    const response = await Location.requestForegroundPermissionsAsync();
    const position = await Location.getCurrentPositionAsync();
    setCoords(position.coords);
  }

  // Navega para a tela de visualização de um notepad quando o marcador é pressionado
  function onMarkerPress(notepad) {
    navigation.navigate(screens.viewNotepad, { id: notepad.id });
  }

  useEffect(() => {
    // Carrega a geolocalização e os notepads quando a tela recebe foco
    loadGeolocation();
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotepads();
    });

    return unsubscribe;
  }, []);

  // Cria os marcadores no mapa para cada notepad com coordenadas válidas
  const notepadsMarkers = notepadsInMap.map(notepad => (
    <MapMarker
      key={notepad.id}
      coordinate={notepad}
      onPress={() => onMarkerPress(notepad)}
    />
  ));

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {/* Mapa com marcadores */}
      <MapView
        region={region}
        showsUserLocation
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        onLongPress={event => {
          const coords = event.nativeEvent.coordinate;
          navigation.navigate(screens.createNotepad, { coords });
        }}>
        {notepadsMarkers}
      </MapView>
    </View>
  );
}
