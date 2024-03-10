package br.com.projetoint.projeto.controller;

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
public class AuthRecuperarSenha {

    @Autowired
    private IUsuario usuarioRepository;

    @PostMapping("/recuperar-senha")
    public ResponseEntity<String> recuperarSenha(@RequestBody RecuperarSenha recuperarSenha) {
        Usuarios usuario = usuarioRepository.findByLoginAndDataNascimento(
                recuperarSenha.getLogin(),
                recuperarSenha.getDataNascimento()
        );

        if (usuario != null) {
            return ResponseEntity.ok("Solicitação de recuperação de senha bem-sucedida!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciais inválidas para recuperação de senha.");
        }
    }

}
