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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoint.projeto.Service.PacienteService;
import br.com.projetoint.projeto.model.Paciente;

@RestController
@RequestMapping("/paciente")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @PostMapping("/criar")
    public ResponseEntity<String> criarPaciente(@RequestBody Paciente paciente) {
        try {
            Paciente novoPaciente = pacienteService.salvarPaciente(paciente);
            String mensagemSucesso = String.format(
                    "Paciente criado com sucesso! ID do paciente: %d, Nome: %s.",
                    novoPaciente.getIdPaciente(),
                    novoPaciente.getNome());
            return ResponseEntity.status(HttpStatus.CREATED).body(mensagemSucesso);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao criar o paciente.");
        }
    }

    @GetMapping("/listar")
    public List<Paciente> listarPacientes() {
        return pacienteService.listarPacientes();
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginPaciente(@RequestBody Paciente paciente) {
        Optional<Paciente> pacienteExistente = pacienteService.buscarPacientePorNomeEDocumento(paciente.getNome(),
                paciente.getDocumento());
        if (pacienteExistente.isPresent()) {
            String nomePaciente = pacienteExistente.get().getNome();
            return ResponseEntity.ok("Login bem-sucedido. Bem-vindo, " + nomePaciente + "!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nome ou documento incorretos.");
        }
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarPaciente(@PathVariable Long id, @RequestBody Paciente pacienteAtualizado) {
        Optional<Paciente> pacienteExistenteOpt = pacienteService.buscarPacientePorId(id);
        if (pacienteExistenteOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Paciente não encontrado.");
        }

        Paciente pacienteExistente = pacienteExistenteOpt.get();
        pacienteExistente.setNome(pacienteAtualizado.getNome());
        pacienteExistente.setDocumento(pacienteAtualizado.getDocumento());
        pacienteExistente.setSexo(pacienteAtualizado.getSexo());
        pacienteExistente.setDataNascimento(pacienteAtualizado.getDataNascimento());

        pacienteService.salvarPaciente(pacienteExistente);

        return ResponseEntity.ok("Paciente atualizado com sucesso.");
    }

    @DeleteMapping("/deletar")
    public ResponseEntity<String> deletarPacientePorNome(@RequestParam String nome) {
        System.out.println("Requisição para deletar paciente recebida. Nome: " + nome);
        Optional<Paciente> pacienteExistenteOpt = pacienteService.buscarPacientePorNome(nome);
        if (pacienteExistenteOpt.isEmpty()) {
            System.out.println("Paciente não encontrado.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Paciente não encontrado.");
        }

        Paciente pacienteExistente = pacienteExistenteOpt.get();
        pacienteService.deletarPaciente(pacienteExistente.getIdPaciente());
        System.out.println("Paciente deletado com sucesso.");
        return ResponseEntity.ok("Paciente deletado com sucesso.");
    }

    /*@GetMapping("/{id}")
    public ResponseEntity<Paciente> obterPaciente(@PathVariable Long id) {
        Optional<Paciente> paciente = pacienteService.buscarPacientePorId(id);
        return paciente.map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }*/
}