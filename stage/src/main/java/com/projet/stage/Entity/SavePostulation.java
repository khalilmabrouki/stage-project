package com.projet.stage.Entity;

import jakarta.persistence.Column;
import lombok.Data;

import java.util.Date;
@Data
public class SavePostulation {
    private Long id;
    private Long offerId;
    private Long jeuneDiplomeId;
    private Long candidatId;
    private  String cv;
    private  int status=0;
    private Date datepostulation;
    @Column(name = "is_read", columnDefinition = "boolean default false")
    private boolean isRead = false;

    public static Postulation toEntity(SavePostulation  model)
    {
        if(model == null)
        {
            return null ;
        }
        Postulation postulation =new Postulation ();
        postulation.setId(model.getId());
        postulation.setDatepostulation(model.getDatepostulation());
        postulation.setStatus(model.getStatus());

        return postulation ;
    }

}
