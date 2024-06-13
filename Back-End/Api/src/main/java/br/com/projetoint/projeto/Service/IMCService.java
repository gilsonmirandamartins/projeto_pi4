package br.com.projetoint.projeto.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projetoint.projeto.DAO.IMCRepository;
import br.com.projetoint.projeto.DAO.Pacienterepository;
import br.com.projetoint.projeto.model.IMC;
import br.com.projetoint.projeto.model.Paciente;

@Service
public class IMCService {

    @Autowired
    private IMCRepository imcRepository;

    @Autowired
    private Pacienterepository pacienteRepository;

    public List<IMC> listarIMC() {
        return imcRepository.findAll();
    }

    public Optional<IMC> obterIMCPorId(Long id) {
        return imcRepository.findById(id);
    }

    public IMC calcularIMC(String nomePaciente, double peso, double altura) {
        Paciente paciente = pacienteRepository.findByNome(nomePaciente)
            .orElseThrow(() -> new IllegalArgumentException("Paciente não encontrado"));
    
        Optional<IMC> imcExistente = imcRepository.findByPaciente(paciente);
        IMC imc;
    
        if (imcExistente.isPresent()) {
            imc = imcExistente.get();
        } else {
            imc = new IMC();
        }
    
        imc.setPaciente(paciente);
        imc.setPeso(peso);
        imc.setAltura(altura);
        imc.setResultado(peso / (altura * altura));
    
        return imcRepository.save(imc);
    }
    
    public Optional<IMC> obterIMCPorPaciente(Paciente paciente) {
        return imcRepository.findByPaciente(paciente);
    }

    public void deletarIMC(Long id) {
        imcRepository.deleteById(id);
    }

    public void deletarIMCPorPaciente(Paciente paciente) {
        Optional<IMC> imc = imcRepository.findByPaciente(paciente);
        imc.ifPresent(imcRepository::delete);
    }
}
