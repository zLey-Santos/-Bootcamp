# react-native

Nome: Wesley Santos

Turma: Bootcamp Desenvolvedor Web Full Stack | [1T23] Noite @INFNET-BCLFST00C1-N2-L2

Link do repositório projeto no GitHub: https://github.com/zLey-Santos/react-native/tree/main/bc-react-native

## Importante

    "npm install": Esse comando é usado para instalar as dependências necessárias do projeto. Ele lerá o arquivo package.json (ou yarn.lock, se estiver usando o Yarn) e baixará todas as dependências listadas.

    "npx expo start": Esse comando inicia o servidor de desenvolvimento do Expo, que permite testar o aplicativo em um emulador, dispositivo físico ou no próprio navegador. Ele abrirá o Expo Developer Tools em seu navegador, onde você poderá ver um código QR.

Para executar o aplicativo em um dispositivo físico ou emulador, você pode seguir as etapas a seguir:

Para dispositivos iOS:

    Baixe e instale o aplicativo "Expo Client" na App Store.
    No Expo Developer Tools, verifique se você está na guia "LAN".
    Abra a câmera no seu dispositivo iOS e aponte para o código QR exibido no Expo Developer Tools. Isso abrirá automaticamente o aplicativo no Expo Client.

Para dispositivos Android:

    Baixe e instale o aplicativo "Expo Go" na Play Store.
    No Expo Developer Tools, verifique se você está na guia "LAN".
    Abra o aplicativo Expo Go no seu dispositivo Android.
    Toque no ícone de busca e digite o nome do projeto.
    Selecione o projeto na lista exibida para abrir o aplicativo no Expo Go.

Certifique-se de que todas as dependências necessárias estejam listadas no arquivo package.json e que sejam compatíveis com ambas as plataformas (iOS e Android). Além disso, você também pode precisar configurar as chaves de API ou outras configurações específicas do projeto antes de executar o aplicativo. Consulte a documentação do projeto ou do Expo para obter mais informações sobre as dependências e configurações necessárias.

    	#Documentação
    	#Lista de notepads (AppNotepad Mobile)

### Screens

    React, useState e useEffect para gerenciar o estado e realizar efeitos colaterais.
    Toast do pacote "react-native-root-toast" para exibir notificações no aplicativo.
    api é um objeto que representa uma API utilizada para fazer requisições HTTP.
    useGlobalStore é um hook personalizado para acessar o estado global do aplicativo.
    TextField é um componente personalizado para exibir campos de texto.
    Container é um componente personalizado para envolver os elementos da tela.
    Button é um componente personalizado para exibir botões.
    styled-components/native é uma biblioteca para estilizar componentes React Native.
    schema é um esquema de validação utilizado para validar os campos do formulário.

A tela permite ao usuário editar um "notepad" existente. O código utiliza o useState para armazenar o estado dos campos do formulário, como título, subtítulo e conteúdo. O ID do "notepad" é obtido a partir dos parâmetros de rota (route.params.id).

A função loadNotepad é chamada quando a tela recebe o foco (navigation.addListener("focus")) e faz uma requisição para a API para obter os dados do "notepad" com o ID fornecido. Em seguida, os campos do formulário são atualizados com os valores obtidos.

A função onSubmit é chamada quando o usuário clica no botão "Atualizar". Antes de enviar a requisição para a API, o código valida os campos do formulário utilizando o schema de validação. Se a validação for bem-sucedida, uma requisição PUT é feita para atualizar o "notepad" com os novos valores. Em seguida, uma notificação de sucesso é exibida utilizando o Toast e a navegação é voltada para a tela anterior.

Caso ocorra algum erro de validação, uma notificação de erro é exibida. O estado global isLoading é utilizado para controlar o estado de carregamento do botão "Atualizar".

A tela é composta por vários elementos JSX, como TextField e TextContent, que são renderizados dentro do componente Container. O botão "Atualizar" chama a função onSubmit quando pressionado e exibe o texto "Atualizar".

### Componentes

    Botão personalizado:(Button)
        Importa as dependências necessárias.
        Define um componente de botão estilizado com styled-components/native.
        O componente recebe as props children, onPress, style e isLoading.
        Renderiza um TouchableOpacity estilizado como ButtonContainer.
        Se isLoading for verdadeiro, exibe um ActivityIndicator.
        Caso contrário, exibe o texto passado como children no componente ButtonText.

    Componente de Cartão:(Card)
        Importa a biblioteca styled-components/native.
        Define um componente de cartão estilizado com styled-components/native.
        O componente é uma View estilizada com bordas arredondadas, fundo branco, padding, margem e elevação.
        O componente cria um estilo de cartão reutilizável.

    Componente de Contêiner:(Container)
        Importa a biblioteca styled-components/native.
        Define um componente de contêiner estilizado com styled-components/native.
        O componente é uma View estilizada com margem, espaçamento interno, fundo transparente e bordas arredondadas.
        O componente cria um estilo de contêiner reutilizável.

    Sobreposição de Carregamento:(LoadingOverlay)
        Importa as dependências necessárias.
        Define um componente de sobreposição de carregamento estilizado com styled-components/native.
        O componente usa o hook useGlobalStore para acessar o estado global e verificar se isLoading é verdadeiro.
        Se isLoading for falso, retorna null para não exibir a sobreposição.
        Caso contrário, renderiza um Overlay estilizado com um ActivityIndicator no centro.

    Item de Bloco de Notas:(Notepaditem)
        Importa as dependências necessárias.
        Define um componente de item de bloco de notas.
        O componente recebe as props title, subtitle e onPress.
        Renderiza um TouchableOpacity envolvendo um Container estilizado.
        Dentro do Container, exibe um componente Title e Subtitle com os valores de title e subtitle, respectivamente.

    Subtítulo:(Subtitle)
        Importa a biblioteca styled-components/native.
        Define um componente de subtítulo estilizado com styled-components/native.
        O componente é estilizado como um componente Text com um tamanho de fonte, cor e peso específicos.

    Campo de Texto:(TextField)
        Importa a biblioteca styled-components/native.
        Define um componente de campo de texto estilizado com styled-components/native.
        O componente é estilizado como um componente TextInput com um estilo de borda, cor de fundo, padding e margem específicos.

    Título:(Title)
        Importa a biblioteca styled-components/native.
        Define um componente de título estilizado com styled-components/native.
        O componente é estilizado como um componente Text com um tamanho de fonte e peso específicos.

### Yup Validação de formulário

    Validação com Yup:(YUP)
        Importa a biblioteca yup.
        Define um esquema de validação utilizando yup.
        O esquema de validação define as regras para as propriedades title, subtitle e content.
        Cada propriedade é validada com restrições de tamanho e obrigatoriedade.
