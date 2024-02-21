import { useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import { api } from "../api";
import { useGlobalStore } from "../useGlobalStore";
import { TextField } from "../components/TextField";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import styled from "styled-components/native";
import { schema } from "../schema";

const TextContent = styled.TextInput`
  border-radius: 12px;
  background-color: white;
  padding: 8px;
  border-width: 1px;
  border-color: #1e90ff;
  height: 60px;
`;

const texts = {
  submitButtonLabel: "Atualizar",
  updateNotepadSuccess: "O notepad foi atualizado com sucesso!",
};

export function EditNotepadScreen({ navigation, route }) {
  const notepadId = route.params.id;
  const isLoading = useGlobalStore(state => state.isLoading);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");

  async function loadNotepad() {
    const response = await api.get(`/notepads/${notepadId}`);
    const notepad = response.data;
    setTitle(notepad.title);
    setSubtitle(notepad.subtitle);
    setContent(notepad.content);
  }

  const onSubmit = async () => {
    try {
      await schema.validate({ title, subtitle, content });

      const response = await api.put(`/notepads/${notepadId}`, {
        title,
        subtitle,
        content,
      });
      Toast.show(texts.updateNotepadSuccess);
      navigation.goBack();
    } catch (error) {
      Toast.show("Erro de validação:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotepad();
    });
    return unsubscribe;
  }, [notepadId]);

  return (
    <Container>
      <TextField value={title} onChangeText={setTitle} />

      <TextField value={subtitle} onChangeText={setSubtitle} />

      <TextContent value={content} onChangeText={setContent} multiline />

      <Button isLoading={isLoading} onPress={onSubmit}>
        {texts.submitButtonLabel}
      </Button>
    </Container>
  );
}
