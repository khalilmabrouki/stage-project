package com.projet.stage.Service;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class EmailCandidatServiceImpl implements EmailCandidatService{
    @Autowired
    private JavaMailSender emailSender;
    private JavaMailSender javaMailSender;

    @Autowired
    public void EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async
    public MimeMessage createMimeMessage() {
        return javaMailSender.createMimeMessage();
    }

    public void SendEmail(MimeMessage message) {
        javaMailSender.send(message);
    }
}
