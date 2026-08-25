package com.projet.stage.Respository;

import com.projet.stage.Entity.Candidat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidatRepository extends JpaRepository<Candidat,Long> {
    boolean existsByEmail(String email);

    Candidat findCandidatByEmail(String email);
}
