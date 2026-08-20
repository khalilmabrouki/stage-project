package com.projet.stage.Service;



import com.projet.stage.Entity.JeuneDiplome;


import java.util.List;
import java.util.Optional;


public interface JeuneDiplomeService {


    JeuneDiplome ajouterJeuneDiplome(JeuneDiplome jeuneDiplome);

    JeuneDiplome modifierJeuneDiplome(JeuneDiplome jeuneDiplome);

    List<JeuneDiplome> affichierJeuneDiplome();

    void supprimerJeuneDiplome(Long id);

    Optional<JeuneDiplome> afficherJeuneDiplomeById(Long id);


}
