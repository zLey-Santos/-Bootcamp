/**
 * Arquivo: ListNotepadScreen.js
 * Descrição: Tela de listagem de notepads.
 */

import React, { useState, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-root-toast";
import { api } from "../api";
import { NotepadItem } from "../components/NotepadItem";
import { Card } from "../components/Card";
import { useIsFocused } from "@react-navigation/native";
import screens from "../screens.json";

/**
 * Tela de listagem de notepads.
 * Exibe uma lista paginada de notepads, permitindo carregar mais itens ao rolar até o final da lista.
 */
export function ListNotepadScreen({ navigation, route }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [notepads, setNotepads] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  const isFocused = useIsFocused();

  // Carrega o total de itens disponíveis
  const loadTotalItems = async () => {
    try {
      const response = await api.get("/notepads");
      const { count } = response.data;
      setTotalItems(count);
      setItemsPerPage(count);
    } catch (error) {
      Toast.show("Error loading total items: " + error);
    }
  };

  // Carrega os notepads da página especificada
  const loadNotepads = async (page, limit) => {
    try {
      const response = await api.get("/notepads", {
        params: {
          page: page,
          limit: limit,
        },
      });

      const { notepads } = response.data;

      if (page === 1) {
        setNotepads(notepads);
      } else {
        setNotepads(prevNotepads => [
          ...prevNotepads,
          ...notepads.filter(
            item => !prevNotepads.find(prevItem => prevItem.id === item.id)
          ),
        ]);
      }

      setReachedEnd(notepads.length >= totalItems);
    } catch (error) {
      Toast.show("Error loading notepads: " + error);
    }
  };

  // Navega para a tela de visualização de um notepad quando o item da lista é pressionado
  const onPressNotepadItem = ({ id }) => {
    navigation.navigate(screens.viewNotepad, {
      id,
    });
  };

  // Carrega mais itens ao rolar até o final da lista
  const handleLoadMore = () => {
    if (!isLoadingMore && !reachedEnd && notepads.length < totalItems) {
      const nextPage = currentPage + 1;
      setIsLoadingMore(true);
      setCurrentPage(nextPage);
      loadNotepads(nextPage, itemsPerPage)
        .then(() => setIsLoadingMore(false))
        .catch(() => setIsLoadingMore(false));
    }
  };

  useEffect(() => {
    // Carrega o total de itens quando a tela é exibida
    loadTotalItems();
  }, []);

  useEffect(() => {
    // Carrega os notepads da página especificada quando a página é alterada
    const page = route.params?.page || currentPage;
    loadNotepads(page, itemsPerPage);
  }, [route.params?.page]);

  useEffect(() => {
    // Carrega os notepads da página atual quando a tela recebe foco
    if (isFocused) {
      const page = route.params?.page || currentPage;
      loadNotepads(page, itemsPerPage);
    }
  }, [isFocused]);

  const renderNotepadItem = ({ item }) => (
    <NotepadItem {...item} onPress={() => onPressNotepadItem(item)} />
  );

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
            {reachedEnd ? (
              <Text style={{ textAlign: "center" }}>
                Chegou ao fim da lista
              </Text>
            ) : (
              <Text style={{ textAlign: "center" }}>Carregando...</Text>
            )}
          </View>
        )}
      />
    </Card>
  );
}
