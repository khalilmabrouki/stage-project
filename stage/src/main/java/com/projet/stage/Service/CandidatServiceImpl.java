package com.projet.stage.Service;

import com.projet.stage.Entity.Candidat;
import com.projet.stage.Entity.ConfirmationToken;
import com.projet.stage.Respository.CandidatRepository;
import com.projet.stage.Respository.ConfirmationTokenRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CandidatServiceImpl implements CandidatService{
    @Autowired
    CandidatRepository candidatRepository;
    @Autowired
    ConfirmationTokenRepository confirmationTokenRepository;
    @Autowired
    EmailCandidatService emailCandidatService;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @Override
    public ResponseEntity<Object> ajouterCandidat(Candidat candidat) {
        Candidat existingUser = candidatRepository.findCandidatByEmail(candidat.getEmail());
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        candidat.setMdp(this.bCryptPasswordEncoder.encode(candidat.getMdp()));
        candidatRepository.save(candidat);
        ConfirmationToken confirmationToken = new ConfirmationToken(candidat);
        confirmationTokenRepository.save(confirmationToken);


        // Construction du message HTML avec un bouton de vérification
        String confirmationLink = "http://localhost:8080/api/candidat/confirm-account?token=" + confirmationToken.getConfirmationToken();
        String logoImagePath = "cid:logoImage";
        String emailContent = "<!DOCTYPE html>" +
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
                "<img src=\"cid:logoImage\" alt=\"Your Logo\">"  +
                "</div>" +
                "<p> Salut <strong>"+candidat.getNom()+"</strong>"+

                "<h2>Complétez votre inscription !</h2>" +
                "<p>Pour confirmer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>" +
                "<a href=\"" + confirmationLink + "\" class=\"button\">Vérifier l'e-mail</a>" +
                "</div>" +
                "</body>" +
                "</html>";
        //charge image




        // Envoi de l'e-mail en format HTML
        MimeMessage message = emailCandidatService.createMimeMessage();
        MimeMessageHelper helper;
        try {
            helper = new MimeMessageHelper(message, true);
            helper.setTo(candidat.getEmail());
            helper.setSubject("Complétez votre inscription !");
            helper.setText(emailContent, true);
            helper.addInline("logoImage", new ClassPathResource("static/image/logo_light2.png"));
        } catch (MessagingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email");
        }

        emailCandidatService.SendEmail(message);

        System.out.println("Confirmation Token: " + confirmationToken.getConfirmationToken());

        return ResponseEntity.ok("Verify email by the link sent on your email address");
    }

    @Override
    public Candidat modifierCandidat(Candidat candidat) {
        return candidatRepository.save(candidat);
    }

    @Override
    public List<Candidat> affichierCandidat() {
        return candidatRepository.findAll();
    }

    @Override
    public void supprimerCandidat(Long id) {
        candidatRepository.deleteById(id);

    }

    @Override
    public Optional<Candidat> afficherCandidattById(Long id) {
        return candidatRepository.findById(id);
    }
    @Override
    public ResponseEntity<?> confirmationemail(String confirmationemail) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationemail);

        if(token != null)
        {

            Candidat candidat = candidatRepository.findCandidatByEmail(token.getCandidat().getEmail());
            System.out.println("email from token " +token.getCandidat().getEmail());
            candidat.setEtat(true);
            candidatRepository.save(candidat);

            String htmlResponse = "<!DOCTYPE html>\n" +
                    "<html lang=\"fr\">\n" + // Langue française
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\">\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                    "    <title>Confirmation de l'email</title>\n" + // Titre en français
                    "    <style>\n" +
                    "        body {\n" +
                    "            font-family: Arial, sans-serif;\n" +
                    "            background-color: #f4f4f4;\n" +
                    "            margin: 0;\n" +
                    "            padding: 0;\n" +
                    "            display: flex;\n" +
                    "            justify-content: center;\n" +
                    "            align-items: center;\n" +
                    "            height: 100vh;\n" +
                    "            background: linear-gradient(135deg, #b615ae, #1f5bc4);\n"+
                    "        }\n" +
                    "\n" +
                    "        .container {\n" +
                    "            background-color: #fff;\n" +
                    "            padding: 20px;\n" +
                    "            border-radius: 8px;\n" +
                    "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
                    "            text-align: center;\n" +
                    "        }\n" +
                    "\n" +
                    "        h2 {\n" +
                    "            margin-bottom: 20px;\n" +
                    "        }\n" +
                    "\n" +
                    "        xml {\n" +
                    "            max-width: 40%;\n" +
                    "            height: auto;\n" +
                    "            margin-bottom: 20px;\n" +
                    "        }\n" +
                    "\n" +
                    "        button {\n" +
                    "            background-color: #b615ae;\n" +
                    "            color: #fff;\n" +
                    "            border: none;\n" +
                    "            border-radius: 4px;\n" +
                    "            padding: 10px 20px;\n" +
                    "            cursor: pointer;\n" +
                    "            transition: background-color 0.3s ease;\n" +
                    "        }\n" +
                    "\n" +
                    "        button:hover {\n" +
                    "            background-color: #0056b3;\n" +
                    "        }\n" +
                    "    </style>\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "    <div class=\"container\">\n" +
                    "       <?xml version=\"1.0\" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height=\"100px\" style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 512 512\" width=\"100px\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"_x31_12-gmail_x2C__email_x2C__mail\"><g><g><g><rect height=\"358.87\" style=\"fill:#F1F5F7;\" width=\"357.904\" x=\"77.045\" y=\"76.565\"/><path d=\"M256.002,293.738l178.947,141.697v-279.74L256.002,293.738z M256.002,293.738\" style=\"fill:#DCE6EA;\"/><path d=\"M449.861,76.565h-14.912L256.002,218.26L77.045,76.565H62.134      c-24.693,0-44.737,20.094-44.737,44.858v269.152c0,24.759,20.044,44.859,44.737,44.859h14.911v-279.74l178.957,138.014      l178.947-138.047v279.773h14.912c24.699,0,44.742-20.101,44.742-44.859V121.424C494.604,96.66,474.561,76.565,449.861,76.565      L449.861,76.565z M449.861,76.565\" style=\"fill:#F84437;\"/></g></g></g></g><g id=\"Layer_1\"/></svg>\n" + // Remplacez par l'URL réelle de votre image
                    "        <h2>Confirmation de l'email</h2>\n" +
                    "        <p>Email vérifié avec succès !</p>\n" + // Message en français
                    "        <p>Cliquez ci-dessous pour revenir à la page de connexion :</p>\n" +
                    "        <a href=\"http://localhost:4200/login-candidat\"><button>Retour à la connexion</button></a>\n" +
                    "    </div>\n" +
                    "</body>\n" +
                    "</html>";
            MimeMessageHelper helper;

            return ResponseEntity.ok(htmlResponse  );
        }

        return ResponseEntity.badRequest().body("Erreur : Impossible de vérifier l'email");
    }

}

