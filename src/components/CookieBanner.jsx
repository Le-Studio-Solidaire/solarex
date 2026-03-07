import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = React.useState(false);

  React.useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="container mx-auto max-w-4xl bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Cookies & Confidentialité</h3>
                <p className="text-sm text-slate-300 mb-4">
                  Nous utilisons des cookies pour améliorer votre expérience et analyser l'utilisation du site (analytics). 
                  Vos données de quiz restent stockées localement sur votre appareil.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleAccept} size="sm" className="bg-red-500 hover:bg-red-600">
                    Accepter
                  </Button>
                  <Button onClick={handleDecline} variant="outline" size="sm">
                    Refuser
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDecline}
                className="shrink-0"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;