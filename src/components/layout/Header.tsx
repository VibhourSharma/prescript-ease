import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ease-in-out py-4 px-4 sm:px-6 lg:px-8",
        isScrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-primary transition-transform hover:scale-[1.02] duration-300"
            aria-label="PreScriptEase Home"
          >
            <span className="text-primary">PreScript</span>
            <span className="text-foreground">Ease</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild size="sm" className="animate-fade-in">
              <Link to="/upload">Upload Prescription</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 glass rounded-xl p-4 animate-fade-in">
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={cn(
                      "block py-2 px-4 rounded-md text-sm font-medium transition-colors",
                      location.pathname === link.path
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:bg-primary/5"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button asChild className="w-full">
                  <Link to="/upload">Upload Prescription</Link>
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
