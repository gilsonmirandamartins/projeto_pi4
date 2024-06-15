package br.com.projetoint.projeto.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projetoint.projeto.DAO.ConsultaRepository;
import br.com.projetoint.projeto.DTO.ConsultaDTO;
import br.com.projetoint.projeto.model.Consulta;
import br.com.projetoint.projeto.model.Paciente;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private PacienteService pacienteService;

    public void criarConsulta(ConsultaDTO consultaDTO) throws Exception {
        Optional<Paciente> pacienteOpt = pacienteService.buscarPacientePorNome(consultaDTO.getPaciente());
        if (pacienteOpt.isPresent()) {
            Consulta consulta = new Consulta();
            consulta.setQueixaPrincipal(consultaDTO.getQueixaPrincipal());
            consulta.setDiagnostico(consultaDTO.getDiagnostico());
            consulta.setPaciente(pacienteOpt.get());
            // Assume-se que a lógica para obter o médico e agendamento seja similar
            consultaRepository.save(consulta);
        } else {
            throw new Exception("Paciente não encontrado.");
        }
    }
}
