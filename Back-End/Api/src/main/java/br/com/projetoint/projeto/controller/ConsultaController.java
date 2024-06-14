package br.com.projetoint.projeto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoint.projeto.DTO.ConsultaDTO;
import br.com.projetoint.projeto.Service.ConsultaService;
import br.com.projetoint.projeto.model.Consulta;

@RestController
@RequestMapping("/consulta")
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    @GetMapping("/listar")
    public List<Consulta> listarConsultas() {
        return consultaService.listarConsultas();
    }

    @PostMapping("/criar")
    public ResponseEntity<Consulta> salvarConsulta(@RequestBody ConsultaDTO consultaDTO) {
        try {
            Consulta consulta = consultaService.salvarConsulta(consultaDTO);
            return ResponseEntity.ok(consulta);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarConsulta(@PathVariable Long id) {
        consultaService.deletarConsulta(id);
        return ResponseEntity.noContent().build();
    }
}
