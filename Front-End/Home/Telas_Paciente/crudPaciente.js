document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastroPaciente');
    const formEditar = document.getElementById('formEditarPaciente');
    const formDeletar = document.getElementById('formDeletarPaciente');
    const formLogin = document.getElementById('formLoginPaciente');

    const handleSubmit = async (event, url, method, errorMessage) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log("Dados enviados:", data);

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const mensagem = document.getElementById('mensagem');
            if (response.ok) {
                const respostaTexto = await response.text();
                mensagem.textContent = respostaTexto;
                mensagem.style.color = 'green';
            } else {
                const errorText = await response.text();
                console.error('Erro na resposta:', errorText);
                mensagem.textContent = errorMessage;
                mensagem.style.color = 'red';
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            const mensagem = document.getElementById('mensagem');
            mensagem.textContent = 'Erro de conexão.';
            mensagem.style.color = 'red';
        }
    };

    formCadastro?.addEventListener('submit', async function(event) {
        await handleSubmit(event, 'http://localhost:8081/paciente/criar', 'POST', 'Falha ao cadastrar paciente.');
    });

    formEditar?.addEventListener('submit', async function(event) {
        const idPaciente = document.getElementById('idPaciente').value;
        await handleSubmit(event, `http://localhost:8081/paciente/editar/${idPaciente}`, 'PUT', 'Falha ao editar paciente.');
    });

    formDeletar?.addEventListener('submit', async function(event) {
        const idPaciente = document.getElementById('idPaciente').value;
        await handleSubmit(event, `http://localhost:8081/paciente/deletar/${idPaciente}`, 'DELETE', 'Falha ao deletar paciente.');
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
                localStorage.setItem('mensagemBoasVindas', respostaTexto);
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

    const mensagemBoasVindas = localStorage.getItem('mensagemBoasVindas');
    if (mensagemBoasVindas) {
        const elementoMensagem = document.getElementById('mensagemBoasVindas');
        elementoMensagem.textContent = mensagemBoasVindas;
        elementoMensagem.style.display = 'block';
        localStorage.removeItem('mensagemBoasVindas');
    }
});
