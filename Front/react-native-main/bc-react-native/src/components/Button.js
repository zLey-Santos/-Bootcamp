import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

const ButtonContainer = styled.TouchableOpacity`
  background-color: #1e90ff;
  border-radius: 8px;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  margin-vertical: 15px;
  margin-horizontal: 5px;
`;

const ButtonText = styled.Text`
  color: #000000;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;

export function Button({ children, onPress, style = {}, isLoading = false }) {
  return (
    <ButtonContainer onPress={onPress} style={style} disabled={isLoading}>
      {isLoading && <ActivityIndicator size={30} color="#ecf0f1" />}
      {!isLoading && <ButtonText>{children}</ButtonText>}
    </ButtonContainer>
  );
}
