import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import Toast from "react-native-root-toast";
import { api } from "../api";
import { Card } from "../components/Card";
import { Title } from "../components/Title";
import { Subtitle } from "../components/Subtitle";
import { Button } from "../components/Button";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import screens from "../screens.json";
// @ts-ignore
import backgroundImage from "../../assets/OIPBackGround.jpg";

const texts = {
  editButtonLabel: "Editar",
  deleteButtonLabel: "Deletar",
  deleteSuccessMessage: "O notepad foi deletado com sucesso!",
};

const initialNotepad = {
  id: 0,
  title: "",
  subtitle: "",
  content: "",
  created_at: "",
};

const DeleteButton = styled(Button)`
  background-color: #ff4500;
  margin: 0;
`;

const EditButton = styled(Button)`
  background-color: #ffa500;
  margin: 0;
`;

const Content = styled.Text`
  font-size: 18px;
  line-height: 27px;
`;

const ImageBackgroundFullScreen = styled.ImageBackground`
  flex: 1;
  margin-top: 5px;
`;

const Container = styled.ScrollView`
  flex: 1;
  margin-horizontal: 5px;
`;

const ContainerCard = styled(Card)`
  display: flex;
  padding: 5px;
  gap: 6px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ContainerPositionButton = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 8px;
  padding: 3px;
`;

const ContainerTextData = styled.Text`
  flex: 1;
  text-align: center;
  margin-bottom: 10px;
`;

/**
 * Componente responsável por exibir a tela de visualização de uma nota.
 * Os dados da nota são buscados de uma API e exibidos na tela.
 * O usuário pode editar ou excluir a nota.

 */

export function ViewNotepadScreen({ navigation, route }) {
  // Obtém o ID da nota a ser visualizada
  const notepadId = route.params.id;

  // Estado para armazenar os dados da nota
  const [notepad, setNotepad] = useState(initialNotepad);

  // Converte a data de criação da nota para um formato legível
  const notepadCreatedAt = new Date(notepad.created_at).toLocaleDateString();

  /**
   * Função assíncrona para carregar os dados da nota.
   * Realiza uma requisição à API para buscar os dados da nota pelo ID.
   * Atualiza o estado notepad com os dados recebidos.
   */
  async function loadNotepad() {
    try {
      const response = await api.get(`/notepads/${notepadId}`);
      setNotepad(response.data);
    } catch (error) {
      Toast.show("Error loading notepad: " + error);
    }
  }

  /**
   * Função assíncrona chamada quando o botão de exclusão é pressionado.
   * Realiza uma requisição à API para excluir a nota pelo ID.
   * Exibe uma mensagem de sucesso usando o Toast.
   * Navega para a tela de listagem de notas.
   */
  async function onDelete() {
    try {
      await api.delete(`/notepads/${notepadId}`);
      Toast.show(texts.deleteSuccessMessage);
      navigation.navigate(screens.listNotepads);
    } catch (error) {
      Toast.show("Error deleting notepad: " + error);
    }
  }

  /**
   * Função chamada quando o botão de edição é pressionado.
   * Navega para a tela de edição de nota, passando o ID da nota como parâmetro.
   */
  function onEdit() {
    navigation.navigate(screens.editNotepad, {
      id: notepadId,
    });
  }

  // Efeito executado quando a tela está em foco
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotepad();
    });
    return unsubscribe;
  }, [notepadId]);

  // Renderiza a tela de visualização da nota
  return (
    <ImageBackgroundFullScreen source={backgroundImage} resizeMode="cover">
      <Container>
        <ContainerCard>
          <ContainerPositionButton>
            <ContainerTextData>
              <MaterialCommunityIcons
                name="calendar-clock-outline"
                size={18}
                color="black"
              />
              :{notepadCreatedAt}
            </ContainerTextData>
            <DeleteButton onPress={onDelete}>
              <MaterialCommunityIcons
                name="delete-off"
                size={24}
                color="black"
              />
              {texts.deleteButtonLabel}
            </DeleteButton>
            <EditButton onPress={onEdit}>
              <FontAwesome5 name="edit" size={24} color="black" />
              {texts.editButtonLabel}
            </EditButton>
          </ContainerPositionButton>

          <Text>#ID_ {notepad.id}</Text>

          <Title>
            Titulo:_
            {notepad.title}
          </Title>
          <Subtitle> Subtitle:_ {notepad.subtitle}</Subtitle>
          <Content>conteudo:_ {notepad.content}</Content>
          {notepad.latitude && notepad.longitude && (
            <>
              <Text>Latitude: {notepad.latitude}</Text>
              <Text>Longitude: {notepad.longitude}</Text>
            </>
          )}
        </ContainerCard>
      </Container>
    </ImageBackgroundFullScreen>
  );
}
