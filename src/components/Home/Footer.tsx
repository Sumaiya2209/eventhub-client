import Link from "next/link";
import { Calendar, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Calendar size={22} className="text-violet-400" />
              EventHub
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Discover, post, and manage events happening around you.
            </p>
            <div className="flex gap-3 mt-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-violet-600 hover:text-white transition-colors"
              >
                <FaFacebookF size={14} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-violet-600 hover:text-white transition-colors"
              >
                <FaInstagram size={14} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-violet-600 hover:text-white transition-colors"
              >
                <FaLinkedinIn size={14} />
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-violet-400">Home</Link></li>
              <li><Link href="/events" className="hover:text-violet-400">Events</Link></li>
              <li><Link href="/about" className="hover:text-violet-400">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-violet-400">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-violet-400">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-violet-400">Help Center</Link></li>
              <li><Link href="/signup" className="hover:text-violet-400">Create Account</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Contact Us</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-violet-400" />
                support@eventhub.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-violet-400" />
                +880 1234-567890
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-violet-400" />
                Sylhet, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © 2026 EventHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}