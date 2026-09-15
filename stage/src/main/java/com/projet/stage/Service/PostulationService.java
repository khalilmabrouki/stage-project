package com.projet.stage.Service;

import com.projet.stage.Entity.Postulation;
import com.projet.stage.Entity.SavePostulation;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface PostulationService {
    Postulation
    ajouterPostulation(Long jeuneDiplomeId, Long offerId, Postulation postulation);
    Postulation ajouterPostulationCandidat(Long candidatId, Long offerId, Postulation postulation);
    List<Postulation> affichierPostulation();
    Optional<Postulation> affichierPostulationParID(Long id);

    List<Postulation> getPostulationsByJeuneDiplome(Long jeuneDiplomeId);
    List<Postulation> getPostulationsByCandidat(Long candidatId);
    List<Postulation> getPostulationsByOffer(Long offerId);

    ResponseEntity<?> validatePostulation(SavePostulation savePostulation);

    ResponseEntity<?> annulerPostulation(Long id);
}
