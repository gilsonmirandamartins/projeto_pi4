package br.com.projetoint.projeto.DAO;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoint.projeto.model.IMC;
import br.com.projetoint.projeto.model.Paciente;

public interface IMCRepository extends JpaRepository<IMC, Long> {
    Optional<IMC> findByPaciente(Paciente paciente);
}
