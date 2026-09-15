package com.projet.stage.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;
@Entity
@Data
public class ConfirmationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="token_id")
    private Long tokenId;

    @Column(name="confirmation_token")
    private String confirmationToken;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @OneToOne(targetEntity = Candidat.class, fetch = FetchType.LAZY,cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(nullable = false, name = "candidat_id")
    private Candidat candidat;



    public ConfirmationToken(Candidat candidat) {
        this.candidat = candidat;
        createdDate = new Date();
        confirmationToken = UUID.randomUUID().toString();
    }

    public ConfirmationToken(Long tokenId, String confirmationToken, Date createdDate, Candidat candidat) {
        this.tokenId = tokenId;
        this.confirmationToken = confirmationToken;
        this.createdDate = createdDate;
        this.candidat = candidat;
    }

    public ConfirmationToken() {
    }

}
