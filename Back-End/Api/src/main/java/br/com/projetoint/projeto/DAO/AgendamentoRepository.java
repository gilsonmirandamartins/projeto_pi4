package br.com.projetoint.projeto.DAO;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projetoint.projeto.model.Agendamento;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {

    List<Agendamento> findByClinicaAndDataHoraAgendamentoAndMedico_IdMedico(String clinica,
            LocalDateTime dataHoraAgendamento, int idMedico);

    List<Agendamento> findByDataHoraAgendamentoAndMedico_IdMedico(LocalDateTime dataHoraAgendamento, int idMedico);

}
