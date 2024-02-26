const formulario = document.querySelector("form");
const Inome = document.querySelector(".nome");
const Iemail = document.querySelector(".email");
const Ilogin = document.querySelector(".login");
const IdtNasc = document.querySelector(".dtNasc");
const Isenha = document.querySelector(".senha");
const Itel = document.querySelector(".tel");


function cadastrar(){
    fetch("http://localhost:8080/cadastrar",
    {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            nome: Inome.value,
            email: Iemail.value,
            login: Ilogin.value,
            dtNasc: IdtNasc,
            senha: Isenha.value,
            telefone: Itel.value
        })
    })
    .then(function(res) {console.log(res) })
    .catch(function (res) {console.log(res) })
};

function limpar(){
    Inome.value = "" ;
    Iemail.value = "" ;
    Ilogin.value = "";
    IdtNasc.value ="";
    Isenha.value = "" ;
    Itel.value = "" ;
};

formulario.addEventListener('submit', function (event){
    event.preventDefault();

    cadastrar();
    
    limpar();
});
