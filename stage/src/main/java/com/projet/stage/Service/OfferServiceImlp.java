package com.projet.stage.Service;

import com.projet.stage.Entity.Offer;
import com.projet.stage.Respository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class OfferServiceImlp implements OfferService{
    @Autowired
    OfferRepository offerRepository;
    @Override
    public Offer ajouterOffer(Offer offer) {
        return offerRepository.save(offer);
    }

    @Override
    public Offer modifierOffer(Offer offer) {
        return offerRepository.save(offer);
    }

    @Override
    public List<Offer> affichierOffer() {
        return offerRepository.findAll();
    }

    @Override
    public void supprimerOffer(Long id) {
        offerRepository.deleteById(id);

    }

    @Override
    public Optional<Offer> afficherOfferById(Long id) {
        return offerRepository.findById(id);
    }
}
