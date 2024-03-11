document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector("form");

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('in1').value;
        const password = document.getElementById('in2').value;

        // Enviar os dados de login para o backend
        fetch(  'http://localhost:8081/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: username, senha: password })
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "http://127.0.0.1:5500/Front-End/Home/home.html"
            } else {
                alert('Credenciais inválidas. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
        });
    });
});

function toggleSenha() {
    var in2Input = document.getElementById("in2");
    var icon = document.getElementById("icon");

    if (in2Input.type === "password") {
        in2Input.type = "text";
        icon.classList.add("hide");
    } else {
        in2Input.type = "password";
        icon.classList.remove("hide");
    }
}