package com.projet.stage.Service;

import com.projet.stage.Entity.ResponsableEntreprise;
import com.projet.stage.Respository.ResponsableEntrepriseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service

public class ResponsableEntrepriseImpl implements ResponsableEntrepriseService {
    @Autowired
    ResponsableEntrepriseRepository responsableEntrepriseRepository;

    @Override
    public ResponsableEntreprise ajouterResponsableEntreprise(ResponsableEntreprise responsableEntreprise) {
        return responsableEntrepriseRepository.save(responsableEntreprise);
    }

    @Override
    public ResponsableEntreprise modifierResponsableEntreprise(ResponsableEntreprise responsableEntreprise) {
        return responsableEntrepriseRepository.save(responsableEntreprise);
    }

    @Override
    public List<ResponsableEntreprise> affichierResponsableEntreprise() {
        return responsableEntrepriseRepository.findAll();
    }

    @Override
    public void supprimerResponsableEntreprise(Long id) {
        responsableEntrepriseRepository.deleteById(id);
    }

    @Override
    public Optional<ResponsableEntreprise> afficherResponsableEntrepriseById(Long id) {
        return responsableEntrepriseRepository.findById(id);
    }


    // ✅ AJOUTER CETTE MÉTHODE
    @Override
    public boolean existsByEmail(String email) {
        return responsableEntrepriseRepository.existsByEmail(email);
    }
}