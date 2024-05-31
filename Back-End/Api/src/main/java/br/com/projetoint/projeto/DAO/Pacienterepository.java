package br.com.projetoint.projeto.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoint.projeto.model.Paciente;

public interface Pacienterepository extends JpaRepository<Paciente, Long> {
}
