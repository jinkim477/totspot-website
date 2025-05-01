'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStaff } from "@/lib/contentful"

export default function AboutPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <Image
          src="/placeholder.svg?height=400&width=1920"
          alt="About Tot Spot Preschool"
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Tot Spot</h1>
            <p className="mt-6 text-lg text-white/90 max-w-xl">
              Learn about our philosophy, our team, and what makes Tot Spot special.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <div className="h-1 w-20 bg-pink-600 rounded-full"></div>
              <p className="text-gray-600">
                Tot Spot Preschool was founded in 2005 with a vision to create a nurturing, stimulating environment
                where children could develop a love for learning from an early age. What began as a small program with
                just a handful of students has grown into one of the most respected preschools in south Calgary.
              </p>
              <p className="text-gray-600">
                Located in the heart of Lake Bonavista, our preschool has evolved over the years, but our core mission
                remains unchanged: to provide quality early education that prepares children socially, emotionally, and
                academically for their future schooling.
              </p>
              <p className="text-gray-600">
                Today, Tot Spot continues to be a place where children thrive, parents feel confident, and our dedicated
                staff work passionately to create meaningful learning experiences every day.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Tot Spot Preschool Story"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Philosophy</h2>
            <div className="mt-2 h-1 w-20 bg-pink-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Tot Spot Philosophy"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <p className="text-gray-600">
                At Tot Spot, we believe that children learn best through play and hands-on experiences. Our play-based
                approach to learning encourages curiosity, creativity, and critical thinking skills.
              </p>
              <p className="text-gray-600">
                We view each child as a unique individual with their own strengths, interests, and learning style. Our
                curriculum is designed to be flexible and responsive to children's needs while providing structure and
                consistency.
              </p>
              <p className="text-gray-600">
                We strive to create a community where children feel safe, valued, and empowered. By fostering positive
                relationships and building self-confidence, we help children develop the social-emotional skills they
                need for success in school and life.
              </p>
              <p className="text-gray-600">
                Parent partnerships are essential to our approach. We believe that families are children's first and
                most important teachers, and we work closely with parents to support each child's development.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <div className="mt-2 h-1 w-20 bg-pink-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our experienced and dedicated teachers are passionate about early childhood education.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ms. Jennifer",
                role: "Director & Lead Teacher",
                bio: "With over 15 years of experience in early childhood education, Jennifer brings expertise and passion to Tot Spot. She holds a degree in Early Childhood Education and is dedicated to creating engaging learning experiences.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Ms. Sarah",
                role: "Lead Teacher - 4 Year Program",
                bio: "Sarah has been with Tot Spot for 8 years and specializes in kindergarten readiness. Her creative approach to teaching makes learning fun and meaningful for our 4-year-old students.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Ms. Michelle",
                role: "Lead Teacher - 3 Year Program",
                bio: "Michelle's gentle nature and patience make her perfect for our youngest students. She creates a nurturing environment where children feel comfortable exploring and learning.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Ms. Rebecca",
                role: "Assistant Teacher",
                bio: "Rebecca brings energy and enthusiasm to the classroom. She is skilled at supporting children's individual needs and fostering their independence.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Ms. Laura",
                role: "Assistant Teacher",
                bio: "Laura's background in art education enriches our program with creative projects. She helps children express themselves through various artistic mediums.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Ms. Karen",
                role: "Administrative Assistant",
                bio: "Karen keeps our preschool running smoothly behind the scenes. She is often the friendly voice you'll hear when calling Tot Spot and is always ready to assist families.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((staff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="aspect-square relative">
                    <Image src={staff.image || "/placeholder.svg"} alt={staff.name} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>{staff.name}</CardTitle>
                    <p className="text-sm text-pink-600 font-medium">{staff.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{staff.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Facility */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Facility</h2>
            <div className="mt-2 h-1 w-20 bg-pink-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Tot Spot is proud to offer one of the most spacious and well-equipped preschool facilities in south
              Calgary.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Craft Room",
                description:
                  "Each day the children will create an individual project and have the opportunity to choose the sand table, lego table, play dough table, listening centre and/or special theme activities.",
                image: "https://totspotpreschool.ca/wp-content/uploads/tot-spot-preschool-calgary-alberta-5.jpg",
              },
              {
                title: "Activity Room",
                description:
                  "Children can choose from many activities in this room that encourage the development of fine motor and problem solving skills: puzzles, games, building blocks, train table and books.",
                image: "https://totspotpreschool.ca/wp-content/uploads/tot-spot-preschool-calgary-alberta-3-600x600-1.jpg",
              },
              {
                title: "Play Room",
                description:
                  "This room highlights large muscle group activities and imaginary play that includes a water table, house centre and theme-based toys. Dramatic play is incorporated through the play centre which changes themes monthly.",
                image: "https://totspotpreschool.ca/wp-content/uploads/tot-spot-preschool-calgary-alberta-6-600x600-1.jpg",
              },
              {
                title: "Gym",
                description: "The children participate in a daily gym activity to develop their gross motor skills. Such activities could include structured games, dramatic play, musical games, or equipment (parachute, bean bags, and hoops).",
                image: "https://totspotpreschool.ca/wp-content/uploads/tot-spot-preschool-calgary-alberta-4-600x600-1.jpg",
              },
              {
                title: "Story Room",
                description:
                  "Circle time incorporates stories, songs, rhymes, sharing, and learning based on our current themes. Four-year-old classes also participate in calendar activities and show-and-share.",
                image: "https://totspotpreschool.ca/wp-content/uploads/tot-spot-preschool-calgary-alberta-1-600x600-1.jpg",
              },
              {
                title: "Snack Time",
                description:
                  "Parents provide a water bottle and nutritious snack for their children to bring to school each day. ",
                image: "https://totspotpreschool.ca/wp-content/uploads/tot-spot-preschool-calgary-alberta-2-600x600-1.jpg",
              },
            ].map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="h-48 relative">
                    <Image
                      src={facility.image || "/placeholder.svg"}
                      alt={facility.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{facility.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{facility.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              <h2 className="text-3xl font-bold">Come See Tot Spot for Yourself</h2>
              <p className="text-pink-100 text-lg">
                We invite you to schedule a tour of our facility and meet our wonderful teachers.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50">
                  Contact Us
                </Button>
                
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
