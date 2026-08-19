package com.projet.stage.Respository;

import com.projet.stage.Entity.Candidat;
import com.projet.stage.Entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository <Contact,Long> {


}
