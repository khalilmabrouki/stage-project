package com.projet.stage.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
@Entity
@Data
public class Postulation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    Offer offer;
    @ManyToOne
    JeuneDiplome jeuneDiplome;
    @ManyToOne
    Candidat candidat;
    private  String cv;
    private  int status=0;
    private Date datepostulation;
    @Column(name = "is_read", columnDefinition = "boolean default false")
    private boolean isRead = false;
}
