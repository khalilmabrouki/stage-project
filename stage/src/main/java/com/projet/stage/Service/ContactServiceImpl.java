package com.projet.stage.Service;

import com.projet.stage.Entity.Contact;
import com.projet.stage.Respository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactServiceImpl implements ContactSerivce{
    @Autowired
    ContactRepository contactRepository;
    @Override
    public Contact ajouterContact(Contact contact) {
        return contactRepository.save(contact);
    }

    @Override
    public Contact modifierContact(Contact contact) {
        return contactRepository.save(contact);
    }

    @Override
    public List<Contact> affichierContact() {
        return contactRepository.findAll();
    }

    @Override
    public void supprimerContact(Long id) {
contactRepository.deleteById(id);
    }

    @Override
    public Optional<Contact> afficherContactById(Long id) {
        return contactRepository.findById(id);
    }
}
