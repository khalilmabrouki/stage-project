package com.projet.stage.Service;

import com.projet.stage.Entity.Offer;
import com.projet.stage.Entity.ResponsableEntreprise;

import java.util.List;
import java.util.Optional;

public interface ResponsableEntrepriseService {

    ResponsableEntreprise ajouterResponsableEntreprise(ResponsableEntreprise responsableEntreprise);

    ResponsableEntreprise modifierResponsableEntreprise(ResponsableEntreprise responsableEntreprise);

    List<ResponsableEntreprise> affichierResponsableEntreprise();

    void supprimerResponsableEntreprise(Long id);

    Optional<ResponsableEntreprise> afficherResponsableEntrepriseById(Long id);



    // ✅ AJOUTER CETTE MÉTHODE
    boolean existsByEmail(String email);
}

