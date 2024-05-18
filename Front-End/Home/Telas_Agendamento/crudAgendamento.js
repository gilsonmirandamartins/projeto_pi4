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
        .catch(error => console.error('Erro ao recuperar lista de Agendamentos:', error));
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