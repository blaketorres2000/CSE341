const Contact = require('../models/contactModel');
const mongoose = require('mongoose');

const contactController = {};

contactController.listContacts = async function (req, res) {
    try {
        const param = req.params.param;

        if (param) {
            const isObjectId = mongoose.Types.ObjectId.isValid(param);

            if (isObjectId) {
                // If param is a valid ObjectId, search by _id
                const contact = await Contact.findById(param);
                if (!contact) {
                    return res.status(404).json({ error: 'Contact not found' });
                }
                return res.json(contact);
            } else {
                // If param is not a valid ObjectId, search by favoriteColor
                const contacts = await Contact.find({ favoriteColor: param });
                return res.json(contacts);
            }
        } else {
            // If no specific ID or favoriteColor is provided, retrieve all contacts
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

        const newContact = new Contact({
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        });

        const savedContact = await newContact.save();

        res.status(201).json(savedContact);
    } catch (err) {
        console.error('Error adding contact:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = contactController;