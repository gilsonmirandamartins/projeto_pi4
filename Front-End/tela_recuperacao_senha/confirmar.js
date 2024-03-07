
const confirmacao = document.querySelector("Form")

const Ilogin = document.querySelector(".login");
const IdataNasc = document.querySelector(".nascimento");
const Isenha = document.querySelector(".senha");

function confirmar (){



}


function limpar (){
    Ilogin.value = "";
    Isenha.value = "";
    IdataNasc.value = "";
}

confirmacao.addEventListener('submit', function (event){
    event.preventDefault();

    confirmar();
    
});