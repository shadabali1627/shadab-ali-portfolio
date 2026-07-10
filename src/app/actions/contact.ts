'use server'

import { createAdminClient } from '@/supabase/server'

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name')?.toString()
  const email = formData.get('email')?.toString()
  const message = formData.get('message')?.toString()

  if (!name || !email || !message) {
    return { error: 'All fields are required.' }
  }

  const supabase = await createAdminClient()

  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    message,
  })

  if (error) {
    console.error('Supabase Insert Error:', error)
    return { error: 'Failed to send message. Please try again later.' }
  }

  return { success: true }
}
