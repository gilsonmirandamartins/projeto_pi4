package br.com.projetoint.projeto.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

import br.com.projetoint.projeto.DAO.MedicoRepository;
import br.com.projetoint.projeto.model.Medico;

@RestController
@RequestMapping("/medico")
public class MedicoController {

    @Autowired
    private MedicoRepository medicoRepository;

    @GetMapping("/verificar")
public ResponseEntity<Map<String, Object>> verificarMedico(@RequestParam int id, @RequestParam String nome) {
    Optional<Medico> medicoOptional = medicoRepository.findById(id);

    if (medicoOptional.isPresent()) {
        Medico medico = medicoOptional.get();
        if (medico.getNomeMedico().equalsIgnoreCase(nome)) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Verificado com sucesso");
            response.put("nomeMedico", medico.getNomeMedico());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", "Nome do médico não corresponde"));
        }
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "Médico não encontrado"));
    }
}


    @PostMapping("/criar")
    public ResponseEntity<Map<String, Object>> criarMedico(@RequestBody Medico medico) {
        if (medico.getNomeMedico() == null || medico.getNomeMedico().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", "Falha ao criar medico: Nome Obrigatorio"));
        }

        Medico medicoSalvo = medicoRepository.save(medico);
        Map<String, Object> response = new HashMap<>();
        response.put("nomeMedico", medicoSalvo.getNomeMedico());
        response.put("idMedico", medicoSalvo.getIdMedico());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/listar") // endpoint: /meedico/listar
    public List<Medico> listarMedicos() {
        return medicoRepository.findAll();
    }

    @PutMapping("/editar") // edita apenas o nome do usuario atraves do nome atual,endpoint:/medico/editar

    public ResponseEntity<String> editarMedico(@RequestParam int idAtual, @RequestBody Medico medicoAtualizado) {
        Optional<Medico> medicoOptional = medicoRepository.findById(idAtual);
        if (medicoOptional.isPresent()) {
            Medico medicoExistente = medicoOptional.get();
            medicoExistente.setNomeMedico(medicoAtualizado.getNomeMedico());
            medicoRepository.save(medicoExistente);
            return ResponseEntity.ok("Médico atualizado com sucesso.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Médico não encontrado.");
        }
    }

    @DeleteMapping("/deletar/{nome}")
    public ResponseEntity<String> deletarMedico(@PathVariable String nome) {
        Optional<Medico> medicoOptional = medicoRepository.findByNomeMedico(nome);

        if (medicoOptional.isPresent()) {
            medicoRepository.delete(medicoOptional.get());
            return ResponseEntity.ok("Médico deletado com sucesso.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Médico não encontrado.");
        }
    }

    @GetMapping("/{id}")
    public Medico obterMedicoPorId(@PathVariable int id) {
        return medicoRepository.findById(id).orElse(null);
    }

}
