import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page non trouvée | Quiz Pompier</title>
        <meta name="description" content="La page que vous recherchez n'existe pas." />
      </Helmet>

      <div className="container mx-auto px-4 py-12 min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl"
        >
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-red-500 mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-4">Page non trouvée</h2>
            <p className="text-xl text-slate-300 mb-8">
              Oups ! La page que vous recherchez semble avoir disparu dans les flammes...
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-8">
            <Search className="w-16 h-16 mx-auto mb-4 text-slate-500" />
            <p className="text-slate-300 mb-6">
              Cette page n'existe pas ou a été déplacée. Vérifiez l'URL ou retournez à l'accueil.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-500 hover:bg-red-600">
                <Link to="/">
                  <Home className="w-5 h-5 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/app">Lancer le quiz</Link>
              </Button>
            </div>
          </div>

          <div className="text-sm text-slate-400">
            <p>Besoin d'aide ? <Link to="/contact" className="text-red-500 hover:underline">Contactez-nous</Link></p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;