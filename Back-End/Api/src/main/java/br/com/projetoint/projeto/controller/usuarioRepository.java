package br.com.projetoint.projeto.controller;

import java.util.Optional;

import br.com.projetoint.projeto.model.Usuarios;

public interface usuarioRepository {

    static Optional<Usuarios> findById(Integer id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    static void save(Usuarios usuarioExistente) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

}
