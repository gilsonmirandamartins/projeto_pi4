package br.com.projetoint.projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoint.projeto.Service.IMCService;
import br.com.projetoint.projeto.model.IMC;

@RestController
@RequestMapping("/imc")
public class IMCController {

    @Autowired
    private IMCService imcService;

    @PostMapping("/calcular")
    public IMC calcularIMC(@RequestParam Long pacienteId, @RequestParam double peso, @RequestParam double altura) {
        return imcService.calcularIMC(pacienteId, peso, altura);
    }


}
