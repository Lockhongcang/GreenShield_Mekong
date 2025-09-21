import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ContactForm(){
  const { t } = useTranslation()
  const [form, setForm] = useState({name:'', email:'', message:''})
  const submit = (e) => {
    e.preventDefault()
    // currently just log — connect to API as needed
    console.log('contact', form)
    alert(t('contact.thanks') || 'Thanks!')
  }
  return (
    <form onSubmit={submit} className="card" style={{maxWidth:560}}>
      <label>{t('contact.name')||'Name'}</label>
      <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
      <label>{t('contact.email')||'Email'}</label>
      <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
      <label>{t('contact.message')||'Message'}</label>
      <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
      <button className="btn" type="submit" style={{marginTop:12}}>{t('contact.send')||'Send'}</button>
    </form>
  )
}
