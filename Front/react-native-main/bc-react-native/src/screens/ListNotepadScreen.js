import React, { useState, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-root-toast";
import { api } from "../api";
import { NotepadItem } from "../components/NotepadItem";
import { Card } from "../components/Card";
import { useIsFocused } from "@react-navigation/native";
import screens from "../screens.json";

/*
 * Componente responsável por exibir uma lista de notas.
 * Os dados das notas são buscados de uma API e exibidos em uma FlatList.
 * Os itens da lista podem ser carregados de forma paginada ao rolar até o final da lista.
 */

export function ListNotepadScreen({ navigation, route }) {
  // Estado para armazenar as notas
  const [notepads, setNotepads] = useState([]);

  // Estado para controlar a página atual
  const [page, setPage] = useState(1);

  // Estado para controlar o carregamento das notas
  const [isLoading, setIsLoading] = useState(false);

  // Estado para verificar se há mais páginas de notas disponíveis
  const [hasNextPage, setHasNextPage] = useState(true);

  /**
   * Função de renderização dos itens da lista.
   * Renderiza o componente NotepadItem para cada item da lista.
   *
   * @param {object} item - Dados do item da lista.
   * @returns {JSX.Element} Componente NotepadItem.
   */
  const renderNotepadItem = ({ item }) => (
    <NotepadItem {...item} onPress={() => onPressNotepadItem(item)} />
  );

  /**
   * Função chamada quando um item da lista é pressionado.
   * Navega para a tela de visualização da nota.
   *
   * @param {object} param0 - Dados do item da lista.
   */
  const onPressNotepadItem = ({ id }) => {
    navigation.navigate(screens.viewNotepad, {
      id,
    });
  };

  /**
   * Função chamada para carregar os dados das notas.
   * Realiza uma requisição à API para buscar as notas paginadas.
   * Atualiza o estado notepads com os dados recebidos.
   * Verifica se há mais páginas de notas disponíveis.
   *
   * @returns {Promise<void>}
   */
  const loadNotepads = async () => {
    try {
      setIsLoading(true);

      // Faz uma requisição à API para buscar as notas paginadas
      const response = await api.get("/notepads", {
        params: {
          page,
          limit: 10,
        },
      });

      // Obtém as notas carregadas
      const { notepads: loadedNotepads } = response.data;

      // Verifica se há mais páginas de notas disponíveis
      if (loadedNotepads.length === 0) {
        setHasNextPage(false);
      } else {
        // Atualiza o estado notepads com os dados recebidos
        setNotepads(prevNotepads => [...prevNotepads, ...loadedNotepads]);
        // Atualiza a página atual
        setPage(prevPage => prevPage + 1);
      }

      setIsLoading(false);
    } catch (error) {
      Toast.show("Error loading notepads: " + error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Carrega as notas quando a tela está em foco
    if (useIsFocused) {
      loadNotepads();
    }
  }, [useIsFocused]);

  /**
   * Função chamada quando o usuário rola até o final da lista.
   * Verifica se há mais páginas de notas a serem carregadas.
   * Chama a função para carregar mais notas.
   */
  const handleLoadMore = () => {
    if (!isLoading && hasNextPage) {
      loadNotepads();
    }
  };

  return (
    <Card>
      <FlatList
        data={notepads}
        renderItem={renderNotepadItem}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          <View style={{ padding: 10 }}>
            {!hasNextPage && (
              <Text style={{ textAlign: "center" }}>
                Chegou ao fim da lista...
              </Text>
            )}
            {isLoading && (
              <Text style={{ textAlign: "center" }}>Carregando...</Text>
            )}
          </View>
        )}
      />
    </Card>
  );
}
