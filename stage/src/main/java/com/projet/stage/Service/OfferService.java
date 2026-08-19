package com.projet.stage.Service;

import com.projet.stage.Entity.Offer;

import java.util.List;
import java.util.Optional;

public interface OfferService {
    Offer ajouterOffer(Offer offer);

    Offer modifierOffer(Offer offer);

    List<Offer> affichierOffer();

    void supprimerOffer(Long id);

    Optional<Offer> afficherOfferById(Long id);

}
