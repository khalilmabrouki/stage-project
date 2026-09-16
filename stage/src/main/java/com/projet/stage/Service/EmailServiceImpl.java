package com.projet.stage.Service;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Override
    public void SendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@baeldung.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        try {
            emailSender.send(message);
            log.info("Email sent successfully to: {}", to);
        } catch (MailException e) {
            log.error("Failed to send email: {}", e.getMessage(), e);
        }
    }
    @Override
    public MimeMessage createMimeMessage() {
        return emailSender.createMimeMessage();
    }

    @Override
    public void SendEmail(MimeMessage message) {
        emailSender.send(message);
    }
}
