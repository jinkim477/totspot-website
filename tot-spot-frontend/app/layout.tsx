import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getContactInfo } from "@/lib/contentful"

export const metadata = {
  title: "Tot Spot Preschool | Lake Bonavista, Calgary",
  description: "Quality early education for your children in Lake Bonavista, south Calgary.",
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
      </head>
      <body>
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
