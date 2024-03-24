const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');

        fetch(`http://localhost:8081/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                const userDataElement = document.getElementById('userData');
                userDataElement.innerText = `Nome: ${data.nome},
                Login: ${data.login},
                Data de Nascimento: ${data.dataNascimento},
                Data de Cadastro: ${data.dataCadastro},
                Ativo: ${data.ativo ? 'Sim' : 'Não'} `;
            })
            .catch(error => console.error('Erro ao recuperar dados do usuário:', error));

        function enableEdit() {
            const userDataContainer = document.getElementById('userDataContainer');
            userDataContainer.innerHTML = ''; // Limpa o conteúdo atual
            
            // Adiciona campos de entrada para edição
            const newNameInput = document.createElement('input');
            newNameInput.type = 'text';
            newNameInput.id = 'newName';
            newNameInput.placeholder = 'Novo Nome';

            const newEmailInput = document.createElement('input');
            newEmailInput.type = 'text';
            newEmailInput.id = 'newEmail';
            newEmailInput.placeholder = 'Novo Email';

            const newPasswordInput = document.createElement('input');
            newPasswordInput.type = 'password';
            newPasswordInput.id = 'newPassword';
            newPasswordInput.placeholder = 'Nova Senha';

            const confirmButton = document.createElement('button');
            confirmButton.textContent = 'Confirmar Atualização';
            confirmButton.onclick = updateUser;

            // Adiciona os campos e botão à página
            userDataContainer.appendChild(newNameInput);
            userDataContainer.appendChild(newEmailInput);
            userDataContainer.appendChild(newPasswordInput);
            userDataContainer.appendChild(confirmButton);
        }

        function createNewUser() {
            const newName = document.getElementById('newUserName').value;
            const newEmail = document.getElementById('newUserEmail').value;
            const newPassword = document.getElementById('newUserPassword').value;
            const newDateOfBirth = document.getElementById('newUserDateOfBirth').value;
            
            // Converta a data de nascimento para o formato ISO
            const formattedDateOfBirth = new Date(newDateOfBirth).toISOString();
            
            // Se você quiser incluir a data de cadastro como a data atual
            const currentDate = new Date();
            const formattedCurrentDate = currentDate.toISOString();
        
            const newUser = {
                nome: newName,
                login: newEmail,
                senha: newPassword,
                dataNascimento: formattedDateOfBirth, // Utilize a data formatada
                dataCadastro: formattedCurrentDate // Utilize a data formatada
            };
        
            fetch('http://localhost:8081/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Novo usuário criado:', data);
                // Faça o que for necessário após a criação do usuário, como atualizar a interface
            })
            .catch(error => console.error('Erro ao criar novo usuário:', error));
        }
        
        

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
                location.reload(); // Isso recarregará a página
            })
            .catch(error => console.error('Erro ao atualizar usuário:', error));
        }
        
        