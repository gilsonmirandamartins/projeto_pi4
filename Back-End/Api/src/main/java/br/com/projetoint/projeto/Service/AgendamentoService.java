
package br.com.projetoint.projeto.Service;

import java.time.LocalDateTime;
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
        boolean conflito = verificarConflitoAgendamento(agendamento);
        if (conflito) {
            return null;
        }
        return agendamentoRepository.save(agendamento);
    }

    private boolean verificarConflitoAgendamento(Agendamento novoAgendamento) {
        String clinica = novoAgendamento.getClinica();
        LocalDateTime dataHoraAgendamento = novoAgendamento.getDataHoraAgendamento();
        int idMedico = novoAgendamento.getMedico().getIdMedico();
    
        // Verifica s ja tem atendimemto com o op mesmo medico em clinicas diferentes
        List<Agendamento> agendamentosMesmoHorario = agendamentoRepository.findByDataHoraAgendamentoAndMedico_IdMedico(dataHoraAgendamento, idMedico);
        if (!agendamentosMesmoHorario.isEmpty()) {
            return true; // Conflito de agendamento
        }
    
        // Verifica se ja tem  agendamento para o mesmo médico e   mesma clínica no mesmo horário
        List<Agendamento> agendamentosMesmaClinica = agendamentoRepository.findByClinicaAndDataHoraAgendamentoAndMedico_IdMedico(clinica, dataHoraAgendamento, idMedico);
        return !agendamentosMesmaClinica.isEmpty(); // Retorna true se houver conflito
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
