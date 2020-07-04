import React, { Component } from "react";
import shortid from "shortid";
import { ToastContainer, toast } from "react-toastify";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import { getContacts, setContacts } from "./utils/helpers";
import styles from "./components/Phonebook.module.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
    state = {
        contacts: [],
        filter: "",
    };

    componentDidMount() {
        const parsedContacts = getContacts("contacts");
        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { contacts } = this.state;
        if (contacts !== prevState.contacts) {
            setContacts("contacts", contacts);
        }
    }

    formListener = ({ name, number }) => {
        this.addContact(name, number);
    };

    addContact = (name, number) => {
        const { contacts } = this.state;
        const readyContact = {
            name,
            number,
            id: shortid.generate(),
        };

        const isExist = contacts.some(
            (contact) =>
                contact.name.trim().toLowerCase() === name.trim().toLowerCase()
        );

        const invalide = isNaN(number);
        if (isExist) {
            toast.info(`${name} already exist (〒﹏〒) `);
        } else if (name === " " || number === " ") {
            toast.warn(`Fill the form, please ＼(°o°)／ `);
        } else if (invalide) {
            toast.info(`${number} is invalide phone number 乁( •_• )ㄏ `);
        } else {
            toast.success(" (๑˙❥˙๑) You added new contact!");
            this.setState(({ contacts }) => ({
                contacts: [readyContact, ...contacts],
            }));
        }
    };

    deleteContact = (contactId) => {
        this.setState((prevState) => ({
            contacts: prevState.contacts.filter(
                (contact) => contact.id !== contactId
            ),
        }));
    };

    changeFilter = (e) => {
        this.setState({ filter: e.currentTarget.value });
    };

    getFilteredContacts = () => {
        const { filter, contacts } = this.state;

        const preparedContacts = filter.trim().toLowerCase();

        return contacts.filter((contact) =>
            contact.name.trim().toLowerCase().includes(preparedContacts)
        );
    };

    render() {
        const { contacts, filter } = this.state;
        const visibleContacts = this.getFilteredContacts();

        return (
            <>
                <ToastContainer />
                <ContactForm
                    onSubmit={this.formListener}
                    onAddContact={this.addContact}
                />
                <h3>Contacts</h3>
                {contacts.length >= 2 && (
                    <Filter value={filter} onChange={this.changeFilter} />
                )}

                {visibleContacts.length > 0 ? (
                    <ContactList
                        contacts={visibleContacts}
                        onDeleteContact={this.deleteContact}
                    />
                ) : contacts.length === 0 ? (
                    <p className={styles.text}>There are no contacts</p>
                ) : (
                    <p className={styles.text}>Didn't find any contacts</p>
                )}
            </>
        );
    }
}
export default App;
