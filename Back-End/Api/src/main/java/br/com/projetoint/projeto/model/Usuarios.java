package br.com.projetoint.projeto.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios")
public class Usuarios {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	@Column(name = "nome", length = 200, nullable = true)
	private String nome;
	@Column(name = "login", length = 15, nullable = true)
	private String login;
	@Column(name = "senha", length = 10, nullable = true)
	private String senha;

	/*@Column(name = "dataNasc", nullable = false)
	private Date dataNasc;

	@Column(name = "dataRegistro", nullable = false)
	private Date dataRegistro;*/

	@Column(name = "dataNasc", nullable = false)
private LocalDate dataNasc;

@Column(name = "dataCadastro", nullable = false)
private LocalDate dataCadastro;

public Integer getId() {
	return id;
}

public void setId(Integer id) {
	this.id = id;
}

public String getNome() {
	return nome;
}

public void setNome(String nome) {
	this.nome = nome;
}

public String getLogin() {
	return login;
}

public void setLogin(String login) {
	this.login = login;
}

public String getSenha() {
	return senha;
}

public void setSenha(String senha) {
	this.senha = senha;
}

public LocalDate getDataNasc() {
	return dataNasc;
}

public void setDataNasc(LocalDate dataNasc) {
	this.dataNasc = dataNasc;
}

public LocalDate getDataCadastro() {
	return dataCadastro;
}

public void setDataCadastro(LocalDate dataCadastro) {
	this.dataCadastro = dataCadastro;
}

	

}