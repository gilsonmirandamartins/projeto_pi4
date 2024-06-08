package br.com.projetoint.projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoint.projeto.DTO.IMCDTO;
import br.com.projetoint.projeto.Service.IMCService;
import br.com.projetoint.projeto.model.IMC;

@RestController
@RequestMapping("/imc")
public class IMCController {

    @Autowired
    private IMCService imcService;

    @PostMapping("/calcular")
    public ResponseEntity<IMC> calcularIMC(@RequestBody IMCDTO imcDTO) {
        try {
            IMC imc = imcService.calcularIMC(imcDTO.getNomePaciente(), imcDTO.getPeso(), imcDTO.getAltura());
            return ResponseEntity.ok(imc);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}