package com.projet.stage.RestController;

import com.projet.stage.Entity.Candidat;
import com.projet.stage.Respository.CandidatRepository;
import com.projet.stage.Service.CandidatService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/candidat")
@CrossOrigin("*")
public class CandidatRestController {

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    CandidatRepository candidatRepository;

    @Autowired
    CandidatService candidatService;

    @Autowired
    MailSender mailSender;

    // ===== AJOUTER (AVEC EMAIL ET ENVOI DE MAIL) =====
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> AjouterCandidat(@RequestBody Candidat candidat) {

        HashMap<String, Object> response = new HashMap<>();

        if (candidatRepository.existsByEmail(candidat.getEmail())) {
            response.put("message", "Email existe déjà !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            String rawPassword = candidat.getMdp();
            candidat.setMdp(this.bCryptPasswordEncoder.encode(rawPassword));

            Candidat savedUser = candidatRepository.save(candidat);

            // Envoyer email
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(candidat.getEmail());
                message.setSubject("Votre compte candidat a été créé");
                message.setText(
                        "Bonjour " + candidat.getPrenom() + ",\n\n" +
                                "Votre compte candidat a été créé avec succès.\n\n" +
                                "Email: " + candidat.getEmail() + "\n" +
                                "Mot de passe: " + rawPassword + "\n\n" +
                                "Veuillez vous connecter et changer votre mot de passe.\n\n" +
                                "Merci."
                );
                mailSender.send(message);
            } catch (Exception e) {
                System.out.println("❌ Error sending email to: " + candidat.getEmail());
                e.printStackTrace();
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

    // ===== AFFICHER TOUS =====
    @RequestMapping(method = RequestMethod.GET)
    public List<Candidat> AfficherCandidats() {
        return candidatService.affichierCandidat();
    }

    // ===== SUPPRIMER =====
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void SupprimerCandidat(@PathVariable("id") Long id) {
        candidatService.supprimerCandidat(id);
    }

    // ===== AFFICHER PAR ID =====
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Candidat> getCandidatById(@PathVariable("id") Long id) {
        return candidatService.afficherCandidattById(id);
    }

    // ===== MODIFIER =====
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Candidat ModifierCandidat(@PathVariable("id") Long id, @RequestBody Candidat candidat) {
        candidat.setMdp(this.bCryptPasswordEncoder.encode(candidat.getMdp()));
        return candidatService.modifierCandidat(candidat);
    }

    // ===== LOGIN =====
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginCandidat(@RequestBody Candidat candidat) {
        System.out.println("🔵 Tentative login candidat: " + candidat.getEmail());

        HashMap<String, Object> response = new HashMap<>();

        Candidat userFromDB = candidatRepository.findCandidatByEmail(candidat.getEmail());
        System.out.println("👤 Utilisateur trouvé: " + userFromDB);

        if (userFromDB == null) {
            response.put("message", "Email incorrect!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(candidat.getMdp(), userFromDB.getMdp());
            System.out.println("🔑 Mot de passe match: " + compare);

            if (!compare) {
                response.put("message", "Mot de passe incorrect!");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            } else {
                String token = Jwts.builder()
                        .claim("data", userFromDB)
                        .signWith(SignatureAlgorithm.HS256, "SECRET")
                        .compact();
                response.put("token", token);
                response.put("role", "Candidat");
                response.put("id", userFromDB.getId());
                response.put("nom", userFromDB.getNom());
                response.put("prenom", userFromDB.getPrenom());
                response.put("email", userFromDB.getEmail());
                System.out.println("✅ Login réussi pour: " + userFromDB.getEmail());
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
        }
    }
}