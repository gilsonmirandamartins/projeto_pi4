package br.com.projetoint.projeto.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoint.projeto.DTO.ConsultaDTO;
import br.com.projetoint.projeto.Service.ConsultaService;
import br.com.projetoint.projeto.Service.MedicoService;
import br.com.projetoint.projeto.Service.PacienteService;
import br.com.projetoint.projeto.model.Consulta;
import br.com.projetoint.projeto.model.Medico;
import br.com.projetoint.projeto.model.Paciente;

@RestController
@RequestMapping("/consulta")
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    @Autowired
    private PacienteService pacienteService;

    @Autowired
    private MedicoService medicoService;

    @PostMapping("/criar")
    public ResponseEntity<String> criarConsulta(@RequestBody ConsultaDTO consultaDTO) {
        try {
            // Verifica se o paciente existe
            Optional<Paciente> pacienteOptional = pacienteService.buscarPacientePorNome(consultaDTO.getPaciente());
            if (!pacienteOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Paciente não encontrado.");
            }
            Paciente paciente = pacienteOptional.get();

            // Verifica se o médico existe
            Optional<Medico> medicoOptional = MedicoService.buscarMedicoPorNome(consultaDTO.getMedico());
            if (!medicoOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Médico não encontrado.");
            }
            Medico medico = medicoOptional.get();

            // Cria a consulta
            Consulta novaConsulta = new Consulta();
            novaConsulta.setQueixaPrincipal(consultaDTO.getQueixaPrincipal());
            novaConsulta.setDiagnostico(consultaDTO.getDiagnostico());
            novaConsulta.setPaciente(paciente);
            novaConsulta.setMedico(medico);

            Consulta consultaSalva = consultaService.save(novaConsulta);

            String mensagemSucesso = String.format(
                    "Consulta criada com sucesso! ID da consulta: %d, Nome do paciente: %s.",
                    consultaSalva.getIdConsulta(),
                    consultaSalva.getPaciente().getNome());

            return ResponseEntity.status(HttpStatus.CREATED).body(mensagemSucesso);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar a consulta.");
        }
    }

    @GetMapping("/listar")
    public List<Consulta> listarConsultas() {
        return consultaService.findAll();
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarConsulta(@PathVariable int id, @RequestBody Consulta consultaAtualizada) {
        Optional<Consulta> consultaExistente = consultaService.findById(id);

        if (!consultaExistente.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Consulta não encontrada.");
        }

        Consulta consulta = consultaExistente.get();
        consulta.setQueixaPrincipal(consultaAtualizada.getQueixaPrincipal());
        consulta.setDiagnostico(consultaAtualizada.getDiagnostico());
        consulta.setPaciente(consultaAtualizada.getPaciente());
        consulta.setAgendamento(consultaAtualizada.getAgendamento());
        consulta.setMedico(consultaAtualizada.getMedico());

        consultaService.save(consulta);

        return ResponseEntity.ok("Consulta atualizada com sucesso.");
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarConsultaPorId(@PathVariable int id) {
        Optional<Consulta> consultaExistente = consultaService.findById(id);

        if (!consultaExistente.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Consulta não encontrada.");
        }

        consultaService.deleteById(id);

        return ResponseEntity.ok("Consulta deletada com sucesso.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consulta> obterConsulta(@PathVariable int id) {
        Optional<Consulta> consulta = consultaService.findById(id);
        return consulta.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
