package br.com.projetoint.projeto.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoint.projeto.model.Consulta;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
}