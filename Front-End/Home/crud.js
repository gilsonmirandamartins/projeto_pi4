function updateUser() {
    const newName = document.getElementById('newName').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPassword = document.getElementById('newPassword').value;

    const updatedUser = {
        nome: newName,
        login: newEmail,
        senha: newPassword
    };

    fetch(`http://localhost:8081/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Usuário atualizado:', data);
        // Atualize a interface do usuário conforme necessário
    })
    .catch(error => console.error('Erro ao atualizar usuário:', error));
}
