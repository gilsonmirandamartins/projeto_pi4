document.getElementById('formCadastroPaciente').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const documento = document.getElementById('documento').value;
    const sexo = document.getElementById('sexo').value;
    const dataNascimento = document.getElementById('dataNascimento').value;

    const paciente = {
        nome: nome,
        documento: documento,
        sexo: sexo,
        dataNascimento: dataNascimento
    };

    try {
        const response = await fetch('http://localhost:8081/paciente/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paciente)
        });

        const mensagem = document.getElementById('mensagem');
        if (response.ok) {
            const respostaTexto = await response.text();
            mensagem.textContent = respostaTexto;
            mensagem.style.color = 'green';
        } else {
            mensagem.textContent = 'Falha ao cadastrar paciente.';
            mensagem.style.color = 'red';
        }
    } catch (error) {
        console.error('Erro:', error);
        const mensagem = document.getElementById('mensagem');
        mensagem.textContent = 'Erro de conexão.';
        mensagem.style.color = 'red';
    }
});

const formCadastroPaciente = document.getElementById('formCadastroPaciente');
const mensagem = document.getElementById('mensagem');

formCadastroPaciente.addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const documento = document.getElementById('documento').value;

    const paciente = {
        nome: nome,
        documento: documento
    };

    try {
        const response = await fetch('http://localhost:8081/paciente/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paciente)
        });

        const mensagem = document.getElementById('mensagem');
        if (response.ok) {
            const respostaTexto = await response.text();
            mensagem.textContent = respostaTexto;
            mensagem.style.color = 'green';
            // Redireciona para a página de sucesso após 2 segundos
            setTimeout(function() {
                window.location.href = 'Front-End/Home/Telas_Paciente/Crud_Paciente.html';
            }, 2000);
        } else {
            mensagem.textContent = 'Nome ou documento incorretos.';
            mensagem.style.color = 'red';
        }
    } catch (error) {
        console.error('Erro:', error);
        mensagem.textContent = 'Erro de conexão.';
        mensagem.style.color = 'red';
    }
});



