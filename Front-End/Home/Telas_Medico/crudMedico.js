function createNewUser() {

    fetch("http://localhost:8081/medico/criar", {
        headers: {        
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            nome: document.querySelector('.nome').value
        })
    })

    .then(function (res) {
        if (res.ok) {
            alert('Novo Medico cadastrado!');
            window.history.back;
        } else {
            console.error('Ocorreu um erro ao fazer o cadastro:', res.statusText);
            alert('Ocorreu um erro ao realizar o cadastro.');
        }
    })
    .catch(function (error) {
        console.error('Erro ao fazer o cadastro:', error);
        alert('Ocorreu um erro ao fazer o cadastro.');
    });
}

function listarMedicos() {
    return fetch("http://localhost:8080/medico/listar")
    .then(response => response.json())
    .then(data => {
        console.log("Lista de medicos:", data);
        return data;
    })
    .catch(error => {
        console.error("Erro ao listar medicos:", error);
        throw error;
    });
}