function criarAgendamento(agendamentoData) {
    return fetch("http://localhost:8080/agendamento", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(agendamentoData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Agendamento criado com sucesso:", data);
        return data;
    })
    .catch(error => {
        console.error("Erro ao criar agendamento:", error);
        throw error;
    });
}

function obterAgendamentoPorId(agendamentoId) {
    return fetch(`http://localhost:8080/agendamento/${agendamentoId}`)
    .then(response => response.json())
    .then(data => {
        console.log("Agendamento encontrado:", data);
        return data;
    })
    .catch(error => {
        console.error("Erro ao obter agendamento por ID:", error);
        throw error;
    });
}

function listarAgendamentos() {
    return fetch("http://localhost:8080/agendamento/listar")
    .then(response => response.json())
    .then(data => {
        console.log("Lista de agendamentos:", data);
        return data;
    })
    .catch(error => {
        console.error("Erro ao listar agendamentos:", error);
        throw error;
    });
}

// Implemente operações CRUD adicionais conforme necessário para Agendamento
