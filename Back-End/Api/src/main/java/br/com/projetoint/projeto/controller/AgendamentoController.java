package br.com.projetoint.projeto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoint.projeto.Service.AgendamentoService;
import br.com.projetoint.projeto.model.Agendamento;

@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping("/criar")
public ResponseEntity<String> criarAgendamento(@RequestBody Agendamento agendamento) {
    Agendamento novoAgendamento = agendamentoService.criarAgendamento(agendamento);
    if (novoAgendamento != null) {
        String mensagemSucesso = String.format(
            "Agendamento criado com sucesso! ID do agendamento: %d, Nome do paciente: %s.",
            novoAgendamento.getIdAgendamento(),
            novoAgendamento.getNomePaciente()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(mensagemSucesso);
    } else {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao criar o agendamento.");
    }
}

    @GetMapping("/{id}")
    public Agendamento obterAgendamento(@PathVariable int id) {
        return agendamentoService.obterAgendamentoPorId(id);
    }

    @GetMapping("/listar")
    public List<Agendamento> listarAgendamentos() {
        return agendamentoService.listarAgendamentos();
    }
}
