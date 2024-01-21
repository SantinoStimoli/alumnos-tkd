import { Add, FamilyRestroom } from '@mui/icons-material'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Modal, Paper } from '@mui/material'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Contact } from '../../interfaces/interfaces'
import { getContactsByStudent } from '../../services/http'
import ContactsForm from '../Contacts/ContactsForm'
import ContactListElement from '../pure/ContactListElement'

const ContactList = ({ id }: { id: string }) => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactForm, setContactForm] = useState(false)

  const getStudentContact = async () => {
    await getContactsByStudent(id).then((r) => {
      setContacts(r)
    })
  }

  useEffect(() => {
    getStudentContact()
  }, [])

  return (
    <Paper className='max-w-80 py-5 px-10'>
      <Modal open={contactForm} onClose={() => setContactForm(false)} className='flex justify-center items-center'>
        <div>
          <ContactsForm studentId={id ?? ''} updateContacts={getStudentContact} />
        </div>
      </Modal>

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {contacts.map((e, i) => {
          return (
            <ContactListElement key={i} label={`${e.name} ${e.lastName}`} phone={e.phone} icon={<FamilyRestroom />} />
          )
        })}

        <ContactListElement action={() => setContactForm(true)} label='Añadir contacto' phone={id} icon={<Add />} />
      </List>
    </Paper>
  )
}

export default ContactList