package br.com.projetoint.projeto.model;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class IMC {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idIMC;

    @OneToOne
    @JoinColumn(name = "paciente_id", nullable = false, unique = true)
    private Paciente paciente;

    @Column(nullable = false)
    private double peso;

    @Column(nullable = false)
    private double altura;

    @Column(columnDefinition = "DECIMAL(5,2) AS (peso / (altura * altura)) STORED")
    private double resultado;

    public Long getIdIMC() {
        return idIMC;
    }

    public void setIdIMC(Long idIMC) {
        this.idIMC = idIMC;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public double getPeso() {
        return peso;
    }

    public void setPeso(double peso) {
        this.peso = peso;
    }

    public double getAltura() {
        return altura;
    }

    public void setAltura(double altura) {
        this.altura = altura;
    }

    public double getResultado() {
        return resultado;
    }

    public void setResultado(double resultado) {
        this.resultado = resultado;
    }


    
}
