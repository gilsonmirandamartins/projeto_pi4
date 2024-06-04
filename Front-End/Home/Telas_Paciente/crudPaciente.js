document.addEventListener('DOMContentLoaded', () => {
    // Função para cadastro de paciente - Início
    const formCadastro = document.getElementById('formCadastroPaciente');

    const cadastrarPaciente = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log("Dados enviados:", data);

        try {
            const response = await fetch('http://localhost:8081/paciente/criar', {
                method: 'POST',
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
                mensagem.textContent = 'Falha ao cadastrar paciente.';
                mensagem.style.color = 'red';
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            const mensagem = document.getElementById('mensagem');
            mensagem.textContent = 'Erro de conexão.';
            mensagem.style.color = 'red';
        }
    };

    formCadastro?.addEventListener('submit', cadastrarPaciente);
    // Função para cadastro de paciente - Fim

    // Função para login de paciente - Início
    const formLogin = document.getElementById('formLoginPaciente');

    const loginPaciente = async (event) => {
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
    };

    formLogin?.addEventListener('submit', loginPaciente);
    // Função para login de paciente - Fim

    //Função para edição de paciente - Início
    const formEditar = document.getElementById('formEditarPaciente');

    const editarPaciente = async (event) => {
        event.preventDefault();

        const idPaciente = document.getElementById('idPaciente').value;
        const novoNome = document.getElementById('novoNome').value;
        const novoDocumento = document.getElementById('novoDocumento').value;
        const novoSexo = document.getElementById('novoSexo').value;
        const novaDataNascimento = document.getElementById('novaDataNascimento').value;

        const data = {
            nome: novoNome,
            documento: novoDocumento,
            sexo: novoSexo,
            dataNascimento: novaDataNascimento
        };

        try {
            const response = await fetch(`http://localhost:8081/paciente/editar/${idPaciente}`, {
                method: 'PUT',
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
                mensagem.textContent = 'Falha ao editar paciente.';
                mensagem.style.color = 'red';
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            const mensagem = document.getElementById('mensagem');
            mensagem.textContent = 'Erro de conexão.';
            mensagem.style.color = 'red';
        }
    };

    formEditar?.addEventListener('submit', editarPaciente);

    const formDeletar = document.getElementById('formDeletarPaciente');

    const deletarPaciente = async (event) => {
        event.preventDefault();

        const nomePaciente = document.getElementById('nomePacienteDeletar').value;

        try {
            const response = await fetch(`http://localhost:8081/paciente/deletar?nome=${nomePaciente}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const mensagem = document.getElementById('mensagem');
            if (response.ok) {
                const respostaTexto = await response.text();
                console.log('Paciente deletado com sucesso:', respostaTexto);
                mensagem.textContent = respostaTexto;
                mensagem.style.color = 'green';
            } else {
                const errorText = await response.text();
                console.error('Erro na resposta:', errorText);
                mensagem.textContent = 'Falha ao deletar paciente.';
                mensagem.style.color = 'red';
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            const mensagem = document.getElementById('mensagem');
            mensagem.textContent = 'Erro de conexão.';
            mensagem.style.color = 'red';
        }
    };

    formDeletar?.addEventListener('submit', deletarPaciente);

    // Mensagem de boas-vindas - Início
    const mensagemBoasVindas = localStorage.getItem('mensagemBoasVindas');
    if (mensagemBoasVindas) {
        const elementoMensagem = document.getElementById('mensagemBoasVindas');
        elementoMensagem.textContent = mensagemBoasVindas;
        elementoMensagem.style.display = 'block';
        localStorage.removeItem('mensagemBoasVindas');
    }
    // Mensagem de boas-vindas - Fim
});
