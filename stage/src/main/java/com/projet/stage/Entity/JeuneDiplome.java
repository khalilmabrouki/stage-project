package com.projet.stage.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class JeuneDiplome {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String mdp;
    private String telephone;
    private String cv;
    private String diplome;
    private String specialite;
    private Integer anneesExperience;
    private String statut;
}
