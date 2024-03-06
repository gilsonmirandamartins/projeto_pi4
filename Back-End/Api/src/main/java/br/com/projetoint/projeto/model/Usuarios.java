package br.com.projetoint.projeto.model;

<<<<<<< HEAD
import java.util.Date;
=======
import java.time.LocalDate;
>>>>>>> 1749f4e55ccf507bea5c52d0a8d04e182da0716f

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
<<<<<<< HEAD
    private Integer id;

    @Column(name = "nome", length = 200, nullable = false)
    private String nome;

    @Column(name = "login", length = 30, nullable = true)
    private String login;

    @Column(name = "senha", length = 10, nullable = false)
    private String senha;

    @Column(name = "dataNascimento", nullable = true)
    private Date dataNascimento;

    @Column(name = "dataCadastro", nullable = false)
    private Date dataCadastro;

    @Column(name = "ativo", nullable = false)
    private Boolean ativo;
=======
	private Integer id;
	@Column(name = "nome", length = 200, nullable = true)
	private String nome;
	@Column(name = "login", length = 30, nullable = true)
	private String login;
	@Column(name = "senha", length = 10, nullable = true)
	private String senha;

	/*
	 * @Column(name = "dataNasc", nullable = false) private Date dataNasc;
	 * 
	 * @Column(name = "dataRegistro", nullable = false) private Date dataRegistro;
	 */

	@Column(name = "dataNasc", nullable = false)
	private LocalDate dataNasc;

	@Column(name = "dataCadastro", nullable = false)
	private LocalDate dataCadastro;
>>>>>>> 1749f4e55ccf507bea5c52d0a8d04e182da0716f

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

<<<<<<< HEAD
	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public Date getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(Date dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	public Boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}
	
	

=======
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

>>>>>>> 1749f4e55ccf507bea5c52d0a8d04e182da0716f
}