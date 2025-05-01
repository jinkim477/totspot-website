

import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UpdatesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <Image
          src="/placeholder.svg?height=300&width=1920"
          alt="Tot Spot Updates"
          fill
          className="object-cover"
          priority
        />
        <div className="container relative z-20 h-full flex flex-col justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">News & Updates</h1>
            <p className="mt-6 text-lg text-white/90 max-w-xl">
              Stay up-to-date with the latest news and events from Tot Spot Preschool.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
            <div className="mt-2 h-1 w-20 bg-pink-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-[200px] md:h-auto relative">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Spring Concert"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>May 1, 2025</span>
                      </div>
                      <CardTitle>Spring Concert Scheduled for May 15th</CardTitle>
                      <CardDescription>
                        Join us for a delightful performance by our talented preschoolers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        We're excited to announce our annual Spring Concert will be held on May 15th at 10:00 AM in the
                        preschool gymnasium. Children have been practicing their songs and can't wait to perform for
                        you!
                      </p>
                      <p className="text-gray-600 mb-4">
                        Each class will perform 2-3 songs, and the event will conclude with a special all-school number.
                        The concert will last approximately 45 minutes, followed by light refreshments.
                      </p>
                      <Button className="bg-pink-600 hover:bg-pink-700">Read More</Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[
              {
                title: "Registration Open for 2025-2026 School Year",
                date: "April 15, 2025",
                excerpt:
                  "Registration for the upcoming school year is now open. Secure your child's spot early as classes fill quickly.",
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "New Playground Equipment Installed",
                date: "April 10, 2025",
                excerpt:
                  "We're excited to announce our playground has been upgraded with new equipment designed for safety and fun!",
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "Parent-Teacher Conferences Scheduled",
                date: "April 5, 2025",
                excerpt:
                  "Spring parent-teacher conferences will be held May 22-23. Sign up for your preferred time slot.",
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "Summer Camp Registration Now Open",
                date: "March 28, 2025",
                excerpt:
                  "Our partner organization is offering summer camps for preschool and elementary children. Tot Spot families receive a 10% discount.",
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "Staff Spotlight: Ms. Sarah",
                date: "March 15, 2025",
                excerpt:
                  "Meet Ms. Sarah, our new art teacher who brings 10 years of experience in early childhood education.",
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "Field Trip to the Zoo Planned",
                date: "March 10, 2025",
                excerpt:
                  "Our 4-year-old classes will visit the Calgary Zoo on June 5th. Permission forms will be sent home next week.",
                image: "/placeholder.svg?height=200&width=400",
              },
            ].map((update, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="h-48 relative">
                    <Image src={update.image || "/placeholder.svg"} alt={update.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>{update.date}</span>
                    </div>
                    <CardTitle>{update.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600">{update.excerpt}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button variant="link" className="p-0 h-auto text-pink-600">
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Stay Updated</h2>
              <p className="text-gray-600 text-lg">
                Subscribe to our newsletter to receive the latest news and updates from Tot Spot Preschool.
              </p>
              <div className="pt-4">
                <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                  />
                  <Button className="bg-pink-600 hover:bg-pink-700">Subscribe</Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <div className="mt-2 h-1 w-20 bg-pink-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {[
                    {
                      month: "May 2025",
                      events: [
                        { date: "May 15", title: "Spring Concert", description: "10:00 AM in the preschool gymnasium" },
                        {
                          date: "May 22-23",
                          title: "Parent-Teacher Conferences",
                          description: "Sign up for your 20-minute slot",
                        },
                        { date: "May 24", title: "Professional Development Day", description: "No classes" },
                      ],
                    },
                    {
                      month: "June 2025",
                      events: [
                        { date: "June 5", title: "Field Trip to the Zoo", description: "4-year-old classes only" },
                        { date: "June 20", title: "End of Year Celebration", description: "Last day of school party" },
                        { date: "June 21", title: "Last Day of School", description: "Early dismissal at 11:00 AM" },
                      ],
                    },
                  ].map((month, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{month.month}</h3>
                      <div className="space-y-3">
                        {month.events.map((event, eventIndex) => (
                          <div key={eventIndex} className="flex gap-4 pb-3 border-b last:border-0">
                            <div className="w-20 flex-shrink-0 font-medium text-pink-600">{event.date}</div>
                            <div>
                              <div className="font-medium text-gray-900">{event.title}</div>
                              <div className="text-sm text-gray-600">{event.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button className="bg-pink-600 hover:bg-pink-700">View Full Calendar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pink-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Have Questions?</h2>
              <p className="text-pink-100 text-lg">
                Contact us to learn more about Tot Spot Preschool and our programs.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-pink-700" asChild>
                  <Link href="/programs">View Programs</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
