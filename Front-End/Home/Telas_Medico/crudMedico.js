//Criar Médico
function createNewMedico() {
    const nMedico = document.querySelector('.nome').value;

    fetch("http://localhost:8081/medico/criar", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            nomeMedico: nMedico
        })
    })
        .then(function (res) {
            if (res.ok) {
                return res.json();  // Converte a resposta para JSON
            } else {
                console.error('Ocorreu um erro ao fazer o cadastro:', res.statusText);
                alert('Ocorreu um erro ao realizar o cadastro.');
                throw new Error('Erro ao fazer o cadastro');
            }
        })
        .then(function (data) {
            alert(`Médico '${data.nomeMedico}' cadastrado com sucesso. Seu ID é ${data.idMedico}.`);
            location.reload();
        })
        .catch(function (error) {
            console.error('Erro ao fazer o cadastro:', error);
            alert('Ocorreu um erro ao fazer o cadastro.');
        });
}

//Listar Médico
function getAllMedico() {
    fetch("http://localhost:8081/medico/listar")
        .then(response => response.json())
        .then(data => {
            const userNames = data.map(user => user.nomeMedico);
            const userIds = data.map(user => user.idMedico);
            const elementoIdMedico = document.getElementById('IdMedico');
            const elementoNomeMedico = document.getElementById('NomeMedico');

            elementoIdMedico.innerHTML = userIds.join("<br>");
            elementoNomeMedico.innerHTML = userNames.join("<br>");
        })
        .catch(error => console.error('Erro ao recuperar lista de medicos:', error));
}

//editar dados do Médico
function editarMedico() {
    const idAtual = document.getElementById('idAtual').value;
    const nomeAtual = document.getElementById('nomeAtual').value;
    const novoNome = document.getElementById('novoNome').value;

    fetch(`http://localhost:8081/medico/editar?idAtual=${idAtual}&nomeAtual=${nomeAtual}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nomeMedico: novoNome
        })
    })
        .then(function (res) {
            if (res.ok) {
                alert('Médico foi atualizado com sucesso!');
                window.history.back();
            } else {
                console.error('Ocorreu um erro ao atualizar o médico:', res.statusText);
                alert('Ocorreu um erro ao atualizar o médico.');
            }
        })
        .catch(error => console.error('Erro ao atualizar médico:', error));
}


//deletar Médico
function deleteMedico() {
    const nomeMedico = document.getElementById('nomeMedico').value;

    fetch(`http://localhost:8081/medico/deletar/${nomeMedico}`, {
        method: 'DELETE',
    })
        .then(function (res) {
            if (res.ok) {
                alert('Medico deletado com sucesso!');
                location.reload();
            } else {
                console.error('Ocorreu um erro ao deletar o medico:', res.statusText);
                alert('Ocorreu um erro ao deletar o medico.');
            }
        })
        .catch(error => console.error('Erro ao deletar o medico:', error));
}

//fazer login do Médico
function fazerLogin() {
    const idMedico = document.getElementById('idMedico').value;
    const nomeMedico = document.getElementById('nomeMedico').value;

    fetch(`http://localhost:8081/medico/verificar?id=${idMedico}&nome=${nomeMedico}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Falha ao verificar médico');
            }
        })
        .then(data => {
            if (data.nomeMedico === nomeMedico) {
                window.location.href = 'http://127.0.0.1:5500/Front-End/Home/Telas_Medico/Home_Medico/Home_Medico.html';
            } else {
                alert('Nome do médico não corresponde ao ID fornecido.');
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert('Ocorreu um erro ao fazer login.');
        });
}

//Listagem de Pacientes
function listarPacientes() {
    fetch("http://localhost:8081/paciente/listar")
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Dados de pacientes não estão no formato esperado.');
            }
            const pacientes = data.map(paciente => paciente.nome);
            const pacientesList = document.getElementById('pacientes');
            pacientesList.innerHTML = '';
            pacientes.forEach(paciente => {
                const listItem = document.createElement('li');
                listItem.textContent = paciente;
                pacientesList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Erro ao recuperar lista de pacientes:', error));
}

//Calculo de IMC
function calcularIMC() {
    var nomePaciente = document.getElementById('nomePaciente').value;
    var peso = parseFloat(document.getElementById('peso').value);
    var altura = parseFloat(document.getElementById('altura').value);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert('Por favor, insira um peso e altura válidos.');
        return;
    }

    // Enviar os dados para o backend
    fetch('http://localhost:8081/imc/calcular', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nomePaciente: nomePaciente,
            peso: peso,
            altura: altura
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao calcular IMC. Por favor, verifique os dados enviados.');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.resultado) {
            var resultadoIMC = parseFloat(data.resultado.toFixed(2));
            var frase = '';

            if (resultadoIMC < 16.9) {
                frase = 'Muito abaixo do peso.';
            } else if (resultadoIMC >= 17 && resultadoIMC <= 18.4) {
                frase = 'Abaixo do peso.';
            } else if (resultadoIMC >= 18.5 && resultadoIMC <= 24.9) {
                frase = 'Peso Normal.';
            } else if (resultadoIMC >= 25 && resultadoIMC <= 29.9) {
                frase = 'Acima do peso.';
            } else if (resultadoIMC >= 30 && resultadoIMC <= 34.9) {
                frase = 'Obesidade grau I.';
            } else if (resultadoIMC >= 35 && resultadoIMC <= 40) {
                frase = 'Obesidade grau II.';
            } else {
                frase = 'Obesidade grau III.';
            }

            // Exibir o resultado com a frase no HTML
            var resultadoHTML = `Paciente: ${nomePaciente} tem IMC ${resultadoIMC.toFixed(2)}, ${frase}`;
            document.getElementById('resultado').value = resultadoIMC.toFixed(2);
            document.getElementById('fraseResultado').innerText = resultadoHTML;
        } else {
            throw new Error('Resultado do IMC não recebido do servidor.');
        }
    })
    .catch(error => {
        console.error('Erro ao calcular IMC:', error.message);
        alert('Erro ao calcular IMC. Por favor, tente novamente.');
    });
}

// Listagem de IMC
function listarIMCs() {
    fetch("http://localhost:8081/paciente/listar")
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Dados de pacientes não estão no formato esperado.');
            }
            const pacientesList = document.getElementById('pacientes');
            pacientesList.innerHTML = '';
            data.forEach(paciente => {
                // aqui dará o nome do paciente
                const listItem = document.createElement('li');
                listItem.textContent = `Nome: ${paciente.nome}`;
                pacientesList.appendChild(listItem);

                // Busca o imc do paciente
                fetch(`http://localhost:8081/imc/por-paciente?nome=${encodeURIComponent(paciente.nome)}`)
                    .then(response => {
                        if (response.status === 404) {
                            throw new Error(`IMC não encontrado para o paciente: ${paciente.nome}`);
                        }
                        return response.json();
                    })
                    .then(imcData => {
                        // elemento IMC
                        const imc = document.createElement('span');
                        const resultadoIMC = parseFloat(imcData.resultado.toFixed(2));
                        let frase = '';

                        if (resultadoIMC < 16.9) {
                            frase = 'Muito abaixo do peso.';
                        } else if (resultadoIMC >= 17 && resultadoIMC <= 18.4) {
                            frase = 'Abaixo do peso.';
                        } else if (resultadoIMC >= 18.5 && resultadoIMC <= 24.9) {
                            frase = 'Peso Normal.';
                        } else if (resultadoIMC >= 25 && resultadoIMC <= 29.9) {
                            frase = 'Acima do peso.';
                        } else if (resultadoIMC >= 30 && resultadoIMC <= 34.9) {
                            frase = 'Obesidade grau I.';
                        } else if (resultadoIMC >= 35 && resultadoIMC <= 40) {
                            frase = 'Obesidade grau II.';
                        } else {
                            frase = 'Obesidade grau III.';
                        }

                        imc.textContent = `, IMC: ${resultadoIMC.toFixed(2)}, ${frase}`;
                        listItem.appendChild(imc);
                    })
                    .catch(error => {
                        console.error(error);
                        const imcErro = document.createElement('span');
                        imcErro.textContent = `, IMC: Não disponível`;
                        listItem.appendChild(imcErro);
                    });
            });
        })
        .catch(error => console.error('Erro ao recuperar lista de pacientes:', error));
}

// Deletar IMC
function deletarIMC() {
    var nomePaciente = document.getElementById('nomePacienteDeletar').value;

    fetch(`http://localhost:8081/imc/deletar?nome=${encodeURIComponent(nomePaciente)}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao deletar IMC. Por favor, verifique o nome do paciente.');
        }
        alert('IMC deletado com sucesso!');
        listarIMCs();
    })
    .catch(error => {
        console.error('Erro ao deletar IMC:', error.message);
        alert('Erro ao deletar IMC. Por favor, tente novamente.');
    });
}

// Função para criar consulta
document.getElementById('formCriarConsulta').addEventListener('submit', criarConsulta);

function criarConsulta(event) {
    event.preventDefault();

    const nomePaciente = document.getElementById('nomePaciente').value;
    const queixaPrincipal = document.getElementById('queixaPrincipal').value;
    const diagnostico = document.getElementById('diagnostico').value;
    const medico = document.getElementById('medico').value;

    const consulta = {
        nomePaciente,
        queixaPrincipal,
        diagnostico,
        medico
    };

    fetch('http://localhost:8081/consulta/criar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(consulta)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('mensagemSucesso').textContent = `Consulta do Sr(a). ${nomePaciente} salva com Sucesso.`;
            document.getElementById('mensagemSucesso').style.display = 'block';
            document.getElementById('mensagemErro').style.display = 'none';
        } else {
            document.getElementById('mensagemErro').textContent = data.message;
            document.getElementById('mensagemErro').style.display = 'block';
            document.getElementById('mensagemSucesso').style.display = 'none';
        }
    })
    .catch(error => {
        document.getElementById('mensagemErro').textContent = 'Erro ao salvar consulta.';
        document.getElementById('mensagemErro').style.display = 'block';
        document.getElementById('mensagemSucesso').style.display = 'none';
    });
}
