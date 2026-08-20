package com.projet.stage.RestController;

import com.projet.stage.Entity.JeuneDiplome;
import com.projet.stage.Service.JeuneDiplomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping(value = "/jeunediplome")
@CrossOrigin(value = "*")

public class JeuneDiplomeRestController {


    @Autowired
    JeuneDiplomeService jeuneDiplomeService;

    // Ajouter un jeune diplômé
    @RequestMapping(method = RequestMethod.POST)
    public JeuneDiplome AjouterJeuneDiplome(@RequestBody JeuneDiplome jeuneDiplome) {
        return jeuneDiplomeService.ajouterJeuneDiplome(jeuneDiplome);
    }

    // Afficher tous les jeunes diplômés
    @RequestMapping(method = RequestMethod.GET)
    public List<JeuneDiplome> AfficherJeuneDiplomes() {
        return jeuneDiplomeService.affichierJeuneDiplome();
    }

    // Afficher un jeune diplômé par ID
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<JeuneDiplome> getJeuneDiplomeById(@PathVariable("id") Long id) {
        return jeuneDiplomeService.afficherJeuneDiplomeById(id);
    }

    // Supprimer un jeune diplômé
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void SupprimerJeuneDiplome(@PathVariable("id") Long id) {
        jeuneDiplomeService.supprimerJeuneDiplome(id);
    }

    // Modifier un jeune diplômé
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public JeuneDiplome ModifierJeuneDiplome(@PathVariable("id") Long id, @RequestBody JeuneDiplome jeuneDiplome) {
        return jeuneDiplomeService.modifierJeuneDiplome(jeuneDiplome);
    }
}
