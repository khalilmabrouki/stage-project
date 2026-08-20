package com.projet.stage.RestController;

import com.projet.stage.Entity.ResponsableEntreprise;
import com.projet.stage.Service.ResponsableEntrepriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping(value = "/responsableentreprise")
@CrossOrigin(value = "*")
public class ResponsableEntrepriseRestController {

    @Autowired
    ResponsableEntrepriseService responsableEntrepriseService;

    // Ajouter un responsable d'entreprise
    @RequestMapping(method = RequestMethod.POST)
    public ResponsableEntreprise AjouterResponsable(@RequestBody ResponsableEntreprise responsableEntreprise) {
        return responsableEntrepriseService.ajouterResponsableEntreprise(responsableEntreprise);
    }

    // Afficher tous les responsables
    @RequestMapping(method = RequestMethod.GET)
    public List<ResponsableEntreprise> AfficherResponsables() {
        return responsableEntrepriseService.affichierResponsableEntreprise();
    }

    // Afficher un responsable par ID
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<ResponsableEntreprise> getResponsableById(@PathVariable("id") Long id) {
        return responsableEntrepriseService.afficherResponsableEntrepriseById(id);
    }

    // Supprimer un responsable
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void SupprimerResponsable(@PathVariable("id") Long id) {
        responsableEntrepriseService.supprimerResponsableEntreprise(id);
    }

    // Modifier un responsable
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponsableEntreprise ModifierResponsable(@PathVariable("id") Long id, @RequestBody ResponsableEntreprise responsable) {
        return responsableEntrepriseService.modifierResponsableEntreprise(responsable);
    }
}
