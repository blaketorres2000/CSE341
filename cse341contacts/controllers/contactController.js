const Contact = require('../models/contactModel');
const mongoose = require('mongoose');

const contactController = {};

/******************************************
 * Function to get clients from the database
 ******************************************/
contactController.homePage = function (req, res) {
    res.send('Welcome to the CSE 341 Contacts Home Page for Blake Torres' );
}

/******************************************
 * Function to get clients from the database
 ******************************************/
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
                // If param is not a valid ObjectId, convert favoriteColor to lowercase and then search
                const lowercasedColor = param.toLowerCase();
                const contacts = await Contact.find({ favoriteColor: lowercasedColor });
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

/******************************************
 * Function to add a new client to the database
 ******************************************/
contactController.addContact = async function (req, res) {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        // Convert favoriteColor to lowercase before creating a new contact
        const newContact = new Contact({
            firstName,
            lastName,
            email,
            favoriteColor: favoriteColor.toLowerCase(),
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