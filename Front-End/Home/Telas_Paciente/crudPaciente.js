document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastroPaciente');
    const formEditar = document.getElementById('formEditarPaciente');
    const formDeletar = document.getElementById('formDeletarPaciente');
    const formLogin = document.getElementById('formLoginPaciente');

    const handleSubmit = async (event, url, errorMessage) => {
        event.preventDefault();
        const idPaciente = document.getElementById('idPaciente')?.value;
        const nome = document.getElementById('nome').value;
        const documento = document.getElementById('documento').value;
        const sexo = document.getElementById('sexo')?.value;
        const dataNascimento = document.getElementById('dataNascimento')?.value;

        const paciente = {
            nome,
            documento,
            sexo,
            dataNascimento
        };

        try {
            const response = await fetch(url + (idPaciente ? `/${idPaciente}` : ''), {
                method: idPaciente ? 'PUT' : 'POST',
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
                mensagem.textContent = errorMessage;
                mensagem.style.color = 'red';
            }
        } catch (error) {
            console.error('Erro:', error);
            const mensagem = document.getElementById('mensagem');
            mensagem.textContent = 'Erro de conexão.';
            mensagem.style.color = 'red';
        }
    };

    formCadastro?.addEventListener('submit', async function(event) {
        await handleSubmit(event, 'http://localhost:8081/paciente/criar', 'Falha ao cadastrar paciente.');
    });

    formEditar?.addEventListener('submit', async function(event) {
        await handleSubmit(event, 'http://localhost:8081/paciente/editar', 'Falha ao editar paciente.');
    });

    formDeletar?.addEventListener('submit', async function(event) {
        await handleSubmit(event, 'http://localhost:8081/paciente/deletar', 'Falha ao deletar paciente.');
    });

    formLogin?.addEventListener('submit', async function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const documento = document.getElementById('documento').value;

        try {
            const response = await fetch('http://localhost:8081/paciente/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, documento })
            });

            const mensagem = document.getElementById('mensagem');
            if (response.ok) {
                const respostaTexto = await response.text();
                mensagem.textContent = respostaTexto;
                mensagem.style.color = 'green';
                window.location.href = 'Crud_Paciente.html';

            } else {
                mensagem.textContent = 'Falha ao realizar login.';
                mensagem.style.color = 'red';
            }
        } catch (error) {
            console.error('Erro:', error);
            const mensagem = document.getElementById('mensagem');
            mensagem.textContent = 'Erro de conexão.';
            mensagem.style.color = 'red';
        }
    });
});
