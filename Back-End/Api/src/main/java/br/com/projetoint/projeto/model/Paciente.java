package br.com.projetoint.projeto.model;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Paciente")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPaciente;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "documento", nullable = false, length = 11, unique = true)
    private String documento;

    @Column(name = "sexo", nullable = false)
    private String sexo;

    @Column(name = "dataNascimento", nullable = false)
    private LocalDate dataNascimento;

    @OneToOne(mappedBy = "paciente", cascade = CascadeType.ALL)
    private IMC imc;

    public Long getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(Long idPaciente) {
        this.idPaciente = idPaciente;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public IMC getImc() {
        return imc;
    }

    public void setImc(IMC imc) {
        this.imc = imc;
    }

    

}
