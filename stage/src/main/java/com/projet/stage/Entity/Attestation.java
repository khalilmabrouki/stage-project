package com.projet.stage.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Attestation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fichier;
    @ManyToOne
    ResponsableEntreprise responsableEntreprise;
    @ManyToOne
    Postulation postulation;

}
