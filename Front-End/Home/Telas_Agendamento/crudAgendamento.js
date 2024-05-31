function criarAgendamento() {
    const nomePaciente = document.querySelector('.nomePaciente').value;
    const email = document.querySelector('.email').value;
    const clinica = document.getElementById('clinicaSelect').value;
    const idMedico = document.getElementById('idmedico').value;
    const status = 'AGENDADO';
    const dataHoraAgendamento = document.querySelector('input[name="dataHoraAgendamento"]').value;
    const dataCadastro = new Date().toISOString();

    fetch("http://localhost:8081/agendamento/criar", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomePaciente: nomePaciente,
            email: email,
            status: status,
            clinica: clinica,
            medico: {
                idMedico: idMedico,
                nomeMedico: null
            },
            dataHoraAgendamento: dataHoraAgendamento,
            dataCadastro: dataCadastro
        })
    })
    .then(function (res) {
        if (res.ok) {
            return res.text().then(message => {
                alert(message);
                window.history.back();
            });
        } else {
            return res.text().then(errorData => {
                console.error('Erro ao fazer o agendamento:', errorData);
                alert('Ocorreu um erro ao realizar o agendamento: ' + errorData);
            });
        }
    })
    .catch(function (error) {
        console.error('Erro ao fazer o agendamento:', error);
        alert('Ocorreu um erro ao fazer o agendamento.');
    });
}

function getAllAgendamentos() {
    fetch("http://localhost:8081/agendamento/listar")
        .then(response => response.json())
        .then(data => {
            const nomesPacientes = data.map(agendamento => agendamento.nomePaciente || "");
            const clinicas = data.map(agendamento => agendamento.clinica || "");
            const status = data.map(agendamento => agendamento.status || "");
            const nomesMedicos = data.map(agendamento => agendamento.nomeMedico || "");
            const datasHorasAgendamento = data.map(agendamento => agendamento.dataHoraAgendamento || "");

            const elementoNomePaciente = document.getElementById('NomePaciente');
            const elementoClinica = document.getElementById('clinica');
            const elementoStatus = document.getElementById('status');
            const elementoNomeMedico = document.getElementById('NomeMedico');
            const elementoDataHoraAgendamento = document.getElementById('DataHoraAgendamento');

            elementoNomePaciente.innerHTML = nomesPacientes.join("<br>");
            elementoClinica.innerHTML = clinicas.join("<br>");
            elementoStatus.innerHTML = status.join("<br>");
            elementoNomeMedico.innerHTML = nomesMedicos.join("<br>");
            elementoDataHoraAgendamento.innerHTML = datasHorasAgendamento.join("<br>");
        })
        .catch(error => console.error('Erro ao recuperar lista de Agendamentos:', error));
}

function obterNomeMedicoPorId(idMedico) {
    return fetch(`http://localhost:8081/medico/${idMedico}`)
        .then(response => response.json())
        .then(data => data.nomeMedico)
        .catch(error => {
            console.error(`Erro ao obter o nome do médico com o ID ${idMedico}:`, error);
            return ""; // Retorna uma string vazia em caso de erro
        });
}

function editarAgendamento() {
    const idAgendamento = document.getElementById('idAgendamento').value;
    const nomePaciente = document.getElementById('nomePaciente').value;
    const email = document.getElementById('email').value;
    const clinica = document.getElementById('selectClinica').value;
    const idMedico = document.getElementById('idMedico').value;
    const status = document.getElementById('selectStatus').value;
    const dataHoraAgendamento = document.getElementById('dataHoraAgendamento').value;
    const dataCadastro = new Date().toISOString();

    const formattedDataHoraAgendamento = new Date(dataHoraAgendamento).toISOString();

    fetch(`http://localhost:8081/agendamento/editar/${idAgendamento}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nomePaciente: nomePaciente,
            email: email,
            status: status,
            clinica: clinica,
            medico: {
                idMedico: idMedico
            },
            dataHoraAgendamento: formattedDataHoraAgendamento,
            dataCadastro: dataCadastro
        })
    })
    .then(function (res) {
        if (res.ok) {
            alert('Agendamento atualizado com sucesso!');
            location.reload()
        } else {
            return res.text().then(errorData => {
                console.error('Ocorreu um erro ao atualizar o agendamento:', errorData);
                alert('Ocorreu um erro ao atualizar o agendamento: ' + errorData);
            });
        }
    })
    .catch(error => {
        console.error('Erro ao atualizar agendamento:', error);
        alert('Ocorreu um erro ao atualizar o agendamento.');
    });
}

function deleteAgendamento() {
    const idAgendamento = document.getElementById('IdAgendamento').value;

    fetch(`http://localhost:8081/agendamento/deletar/${idAgendamento}`, {
        method: 'DELETE',
    })
    .then(function (res) {
        if (res.ok) {
            alert('Agendamento deletado com sucesso!');
            location.reload()
        } else {
            console.error('Ocorreu um erro ao deletar o agendamento:', res.statusText);
            alert('Ocorreu um erro ao deletar o agendamento.');
        }
    })
    .catch(error => console.error('Erro ao deletar agendamento:', error));
}