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

});

