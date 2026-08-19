package com.projet.stage.RestController;

import com.projet.stage.Entity.Candidat;
import com.projet.stage.Service.CandidatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping(value ="/candidat")
@CrossOrigin("*")
public class CandidatRestController {
    @Autowired
    CandidatService candidatService;

    @RequestMapping(method = RequestMethod.POST)
    public Candidat AjouteCandidat(@RequestBody Candidat candidat) {
        return candidatService.ajouterCandidat(candidat);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Candidat> AfficherCandidats() {
        return candidatService.affichierCandidat();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void SupprimerCandidat(@PathVariable("id") Long id) {
        candidatService.supprimerCandidat(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Candidat> getCandidatById(@PathVariable("id") Long id) {
        return candidatService.afficherCandidattById(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Candidat ModifierCandidat(@PathVariable("id") Long id, @RequestBody Candidat candidat) {
        return candidatService.modifierCandidat(candidat);
    }


}

