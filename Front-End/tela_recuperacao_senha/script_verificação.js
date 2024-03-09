        document.getElementById("recoverForm").addEventListener("submit", function(event) {
            event.preventDefault();
            var login = document.getElementById("login").value;
            var nascimento = document.getElementById("nascimento").value;
            
            // Enviar dados para o servidor
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:8081/usuarios", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var resposta = JSON.parse(xhr.responseText);
                    document.getElementById("resultado").innerHTML = resposta.mensagem;
                }
            };
            xhr.send(JSON.stringify({ login: login, nascimento: nascimento }));
        });
    