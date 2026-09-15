package com.projet.stage.RestController;


import com.projet.stage.Entity.Postulation;
import com.projet.stage.Entity.SavePostulation;
import com.projet.stage.Respository.PostulationRepository;
import com.projet.stage.Service.PostulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/Postulation")
@CrossOrigin("*")
public class PostulationRestController {

    @Autowired
    PostulationService postulationService;

    @Autowired
    PostulationRepository postulationRepository;

    // Chemin de stockage des fichiers (CV et PDF attestations)
    private static final String UPLOAD_DIR = "C:/rayen/Stage PFE/FrontEnd/src/assets/images/upload/";

    // ─── Postulation d'un jeune diplômé ──────────────────────────────────
    @PostMapping("/jeunediplome/{jeuneDiplomeId}/offre/{offreId}")
    public ResponseEntity<Postulation> createPostulation(
            @PathVariable Long jeuneDiplomeId,
            @PathVariable Long offerId,
            @RequestParam("cv") MultipartFile file) {
        Postulation postulation = new Postulation();
        try {
            String fileName = file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            postulation.setCv(fileName);
            postulation.setDatepostulation(new Date());
        } catch (IOException e) {
            throw new RuntimeException("Erreur upload CV");
        }
        return ResponseEntity.ok(postulationService.ajouterPostulation(jeuneDiplomeId, offerId, postulation));
    }

    // ─── Postulation d'un étudiant ────────────────────────────────────────
    @PostMapping("/candidat/{candidatId}/offre/{offreId}")
    public ResponseEntity<Postulation> createPostulationCandidat(
            @PathVariable Long candidatId,
            @PathVariable Long offreId,
            @RequestParam("cv") MultipartFile file) {
        Postulation postulation = new Postulation();
        try {
            String fileName = file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            postulation.setCv(fileName);
            postulation.setDatepostulation(new Date());
        } catch (IOException e) {
            throw new RuntimeException("Erreur upload CV");
        }
        return ResponseEntity.ok(postulationService.ajouterPostulationCandidat(candidatId, offreId, postulation));
    }

    // ─── Upload d'un PDF d'attestation généré côté frontend ───────────────
    @PostMapping("/upload-attestation-pdf")
    public ResponseEntity<?> uploadAttestationPdf(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            return ResponseEntity.ok().body("{\"fileName\":\"" + fileName + "\"}");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'upload du PDF : " + e.getMessage());
        }
    }

    // ─── Lister toutes les postulations ──────────────────────────────────
    @GetMapping
    public List<Postulation> AfficherPostulation() {
        return postulationService.affichierPostulation();
    }

    @GetMapping("/{id}")
    public Optional<Postulation> getPostulationById(@PathVariable("id") Long id) {
        return postulationService.affichierPostulationParID(id);
    }

    // ─── Postulations par jeune diplômé ───────────────────────────────────
    @GetMapping("/jeunediplome/{jeuneDiplomeId}")
    public ResponseEntity<List<Postulation>> getPostulationsByJeuneDiplome(@PathVariable Long jeuneDiplomeId) {
        return ResponseEntity.ok(postulationService.getPostulationsByJeuneDiplome(jeuneDiplomeId));
    }

    // ─── Postulations par étudiant ────────────────────────────────────────
    @GetMapping("/candidat/{candidatId}")
    public ResponseEntity<List<Postulation>> getPostulationsByCandidat(@PathVariable Long candidatId) {
        return ResponseEntity.ok(postulationService.getPostulationsByCandidat(candidatId));
    }

    // ─── Postulations par offre ───────────────────────────────────────────
    @GetMapping("/offre/{offreId}")
    public ResponseEntity<List<Postulation>> getPostulationsByOffre(@PathVariable Long offerId) {
        return ResponseEntity.ok(postulationService.getPostulationsByOffer(offerId));
    }

    // ─── Postulations par responsable entreprise (toutes ses offres) ──────
    @GetMapping("/responsableEntreprise/{responsableId}")
    public ResponseEntity<List<Postulation>> getPostulationsByEntreprise(@PathVariable Long responsableId) {
        return ResponseEntity.ok(postulationRepository.findByResponsableEntrepriseId(responsableId));
    }

    // ─── Toutes les postulations d'étudiants (pour ResponsableAcademique) ─
    @GetMapping("/candidats")
    public ResponseEntity<List<Postulation>> getPostulationsCandidats() {
        return ResponseEntity.ok(postulationRepository.findAllCandidats());
    }

    // ─── Toutes les postulations de jeunes diplômés (pour ResponsableRH) ──
    @GetMapping("/jeune-diplome")
    public ResponseEntity<List<Postulation>> getPostulationsJeunesDiplomes() {
        return ResponseEntity.ok(postulationRepository.findAllJeunesDiplomes());
    }

    // ─── Valider / Accepter une postulation ──────────────────────────────
    @PutMapping("validate-postulation")
    public ResponseEntity<?> validatePostulation(@RequestBody SavePostulation savePostulation) {
        return postulationService.validatePostulation(savePostulation);
    }

    // ─── Annuler / Refuser une postulation ───────────────────────────────
    @PutMapping("/annuler/{id}")
    public ResponseEntity<?> annulerPostulation(@PathVariable("id") Long id) {
        return postulationService.annulerPostulation(id);
    }

    // ─── Mettre à jour le statut directement ─────────────────────────────
    @PutMapping("/{id}/statut")
    public ResponseEntity<?> updateStatut(@PathVariable Long id, @RequestParam int statut) {
        Optional<Postulation> opt = postulationRepository.findById(id);
        if (opt.isPresent()) {
            Postulation p = opt.get();
            p.setStatus(statut);
            postulationRepository.save(p);
            return new ResponseEntity<>(p, HttpStatus.OK);
        }
        return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
    }

    // ─── Notifications ────────────────────────────────────────────────────
    @GetMapping("/unread")
    public ResponseEntity<List<Postulation>> getUnreadContacts() {
        return ResponseEntity.ok(postulationRepository.findByIsReadFalse());
    }

    @PatchMapping("/{id}/mark-as-read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        postulationRepository.markAsRead(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/mark-all-read")
    public ResponseEntity<Void> markAllAsRead() {
        postulationRepository.markAllAsRead();
        return ResponseEntity.ok().build();
    }


}
