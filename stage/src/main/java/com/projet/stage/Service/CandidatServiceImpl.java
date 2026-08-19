package com.projet.stage.Service;

import com.projet.stage.Entity.Candidat;
import com.projet.stage.Respository.CandidatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CandidatServiceImpl implements CandidatService{
    @Autowired
    CandidatRepository candidatRepository;
    @Override
    public Candidat ajouterCandidat(Candidat candidat) {
        return candidatRepository.save(candidat);
    }

    @Override
    public Candidat modifierCandidat(Candidat candidat) {
        return candidatRepository.save(candidat);
    }

    @Override
    public List<Candidat> affichierCandidat() {
        return candidatRepository.findAll();
    }

    @Override
    public void supprimerCandidat(Long id) {
        candidatRepository.deleteById(id);

    }

    @Override
    public Optional<Candidat> afficherCandidattById(Long id) {
        return candidatRepository.findById(id);
    }
}
