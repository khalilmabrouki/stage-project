package com.projet.stage.Service;

import jakarta.mail.internet.MimeMessage;

public interface EmailCandidatService {
    public MimeMessage createMimeMessage();
    public void SendEmail(MimeMessage message);
}
