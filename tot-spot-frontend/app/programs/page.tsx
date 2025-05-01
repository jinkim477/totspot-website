

import { motion } from "framer-motion"
import { Calendar, Clock, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProgramsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <Image
          src="/placeholder.svg?height=400&width=1920"
          alt="Tot Spot Programs"
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Programs & Registration</h1>
            <p className="mt-6 text-lg text-white/90 max-w-xl">
              Discover our preschool programs designed to nurture your child's development and prepare them for future
              success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Overview */}
      <section id="programs" className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Programs</h2>
            <div className="mt-2 h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Tot Spot offers developmentally appropriate programs for children ages 3-5 years old.
            </p>
          </motion.div>

          <Tabs defaultValue="three-year" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="three-year">3 Year Old Program</TabsTrigger>
              <TabsTrigger value="four-year">4 Year Old Program</TabsTrigger>
            </TabsList>

            <TabsContent value="three-year" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-6 w-6 text-pink-500" />
                    <CardTitle>3 Year Old Program</CardTitle>
                  </div>
                  <CardDescription>
                    A gentle introduction to preschool with focus on social skills and creative play.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <Image
                        src="/placeholder.svg?height=300&width=500"
                        alt="3 Year Old Program"
                        width={500}
                        height={300}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <Calendar className="h-3 w-3" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Schedule</h3>
                          <p className="text-gray-600">Tuesday & Thursday mornings (9:00 AM - 11:30 AM)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <Users className="h-3 w-3" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Class Size</h3>
                          <p className="text-gray-600">Maximum 16 children with 2 teachers (8:1 ratio)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <Clock className="h-3 w-3" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Age Requirement</h3>
                          <p className="text-gray-600">
                            Children must be 3 years old by December 31st of the enrollment year
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Program Highlights</h3>
                    <ul className="grid gap-2">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Introduction to classroom routines and group activities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Focus on social skills, sharing, and making friends</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Development of fine and gross motor skills through play</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Introduction to letters, numbers, shapes, and colors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Creative arts, music, and movement activities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Gentle separation from parents in a nurturing environment</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Button className="bg-pink-500 hover:bg-pink-700">Register for 3 Year Old Program</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="four-year" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-6 w-6 text-pink-500" />
                    <CardTitle>4 Year Old Program</CardTitle>
                  </div>
                  <CardDescription>
                    Preparation for kindergarten with literacy, numeracy, and social development.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <Image
                        src="/placeholder.svg?height=300&width=500"
                        alt="4 Year Old Program"
                        width={500}
                        height={300}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <Calendar className="h-3 w-3" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Schedule Options</h3>
                          <p className="text-gray-600">Monday/Wednesday/Friday mornings (9:00 AM - 12:00 PM)</p>
                          <p className="text-gray-600">Monday/Wednesday/Friday afternoons (1:00 PM - 4:00 PM)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <Users className="h-3 w-3" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Class Size</h3>
                          <p className="text-gray-600">Maximum 20 children with 2 teachers (10:1 ratio)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <Clock className="h-3 w-3" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Age Requirement</h3>
                          <p className="text-gray-600">
                            Children must be 4 years old by December 31st of the enrollment year
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Program Highlights</h3>
                    <ul className="grid gap-2">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Comprehensive kindergarten readiness curriculum</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Enhanced focus on early literacy and phonics awareness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Introduction to basic math concepts and problem-solving</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Science exploration and discovery activities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Development of self-help skills and independence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Field trips and special visitors to enhance learning</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Button className="bg-pink-500 hover:bg-pink-700">Register for 4 Year Old Program</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Registration Process */}
      <section id="registration" className="py-16 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Registration Process</h2>
            <div className="mt-2 h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Follow these steps to register your child for Tot Spot Preschool.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-pink-200"></div>

              {[
                {
                  step: "Step 1",
                  title: "Submit Registration Form",
                  description:
                    "Complete our online registration form or download a PDF version to fill out and email to us.",
                  action: "Register Online",
                },
                {
                  step: "Step 2",
                  title: "Pay Registration Fee",
                  description: "A non-refundable registration fee of $100 is required to secure your child's spot.",
                  action: "View Fee Details",
                },
                {
                  step: "Step 3",
                  title: "Receive Confirmation",
                  description:
                    "Once your registration is processed, you'll receive a confirmation email with additional information.",
                  action: null,
                },
                {
                  step: "Step 4",
                  title: "Complete Required Forms",
                  description:
                    "You'll need to complete medical forms, emergency contact information, and other required documentation.",
                  action: "Download Forms",
                },
                {
                  step: "Step 5",
                  title: "Attend Orientation",
                  description:
                    "Join us for a parent orientation session before the school year begins to meet teachers and learn about our program.",
                  action: null,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-16 pb-10"
                >
                  <div className="absolute left-0 top-0 h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-medium">
                    {step.step}
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    {step.action && (
                      <Button variant="outline" className="text-pink-600 border-pink-600 hover:bg-pink-50">
                        {step.action}
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tuition & Fees */}
      <section id="fees" className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Tuition & Fees</h2>
            <div className="mt-2 h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Tot Spot strives to provide quality education at competitive rates.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">3 Year Old Program</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-600">Registration Fee (non-refundable)</span>
                        <span className="font-medium">$100</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-600">Monthly Tuition (Sept-June)</span>
                        <span className="font-medium">$175</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-600">Materials Fee (annual)</span>
                        <span className="font-medium">$75</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-medium">Total Annual Cost</span>
                        <span className="font-bold text-pink-600">$1,925</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">4 Year Old Program</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-600">Registration Fee (non-refundable)</span>
                        <span className="font-medium">$100</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-600">Monthly Tuition (Sept-June)</span>
                        <span className="font-medium">$225</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-600">Materials Fee (annual)</span>
                        <span className="font-medium">$100</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-medium">Total Annual Cost</span>
                        <span className="font-bold text-pink-600">$2,450</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Options</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-gray-600">
                        Monthly payments due on the 1st of each month (September-June)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-gray-600">5% discount for full year payment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-gray-600">
                        10% sibling discount for families with multiple children enrolled
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-gray-600">
                        Payment methods: e-transfer, credit card, or post-dated cheques
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
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
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "Does my child need to be potty trained?",
                  answer:
                    "Yes, all children must be fully potty trained before starting at Tot Spot. We understand occasional accidents happen, but children should be able to use the bathroom independently.",
                },
                {
                  question: "What is your teacher-to-student ratio?",
                  answer:
                    "Our 3-year-old program maintains an 8:1 student-to-teacher ratio, while our 4-year-old program has a 10:1 ratio. This ensures each child receives the attention they need while learning valuable social skills.",
                },
                {
                  question: "Do you provide snacks?",
                  answer:
                    "Parents are responsible for providing a healthy, nut-free snack each day. We encourage nutritious options like fruits, vegetables, cheese, and crackers. Water is always available for children.",
                },
                {
                  question: "What is your illness policy?",
                  answer:
                    "Children should not attend preschool if they have a fever, vomiting, diarrhea, or any contagious illness. Children must be symptom-free for 24 hours before returning to school.",
                },
                {
                  question: "Do parents volunteer in the classroom?",
                  answer:
                    "Parent involvement is welcomed but not required. We offer various opportunities throughout the year for parents who wish to volunteer for special events, field trips, or classroom activities.",
                },
                {
                  question: "What is your cancellation policy?",
                  answer:
                    "We require one month's written notice for withdrawal from the program. The registration fee is non-refundable. Tuition for the current month is also non-refundable once the month has begun.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-gray-900">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section id="calendar" className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">School Calendar</h2>
            <div className="mt-2 h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Important dates for the 2025-2026 school year.</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {[
                    {
                      month: "September 2025",
                      events: [
                        {
                          date: "September 2-3",
                          title: "Parent Orientation",
                          description: "Meet the teachers and learn about the program",
                        },
                        { date: "September 8", title: "First Day of Classes", description: "Welcome to Tot Spot!" },
                      ],
                    },
                    {
                      month: "October 2025",
                      events: [
                        { date: "October 13", title: "Thanksgiving", description: "No classes - Statutory Holiday" },
                        {
                          date: "October 30-31",
                          title: "Halloween Celebrations",
                          description: "Costume parties in class",
                        },
                      ],
                    },
                    {
                      month: "November 2025",
                      events: [
                        {
                          date: "November 11",
                          title: "Remembrance Day",
                          description: "No classes - Statutory Holiday",
                        },
                        {
                          date: "November 25-26",
                          title: "Parent-Teacher Conferences",
                          description: "Progress updates for all students",
                        },
                      ],
                    },
                    {
                      month: "December 2025",
                      events: [
                        {
                          date: "December 18",
                          title: "Winter Celebration",
                          description: "Holiday performance and party",
                        },
                        {
                          date: "December 19-January 5",
                          title: "Winter Break",
                          description: "No classes - School closed",
                        },
                      ],
                    },
                  ].map((month, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{month.month}</h3>
                      <div className="space-y-3">
                        {month.events.map((event, eventIndex) => (
                          <div key={eventIndex} className="flex gap-4 pb-3 border-b last:border-0">
                            <div className="w-32 flex-shrink-0 font-medium text-pink-600">{event.date}</div>
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
                  <Button className="bg-pink-500 hover:bg-pink-700">Download Full Calendar</Button>
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
              <h2 className="text-3xl font-bold">Ready to Enroll Your Child?</h2>
              <p className="text-pink-100 text-lg">
                Spaces fill quickly! Register today to secure your child's spot at Tot Spot Preschool.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50">
                  Register Now
                </Button>
                <Button size="lg" variant="outline" className="text-pink-600 bg-white hover:bg-pink-50" asChild>
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
