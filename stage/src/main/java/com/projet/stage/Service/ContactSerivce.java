package com.projet.stage.Service;

import com.projet.stage.Entity.Contact;

import java.util.List;
import java.util.Optional;

public interface ContactSerivce {

    Contact ajouterContact(Contact contact);

    Contact modifierContact(Contact contact);

    List<Contact> affichierContact();

    void supprimerContact(Long id);

    Optional<Contact> afficherContactById(Long id);

}
