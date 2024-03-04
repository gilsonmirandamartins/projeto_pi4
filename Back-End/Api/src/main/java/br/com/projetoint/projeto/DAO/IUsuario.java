package br.com.projetoint.projeto.DAO;

//Geraldo

import org.springframework.data.repository.CrudRepository;
import br.com.projetoint.projeto.model.Usuarios;

public interface IUsuario extends CrudRepository<Usuarios, Integer> {
}

