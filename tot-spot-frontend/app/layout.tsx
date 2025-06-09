import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getContactInfo } from "@/lib/contentful"
import SupabasePinger from "@/components/supabase-pinger"

export const metadata = {
  title: "Tot Spot Preschool | Lake Bonavista, Calgary",
  description: "Quality early education for your children in Lake Bonavista, south Calgary.",
  openGraph: {
    title: "Tot Spot Preschool",
    description: "Quality early education for your children in Lake Bonavista, south Calgary.",
    url: "https://www.totspot-website.vercel.app",
    type: "website",
    images: [
      {
        url: "https://www.totspot-website.vercel.app/images/tot-spot-og.jpg", // Replace with actual hosted image
        width: 1200,
        height: 630,
        alt: "Tot Spot Preschool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tot Spot Preschool",
    description: "Quality early education for your children in Lake Bonavista, south Calgary.",
    images: ["https://www.totspot-website.vercel.app/images/tot-spot-og.jpg"], // Same image
  },
    author: 'Jin Kim'
  
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const contactInfo = await getContactInfo();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/tot-spot-favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <SupabasePinger />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer contactInfo={contactInfo}/>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
