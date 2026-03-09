import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Heart, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
const About = () => {
  return <>
      <Helmet>
        <title>À propos | SOLAREX — Le Codex du Soleil</title>
        <meta name="description" content="SOLAREX : quiz et compétition entre casernes pour sapeurs-pompiers. Découvrez notre mission, nos valeurs et notre modèle." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">À propos de SOLAREX</h1>

          <div className="space-y-8">
            <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-4">
                <Target className="w-8 h-8 text-red-500 shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Notre Mission</h2>
                  <p className="text-slate-300 leading-relaxed">SOLAREX — Le Codex du Soleil — est une plateforme de quiz et de compétition entre casernes pour sapeurs-pompiers. Notre mission : renforcer les connaissances théoriques tout en créant une dynamique collective entre centres de secours, grâce à plus de 650 questions basées sur les documents officiels (GDO, GTO, RETEX).</p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-3">Le modèle SOLAREX</h2>
              <div className="text-slate-300 max-w-2xl mx-auto space-y-3 text-left">
                <p><span className="font-semibold text-white">Gratuit :</span> Quiz découverte de 100 questions SSUAP + accès complet aux ressources GDO/GTO/RETEX.</p>
                <p><span className="font-semibold text-white">Premium (10€/an) :</span> 650+ questions, 7 thèmes, tous niveaux, compétition entre casernes, classement national, historique et stats personnalisées.</p>
                <p className="text-sm text-slate-400">Moins de 1€/mois pour soutenir ta formation et celle de ta caserne.</p>
              </div>
            </section>

            <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-4">
                <Heart className="w-8 h-8 text-red-500 shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Pourquoi ce projet ?</h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    Nous croyons que la révision régulière est essentielle pour maintenir un haut niveau de compétence 
                    en secourisme. SOLAREX SP permet de :
                  </p>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Réviser efficacement en quelques minutes par jour</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Identifier rapidement ses points faibles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Accéder directement aux ressources officielles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>S'entraîner n'importe où, même hors-ligne</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-4">
                <Shield className="w-8 h-8 text-red-500 shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Nos Valeurs</h2>
                  <div className="space-y-3 text-slate-300">
                    <div>
                      <p className="font-semibold text-white mb-1">Pédagogie</p>
                      <p>Chaque question inclut une explication et un lien vers la ressource source.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Accessibilité</p>
                      <p>Quiz gratuit pour découvrir, Premium à 10€/an pour tout débloquer.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Fiabilité</p>
                      <p>Questions basées exclusivement sur les documents officiels.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Confidentialité</p>
                      <p>Données sécurisées, authentification Supabase, paiement Stripe.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-red-500/10 border-2 border-red-500/50 rounded-lg p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-red-500 shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-red-500">Avertissement Important</h2>
                  <div className="space-y-3 text-slate-300">
                    <p className="font-semibold">
                      SOLAREX est un outil d'entraînement complémentaire et ne se substitue en aucun cas à :
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>La formation officielle dispensée par votre SDIS</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Les documents de référence internes à votre département</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Les protocoles et procédures spécifiques de votre service</span>
                      </li>
                    </ul>
                    <p className="font-semibold mt-4">
                      Vérifiez toujours les informations avec vos documents officiels et formateurs. 
                      En cas de doute, référez-vous aux procédures de votre SDIS.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Contribuer au projet</h2>
              <p className="text-slate-300 mb-4">
                SOLAREX SP est en constante amélioration. Vous pouvez nous aider en :
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Signalant les erreurs ou imprécisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Proposant de nouvelles questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Partageant vos retours d'expérience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Suggérant des améliorations</span>
                </li>
              </ul>
              <p className="text-slate-300 mt-4">
                Contactez-nous via le formulaire de contact pour toute suggestion !
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </>;
};
export default About;