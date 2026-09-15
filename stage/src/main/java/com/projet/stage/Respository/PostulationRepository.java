package com.projet.stage.Respository;

import com.projet.stage.Entity.Postulation;
import jakarta.transaction.Transactional;
import org.jspecify.annotations.Nullable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostulationRepository extends JpaRepository<Postulation,Long> {

    List<Postulation> findByJeuneDiplomeId(Long jeuneDiplomeId);

    List<Postulation> findByCandidatId(Long candidatId);

    List<Postulation> findByOfferId(Long offerId);



    @Query("SELECT p FROM Postulation p WHERE p.offer.responsableEntreprise.id = :responsableId")
    List<Postulation> findByResponsableEntrepriseId(@Param("responsableId") Long responsableId);

    // Postulations d'étudiants (stagiaires) uniquement
    @Query("SELECT p FROM Postulation p WHERE p.candidat IS NOT NULL")
    List<Postulation> findAllCandidats();

    // Postulations de jeunes diplômés uniquement
    @Query("SELECT p FROM Postulation p WHERE p.jeuneDiplome IS NOT NULL")
    List<Postulation> findAllJeunesDiplomes();

    @Modifying
    @Transactional
    @Query("UPDATE Postulation c SET c.isRead = true WHERE c.id = :id")
    void markAsRead(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("UPDATE Postulation c SET c.isRead = true")
    void markAllAsRead();


    List<Postulation> findByIsReadFalse();
}
