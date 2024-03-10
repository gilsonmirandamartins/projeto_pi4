package br.com.projetoint.projeto.DAO;

import java.util.Date;

import org.springframework.data.repository.CrudRepository;

import br.com.projetoint.projeto.model.Usuarios;

public interface IUsuario extends CrudRepository<Usuarios, Integer> {
    //Adicionado
    Usuarios findByLogin(String login);

    Usuarios findByLoginAndDataNascimento(String login, Date dataNascimento);
}
