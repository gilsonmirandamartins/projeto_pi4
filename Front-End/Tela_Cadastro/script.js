document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector("form");
    const Inome = document.querySelector(".nome");
    const Ilogin = document.querySelector(".login");
    const Isenha = document.querySelector(".senha");
    const IdataNasc = document.querySelector(".dataNasc");
    const Idataregistro = document.querySelector(".dataRegistro");
    const Iativo = document.querySelector(".ativo");

function cadastrar() {
    const dataCadastro = new Date();

    const ativoValue = Iativo.value === "true";

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
            dataCadastro: dataCadastro.toISOString(),
            ativo: ativoValue
        })
    })

    .then(function (res) {
        if (res.ok) {
            window.history.back();
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

