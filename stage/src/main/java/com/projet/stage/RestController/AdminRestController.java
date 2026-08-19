package com.projet.stage.RestController;

import com.projet.stage.Entity.Admin;
import com.projet.stage.Respository.AdminRepository;
import com.projet.stage.Service.AdminService;
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
@RequestMapping(value ="/admin")
@CrossOrigin("*")
public class AdminRestController {
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    AdminService adminService;

    @Autowired
    MailSender mailSender;
    @RequestMapping(method = RequestMethod.POST)

    ResponseEntity<?> AjouterAdmin(@RequestBody Admin admin){

        HashMap<String, Object> response = new HashMap<>();

        if(adminRepository.existsByEmail(admin.getEmail())){
            response.put("message", "email exist deja !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {


            String rawPassword = admin.getMdp();


            admin.setMdp(this.bCryptPasswordEncoder.encode(rawPassword));

            Admin savedUser = adminRepository.save(admin);

            try {
                SimpleMailMessage message = new SimpleMailMessage();

                message.setTo(admin.getEmail());
                message.setSubject("Votre compte a été créé");

                message.setText(
                        "Bonjour " + admin.getPrenom() + ",\n\n" +
                                "Votre compte a été créé avec succès.\n\n" +
                                "Email: " + admin.getEmail() + "\n" +
                                "Mot de passe: " + rawPassword + "\n\n" +
                                "Veuillez vous connecter, changer votre mot de passe.\n\n" +
                                "Merci."
                );

                mailSender.send(message);

            } catch (Exception e) {
                System.out.println("❌ Error sending email to: " + admin.getEmail());
                e.printStackTrace();
                throw e;
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Admin> AfficherAdmin(){

        return adminService.affichierAdmin();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void SupprimerAdmin(@PathVariable("id") Long id){
        adminService.supprimerAdmin(id);

    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Admin> getAdminById(@PathVariable("id") Long id){

        Optional<Admin> admin = adminService.afficherAdminById(id);
        return admin;
    }

    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public Admin ModifierAdmin(@PathVariable("id")Long id, @RequestBody Admin admin){
        admin.setMdp(this.bCryptPasswordEncoder.encode(admin.getMdp()));
        Admin savedUser = adminRepository.save(admin);

        Admin newAdmin = adminService.modifierAdmin(admin);
        return newAdmin;
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginAdmin(@RequestBody Admin admin) {
        System.out.println("in login-admin"+admin);
        HashMap<String, Object> response = new HashMap<>();

        Admin userFromDB = adminRepository.findAdminByEmail(admin.getEmail());
        System.out.println("userFromDB+admin"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "Admin not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(admin.getMdp(), userFromDB.getMdp());
            System.out.println("compare"+compare);
            if (!compare) {
                response.put("message", "Password incorrect!");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }else
            {
                String token = Jwts.builder()

                        .claim("data", userFromDB)
                        .signWith(SignatureAlgorithm.HS256, "SECRET")
                        .compact();
                response.put("token", token);
                response.put("role", userFromDB.getRole());
                System.out.println("hhh");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }

        }
    }
}
