const Contact = require('../models/contactModel');
const mongoDB = require('../db/mongodb');

const contactController = {};

contactController.listContacts = async function (req, res) {
    try {
        // Check if a specific contact ID is provided in the request parameters
        const contactId = req.params.id;

        if (contactId) {
            // Retrieve a specific contact by ID
            const contact = await Contact.findById(contactId);
            if (!contact) {
                return res.status(404).json({ error: 'Contact not found' });
            }
            return res.json(contact);
        } else {
            // If no specific ID is provided, retrieve all contacts
            const contacts = await Contact.find({});
            return res.json(contacts);
        }
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

contactController.addContact = async function (req, res) {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        // Create a new contact using the Contact model
        const newContact = new Contact({
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        });

        // Save the contact to the database
        const savedContact = await newContact.save();

        res.status(201).json(savedContact);
    } catch (err) {
        console.error('Error adding contact:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = contactController;