// Esconde os parágrafos com a id "-botao-discricao" quando a página é carregada
const paragrafosDescricao = document.querySelectorAll('#botao-descricao');
paragrafosDescricao.forEach(paragrafo => {
    paragrafo.style.display = 'none';
});

// Adiciona o evento de clique a cada botão
const botoes = document.querySelectorAll('.mostrar-esconder');
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const paragrafo = botao.previousElementSibling;
        if (paragrafo.style.display === 'none') {
            paragrafo.style.display = 'block';
            botao.textContent = 'Descrição';
        } else {
            paragrafo.style.display = 'none';
            botao.textContent = 'Descrição';
        }
    });
});


