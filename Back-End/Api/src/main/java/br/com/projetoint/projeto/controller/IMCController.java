package br.com.projetoint.projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoint.projeto.DTO.IMCDTO;
import br.com.projetoint.projeto.Service.IMCService;
import br.com.projetoint.projeto.Service.PacienteService;
import br.com.projetoint.projeto.model.IMC;
import br.com.projetoint.projeto.model.Paciente;

@RestController
@RequestMapping("/imc")
public class IMCController {

    @Autowired
    private IMCService imcService;

    @Autowired
    private PacienteService pacienteService;

    @PostMapping("/calcular")
    public ResponseEntity<IMC> calcularIMC(@RequestBody IMCDTO imcDTO) {
        try {
            IMC imc = imcService.calcularIMC(imcDTO.getNomePaciente(), imcDTO.getPeso(), imcDTO.getAltura());
            return ResponseEntity.ok(imc);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/por-paciente")
    public ResponseEntity<IMC> obterIMCPorPaciente(@RequestParam String nome) {
        try {
            Paciente paciente = pacienteService.buscarPacientePorNome(nome)
                    .orElseThrow(() -> new IllegalArgumentException("Paciente não encontrado"));
            IMC imc = imcService.obterIMCPorPaciente(paciente)
                    .orElseThrow(() -> new IllegalArgumentException("IMC não encontrado para este paciente"));
            return ResponseEntity.ok(imc);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    
    @DeleteMapping("/deletar")
    public ResponseEntity<Void> deletarIMC(@RequestParam String nome) {
        try {
            Paciente paciente = pacienteService.buscarPacientePorNome(nome)
                    .orElseThrow(() -> new IllegalArgumentException("Paciente não encontrado"));
            imcService.deletarIMCPorPaciente(paciente);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}