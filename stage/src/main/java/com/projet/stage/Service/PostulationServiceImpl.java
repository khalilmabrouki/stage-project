package com.projet.stage.Service;

import com.projet.stage.Entity.*;
import com.projet.stage.Respository.CandidatRepository;
import com.projet.stage.Respository.JeuneDiplomeRepository;
import com.projet.stage.Respository.OfferRepository;
import com.projet.stage.Respository.PostulationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class PostulationServiceImpl implements PostulationService {
    @Autowired
    PostulationRepository postulationRepository;

    @Autowired
    JeuneDiplomeRepository jeuneDiplomeRepository;

    @Autowired
    CandidatRepository candidatRepository;

    @Autowired
    OfferRepository offreRepository;
    @Override
    public Postulation ajouterPostulation(Long jeuneDiplomeId, Long offerId, Postulation postulation) {
        JeuneDiplome jeuneDiplome = jeuneDiplomeRepository.findById(jeuneDiplomeId)
                .orElseThrow(() -> new RuntimeException("Postualtion not found"));
        postulation.setJeuneDiplome(jeuneDiplome);
        Offer offer = offreRepository.findById(offerId)
                .orElseThrow(() -> new RuntimeException("Offre not found"));
        postulation.setOffer(offer);
        return postulationRepository.save(postulation);
    }

    @Override
    public Postulation ajouterPostulationCandidat(Long candidatId, Long offerId, Postulation postulation) {
        Candidat candidat = candidatRepository.findById(candidatId)
                .orElseThrow(() -> new RuntimeException("Postualtion not found"));
        postulation.setCandidat(candidat);
        Offer offer = offreRepository.findById(offerId)
                .orElseThrow(() -> new RuntimeException("Offre not found"));
        postulation.setOffer(offer);
        return postulationRepository.save(postulation);
    }


    @Override
    public List<Postulation> affichierPostulation() {
        return postulationRepository.findAll();
    }

    @Override
    public Optional<Postulation> affichierPostulationParID(Long id) {
        return postulationRepository.findById(id);
    }

    @Override
    public List<Postulation> getPostulationsByJeuneDiplome(Long jeuneDiplomeId) {
        return postulationRepository.findByJeuneDiplomeId(jeuneDiplomeId);
    }

    @Override
    public List<Postulation> getPostulationsByCandidat(Long candidatId) {
        return postulationRepository.findByCandidatId(candidatId);
    }

    @Override
    public List<Postulation> getPostulationsByOffer(Long offerId) {
        return postulationRepository.findByOfferId(offerId);
    }

    @Override
    public ResponseEntity<?> validatePostulation(SavePostulation savePostulation) {
        Optional<Postulation> r = postulationRepository.findById(savePostulation.getId());
        if (r.isPresent()) {
            Postulation res = r.get();
            res.setStatus(1); // 2 = Refusée
            return new ResponseEntity<>(postulationRepository.save(res), HttpStatus.OK);
        }
        return new ResponseEntity<>("Postulation non trouvée", HttpStatus.NOT_FOUND);
    }

    /**
     * Accepter une candidature → status = 1
     * Appelé par : PUT /savePost/annuler/{id}
     */
    @Override
    public ResponseEntity<?> annulerPostulation(Long id) {
        Optional<Postulation> optionalPostulation = postulationRepository.findById(id);
        if (optionalPostulation.isPresent()) {
            Postulation postulation = optionalPostulation.get();
            postulation.setStatus(2); // 1 = Acceptée
            postulationRepository.save(postulation);
            return new ResponseEntity<>(postulation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Postulation non trouvée", HttpStatus.BAD_REQUEST);
        }
    }
}
