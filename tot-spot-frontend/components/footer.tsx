import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-pink-600"></div>
              <span className="text-xl font-bold text-pink-600">Tot Spot</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Tot Spot is one of the best, brightest and most spacious preschools in south Calgary, located in Lake
              Bonavista.
            </p>
            <div className="flex gap-4">
              <Link href="https://facebook.com" className="text-gray-500 hover:text-pink-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="text-gray-500 hover:text-pink-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="mailto:info@totspotpreschool.ca" className="text-gray-500 hover:text-pink-600">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-pink-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-sm text-gray-600 hover:text-pink-600">
                  Programs & Registration
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-pink-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/parents" className="text-sm text-gray-600 hover:text-pink-600">
                  Parent Resources
                </Link>
              </li>
              <li>
                <Link href="/updates" className="text-sm text-gray-600 hover:text-pink-600">
                  Updates & News
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/programs#morning" className="text-sm text-gray-600 hover:text-pink-600">
                  Morning Program
                </Link>
              </li>
              <li>
                <Link href="/programs#afternoon" className="text-sm text-gray-600 hover:text-pink-600">
                  Afternoon Program
                </Link>
              </li>
              <li>
                <Link href="/programs#registration" className="text-sm text-gray-600 hover:text-pink-600">
                  Registration Process
                </Link>
              </li>
              <li>
                <Link href="/programs#fees" className="text-sm text-gray-600 hover:text-pink-600">
                  Tuition & Fees
                </Link>
              </li>
              <li>
                <Link href="/programs#calendar" className="text-sm text-gray-600 hover:text-pink-600">
                  School Calendar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">1401 Acadia Drive SE, Calgary, AB T2J 4C6</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">(403) 236-1268</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">info@totspotpreschool.ca</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Tot Spot Preschool. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
