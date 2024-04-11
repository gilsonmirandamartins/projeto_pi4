document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("editarSenhaForm");

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const novaSenha = document.getElementById('novaSenha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;

            // Verificar se as senhas correspondem
            if (novaSenha !== confirmarSenha) {
                alert('As senhas não correspondem. Por favor, tente novamente.');
                return;
            }

            // Enviar solicitação para alterar a senha
            fetch("http://localhost:8081/usuarios/alterar-senha", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ novaSenha: novaSenha })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao alterar a senha.');
                }
                return response.text();
            })
            .then(resposta => {
                alert(resposta);
                // Redirecionar para uma página de sucesso ou atualizar a interface de usuário conforme necessário
                window.location.href = "sucesso.html"; // Substitua "sucesso.html" pelo nome da sua página de sucesso
            })
            .catch(error => {
                console.error('Erro ao alterar a senha:', error);
                alert('Ocorreu um erro ao alterar a senha. Por favor, tente novamente mais tarde.');
            });
        });
    } else {
        console.error('Elemento editarSenhaForm não encontrado.');
    }
});
