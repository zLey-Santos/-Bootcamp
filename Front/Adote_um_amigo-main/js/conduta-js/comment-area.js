// Seleciona os elementos do DOM
const nameInput = document.querySelector('#name');
const messageInput = document.querySelector('#message');
const commentsContainer = document.querySelector('#comments');
const postButton = document.querySelector('#post-button');


// Array que armazena os comentários
const comments = [];

// Adiciona um evento de clique ao botão de postar
postButton.addEventListener('click', () => {
    // Cria um novo objeto de comentário com as informações do usuário
    const comment = {
        name: nameInput.value,
        message: messageInput.value
    };

    // Adiciona o novo comentário ao array
    comments.push(comment);

    // Limpa os campos do formulário
    nameInput.value = '';
    messageInput.value = '';

    // Exibe todos os comentários na tela
    renderComments();
});

// Função para exibir os comentários na tela
function renderComments() {
    // Limpa o conteúdo do container de comentários
    commentsContainer.innerHTML = '';

    // Percorre todos os comentários e cria um novo elemento para cada um
    comments.forEach((comment) => {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `
      <h3>${comment.name}</h3>
      <p>${comment.message}</p>
    `;

        // Adiciona o elemento ao container de comentários
        commentsContainer.appendChild(commentElement);
    });
}

