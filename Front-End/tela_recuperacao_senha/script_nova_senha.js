document.addEventListener('DOMContentLoaded', function () {
    const formSenha = document.getElementById("formSenha");
    const mensagem = document.getElementById("mensagem");

    formSenha.addEventListener('submit', function (event) {
        event.preventDefault();

        const novaSenha = document.getElementById('novaSenha').value;
        const data = {
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
});
