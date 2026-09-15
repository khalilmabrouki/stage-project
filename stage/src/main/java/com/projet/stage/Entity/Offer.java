package com.projet.stage.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String titre;
    private String image;
    private String description;
    private String experience;
    private String salaire ;
    private String adresse;
    private String datedebut;
    private String datefin;
    private String type;
    private String competence;
    @ManyToOne
    private ResponsableEntreprise responsableEntreprise;


}
