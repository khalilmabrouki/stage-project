package com.projet.stage.RestController;

import com.projet.stage.Entity.JeuneDiplome;
import com.projet.stage.Respository.JeuneDiplomeRepository;
import com.projet.stage.Service.JeuneDiplomeService;
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
@RequestMapping(value = "/jeunediplome")
@CrossOrigin("*")
public class JeuneDiplomeRestController {

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    JeuneDiplomeRepository jeuneDiplomeRepository;

    @Autowired
    JeuneDiplomeService jeuneDiplomeService;

    @Autowired
    MailSender mailSender;

    // ===== AJOUTER (AVEC EMAIL) =====
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> AjouterJeuneDiplome(@RequestBody JeuneDiplome jeuneDiplome) {

        HashMap<String, Object> response = new HashMap<>();

        if (jeuneDiplomeRepository.existsByEmail(jeuneDiplome.getEmail())) {
            response.put("message", "email exist deja !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            String rawPassword = jeuneDiplome.getMdp();
            jeuneDiplome.setMdp(this.bCryptPasswordEncoder.encode(rawPassword));
            jeuneDiplome.setStatut("Actif");

            JeuneDiplome savedUser = jeuneDiplomeRepository.save(jeuneDiplome);

            // Envoyer email
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(jeuneDiplome.getEmail());
                message.setSubject("Votre compte jeune diplômé a été créé");
                message.setText(
                        "Bonjour " + jeuneDiplome.getPrenom() + ",\n\n" +
                                "Votre compte jeune diplômé a été créé avec succès.\n\n" +
                                "Email: " + jeuneDiplome.getEmail() + "\n" +
                                "Mot de passe: " + rawPassword + "\n\n" +
                                "Veuillez vous connecter et changer votre mot de passe.\n\n" +
                                "Merci."
                );
                mailSender.send(message);
            } catch (Exception e) {
                System.out.println("❌ Error sending email to: " + jeuneDiplome.getEmail());
                e.printStackTrace();
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

    // ===== AFFICHER TOUS =====
    @RequestMapping(method = RequestMethod.GET)
    public List<JeuneDiplome> AfficherJeuneDiplomes() {
        return jeuneDiplomeService.affichierJeuneDiplome();
    }

    // ===== SUPPRIMER =====
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void SupprimerJeuneDiplome(@PathVariable("id") Long id) {
        jeuneDiplomeService.supprimerJeuneDiplome(id);
    }

    // ===== AFFICHER PAR ID =====
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<JeuneDiplome> getJeuneDiplomeById(@PathVariable("id") Long id) {
        return jeuneDiplomeService.afficherJeuneDiplomeById(id);
    }

    // ===== MODIFIER =====
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public JeuneDiplome ModifierJeuneDiplome(@PathVariable("id") Long id, @RequestBody JeuneDiplome jeuneDiplome) {
        jeuneDiplome.setMdp(this.bCryptPasswordEncoder.encode(jeuneDiplome.getMdp()));
        return jeuneDiplomeService.modifierJeuneDiplome(jeuneDiplome);
    }

    // ===== LOGIN =====
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginJeuneDiplome(@RequestBody JeuneDiplome jeuneDiplome) {
        System.out.println("🔵 Tentative login jeune diplômé: " + jeuneDiplome.getEmail());

        HashMap<String, Object> response = new HashMap<>();

        JeuneDiplome userFromDB = jeuneDiplomeRepository.findJeuneDiplomeByEmail(jeuneDiplome.getEmail());
        System.out.println("👤 Utilisateur trouvé: " + userFromDB);

        if (userFromDB == null) {
            response.put("message", "Email incorrect!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(jeuneDiplome.getMdp(), userFromDB.getMdp());
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
                response.put("role", "JeuneDiplome");
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