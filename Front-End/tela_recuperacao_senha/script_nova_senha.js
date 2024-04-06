document.addEventListener('DOMContentLoaded', function () {
    const nomeUsuario = sessionStorage.getItem('nomeUsuario');
    if (nomeUsuario) {
        document.getElementById('nomeUsuario').innerText = nomeUsuario;
    }

    const form = document.getElementById('alterarSenhaForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const novaSenha = document.getElementById('novaSenha').value;

            fetch("http://localhost:8081/usuarios/alterar-senha", {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login: nomeUsuario, novaSenha: novaSenha })
})

                .then(response => {
                    if (!response.ok) {
                        throw new Error('Falha ao alterar a senha.');
                    }
                    return response.text();
                })
                .then(resposta => {
                    alert(resposta);
                })
                .catch(error => {
                    console.error('Erro ao alterar a senha:', error);
                    alert('Ocorreu um erro ao alterar a senha. Por favor, tente novamente mais tarde.');
                });
        });
    } else {
        console.error('Formulário de alteração de senha não encontrado.');
    }
});
