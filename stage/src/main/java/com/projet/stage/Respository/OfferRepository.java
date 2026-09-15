package com.projet.stage.Respository;

import com.projet.stage.Entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OfferRepository extends JpaRepository <Offer,Long> {


    List<Offer> findByResponsableEntrepriseId(Long id);
}
