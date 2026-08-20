package com.projet.stage.Service;

import com.projet.stage.Entity.JeuneDiplome;
import com.projet.stage.Respository.JeuneDiplomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class JeuneDiplomeImpl implements JeuneDiplomeService {
@Autowired
JeuneDiplomeRepository jeuneDiplomeRepository;
    @Override
    public JeuneDiplome ajouterJeuneDiplome(JeuneDiplome jeuneDiplome) {
        return jeuneDiplomeRepository.save(jeuneDiplome);
    }

    @Override
    public JeuneDiplome modifierJeuneDiplome(JeuneDiplome jeuneDiplome) {
        return jeuneDiplomeRepository.save(jeuneDiplome);

    }

    @Override
    public List<JeuneDiplome> affichierJeuneDiplome() {
        return jeuneDiplomeRepository.findAll();
    }

    @Override
    public void supprimerJeuneDiplome(Long id) {
        jeuneDiplomeRepository.deleteById(id);

    }

    @Override
    public Optional<JeuneDiplome> afficherJeuneDiplomeById(Long id) {
        return jeuneDiplomeRepository.findById(id);
    }
}
