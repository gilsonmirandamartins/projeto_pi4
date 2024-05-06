use bd_usuarios

CREATE TABLE Medico (
    idMedico INT AUTO_INCREMENT PRIMARY KEY,
    nomeMedico VARCHAR(100)
);


CREATE TABLE `agendamento` (
  `idAgendamento` int NOT NULL AUTO_INCREMENT,
  `nomePaciente` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `status` enum('AGENDADO','CANCELADO','REALIZADO') NOT NULL DEFAULT 'AGENDADO',
  `clinica` enum('Medical Center','Otomédica','Otoclínica') NOT NULL,
  `idMedico` int NOT NULL,
  `dataHoraAgendamento` datetime NOT NULL,
  `dataCadastro` datetime NOT NULL,
  FOREIGN KEY (`idMedico`) REFERENCES `medico` (`idMedico`)



SELECT *
FROM Agendamento
INNER JOIN Medico ON Agendamento.idMedico = Medico.idMedico;
