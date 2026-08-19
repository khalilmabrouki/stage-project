package com.projet.stage.RestController;

import com.projet.stage.Entity.Offer;
import com.projet.stage.Service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping(value ="/offer")
@CrossOrigin(value="*")

public class OfferRestController {
    @Autowired
    OfferService offerService;

    @RequestMapping(method = RequestMethod.POST)
    public Offer AjouteOffer(@RequestBody Offer offer) {


        return offerService.ajouterOffer(offer);
    }


    @RequestMapping(method = RequestMethod.GET)
    public List<Offer> AfficherOffer() {

        return offerService.affichierOffer();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void SupprimerAdmin(@PathVariable("id") Long id) {
        offerService.supprimerOffer(id);

    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Offer> getAdminById(@PathVariable("id") Long id) {

        Optional<Offer> offer = offerService.afficherOfferById(id);
        return offer;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Offer ModifierOffer(@PathVariable("id") Long id, @RequestBody Offer offer) {

        Offer newOffer = offerService.modifierOffer(offer);
        return newOffer;
    }
}

