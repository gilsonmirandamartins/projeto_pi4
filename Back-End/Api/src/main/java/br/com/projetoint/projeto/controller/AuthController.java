package br.com.projetoint.projeto.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Usuarios usuario = usuarioRepository.findByLogin(loginRequest.getLogin());

        if (usuario != null && usuario.getSenha().equals(loginRequest.getSenha())) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas.");
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Usuarios> getUserById(@PathVariable Integer id) {
        Usuarios usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/users")
    public ResponseEntity<Usuarios> createUser(@RequestBody Usuarios usuario) {
        usuario.setDataCadastro(new Date());
        Usuarios novoUsuario = usuarioRepository.save(usuario);
        return ResponseEntity.ok(novoUsuario);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Usuarios> updateUser(@PathVariable Integer id, @RequestBody Usuarios usuarioDetails) {
        Usuarios usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario != null) {
            usuario.setNome(usuarioDetails.getNome());
            usuario.setLogin(usuarioDetails.getLogin());
            usuario.setSenha(usuarioDetails.getSenha());
            Usuarios usuarioAtualizado = usuarioRepository.save(usuario);
            return ResponseEntity.ok(usuarioAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Integer id) {
        Usuarios usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario != null) {
            usuarioRepository.delete(usuario);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/users/login/{login}")
    public ResponseEntity<Void> deleteUserByLogin(@PathVariable String login) {
        Usuarios usuario = usuarioRepository.findByLogin(login);
        if (usuario != null) {
            usuarioRepository.delete(usuario);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<Usuarios>> getAllUsers() {
        List<Usuarios> users = (List<Usuarios>) usuarioRepository.findAll();
        return ResponseEntity.ok(users);
    }

}
