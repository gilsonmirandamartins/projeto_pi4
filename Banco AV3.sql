create database bd_usuarios;

use bd_usuarios


CREATE TABLE Medico (
    idMedico INT AUTO_INCREMENT PRIMARY KEY,
    nomeMedico VARCHAR(100) NOT NULL
);

CREATE TABLE Agendamento (
    idAgendamento INT AUTO_INCREMENT PRIMARY KEY,
    nomePaciente VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    status ENUM('AGENDADO', 'CANCELADO', 'REALIZADO') NOT NULL DEFAULT 'AGENDADO',
    clinica ENUM('Medical Center', 'Otomédica', 'Otoclínica') NOT NULL,
    idMedico INT NOT NULL,
    dataHoraAgendamento DATETIME NOT NULL,
    dataCadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idMedico) REFERENCES Medico(idMedico),
    UNIQUE (clinica, dataHoraAgendamento, idMedico)
);

CREATE TABLE Paciente (
    idPaciente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
	documento VARCHAR(11) NOT NULL UNIQUE,
    sexo ENUM('Masculino', 'Feminino') NOT NULL,
    dataNascimento DATE NOT NULL
);

CREATE TABLE IMC (
    idIMC INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    peso DECIMAL(5,2) NOT NULL,
    altura DECIMAL(3,2) NOT NULL,
    resultado DECIMAL(5,2) GENERATED ALWAYS AS (peso / (altura * altura)) STORED,
    FOREIGN KEY (paciente_id) REFERENCES Paciente(idPaciente)
);

CREATE TABLE Consulta (
    idConsulta INT AUTO_INCREMENT PRIMARY KEY,
    queixaPrincipal TEXT NOT NULL,
	diagnostico TEXT NOT NULL,
	paciente_id INT NOT NULL,
    agendamento_id INT,
    medico_id INT NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES Paciente(idPaciente),
    FOREIGN KEY (agendamento_id) REFERENCES Agendamento(idAgendamento),
    FOREIGN KEY (medico_id) REFERENCES Medico(idMedico)
);

CREATE TABLE Agendamento (
    idAgendamento INT AUTO_INCREMENT PRIMARY KEY,
    nomePaciente VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    status ENUM('AGENDADO', 'CANCELADO', 'REALIZADO') NOT NULL DEFAULT 'AGENDADO',
    clinica ENUM('Medical Center', 'Otomédica', 'Otoclínica') NOT NULL,
    idMedico INT NOT NULL,
    dataHoraAgendamento DATETIME NOT NULL,
    dataCadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idMedico) REFERENCES Medico(idMedico),
    UNIQUE (clinica, dataHoraAgendamento, idMedico)
);



