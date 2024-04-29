use bd_usuarios

CREATE TABLE Medico (
    idMedico INT AUTO_INCREMENT PRIMARY KEY,
    nomeMedico VARCHAR(100)
);


CREATE TABLE Agendamento (
    idAgendamento INT AUTO_INCREMENT PRIMARY KEY,
    nomePaciente VARCHAR(100),
    email VARCHAR(100),
    status ENUM('agendado', 'cancelado', 'realizado') DEFAULT 'agendado',
    clinica ENUM('Gastroclínica', 'Otoclínica', 'Medical Center'),
    idMedico INT,
    dataHoraAgendamento DATETIME,
    dataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idMedico) REFERENCES Medico(idMedico),
    UNIQUE (clinica, dataHoraAgendamento, idMedico)
);



SELECT *
FROM Agendamento
INNER JOIN Medico ON Agendamento.idMedico = Medico.idMedico;
