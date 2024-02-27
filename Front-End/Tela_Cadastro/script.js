document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector("form");
    const Inome = document.querySelector(".nome");
    const Ilogin = document.querySelector(".login");
    const Isenha = document.querySelector(".senha");
    const IdataNasc = document.querySelector(".dataNasc");
    const Idataregistro = document.querySelector(".dataRegistro");

    function cadastrar() {
        fetch("http://localhost:8081/usuarios", { //Conexão com a api
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ //variavés em conformidade com a api, não esquecer da logica do ATIVO
                nome: Inome.value,
                senha: Isenha.value,
                login: Ilogin.value,
                dataNasc: IdataNasc.value,
                dataRegistro: Idataregistro.value,
            })
        })
            .then(function (res) { console.log(res) })
            .catch(function (res) { console.log(res) });
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

