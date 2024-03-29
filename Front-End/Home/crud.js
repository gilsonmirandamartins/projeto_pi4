const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

fetch(`http://localhost:8081/users/${userId}`)
    .then(response => response.json())
    .then(data => {
        const userDataElement = document.getElementById('userData');
        userDataElement.innerText = `Nome: ${data.nome},
                Login: ${data.login},
                Data de Nascimento: ${data.dataNascimento},
                Data de Cadastro: ${data.dataCadastro},
                Ativo: ${data.ativo ? 'Sim' : 'Não'} `;
    })
    .catch(error => console.error('Erro ao recuperar dados do usuário:', error));

function enableEdit() {
    const userDataContainer = document.getElementById('userDataContainer');
    userDataContainer.innerHTML = '';


    const newNameInput = document.createElement('input');
    newNameInput.type = 'text';
    newNameInput.id = 'newName';
    newNameInput.placeholder = 'Novo Nome';

    const newEmailInput = document.createElement('input');
    newEmailInput.type = 'text';
    newEmailInput.id = 'newEmail';
    newEmailInput.placeholder = 'Novo Email';

    const newPasswordInput = document.createElement('input');
    newPasswordInput.type = 'password';
    newPasswordInput.id = 'newPassword';
    newPasswordInput.placeholder = 'Nova Senha';

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirmar Atualização';
    confirmButton.onclick = updateUser;


    userDataContainer.appendChild(newNameInput);
    userDataContainer.appendChild(newEmailInput);
    userDataContainer.appendChild(newPasswordInput);
    userDataContainer.appendChild(confirmButton);
}



const Inome = document.querySelector('.nome');
const Ilogin = document.querySelector('.login');
const Isenha = document.querySelector('.senha');
const IdataNasc = document.querySelector('.dataNasc');
const Iativo = document.querySelector('.ativo');

function createNewUser() {
    const dataCadastro = new Date();

    const ativoValue = document.querySelector('.ativo').value === "true";

    fetch("http://localhost:8081/users", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            nome: document.querySelector('.nome').value,
            senha: document.querySelector('.senha').value,
            login: document.querySelector('.login').value,
            dataNascimento: document.querySelector('.dataNasc').value,
            dataCadastro: dataCadastro.toISOString(),
            ativo: ativoValue
        })
    })

    .then(function (res) {
        if (res.ok) {
            alert('Usuário criado com sucesso!');
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

function getAllUsers() {
    fetch("http://localhost:8081/users")
        .then(response => response.json())
        .then(data => {
            document.getElementById('userData').innerHTML = "";

            
            data.forEach(user => {
                const userInfo = document.createElement('p');
                userInfo.textContent = `ID: ${user.id}, Nome: ${user.nome}, Login: ${user.login}`;
                document.getElementById('userData').appendChild(userInfo);
            });
        })
        .catch(error => console.error('Erro ao obter lista de usuários:', error));
}


function updateUser() {
    const nome = document.getElementById('newName').value;
    const email = document.getElementById('newEmail').value;
    const senha = document.getElementById('newPassword').value;

    const updatedUser = {
        nome: nome,
        login: email,
        senha: senha
    };

    fetch(`http://localhost:8081/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })
        .then(function (res) {
            if (res.ok) {
                alert('Usuário atualizado com sucesso!');
                window.history.back(); // Voltar para a página anterior
            } else {
                console.error('Ocorreu um erro ao atualizar o usuário:', res.statusText);
                alert('Ocorreu um erro ao atualizar o usuário.');
            }
        })
        .catch(error => console.error('Erro ao atualizar usuário:', error));
}


