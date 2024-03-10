package br.com.projetoint.projeto.controller;

import java.util.HashMap;
import java.util.Map;

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

    public ResponseEntity<Map<String, String>> recuperarSenha(@RequestBody RecuperarSenha recuperarSenha) {
        // Lógica para recuperar senha usando login e data de nascimento
        Usuarios usuario = usuarioRepository.findByLoginAndDataNascimento(recuperarSenha.getLogin(),
                recuperarSenha.getDataNascimento());

        if (usuario != null) {
            Map<String, String> response = new HashMap<>();
            response.put("mensagem", "Solicitação de recuperação de senha bem-sucedida!");
            response.put("sucesso", "true");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("mensagem", "Credenciais inválidas para recuperação de senha.");
            response.put("sucesso", "false");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

}
