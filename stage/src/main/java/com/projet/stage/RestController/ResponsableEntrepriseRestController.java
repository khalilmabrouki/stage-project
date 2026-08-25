package com.projet.stage.RestController;

import com.projet.stage.Entity.ResponsableEntreprise;
import com.projet.stage.Respository.ResponsableEntrepriseRepository;
import com.projet.stage.Service.ResponsableEntrepriseService;
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
@RequestMapping(value = "/responsableentreprise")
@CrossOrigin("*")
public class ResponsableEntrepriseRestController {

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    ResponsableEntrepriseRepository responsableEntrepriseRepository;

    @Autowired
    ResponsableEntrepriseService responsableEntrepriseService;

    @Autowired
    MailSender mailSender;

    // ===== AJOUTER (AVEC EMAIL ET ENVOI DE MAIL) =====
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> AjouterResponsable(@RequestBody ResponsableEntreprise responsable) {

        HashMap<String, Object> response = new HashMap<>();

        if (responsableEntrepriseRepository.existsByEmail(responsable.getEmail())) {
            response.put("message", "Email existe déjà !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            String rawPassword = responsable.getMdp();
            responsable.setMdp(this.bCryptPasswordEncoder.encode(rawPassword));
            responsable.setStatut("Actif");

            ResponsableEntreprise savedUser = responsableEntrepriseRepository.save(responsable);

            // Envoyer email
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(responsable.getEmail());
                message.setSubject("Votre compte responsable d'entreprise a été créé");
                message.setText(
                        "Bonjour " + responsable.getPrenom() + ",\n\n" +
                                "Votre compte responsable d'entreprise a été créé avec succès.\n\n" +
                                "Email: " + responsable.getEmail() + "\n" +
                                "Mot de passe: " + rawPassword + "\n\n" +
                                "Entreprise: " + responsable.getNomEntreprise() + "\n" +
                                "Poste: " + responsable.getPoste() + "\n\n" +
                                "Veuillez vous connecter et changer votre mot de passe.\n\n" +
                                "Merci."
                );
                mailSender.send(message);
            } catch (Exception e) {
                System.out.println("❌ Error sending email to: " + responsable.getEmail());
                e.printStackTrace();
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

    // ===== AFFICHER TOUS =====
    @RequestMapping(method = RequestMethod.GET)
    public List<ResponsableEntreprise> AfficherResponsables() {
        return responsableEntrepriseService.affichierResponsableEntreprise();
    }

    // ===== SUPPRIMER =====
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void SupprimerResponsable(@PathVariable("id") Long id) {
        responsableEntrepriseService.supprimerResponsableEntreprise(id);
    }

    // ===== AFFICHER PAR ID =====
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<ResponsableEntreprise> getResponsableById(@PathVariable("id") Long id) {
        return responsableEntrepriseService.afficherResponsableEntrepriseById(id);
    }

    // ===== MODIFIER =====
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponsableEntreprise ModifierResponsable(@PathVariable("id") Long id, @RequestBody ResponsableEntreprise responsable) {
        responsable.setMdp(this.bCryptPasswordEncoder.encode(responsable.getMdp()));
        return responsableEntrepriseService.modifierResponsableEntreprise(responsable);
    }

    // ===== LOGIN =====
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginResponsable(@RequestBody ResponsableEntreprise responsable) {
        System.out.println("🔵 Tentative login responsable: " + responsable.getEmail());

        HashMap<String, Object> response = new HashMap<>();

        ResponsableEntreprise userFromDB = responsableEntrepriseRepository.findResponsableEntrepriseByEmail(responsable.getEmail());
        System.out.println("👤 Utilisateur trouvé: " + userFromDB);

        if (userFromDB == null) {
            response.put("message", "Email incorrect!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(responsable.getMdp(), userFromDB.getMdp());
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
                response.put("role", "ResponsableEntreprise");
                response.put("id", userFromDB.getId());
                response.put("nom", userFromDB.getNom());
                response.put("prenom", userFromDB.getPrenom());
                response.put("email", userFromDB.getEmail());
                response.put("nomEntreprise", userFromDB.getNomEntreprise());
                response.put("poste", userFromDB.getPoste());
                System.out.println("✅ Login réussi pour: " + userFromDB.getEmail());
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
        }
    }
}