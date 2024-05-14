package br.com.projetoint.projeto.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/verificar") // login de medico, verificar id e nome, endpoint: /medico/verificar
    public ResponseEntity<String> verificarMedico(@RequestParam int id, @RequestParam String nome) {
        Optional<Medico> medicoOptional = medicoRepository.findById(id);

        if (medicoOptional.isPresent()) {
            Medico medico = medicoOptional.get();
            if (medico.getNomeMedico().equalsIgnoreCase(nome)) {
                return ResponseEntity.ok("Verificado com sucesso");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome do médico não corresponde");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Médico não encontrado");
        }
    }

    @PostMapping("/criar") // criar medico.Informe o medico e o id é criado automatico,endpoint:/medico/criar

    public ResponseEntity<String> criarMedico(@RequestBody Medico medico) {
        Medico medicoSalvo = medicoRepository.save(medico);
        String mensagem = String.format("Médico '%s' criado com sucesso. Seu ID é %d.",
                medicoSalvo.getNomeMedico(),
                medicoSalvo.getIdMedico());
        return ResponseEntity.ok(mensagem);
    }

    @GetMapping("/listar")//endpoint: /meedico/listar
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

    @GetMapping("/{id}")
    public Medico obterMedicoPorId(@PathVariable int id) {
        return medicoRepository.findById(id).orElse(null);
    }

}
