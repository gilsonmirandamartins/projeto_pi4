// const formulario = document.querySelector("form");
const Iemail = document.getElementById("in1"); // Corrigido para usar getElementById
const Isenha = document.getElementById("in2");
const formulario = document.getElementById("formulario");

function logar(){
    fetch("http://localhost:8080/logar",
    {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            email: Iemail.value,
            senha: Isenha.value,
            
        })
    })
    .then(function(res) {console.log(res) })
    .catch(function (res) {console.log(res) })
};

function limpar(){
    Iemail.value = "" ;
    Isenha.value = "" ;
};

formulario.addEventListener('submit', function (event){
    event.preventDefault();

    logar();
    
});


function toggleSenha() {
    var in2Input = document.getElementById("in2");

    if (in2Input.type === "password") {
        in2Input.type = "text";
    } else {
        in2Input.type = "password";
    }
}
  