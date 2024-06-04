package br.com.projetoint.projeto.DAO;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoint.projeto.model.Paciente;
public interface Pacienterepository extends JpaRepository<Paciente, Long> {
    Optional<Paciente> findByNome(String nome);

    Optional<Paciente> findByNomeAndDocumento(String nome, String documento);
}