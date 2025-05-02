"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calendar, Download, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { CardDescription } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function ParentsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <Image
          src="/placeholder.svg?height=300&width=1920"
          alt="Tot Spot Parents"
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Parent Resources</h1>
            <p className="mt-6 text-lg text-white/90 max-w-xl">
              Helpful information and resources for Tot Spot parents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Tabs */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Parent Resources</h2>
            <div className="mt-2 h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
          </motion.div>

          <Tabs defaultValue="forms" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="forms">Forms & Documents</TabsTrigger>
              <TabsTrigger value="calendar">Calendar & Events</TabsTrigger>
              <TabsTrigger value="resources">Learning Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="forms" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Forms & Documents</CardTitle>
                  <CardDescription>Important forms and documents for Tot Spot parents.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {[
                      {
                        title: "Registration Form",
                        description: "Required for all new students",
                        icon: <FileText className="h-5 w-5 text-pink-600" />,
                      },
                      {
                        title: "Medical Information Form",
                        description: "Health information and emergency contacts",
                        icon: <FileText className="h-5 w-5 text-pink-600" />,
                      },
                      {
                        title: "Parent Handbook",
                        description: "Policies, procedures, and important information",
                        icon: <FileText className="h-5 w-5 text-pink-600" />,
                      },
                      {
                        title: "Media Release Form",
                        description: "Permission for photos and videos",
                        icon: <FileText className="h-5 w-5 text-pink-600" />,
                      },
                      {
                        title: "Field Trip Permission Form",
                        description: "Required for off-site activities",
                        icon: <FileText className="h-5 w-5 text-pink-600" />,
                      },
                      {
                        title: "Authorized Pick-up Form",
                        description: "List of people authorized to pick up your child",
                        icon: <FileText className="h-5 w-5 text-pink-600" />,
                      },
                    ].map((document, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {document.icon}
                          <div>
                            <h3 className="font-medium text-gray-900">{document.title}</h3>
                            <p className="text-sm text-gray-500">{document.description}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar & Events</CardTitle>
                  <CardDescription>Stay up-to-date with Tot Spot events and important dates.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-end">
                      <Button className="gap-1 bg-pink-500 hover:bg-pink-700">
                        <Calendar className="h-4 w-4" />
                        Download Full Calendar
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {[
                        {
                          month: "Upcoming Events",
                          events: [
                            {
                              date: "May 15",
                              title: "Spring Concert",
                              description: "Children will perform songs learned throughout the year",
                            },
                            {
                              date: "May 22",
                              title: "Parent-Teacher Conferences",
                              description: "Sign up for your 20-minute slot",
                            },
                            {
                              date: "June 5",
                              title: "Field Trip to the Zoo",
                              description: "Permission forms due by May 25",
                            },
                            {
                              date: "June 20",
                              title: "End of Year Celebration",
                              description: "Last day of school party",
                            },
                          ],
                        },
                        {
                          month: "Important Dates",
                          events: [
                            { date: "May 24", title: "Professional Development Day", description: "No classes" },
                            {
                              date: "June 21",
                              title: "Last Day of School",
                              description: "Early dismissal at 11:00 AM",
                            },
                            {
                              date: "September 8",
                              title: "First Day of 2025-2026 School Year",
                              description: "Welcome back!",
                            },
                          ],
                        },
                      ].map((section, index) => (
                        <div key={index}>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{section.month}</h3>
                          <div className="space-y-3">
                            {section.events.map((event, eventIndex) => (
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Resources</CardTitle>
                  <CardDescription>Educational resources to support your child's learning at home.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Early Literacy Activities",
                        description: "Fun activities to develop reading and writing skills",
                        link: "View Resources",
                        image: "/placeholder.svg?height=150&width=300",
                      },
                      {
                        title: "Math Games for Preschoolers",
                        description: "Simple games to build number sense and counting skills",
                        link: "View Resources",
                        image: "/placeholder.svg?height=150&width=300",
                      },
                      {
                        title: "Fine Motor Skill Development",
                        description: "Activities to strengthen hand muscles for writing",
                        link: "View Resources",
                        image: "/placeholder.svg?height=150&width=300",
                      },
                      {
                        title: "Social-Emotional Learning",
                        description: "Resources to help children understand and manage emotions",
                        link: "View Resources",
                        image: "/placeholder.svg?height=150&width=300",
                      },
                    ].map((resource, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="h-[150px] relative">
                          <Image
                            src={resource.image || "/placeholder.svg"}
                            alt={resource.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="pt-4">
                          <h3 className="font-medium text-gray-900 mb-1">{resource.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                          <Link
                            href="#"
                            className="inline-flex items-center text-pink-600 text-sm font-medium hover:text-pink-700"
                          >
                            {resource.link} <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Parent Involvement */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Parent Involvement</h2>
            <div className="mt-2 h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              There are many ways for parents to get involved at Tot Spot Preschool.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Volunteer Opportunities",
                description:
                  "Help with special events, classroom activities, or field trips. Your time and talents enrich our program!",
                icon: "👥",
              },
              {
                title: "Parent Committee",
                description:
                  "Join our parent committee to help plan events, fundraisers, and provide input on program decisions.",
                icon: "🤝",
              },
              {
                title: "Classroom Helper",
                description:
                  "Assist teachers with classroom activities, reading to children, or helping with art projects.",
                icon: "📚",
              },
              {
                title: "Special Skills Sharing",
                description:
                  "Share your profession, hobby, or cultural traditions with our students through special presentations.",
                icon: "🎭",
              },
              {
                title: "Fundraising",
                description:
                  "Help with fundraising initiatives to support program enhancements and special activities.",
                icon: "💰",
              },
              {
                title: "Maintenance & Setup",
                description:
                  "Assist with classroom setup, toy cleaning, or minor repairs to help maintain our facility.",
                icon: "🔧",
              },
            ].map((opportunity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="text-3xl mb-4">{opportunity.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{opportunity.title}</h3>
                <p className="text-gray-600">{opportunity.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-pink-500 hover:bg-pink-700">Sign Up to Volunteer</Button>
          </div>
        </div>
      </section>

      {/* Parent Testimonials */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">What Parents Say</h2>
            <div className="mt-2 h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Tot Spot has been an amazing first school experience for our daughter. She's excited to go to school every day!",
                name: "Sarah M.",
                role: "Parent of a 4-year-old",
              },
              {
                quote:
                  "The teachers are incredible - so caring and attentive. My son has learned so much and made wonderful friends.",
                name: "Michael T.",
                role: "Parent of a 3-year-old",
              },
              {
                quote:
                  "We love the spacious classrooms and creative activities. Tot Spot has exceeded our expectations in every way.",
                name: "Jennifer K.",
                role: "Parent of a 4-year-old",
              },
              {
                quote:
                  "The curriculum is perfect for preschoolers - engaging, fun, and educational. My daughter is well-prepared for kindergarten.",
                name: "David L.",
                role: "Parent of a 4-year-old",
              },
              {
                quote:
                  "Communication with parents is excellent. I always feel informed about what's happening in the classroom.",
                name: "Emily R.",
                role: "Parent of a 3-year-old",
              },
              {
                quote:
                  "The sense of community at Tot Spot is wonderful. We've made connections with other families that will last beyond preschool.",
                name: "Robert J.",
                role: "Parent of a 4-year-old",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="text-yellow-500 mb-4">{"★★★★★"}</div>
                    <blockquote className="text-gray-600 italic mb-4">"{testimonial.quote}"</blockquote>
                    <div>
                      <div className="font-medium text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-2 h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="grid gap-6">
              {[
                {
                  question: "What should my child bring to school each day?",
                  answer:
                    "Children should bring a backpack with a healthy, nut-free snack, a water bottle, and a complete change of clothes. Please label all items with your child's name.",
                },
                {
                  question: "How can I stay updated on classroom activities?",
                  answer:
                    "We send weekly newsletters via email, maintain a parent bulletin board, and use a parent communication app. Teachers are also available for brief conversations at drop-off and pick-up times.",
                },
                {
                  question: "What is your illness policy?",
                  answer:
                    "Children should not attend preschool if they have a fever, vomiting, diarrhea, or any contagious illness. Children must be symptom-free for 24 hours before returning to school.",
                },
                {
                  question: "How do you handle birthdays and celebrations?",
                  answer:
                    "We celebrate each child's birthday with a special crown and song. Parents may send a small, non-food treat for classmates (stickers, pencils, etc.). Please coordinate with your child's teacher in advance.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
                We're here to help! Contact us with any questions or concerns about your child's preschool experience.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
