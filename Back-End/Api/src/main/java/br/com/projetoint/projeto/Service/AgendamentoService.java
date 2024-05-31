
package br.com.projetoint.projeto.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projetoint.projeto.DAO.AgendamentoRepository;
import br.com.projetoint.projeto.DTO.AgendamentoDTO;
import br.com.projetoint.projeto.model.Agendamento;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public Agendamento criarAgendamento(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }

    public Agendamento obterAgendamentoPorId(int id) {
        return agendamentoRepository.findById(id).orElse(null);
    }

    public List<AgendamentoDTO> listarAgendamentos() {
        return agendamentoRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private AgendamentoDTO convertToDTO(Agendamento agendamento) {
        AgendamentoDTO dto = new AgendamentoDTO();
        dto.setIdAgendamento(agendamento.getIdAgendamento());
        dto.setNomePaciente(agendamento.getNomePaciente());
        dto.setEmail(agendamento.getEmail());
        dto.setStatus(agendamento.getStatus());
        dto.setClinica(agendamento.getClinica());
        dto.setNomeMedico(agendamento.getMedico().getNomeMedico());
        dto.setDataHoraAgendamento(agendamento.getDataHoraAgendamento());
        dto.setDataCadastro(agendamento.getDataCadastro());
        return dto;
    }

    public void deletarAgendamento(int id) {
        agendamentoRepository.deleteById(id);
    }
    
}
