package br.com.projetoint.projeto.controller;

import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoint.projeto.DAO.IUsuario;
import br.com.projetoint.projeto.model.Usuarios;

@RestController
// @CrossOrigin("*")
@CrossOrigin(origins = "http://127.0.0.1:5500", maxAge = 3600)
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private IUsuario dao;

    @GetMapping
    public List<Usuarios> listaUsuarios() {
        return (List<Usuarios>) dao.findAll();
    }

    @PostMapping
    public Usuarios criarUsuario(@RequestBody Usuarios usuarios) {

        Usuarios usuarioExistente = dao.findByLogin(usuarios.getLogin());
        if (usuarioExistente != null) {
            throw new RuntimeException("Este login já está em uso.");
        } else {
            Usuarios usuarioNovo = dao.save(usuarios);
            return usuarioNovo;
        }
    }

    @PutMapping
    public Usuarios editarUsuario(@RequestBody Usuarios usuarios) {
        Usuarios usuarioNovo = dao.save(usuarios);
        return usuarioNovo;
    }

    @DeleteMapping("/{id}")
    public Optional<Usuarios> excluirUsuario(@PathVariable Integer id) {
        Optional<Usuarios> usuarios = dao.findById(id);
        dao.deleteById(id);
        return usuarios;
    }

    @PostMapping("/recuperar-senha")
    public ResponseEntity<?> verificarAcesso(@RequestBody Usuarios dadosUsuario) {
        Usuarios usuarioNoBanco = dao.findByLoginAndDataNascimento(
                dadosUsuario.getLogin(),
                dadosUsuario.getDataNascimento());

        if (usuarioNoBanco != null) {

            return ResponseEntity.ok().body("{\"message\": \"Acesso liberado para edição de senha.\"}");
        } else {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"Acesso negado. Login ou data de nascimento incorretos.\"}");
        }
    }

    @PutMapping("/usuarios/alterar-senha")
    public ResponseEntity<String> alterarSenha(@RequestBody AlterarSenha alteracaoSenhaRequest) {
        // Verificar se o usuário existe (se necessário)
        Usuarios usuarioExistente = dao.findByLogin(alteracaoSenhaRequest.getLogin());
        if (usuarioExistente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuário não encontrado.");
        }

        // Atualizar a senha do usuário
        usuarioExistente.setSenha(alteracaoSenhaRequest.getNovaSenha());
        dao.save(usuarioExistente);

        return ResponseEntity.ok("Senha alterada com sucesso.");
    }
}
