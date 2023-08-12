// import PropTypes from 'prop-types';
import {useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { deleteContact, getContacts } from 'redux/contacts/contactsSlice';
import { getFilter } from 'redux/filter/filterSlice';
import { fetchContacts } from '../../redux/contacts/contactsOperations';
import css from './ContactList.module.css';

const getVisibleContacts = (contacts, filter) => {
  const normalizeFilter = filter.toLowerCase();
  return contacts.filter(item =>
    item.name.toLowerCase().includes(normalizeFilter)
  );
};

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  
  // const visibleContacts = getVisibleContacts(contacts, filter);
  const visibleContacts = [];

  console.log('ContactList');

  useEffect(() => {
    console.log('Effect>>>>>>>>>>>>>>>');
      dispatch(fetchContacts());
  }, [dispatch]);
  
  console.log(contacts);

  return (
    <ul>
      {visibleContacts.map(({ id, name, number }) => (
        <li key={id} className={css.list}>
          <p className={css['list-item']}>
            {name}: {number}
          </p>
          <button onClick={() => dispatch(deleteContact(id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
