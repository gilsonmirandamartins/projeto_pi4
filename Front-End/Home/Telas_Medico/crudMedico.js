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
            alert('Novo Medico cadastrado!');
            window.history.back();
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

function getAllMedico() {
    fetch("http://localhost:8081/medico/listar")
        .then(response => response.json())
        .then(data => {
            const userNames = data.map(user => user.nomeMedico);
            const userDataElement = document.getElementById('userAtt');
            userDataElement.innerHTML = userNames.join("<br>");
        })
        .catch(error => console.error('Erro ao recuperar lista de usuários:', error));
}