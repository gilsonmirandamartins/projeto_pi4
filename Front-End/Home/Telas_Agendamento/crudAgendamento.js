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
            const userNames = data.map(user => user.nomePaciente);
            const clinica = data.map(clinica => clinica.clinica);
            const status = data.map(status => status.status);
            const idMedico = data.map(agendamento => agendamento.medico.idMedico);
            const DataHoraAgendamento = data.map(DataHoraAgendamento => DataHoraAgendamento.dataHoraAgendamento);

            const dataElementPaciente = document.getElementById('NomePaciente');
            const dataElementclinica = document.getElementById('clinica');
            const dataElementstatus = document.getElementById('status');
            const dataElementidMedico = document.getElementById('idMedico');
            const dataElementDataHoraAgendamento = document.getElementById('DataHoraAgendamento');
            
            dataElementPaciente.innerHTML = userNames.join("<br>");
            dataElementclinica.innerHTML = clinica.join("<br>");
            dataElementstatus.innerHTML = status.join("<br>");
            dataElementidMedico.innerHTML = idMedico.join("<br>");
            dataElementDataHoraAgendamento.innerHTML = DataHoraAgendamento.join("<br>");
        })
        .catch(error => console.error('Erro ao recuperar lista de usuários:', error));
}

function editarAgendamento() {
    const idAgendamentoElement = document.getElementById('idAgendamento');
    const nomePacienteElement = document.getElementById('nomePaciente');
    const emailElement = document.getElementById('email');
    const clinicaElement = document.getElementById('selectClinica');
    const idMedicoElement = document.getElementById('idMedico');
    const statusElement = document.getElementById('selectStatus');
    const dataHoraAgendamentoElement = document.getElementById('dataHoraAgendamento')
    const dataCadastro = new Date().toISOString();

    // Formatando a data e hora corretamente
    const formattedDataHoraAgendamento = new Date(novaDataHoraAgendamento).toISOString();

    fetch(`http://localhost:8081/agendamento/editar/${idAgendamento}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nomePaciente: novoNomePaciente,
            email: novoEmail,
            status: novoStatus,
            clinica: novaClinica,
            medico: {
                idMedico: novoIdMedico
            },
            dataHoraAgendamento: formattedDataHoraAgendamento,
            dataCadastro: dataCadastro
        })
    })
    .then(function (res) {
        if (res.ok) {
            alert('Agendamento atualizado com sucesso!');
            window.history.back();
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
