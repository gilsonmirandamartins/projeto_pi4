function createNewMedico() {
    const nMedico = document.querySelector('.nome').value

    fetch("http://localhost:8081/medico/criar", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            nomeMedico: nMedico
        })
    })
        .then(function (res) {
            if (res.ok) {
                return res.json();  // Converte a resposta para JSON
            } else {
                console.error('Ocorreu um erro ao fazer o cadastro:', res.statusText);
                alert('Ocorreu um erro ao realizar o cadastro.');
                throw new Error('Erro ao fazer o cadastro');
            }
        })
        .then(function (data) {
            alert(`Médico '${data.nomeMedico}' cadastrado com sucesso. Seu ID é ${data.idMedico}.`);
            location.reload();
        })
        .catch(function (error) {
            console.error('Erro ao fazer o cadastro:', error);
            alert('Ocorreu um erro ao fazer o cadastro.');
        });
}

function getAllMedico() {
    fetch("http://localhost:8081/medico/listar")
        .then(response => response.json())
        .then(data => {
            const userNames = data.map(user => user.nomeMedico);
            const userDataElement = document.getElementById('userAtt');
            userDataElement.innerHTML = userNames.join("<br>");
        })
        .catch(error => console.error('Erro ao recuperar lista de medicos:', error));
}

function editarMedico() {
    const idAtual = document.getElementById('idAtual').value;
    const nomeAtual = document.getElementById('nomeAtual').value;
    const novoNome = document.getElementById('novoNome').value;

    fetch(`http://localhost:8081/medico/editar?idAtual=${idAtual}&nomeAtual=${nomeAtual}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nomeMedico: novoNome
        })
    })
        .then(function (res) {
            if (res.ok) {
                alert('Médico foi atualizado com sucesso!');
                window.history.back();
            } else {
                console.error('Ocorreu um erro ao atualizar o médico:', res.statusText);
                alert('Ocorreu um erro ao atualizar o médico.');
            }
        })
        .catch(error => console.error('Erro ao atualizar médico:', error));
}

function deleteMedico() {
    const nomeMedico = document.getElementById('nomeMedico').value;

    fetch(`http://localhost:8081/medico/deletar/${nomeMedico}`, {
        method: 'DELETE',
    })
        .then(function (res) {
            if (res.ok) {
                alert('Medico deletado com sucesso!');
                location.reload()
            } else {
                console.error('Ocorreu um erro ao deletar o medico:', res.statusText);
                alert('Ocorreu um erro ao deletar o medico.');
            }
        })
        .catch(error => console.error('Erro ao deletar o medico:', error));
}

function fazerLogin() {
    const idMedico = document.getElementById('idMedico').value;
    const nomeMedico = document.getElementById('nomeMedico').value;

    fetch(`http://localhost:8081/medico/verificar?id=${idMedico}&nome=${nomeMedico}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Falha ao verificar médico');
            }
        })
        .then(data => {

            if (data.nomeMedico === nomeMedico) {

                window.location.href = 'http://127.0.0.1:5500/Front-End/Home/Telas_Medico/Crud_Medico.html';
            } else {
                alert('Nome do médico não corresponde ao ID fornecido.');
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert('Ocorreu um erro ao fazer login.');
        });

 // Função para listar pacientes
async function listarPacientes() {
    console.log("Botão de listar pacientes clicado"); // Log para verificação
    try {
        const response = await fetch('http://localhost:8081/paciente/listar');
        if (response.ok) {
            console.log("Resposta recebida com sucesso"); // Log para verificação
            const pacientes = await response.json();
            console.log("Pacientes:", pacientes); // Log para verificação
            const listaPacientesElement = document.getElementById('pacientes');
            listaPacientesElement.innerHTML = '';
            pacientes.forEach(paciente => {
                const listItem = document.createElement('li');
                listItem.textContent = `Nome: ${paciente.nome}, Documento: ${paciente.documento}`;
                listaPacientesElement.appendChild(listItem);
            });
        } else {
            console.error('Falha ao buscar pacientes.');
        }
    } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
    }
}

// Adicione o evento ao botão listarPacientesBtn
document.addEventListener('DOMContentLoaded', () => {
    const listarPacientesBtn = document.getElementById('listarPacientesBtn');
    if (listarPacientesBtn) {
        listarPacientesBtn.addEventListener('click', listarPacientes);
        console.log("Evento de clique adicionado ao botão listarPacientesBtn"); // Log para verificação
    } else {
        console.error("Botão listarPacientesBtn não encontrado"); // Log para verificação
    }
});
}
