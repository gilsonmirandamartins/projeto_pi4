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