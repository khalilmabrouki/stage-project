package com.projet.stage.Respository;

import com.projet.stage.Entity.ResponsableEntreprise;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ResponsableEntrepriseRepository extends JpaRepository<ResponsableEntreprise,Long> {

    boolean existsByEmail(String email);

    ResponsableEntreprise findResponsableEntrepriseByEmail(String email);
}
