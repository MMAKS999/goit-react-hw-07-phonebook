import { Filter } from './Filter';
import { PhonebookForm } from './PhonebookForm';
import { ContactList } from './contactList';
import Swal from 'sweetalert2';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/filterSlice';
import { addContact, deleteContact } from '../redux/contactsSlice';


export const App = () => {
  const contacts = useSelector(state => state.contacts);
  const addDispatch = useDispatch();
  const deleteDispatch = useDispatch();

  const addContactAll = dataContact => {
    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase() === dataContact.name.toLowerCase() ||
          contact.number === dataContact.number
      )
    ) {
      Swal.fire(
        `${dataContact.name} or ${dataContact.number} is already in contacts.`
      );
      return;
    }

    // звернення до редакс стору з записом контакту
    addDispatch(addContact(dataContact));
  };
  const dispatch = useDispatch();
  const changeFilter = ev => {
    dispatch(setFilter(ev.currentTarget.value));
  };

  // Видалення контакту
  const onDelateContact = id => {
    deleteDispatch(deleteContact( id ));
  };

  // метод фільтрації контактів
  const normalizedFilter = useSelector(state => state.filter).toLowerCase();

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // // Визначення зміни в даних і запис в сховище
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = getVisibleContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <PhonebookForm onSubmit={addContactAll} />
      <h2>Contacts</h2>
      <Filter value={normalizedFilter} onChange={changeFilter} />
      <ContactList
        dataContacts={visibleContacts}
        onDelateContact={onDelateContact}
      />
    </div>
  );
};
