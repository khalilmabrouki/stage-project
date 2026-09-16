package com.projet.stage.Service;

import jakarta.mail.internet.MimeMessage;

public interface EmailService {
    public void SendSimpleMessage(String to, String subject, String text);

    public void SendEmail(MimeMessage message);

    public MimeMessage createMimeMessage();
}
