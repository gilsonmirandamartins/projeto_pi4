package br.com.projetoint.projeto.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoint.projeto.DTO.ConsultaDTO;
import br.com.projetoint.projeto.Service.ConsultaService;

@RestController
@RequestMapping("/consulta")
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

 @PostMapping("/criar")
    public ResponseEntity<?> criarConsulta(@RequestBody ConsultaDTO consultaDTO) {
        try {
            consultaService.criarConsulta(consultaDTO);
            return ResponseEntity.ok().body(Map.of("success", true, "message", "Consulta salva com sucesso."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

}
