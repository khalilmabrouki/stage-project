package com.projet.stage.RestController;

import com.projet.stage.Entity.Offer;
import com.projet.stage.Service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping(value ="/offer")
@CrossOrigin(value="*")

public class OfferRestController {
    @Autowired
    OfferService offerService;

    @PostMapping("/responsableEntreprise/{entrepriseId}")
    public ResponseEntity<Offer> createOffre(
            @PathVariable Long entrepriseId,

            @RequestParam("titre") String titre,
            @RequestParam("image") MultipartFile file,
            @RequestParam("description") String description,
            @RequestParam("experience") String experience,
            @RequestParam("salaire") String salaire,
            @RequestParam("adresse") String adresse,
            @RequestParam("datedebut") String datedebut,
            @RequestParam("datefin") String datefin,
            @RequestParam("type") String type,
            @RequestParam("competence") String competence
            ) {
        Offer offre = new Offer();
        offre.setTitre(titre);
        offre.setDescription(description);
        offre.setExperience(experience);
        offre.setSalaire(salaire);
        offre.setAdresse(adresse);
        offre.setDatedebut(datedebut);
        offre.setDatefin(datefin);
        offre.setType(type);
        offre.setCompetence(competence);


        // 📷 save image
        try {
            String fileName = file.getOriginalFilename();
            Path path = Paths.get("C:/rayen/Stage PFE/FrontEnd/src/assets/images/upload/" + fileName);

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            offre.setImage(fileName);
        } catch (IOException e) {
            throw new RuntimeException("Error upload image");
        }

        Offer created = offerService.ajouterOffer(entrepriseId, offre);

        return ResponseEntity.ok(created);
    }


    @GetMapping("/responsableEntreprise/{id}")
    public List<Offer> getOffresByEntreprise(@PathVariable Long id) {
        return offerService.getOfferByEntreprise(id);
    }
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

