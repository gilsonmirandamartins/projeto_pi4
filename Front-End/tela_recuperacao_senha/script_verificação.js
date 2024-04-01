document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("recoverForm");

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const login = document.getElementById('login').value;
            const nascimento = document.getElementById('nascimento').value;

            fetch("http://localhost:8081/usuarios/recuperar-senha", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: login, dataNascimento: nascimento })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Credenciais inválidas para recuperação de senha.');
                    }
                    return response.json();
                })
                .then(resposta => {
                    if (resposta.message.includes("Acesso liberado")) {
                        sessionStorage.setItem('nomeUsuario', resposta.nome);
                        window.location.href = "http://127.0.0.1:5500/Front-End/tela_recuperacao_senha/nova_senha.html";
                    } else {
                        console.log('Recuperação de senha falhou');
                    }
                })
                
                .catch(error => {
                    console.error('Erro ao recuperar senha:', error);
                    alert('Ocorreu um erro ao recuperar a senha. Por favor, tente novamente mais tarde.');
                });
        });
    } else {
        console.error('Elemento recoverForm não encontrado.');
    }
});
