import { useEffect, useState } from 'react';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import Input from './Input/Input';

const baseContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const parsedData = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(parsedData ?? baseContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function updateState(values) {
    setContacts(prev => [...prev, values]);
  }

  function onDeleteClick(id) {
    setContacts(prev => prev.filter(ob => ob.id !== id));
  }

  function checkName(name) {
    return contacts.find(ob => name === ob.name);
  }

  function onFilterChange(e) {
    setFilter(e.target.attributes.name.ownerElement.value.toLowerCase());
  }

  function onFilter() {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>

      <Input updateState={updateState} checkName={checkName} />

      <Filter onFilterChange={onFilterChange} />

      <Contacts onDeleteClick={onDeleteClick} contacts={onFilter()} />
    </div>
  );
}
