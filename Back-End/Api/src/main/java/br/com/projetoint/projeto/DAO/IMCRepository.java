package br.com.projetoint.projeto.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoint.projeto.model.IMC;
import br.com.projetoint.projeto.model.Paciente;

public interface IMCRepository extends JpaRepository<IMC, Long> {
    List<IMC> findByPaciente(Paciente paciente);
}
