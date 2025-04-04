"use client";

import React from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold ">NationsHub</span>
          </Link>
          <nav className="flex space-x-6">
            <Link
              href="/countries"
              className={`hover:cursor-pointer ${
                pathname === "/countries" ? "text-blue-600" : ""
              }`}
            >
              Countries
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
