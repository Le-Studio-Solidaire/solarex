import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Menu, X, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const { user, profile } = useAuth();

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/app', label: 'Quiz' },
    { to: '/classement', label: 'Classement' },
    { to: '/ressources', label: 'Ressources' },
    { to: '/a-propos', label: 'À propos' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Flame className="w-6 h-6 text-red-500" />
            <span className="hidden sm:inline">SOLAREX</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-red-500 ${
                  isActive(link.to) ? 'text-red-500' : 'text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                to="/profil"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-red-500 ${
                  isActive('/profil') ? 'text-red-500' : 'text-slate-300'
                }`}
              >
                <User className="w-4 h-4" />
                {profile?.display_name || 'Mon compte'}
              </Link>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/connexion">
                    <LogIn className="w-4 h-4 mr-1" />
                    Connexion
                  </Link>
                </Button>
                <Button asChild size="sm" className="bg-red-500 hover:bg-red-600">
                  <Link to="/inscription">S'inscrire</Link>
                </Button>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </nav>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t border-slate-800 bg-slate-900"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-red-500 py-2 ${
                    isActive(link.to) ? 'text-red-500' : 'text-slate-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-slate-800 pt-3 mt-1">
                {user ? (
                  <Link
                    to="/profil"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-slate-300 hover:text-red-500 py-2 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    {profile?.display_name || 'Mon compte'}
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/connexion"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium text-slate-300 hover:text-red-500 py-2"
                    >
                      Connexion
                    </Link>
                    <Link
                      to="/inscription"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-semibold text-red-500 hover:text-red-400 py-2"
                    >
                      S'inscrire — 10€/an
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-800 bg-slate-900/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-red-500" />
                <span className="font-bold">SOLAREX</span>
              </div>
              <p className="text-sm text-slate-400">
                Le Codex du Soleil — Quiz & compétition entre casernes pour sapeurs-pompiers.
              </p>
            </div>

            <div>
              <span className="font-semibold mb-4 block">Navigation</span>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-red-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="text-sm text-slate-400 hover:text-red-500 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <span className="font-semibold mb-4 block">Légal</span>
              <div className="flex flex-col gap-2">
                <Link
                  to="/legal"
                  className="text-sm text-slate-400 hover:text-red-500 transition-colors"
                >
                  Mentions légales & RGPD
                </Link>
                <Link
                  to="/premium"
                  className="text-sm text-slate-400 hover:text-red-500 transition-colors"
                >
                  Devenir Premium
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
            <p>© {new Date().getFullYear()} SOLAREX — Le Codex du Soleil. Outil pédagogique non officiel.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;