document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');


    fetch(`http://localhost:8081/users/${userId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao recuperar dados do usuário.');
            }
        })
        .then(data => {
            const userDataContainer = document.getElementById('userDataContainer');
            userDataContainer.innerHTML = `
                <p>Nome: ${data.nome}</p>
                <p>Login: ${data.login}</p>
                <p>Data de Nascimento: ${data.dataNascimento}</p>
                <p>Data de Cadastro: ${data.dataCadastro}</p>
                <p>Ativo: ${data.ativo ? 'Sim' : 'Não'}</p>
            `;
        })
        .catch(error => {
            console.error('Erro:', error);
            const userDataContainer = document.getElementById('userDataContainer');
            userDataContainer.innerHTML = `<p>Ocorreu um erro ao carregar os dados do usuário.</p>`;
        });

function createUser(nome, login, senha) {
    const newUser = {
        nome: nome,
        login: login,
        senha: senha
    };

    fetch('http://localhost:8081/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Novo usuário criado:', data);
    })
    .catch(error => console.error('Erro ao criar usuário:', error));
}

function updateUser(id, nome, login, senha) {
    const updatedUser = {
        nome: nome,
        login: login,
        senha: senha
    };

    fetch(`http://localhost:8081/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Usuário atualizado:', data);
    })
    .catch(error => console.error('Erro ao atualizar usuário:', error));
}

});

