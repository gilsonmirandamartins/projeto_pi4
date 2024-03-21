document.addEventListener('DOMContentLoaded', function () {
    const formSenha = document.getElementById("formSenha");
    const mensagem = document.getElementById("mensagem");

    formSenha.addEventListener('submit', function (event) {
        event.preventDefault();

        const novaSenha = document.getElementById('novaSenha').value;

        // Dados que serão enviados para o backend
        const data = {
            novaSenha: novaSenha
        };

        // Enviar os dados para o backend
        fetch("http://localhost:8081/usuarios/alterar-senha", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.text(); // Retornar a resposta do servidor
            } else {
                return response.text().then(text => Promise.reject(text)); // Rejeitar a promessa com a mensagem de erro do servidor
            }
        })
        .then(message => {
            // Exibir mensagem de sucesso
            mensagem.innerHTML = message;
        })
        .catch(error => {
            // Exibir mensagem de erro
            mensagem.innerHTML = error;
        });
    });
});
