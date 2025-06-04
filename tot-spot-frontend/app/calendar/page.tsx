export const revalidate = 60; // Revalidate once every 60 seconds

import CalendarPageClient from "./CalendarPageClient"
import { getEvents, getCalendarDates, getCalendarPagePhotos } from "@/lib/contentful"

export default async function CalendarPage() {
  const calPagePhotos = await getCalendarPagePhotos();
  const events = await getEvents();
  const calDates = await getCalendarDates();

  return <CalendarPageClient calPagePhotos={calPagePhotos} events={events} calDates={calDates} />
}
