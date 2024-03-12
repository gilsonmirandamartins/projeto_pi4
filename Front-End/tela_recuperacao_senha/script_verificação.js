document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("recoverForm");

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const login = document.getElementById('login').value;
        const nascimento = document.getElementById('nascimento').value;

        // Enviar dados para o servidor
        fetch('http://localhost:8081/recuperar-senha', {
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
            document.getElementById("resultado").innerHTML = resposta;

            // Verificar se a resposta foi bem-sucedida antes de redirecionar
            if (resposta.includes("Acesso liberado")) {
                // Redirecionar para a próxima página
                window.location.href = "/Front-End/tela_recuperacao_senha/nova_senha.html";
            } else {
                console.log('Recuperação de senha falhou');
            }
        })
        .catch(error => {
            console.error('Erro ao recuperar senha:', error);
            alert('Ocorreu um erro ao recuperar a senha. Por favor, tente novamente mais tarde.');
        });
    });
});
