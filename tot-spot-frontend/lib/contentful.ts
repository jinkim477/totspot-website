// lib/contentful.ts
'use server'

import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export async function getStaff() {
  const entries = await client.getEntries({ content_type: 'staff' })
  return entries.items
}