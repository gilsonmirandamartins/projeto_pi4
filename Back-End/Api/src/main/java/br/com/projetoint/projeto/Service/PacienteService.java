package br.com.projetoint.projeto.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projetoint.projeto.DAO.Pacienterepository;
import br.com.projetoint.projeto.model.Paciente;

@Service
public class PacienteService {

    @Autowired
    private Pacienterepository pacienteRepository;

    public List<Paciente> listarPacientes() {
        return pacienteRepository.findAll();
    }

    public Paciente salvarPaciente(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    public Optional<Paciente> buscarPacientePorId(Long id) {
        return pacienteRepository.findById(id);
    }

    public Optional<Paciente> buscarPacientePorNomeEDocumento(String nome, String documento) {
        return pacienteRepository.findByNomeAndDocumento(nome, documento);
    }

    public Optional<Paciente> buscarPacientePorNome(String nome) {
        return pacienteRepository.findByNome(nome);
    }

    public void deletarPaciente(Long id) {
        pacienteRepository.deleteById(id);
    }
}
