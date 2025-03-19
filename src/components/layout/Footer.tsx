
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Facebook, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Support', href: '/support' },
        { name: 'Documentation', href: '/docs' },
      ],
    },
    {
      title: 'Features',
      links: [
        { name: 'Prescription Decoder', href: '/upload' },
        { name: 'Medicine Info', href: '/medicine-info' },
        { name: 'Health Tips', href: '/health-tips' },
        { name: 'Dosage Calculator', href: '/dosage-calculator' },
      ],
    },
  ];

  return (
    <footer className="bg-secondary py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="text-2xl font-bold"
              aria-label="PreScriptEase Home"
            >
              <span className="text-primary">PreScript</span>
              <span className="text-foreground">Ease</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              PreScriptEase helps you decode complex medical prescriptions, making healthcare more accessible and understandable for everyone.
            </p>
            <div className="mt-6">
              <p className="font-medium text-sm text-foreground mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="max-w-xs" 
                  aria-label="Email for newsletter"
                />
                <Button size="sm" className="shrink-0" aria-label="Subscribe">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-medium text-sm text-foreground mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} PreScriptEase. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="mailto:info@prescriptease.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
