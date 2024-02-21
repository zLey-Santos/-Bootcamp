# ProjetoFinal-HTML-CSS-js

Nome: Wesley Santos

Turma:
Bootcamp Desenvolvedor Web Full Stack | [1T23] Noite
@INFNET-BCLFST00C1-N2-L2

Desenvolvendo um site em HTML, CSS e js responsivo com tema de um site de adoção de animais, onde podemos adicionar novas funcionalidades e melhorias.

Foi adicionado funções em javascript como validação de formulário e um drawer (burger-button), e um banner onde a imagem é alterada a cada 5 segundos.

O código é um programa JavaScript contém várias funções e ouvintes de eventos. O programa inclui uma função que exibe comentários postados pelos usuários, uma função que define um controle deslizante para percorrer imagens e uma função que valida e envia um formulário para um servidor.

O programa começa selecionando vários elementos do DOM . Esses elementos são usados para armazenar a entrada do usuário, exibir comentários e selecionar imagens para um controle deslizante.document.querySelector e document.querySelectorAll

O programa define um ouvinte de eventos em um botão rotulado como "post-button". Quando o botão é clicado, o programa cria um novo objeto de comentário que inclui o nome e a mensagem do usuário. O objeto de comentário é adicionado a uma matriz de comentários, que é exibida na tela usando a função.renderComments

A função limpa o container de comentários e adiciona um novo elemento para cada comentário. Cada elemento de comentário contém um elemento para o nome do usuário e um elemento para a mensagem.renderComments Div, H3 e p

O programa também inclui um controle deslizante que percorre um conjunto de imagens. Essa funcionalidade é realizada selecionando o controle deslizante e suas imagens usadas.O programa define um intervalo que desvanece a imagem atual e desaparece na próxima imagem.document.querySelector e querySelectorAll

O programa inclui uma função que valida os campos obrigatórios de um formulário e envia os dados do formulário para um servidor. Essa função é definida para escutar o evento do formulário. O programa valida cada campo obrigatório usando uma matriz de ids de campo e define uma mensagem de erro e borda vermelha para quaisquer campos inválidos. A função também verifica se o campo de e-mail corresponde a um formato de e-mail válido usando uma expressão regular. Se todos os campos forem válidos, a função criará um objeto JSON com os dados do formulário e o enviará a um servidor usando a função. Se o servidor retornar um erro, a função exibirá um alerta. Se o servidor responder com êxito, a função exibirá uma mensagem de êxito e redefinirá o formulário após cinco segundos.submitfetch

O programa também inclui validação em tempo real para cada campo usando ouvintes de eventos que verificam o valor do campo e adicionam ou removem mensagens de erro e bordas vermelhas. O campo de nome é validado para ter um comprimento mínimo de 4 e um comprimento máximo de 32 caracteres, o campo de endereço é validado para ter um comprimento mínimo de 12 e um comprimento máximo de 124 caracteres, e o campo de telefone é validado para conter apenas números e ter no mínimo 9 caracteres.

---||----------------------------------------------------------------------||---

// Link do site completo em HTML, CSS e Javascript do Replit:

// Abaixo fica os link apenas dos arquivos HTML e CSS

Link dos arquivos no Replit:
https://replit.com/@INFNET-BCLFST00C1-N2-L2/Desenvolvimento-Web-com-HTML-e-CSS-WesleyOliveir33#index.html

Link do trabalho no Replit Webview:
https://Desenvolvimento-Web-com-HTML-e-CSS-WesleyOliveir33.infnet-bclfst00c1-n2-l2.repl.co
