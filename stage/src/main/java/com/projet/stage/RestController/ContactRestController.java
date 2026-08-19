package com.projet.stage.RestController;

import com.projet.stage.Entity.Contact;
import com.projet.stage.Service.ContactSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping(value ="/contact")
@CrossOrigin("*")
public class ContactRestController {

    @Autowired
    ContactSerivce contactService;

    @RequestMapping(method = RequestMethod.POST)
    public Contact AjouteContact(@RequestBody Contact contact) {
        return contactService.ajouterContact(contact);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Contact> AfficherContacts() {
        return contactService.affichierContact();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void SupprimerContact(@PathVariable("id") Long id) {
        contactService.supprimerContact(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Contact> getContactById(@PathVariable("id") Long id) {
        return contactService.afficherContactById(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Contact ModifierContact(@PathVariable("id") Long id, @RequestBody Contact contact) {
        return contactService.modifierContact(contact);
    }

}
