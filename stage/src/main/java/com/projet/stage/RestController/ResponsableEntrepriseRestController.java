package com.projet.stage.RestController;

import com.projet.stage.Entity.ResponsableEntreprise;
import com.projet.stage.Respository.ResponsableEntrepriseRepository;
import com.projet.stage.Service.EmailService;
import com.projet.stage.Service.ResponsableEntrepriseService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/responsableentreprise")
@CrossOrigin("*")
public class ResponsableEntrepriseRestController {
@Autowired
    EmailService emailService;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    ResponsableEntrepriseRepository responsableEntrepriseRepository;

    @Autowired
    ResponsableEntrepriseService responsableEntrepriseService;

    @Autowired
    MailSender mailSender;

    // ===== AJOUTER (AVEC EMAIL ET ENVOI DE MAIL) =====

    @PostMapping("/Ajouter")
    public ResponseEntity<ResponsableEntreprise> createResponsableEntreprise(

            @RequestBody ResponsableEntreprise responsableEntreprise,

            @RequestParam("logo") MultipartFile file
    ) {




        // 📷 Upload image
        try {
            String fileName = file.getOriginalFilename();

            Path path = Paths.get(
                    "D:/pfa/frontend/src/assets/uploads/" + fileName
            );

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            responsableEntreprise.setLogo(fileName);
            responsableEntrepriseRepository.save(responsableEntreprise);
        } catch (IOException e) {
            throw new RuntimeException("Error upload image", e);
        }

        // 💾 Sauvegarde
        ResponsableEntreprise created =
                responsableEntrepriseService
                        .ajouterResponsableEntreprise(responsableEntreprise);

        // 📧 Envoi du mail après inscription
        String subject = "Bienvenue - Vérification de votre compte";

        String text = "Bonjour " + created.getNom() + ",\n\n"
                + "Votre compte ResponsableEntreprise a été créé avec succès !\n\n"
                + "Informations de votre compte :\n"
                + "Email : " + created.getEmail() + "\n"
                + "Nom : " + created.getNom() + "\n\n"
                + "Votre compte est actuellement en attente de validation "
                + "par l'administrateur.\n\n"
                + "Vous recevrez une notification lorsque votre compte sera validé.\n\n"
                + "Cordialement,\n"
                + "L'équipe Admin";

        emailService.SendSimpleMessage(
                created.getEmail(),
                subject,
                text
        );

        return ResponseEntity.ok(created);
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
                System.out.println("✅ Login réussi pour: " + userFromDB.getEmail());
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
        }
    }

    @PutMapping(value = "/updateetat/{id}")
    public ResponseEntity<Map<String, Object>> modifieretatEntreprise(@RequestBody ResponsableEntreprise responsableEntreprise, @PathVariable("id") Long id) {
        ResponsableEntreprise newResponsableEntreprise = null;
        HashMap<String,Object>response=new HashMap<>();
        if (responsableEntrepriseRepository.findById(id).isPresent()) { //ken user deja mawjoud
            ResponsableEntreprise responsableEntreprise1 = responsableEntrepriseRepository.findById(id).get();
            var entrepriseid = responsableEntreprise.getId();
            var nom = responsableEntreprise.getNom();
            var email = responsableEntreprise.getEmail();
            var mdp = responsableEntreprise1.getMdp();
            var tel = responsableEntreprise.getTel();
            var adresse = responsableEntreprise.getAdresse();
            var logo = responsableEntreprise.getLogo();


            responsableEntreprise1.setId(entrepriseid);
            responsableEntreprise1.setNom(nom);
            responsableEntreprise1.setEmail(email);
            responsableEntreprise1.setMdp(mdp);
            responsableEntreprise1.setTel(tel);
           responsableEntreprise1.setAdresse(adresse);
            responsableEntreprise1.setLogo(logo);


            //mta3 yjih mail fih l etat
            responsableEntreprise.setMdp(this.bCryptPasswordEncoder.encode(responsableEntreprise1.getMdp()));
            if (responsableEntreprise.isEtat() != responsableEntreprise1.isEtat()) {
                String etat = responsableEntreprise1.isEtat() ? "<strong ><span style=\"color: red;\">Bloqué</span>\n</strong>" : "<strong><span style=\"color: green;\">Accepté</span>\n</strong>";
                String loginLink = "";

                String logoImagePath = "cid:logoImage";
                String messageHTML =
                        "<!DOCTYPE html>" +
                                "<html>" +
                                "<head>" +
                                "<style>" +
                                ".card {" +
                                "   background-color: #f9f9f9;" +
                                "   border-radius: 10px;" +
                                "   padding: 20px;" +
                                "   margin: 20px auto;" +
                                "   width: 400px;" +
                                "   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);" +
                                "}" +
                                ".logo {" +
                                "   text-align: center;" +
                                "   margin-bottom: 20px;" +
                                "}" +
                                ".logo img {" +
                                "   max-width: 200px;" +
                                "}" +
                                ".button {" +
                                "   display: block;" +
                                "   width: 200px;" +
                                "   margin: 0 auto;" +
                                "   padding: 10px 20px;" +
                                "   background-color: #b615ae;" +
                                "   color: white;" +
                                "   text-decoration: none;" +
                                "   text-align: center;" +
                                "   border-radius: 5px;" +
                                "   font-size: 16px;" +
                                "}" +
                                "</style>" +
                                "</head>" +
                                "<body>" +
                                "<div class=\"card\">" +
                                "<div class=\"logo\">" +
                                "<img src=\"cid:logoImage\" alt=\"Your Logo\">" +
                                "</div>" +
                                "<p> Salut <strong>" + responsableEntreprise.getNom() + "</strong>" +
                                "<h2>État de votre compte</h2>" +
                                "<h4>Votre compte a été " + etat + "</h4>";

                if (responsableEntreprise.isEtat()) { // If state is accepted
                    messageHTML += "<p>Cliquez ci-dessous pour revenir à la page de connexion :</p>\n" +
                            "<a href=\"http://localhost:4200/login-entreprise\"><button class=button>Connexion</button></a>\n";
                }

                messageHTML += "</div>" +
                        "</body>" +
                        "</html>";

                MimeMessage message = emailService.createMimeMessage();
                MimeMessageHelper helper;
                try {
                    helper = new MimeMessageHelper(message, true);
                    helper.setTo(responsableEntreprise.getEmail());
                    helper.setSubject("Acceptation inscription !");
                    helper.setText(messageHTML, true);
                    helper.addInline("logoImage", new ClassPathResource("static/image/logo_light2.png"));
                    emailService.SendEmail(message);
                } catch (MessagingException e) {

                }

            }

            responsableEntreprise1.setEtat(responsableEntreprise.isEtat());

            newResponsableEntreprise = responsableEntrepriseRepository.save(responsableEntreprise1);
            String token = Jwts.builder()
                    .claim("data", newResponsableEntreprise)
                    .signWith(SignatureAlgorithm.HS256, "SECRET")
                    .compact();

            response.put("responsableEntreprise", newResponsableEntreprise);
            response.put("token", token);
            System.out.println("ddddddddddddd");

            return ResponseEntity.status(HttpStatus.OK).body(response);

        } else {
            response.put("message", "Responsable entreprise  not found !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }}

}