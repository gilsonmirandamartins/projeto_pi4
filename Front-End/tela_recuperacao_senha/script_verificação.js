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
            document.getElementById("resultado").innerHTML = resposta.mensagem;
        
            // Verificar se a resposta foi bem-sucedida antes de redirecionar
            if (resposta.sucesso === "false") {
                console.log('Recuperação de senha falhou');
            } else {
                // Redirecionar para a nova página
                window.location.href = "http://127.0.0.1:5500/Front-End/tela_recuperacao_senha/nova_senha.html";
            }
        })
        
        .catch(error => {
            console.error('Erro ao recuperar senha:', error);
            alert('Ocorreu um erro ao recuperar a senha. Por favor, tente novamente mais tarde.');
        });
    });
});
