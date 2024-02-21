const form = document.querySelector('form');
const requiredFields = ['nome', 'telefone', 'endereco', 'idade', 'email'];
const successMessage = document.createElement('success-message');

successMessage.classList.add('success-message');
successMessage.innerHTML = '<strong>Obrigado por enviar o formulário!</strong>';
form.insertAdjacentElement('afterend', successMessage);

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Validação dos campos obrigatórios
    let allFieldsValid = true;
    requiredFields.forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.classList.add('invalid','invalid-border-red');
            field.focus();
            allFieldsValid = false;
        } else {
            field.classList.remove('invalid','invalid-border-red');
        }
    });

    // Validação do campo email
    const emailField = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value)) {
        emailField.classList.add('invalid','invalid-border-red');
        emailField.focus();
        allFieldsValid = false;
    } else {
        emailField.classList.remove('invalid','invalid-border-red' );
    }

    if (!allFieldsValid) {
        return;
    }

    // Criação do objeto com os dados do formulário
    const formData = {};
    requiredFields.forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        formData[fieldId] = field.value;
    });

    // Exibe o conteúdo do json no console
    console.log(formData)

    // Conversão do objeto em JSON
    const formDataJson = JSON.stringify(formData);

    try {
        // Envia o formulário para o servidor
        const response = await fetch('https://getform.io/f/0fdfd509-9026-4c02-a662-5660b3cf3c12', {
            method: 'POST',
            body: formDataJson,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao tentar enviar o formulário!');
        }

        // Exibe a mensagem de sucesso e limpa o formulário
        successMessage.style.display = 'block';
        form.reset();

        // Aguarda 5 segundos e oculta a mensagem de sucesso
        await new Promise((resolve) => setTimeout(resolve, 5000));
        successMessage.style.display = 'none';
    } catch (error) {
        console.error(error);
        alert('Falha no envio do formulário!');
    }
});

        // Validação em tempo real dos campos do formulário
requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);

    field.addEventListener('input', (event) => {
        if (!event.target.value.trim()) {
            event.target.classList.add('invalid','border-invalid-red');
        } else {
            event.target.classList.remove('invalid','border-invalid-red');
        }
        // Validar o campo nome
        if (fieldId === 'nome') {
            const nome = event.target.value.trim();
            if (nome.length < 4 || nome.length > 32) {
              event.target.classList.add('border-invalid-red');
            } else {
              event.target.classList.remove('border-invalid-red');
            }
        }
        // validar campo endereço 
        if (fieldId === 'endereco') {
            const endereco = event.target.value.trim();
            if (endereco.length < 12 || endereco.length > 124) {
              event.target.classList.add('border-invalid-red');
            } else {
              event.target.classList.remove('border-invalid-red');
            }
        }
        // Validar campo de telefone       
        if (fieldId === 'telefone') {
            const telefone = event.target.value.trim();
            if (telefone.length < 9) {
                event.target.classList.add('invalid', 'border-invalid-border-red');
            } else {
                event.target.classList.remove('invalid', 'border-invalid-border-red')
            }
        }
    });


});
