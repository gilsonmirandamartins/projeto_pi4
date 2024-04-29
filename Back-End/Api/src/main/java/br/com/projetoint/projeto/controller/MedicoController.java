package br.com.projetoint.projeto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoint.projeto.DAO.MedicoRepository;
import br.com.projetoint.projeto.model.Medico;

@RestController
@RequestMapping("/medico")
public class MedicoController {

    @Autowired
    private MedicoRepository medicoRepository;

    @GetMapping("/{id}")
    public Medico obterMedicoPorId(@PathVariable int id) {
        return medicoRepository.findById(id).orElse(null);
    }

    @GetMapping
    public List<Medico> listarMedicos() {
        return medicoRepository.findAll();
    }

    @PostMapping
    public Medico criarMedico(@RequestBody Medico medico) {
        return medicoRepository.save(medico);
    }
}
