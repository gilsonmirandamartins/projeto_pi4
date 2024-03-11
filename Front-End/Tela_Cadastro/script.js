document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector("form");
    const Inome = document.querySelector(".nome");
    const Ilogin = document.querySelector(".login");
    const Isenha = document.querySelector(".senha");
    const IdataNasc = document.querySelector(".dataNasc");
    const Idataregistro = document.querySelector(".dataRegistro");
    const Iativo = document.querySelector(".ativo");

function cadastrar() {
    const dataCadastro = new Date();  // para data e hora atual

    const ativoValue = Iativo.value === "true"; // Converte para booleano

    fetch("http://localhost:8081/usuarios", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            nome: Inome.value,
            senha: Isenha.value,
            login: Ilogin.value,
            dataNascimento: IdataNasc.value,
            dataCadastro: dataCadastro.toISOString(), // Converte a data
            ativo: ativoValue
        })
    })

    // Após o cadastro ser feito corretamente, ira redirecionar para a tela de login
    .then(function (res) {
        if (res.ok) {
            window.location.href = "http://127.0.0.1:3000/Front-End/Tela_Login/index.html";
        } else {
            console.error('Ocorreu um erro ao fazer o cadastro:', res.statusText);
            alert('Ocorreu um erro ao realizar o cadastro.');
        }
    })
    .catch(function (error) {
        console.error('Erro ao fazer o cadastro:', error);
        alert('Ocorreu um erro ao fazer o cadastro.');
    });
}

    function limpar() {
        Inome.value = "";
        Ilogin.value = "";
        Isenha.value = "";
        IdataNasc.value = "";
        Idataregistro.value = "";
    }

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        cadastrar();
        limpar();
    });
});

