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

export async function getFacility() {
    const entries = await client.getEntries({ content_type: 'facility' })
    return entries.items
}

export async function getContactInfo() {
    const entries = await client.getEntries({ content_type: 'contactInfo' })
    return entries.items[0]
}

export async function getPrograms() {
    const entries = await client.getEntries({ content_type: 'program' })
    return entries.items
}

export async function getEvents() {
    const entries = await client.getEntries({ content_type: 'events' })
    return entries.items
}

export async function getCalendarDates() {
    const entries = await client.getEntries({ content_type: 'dates' })
    return entries.items
}

export async function getMonthlyUpdates() {
    const entries = await client.getEntries({ content_type: 'monthlyUpdates' })
    return entries.items
}

export async function getTestimonials() {
    const entries = await client.getEntries({ content_type: 'testimonials' })
    return entries.items
}

export async function getHomePagePhotos() {
    const entries = await client.getEntries({ content_type: 'homePagePhotos' })
    return entries.items
}

export async function getAboutPagePhotos() {
  const entries = await client.getEntries({ content_type: 'aboutPagePhotos' })
  return entries.items
}

export async function getProgramsPagePhotos() {
  const entries = await client.getEntries({ content_type: 'programsPagePhotos' })
  return entries.items
}

export async function getContactPagePhotos() {
  const entries = await client.getEntries({ content_type: 'contactPagePhotos' })
  return entries.items
}

export async function getParentsPagePhotos() {
  const entries = await client.getEntries({ content_type: 'parentsPagePhotos' })
  return entries.items
}

export async function getNewsletterPagePhotos() {
  const entries = await client.getEntries({ content_type: 'newsletterPagePhotos' })
  return entries.items
}

export async function getCalendarPagePhotos() {
  const entries = await client.getEntries({ content_type: 'calendarPagePhotos' })
  return entries.items
}

export async function getDownloadableDocs() {
  const entries = await client.getEntries({ content_type: 'downloadableDocument' })
  return entries.items
}

export async function getPolicies() {
  const entries = await client.getEntries({ content_type: 'policies' })
  return entries.items
}

export async function getHomePageDetails() {
  const entries = await client.getEntries({ content_type: 'homePageDetails' })
  return entries.items
}

export async function getAboutPageDetails() {
  const entries = await client.getEntries({ content_type: 'aboutPageDetails' })
  return entries.items
}

export async function getFAQ() {
  const entries = await client.getEntries({ content_type: 'faq' })
  return entries.items
}