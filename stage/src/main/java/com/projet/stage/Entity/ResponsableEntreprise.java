package com.projet.stage.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

    @Data
    @Entity
    public class ResponsableEntreprise {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String nom;
        private String email;
        private String mdp;
        private String tel;
        private String adresse;
        private String logo;
        private boolean etat;
    }
