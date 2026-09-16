package com.projet.stage.Service;

import com.projet.stage.Entity.Candidat;
import com.projet.stage.Entity.Contact;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface CandidatService {

    ResponseEntity<Object> ajouterCandidat(Candidat candidat);

    Candidat modifierCandidat(Candidat candidat);

    List<Candidat> affichierCandidat();

    void supprimerCandidat(Long id);

    Optional<Candidat> afficherCandidattById(Long id);


    ResponseEntity<?> confirmationemail(String confirmationemail);
}
