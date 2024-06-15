package br.com.projetoint.projeto.DTO;

public class ConsultaDTO {

    private String queixaPrincipal;
    private String diagnostico;
    private String paciente;
    private String medico;
    public String getQueixaPrincipal() {
        return queixaPrincipal;
    }
    public void setQueixaPrincipal(String queixaPrincipal) {
        this.queixaPrincipal = queixaPrincipal;
    }
    public String getDiagnostico() {
        return diagnostico;
    }
    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }
    public String getPaciente() {
        return paciente;
    }
    public void setPaciente(String paciente) {
        this.paciente = paciente;
    }
    public String getMedico() {
        return medico;
    }
    public void setMedico(String medico) {
        this.medico = medico;
    }

    

}
