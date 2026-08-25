package com.projet.stage.Respository;

import com.projet.stage.Entity.JeuneDiplome;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JeuneDiplomeRepository extends JpaRepository<JeuneDiplome,Long> {
    // ✅ Vérifier si l'email existe
    boolean existsByEmail(String email);

    // ✅ Trouver par email (pour login)
    JeuneDiplome findJeuneDiplomeByEmail(String email);
}
