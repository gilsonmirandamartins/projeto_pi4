package br.com.projetoint.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projetoint.projeto.DAO.AgendamentoRepository;
import br.com.projetoint.projeto.model.Agendamento;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    // Método para criar um novo agendamento
    public Agendamento criarAgendamento(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }

    // Método para obter um agendamento por ID
    public Agendamento obterAgendamentoPorId(int id) {
        return agendamentoRepository.findById(id).orElse(null);
    }

    // Método para listar todos os agendamentos
    public List<Agendamento> listarAgendamentos() {
        return agendamentoRepository.findAll();
    }
}

