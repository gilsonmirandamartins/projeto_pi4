document.addEventListener('DOMContentLoaded', function () {
    const formSenha = document.querySelector(".Tela_novaSenha form");
    const mensagem = document.getElementById("mensagem");

    if (formSenha && mensagem) {
        formSenha.addEventListener('submit', function (event) {
            event.preventDefault();

            const novaSenhaInput = document.getElementById('novaSenha');
            if (!novaSenhaInput) {
                console.error('Elemento novaSenha não encontrado.');
                return;
            }

            const novaSenha = novaSenhaInput.value;
            const login = localStorage.getItem('login'); // Recupera o login armazenado

            const data = {
                login: login,
                novaSenha: novaSenha
            };

            fetch("http://localhost:8081/usuarios/alterar-senha", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return response.text().then(text => Promise.reject(text));
                }
            })
            .then(message => {
                mensagem.innerHTML = message;
            })
            .catch(error => {
                mensagem.innerHTML = error;
            });
        });
    } else {
        console.error('Elementos formSenha ou mensagem não encontrados.');
    }
});
