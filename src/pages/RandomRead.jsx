import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { resourceLinks, getRandomResourceLink } from '@/data/resourceLinks';
import { BookOpen, Shuffle, Info } from 'lucide-react';

const RandomRead = () => {
  const totalDocs = resourceLinks.length;

  const handleRandomRead = () => {
    const url = getRandomResourceLink();
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Helmet>
        <title>Lecture aléatoire | Ressources Pompier</title>
        <meta
          name="description"
          content="Accède à une lecture aléatoire parmi les documents rassemblés (GDO/GTO/RETEX, etc.). Idéal pour découvrir et réviser au hasard."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        {/* Hero section: similar to Home */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Lecture aléatoire
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Découvre un document au hasard parmi {totalDocs} ressources réunies. Parfait pour varier et approfondir tous les jours un peu plus.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-lg px-8"
                onClick={handleRandomRead}
              >
                <Shuffle className="w-5 h-5 mr-2" />
                Lecture aléatoire
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          >
            <img
              className="rounded-lg shadow-2xl mx-auto max-w-3xl w-full border border-slate-700"
              alt="Lecture aléatoire des ressources pompier"
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
            />
          </motion.div>
        </section>

        {/* Info / Stats: inspired by Quiz setup card */}
        <section className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-8"
          >
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <p className="text-sm text-slate-400">Ressources réunies</p>
                <p className="text-3xl font-bold text-red-500">{totalDocs}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400">Type de contenu</p>
                <p className="text-3xl font-bold">PDF & Docs</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400">Mode de lecture</p>
                <p className="text-3xl font-bold">Aléatoire</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-slate-700 bg-slate-900/40 flex items-start gap-3">
                <Info className="w-5 h-5 text-orange-400 mt-0.5" />
                <p className="text-slate-300">
                  Le principe est simple: clique sur « Lecture aléatoire » pour ouvrir une ressource au hasard.
                  Répète autant que tu veux pour découvrir de nouvelles lectures utiles.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-slate-700 bg-slate-900/40 flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-red-400 mt-0.5" />
                <p className="text-slate-300">
                  Les ressources proviennent de documents officiels (GDO, GTO, RETEX, etc.). Certaines peuvent nécessiter une connexion pour s'ouvrir.
                </p>
              </div>

              <div className="flex justify-center pt-2">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 w-full md:w-auto"
                  onClick={handleRandomRead}
                >
                  <Shuffle className="w-5 h-5 mr-2" />
                  Lancer une lecture aléatoire
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default RandomRead;
