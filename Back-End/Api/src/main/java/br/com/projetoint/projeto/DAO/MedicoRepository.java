
package br.com.projetoint.projeto.DAO;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoint.projeto.model.Medico;

public interface MedicoRepository extends JpaRepository<Medico, Integer> {
}

