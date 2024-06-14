package br.com.projetoint.projeto.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projetoint.projeto.DAO.ConsultaRepository;
import br.com.projetoint.projeto.DAO.MedicoRepository;
import br.com.projetoint.projeto.DAO.Pacienterepository;
import br.com.projetoint.projeto.DTO.ConsultaDTO;
import br.com.projetoint.projeto.model.Consulta;
import br.com.projetoint.projeto.model.Medico;
import br.com.projetoint.projeto.model.Paciente;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private Pacienterepository pacienteRepository;

    public List<Consulta> listarConsultas() {
        return consultaRepository.findAll();
    }

    public Consulta salvarConsulta(ConsultaDTO consultaDTO) throws Exception {
        Optional<Medico> medico = medicoRepository.findByNomeMedico(consultaDTO.getNomeMedico());
        Optional<Paciente> paciente = pacienteRepository.findByNome(consultaDTO.getNomePaciente());

        if (!medico.isPresent()) {
            throw new Exception("Médico não encontrado");
        }

        if (!paciente.isPresent()) {
            throw new Exception("Paciente não encontrado");
        }

        Consulta consulta = new Consulta();
        consulta.setQueixaPrincipal(consultaDTO.getQueixaPrincipal());
        consulta.setDiagnostico(consultaDTO.getDiagnostico());
        consulta.setMedico(medico.get());
        consulta.setPaciente(paciente.get());

        return consultaRepository.save(consulta);
    }

    public Optional<Consulta> buscarConsultaPorId(Long id) {
        return consultaRepository.findById(id);
    }

    public void deletarConsulta(Long id) {
        consultaRepository.deleteById(id);
    }

    public void criarConsulta(ConsultaDTO consultaDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'criarConsulta'");
    }
}