"use client";

import React from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = ({
  transparent = false,
  className,
}: {
  transparent?: boolean;
  className?: string;
}) => {
  const pathname = usePathname();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 ${
        transparent ? "bg-transparent" : "bg-background border-b"
      } ${className}`}
    >
      <div className="container mx-auto px-4 py-2">
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
