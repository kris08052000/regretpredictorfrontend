"use client";
import { Heart, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand Section */}
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Regret Predictor
            </h3>
            <p className="text-sm text-gray-600">
              Make smarter purchase decisions with AI-powered insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/predict" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  Predict
                </a>
              </li>
              <li>
                <a href="/history" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  History
                </a>
              </li>
              <li>
                <a href="/issues" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  Report Issues
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Connect</h4>
            <div className="flex gap-3">
              <a
                href="https://github.com/kris08052000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center text-gray-600 hover:text-blue-600 transition"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/KRIS89591"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center text-gray-600 hover:text-blue-600 transition"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:krishnarajendrasagar@gmail.com"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center text-gray-600 hover:text-blue-600 transition"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © {currentYear} Regret Predictor. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for smart shoppers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}