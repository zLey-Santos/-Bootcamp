/**
 * Arquivo: CreateNotepadScreen.js
 * Descrição: Tela de criação de um notepad.
 */

import { useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { api } from "../api";
import screens from "../screens.json";
import styled from "styled-components/native";
import { Container } from "../components/Container";
import { schema } from "../schema";

// Componente de texto estilizado
const TextContent = styled.TextInput`
  border-radius: 12px;
  background-color: white;
  padding: 8px;
  border-width: 1px;
  border-color: #1e90ff;
  margin-horizontal: 5px;
  height: 100px;
`;

// Textos utilizados na tela
const texts = {
  titlePlaceholder: "Digite o título",
  subtitlePlaceholder: "Digite o subtítulo",
  contentPlaceholder: "Digite o conteúdo",
  submitSuccess: "Notepad criado com sucesso!",
};

/**
 * Tela de criação de um notepad.
 * Permite ao usuário preencher um formulário com título, subtítulo e conteúdo para criar um novo notepad.
 */
export function CreateNotepadScreen({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [coords, setCoords] = useState({
    latitude: undefined,
    longitude: undefined,
  });

  const latitude = coords.latitude;
  const longitude = coords.longitude;

  // Limpa os campos do formulário
  const clearFields = () => {
    setTitle("");
    setSubtitle("");
    setContent("");
  };

  // Função executada quando o usuário clica em "Enviar"
  async function onSubmit() {
    try {
      // Valida o formulário usando um esquema de validação (schema)
      await schema.validate({ title, subtitle, content });

      // Envia uma requisição para a API para criar um novo notepad
      const response = await api.post("/notepads", {
        title,
        subtitle,
        content,
        latitude,
        longitude,
      });

      // Exibe uma notificação de sucesso e limpa os campos do formulário
      Toast.show(texts.submitSuccess);
      clearFields();

      // Navega para a tela de listagem de notepads
      navigation.navigate(screens.listNotepads);
    } catch (error) {
      // Exibe uma notificação de erro de validação caso ocorra algum erro
      Toast.show("Erro de validação: ", error.message);
    }
  }

  // Carrega os parâmetros de geolocalização passados pela rota
  function loadGeolocationParams() {
    const coords = route.params?.coords || {};
    setCoords(coords);
  }

  useEffect(() => {
    // Atualiza os parâmetros de geolocalização quando a tela recebe foco
    const unsubscribe = navigation.addListener("focus", () => {
      loadGeolocationParams();
    });

    return unsubscribe;
  }, [route.params]);

  return (
    <Container>
      {/* Campo de texto para o título */}
      <TextField
        placeholder={texts.titlePlaceholder}
        value={title}
        onChangeText={setTitle}
      />

      {/* Campo de texto para o subtítulo */}
      <TextField
        placeholder={texts.subtitlePlaceholder}
        value={subtitle}
        onChangeText={setSubtitle}
      />

      {/* Campo de texto para o conteúdo */}
      <TextContent
        placeholder={texts.contentPlaceholder}
        value={content}
        numberOfLines={10}
        onChangeText={setContent}
        textAlignVertical="top"
        multiline
      />

      {/* Campo de texto para a latitude */}
      {latitude && <TextField value={latitude.toString()} editable={false} />}

      {/* Campo de texto para a longitude */}
      {longitude && <TextField value={longitude.toString()} editable={false} />}

      {/* Botão para enviar o formulário */}
      <Button onPress={onSubmit}>Enviar</Button>
    </Container>
  );
}
