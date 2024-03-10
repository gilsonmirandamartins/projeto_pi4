package br.com.projetoint.projeto.controller;
//import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoint.projeto.DAO.IUsuario;
import br.com.projetoint.projeto.model.Usuarios;

@CrossOrigin("*")
@RestController
public class AuthController {

    @Autowired
    private IUsuario usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        Usuarios usuario = usuarioRepository.findByLogin(loginRequest.getLogin());

        if (usuario != null && usuario.getSenha().equals(loginRequest.getSenha())) {
            return ResponseEntity.ok("Login bem-sucedido!"); // corrigir, remover coisas desnecessarias
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas.");
        }
    }

}
