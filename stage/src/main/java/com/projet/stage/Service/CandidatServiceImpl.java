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
        String confirmationLink = "http://localhost:8081/api/candidat/confirm-account?token=" + confirmationToken.getConfirmationToken();
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
            helper.addInline("logoImage", new ClassPathResource("static/images/logo.png"));
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
}
