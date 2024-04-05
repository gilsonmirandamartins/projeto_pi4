//Utilizar o ip armazenado
const userId = window.localStorage.getItem('userId');

fetch(`http://localhost:8081/users/${userId}`)
    .then(response => response.json())
    .then(data => {
        const userDataElement = document.getElementById('userData');

        const userInfo = `
            <div>
                <label>Nome:</label>
                <p>${data.nome}</p>
            </div>
            <div>
                <label>Login:</label>
                <p>${data.login}</p>
            </div>
            <div>
                <label>Data de Nascimento:</label>
                <p>${data.dataNascimento}</p>
            </div>
            <div>
                <label>Data de Cadastro:</label>
                <p>${data.dataCadastro}</p>
            </div>
            <div>
                <label>Ativo:</label>
                <p>${data.ativo ? 'Sim' : 'Não'}</p>
            </div>
        `;

        userDataElement.innerHTML = userInfo;
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
            alert('Novo usuário cadastrado!');
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
                window.history.back();
            } else {
                console.error('Ocorreu um erro ao atualizar o usuário:', res.statusText);
                alert('Ocorreu um erro ao atualizar o usuário.');
            }
        })
        .catch(error => console.error('Erro ao atualizar usuário:', error));
}

function deleteUser(nome) {
    fetch(`http://localhost:8081/users/nome/${nome}`, {
        method: 'DELETE',
    })
    .then(function (res) {
        if (res.ok) {
            alert('Usuário deletado com sucesso!');
            window.location.href = 'http://127.0.0.1:5500/Front-End/Tela_Login/index.html';
        } else {
            console.error('Ocorreu um erro ao deletar o usuário:', res.statusText);
            alert('Ocorreu um erro ao deletar o usuário.');
        }
    })
    .catch(error => console.error('Erro ao deletar usuário:', error));
}


function getAllUsers() {
    fetch("http://localhost:8081/users")
        .then(response => response.json())
        .then(data => {
            const userNames = data.map(user => user.nome);
            const userDataElement = document.getElementById('userAtt');
            userDataElement.innerHTML = userNames.join("<br>");
        })
        .catch(error => console.error('Erro ao recuperar lista de usuários:', error));
}

function Redirecionar(){
    window.location.href = `http://127.0.0.1:5500/Front-End/Home/Tela_InfoUsuario/Tela_InfoUsuario.html?userId=${userId}`
}

function logout(){
    window.localStorage.removeItem('userId');
    window.location.href = 'http://127.0.0.1:5500/Front-End/Tela_Login/index.html';
}