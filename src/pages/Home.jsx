import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { getRandomResourceLink } from '@/data/resourceLinks';
import { CheckCircle2, Zap, Target, BookOpen, TrendingUp, Shield } from 'lucide-react';

const Home = () => {
  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Corrigé immédiat',
      description: 'Feedback instantané avec lien direct vers GDO/GTO/RETEX pour réviser',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Modes d\'entraînement',
      description: 'Mode Infini pour réviser sans limite ou Test de 100 questions',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Suivi personnalisé',
      description: 'Score en temps réel et identification des thèmes à renforcer',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Fonctionne hors-ligne',
      description: 'Interface mise en cache pour réviser partout, même sans connexion',
    },
  ];

  const steps = [
    { number: '1', title: 'Choisis ton mode', description: 'Infini ou Test de 100 questions' },
    { number: '2', title: 'Filtre par thème', description: 'DOCTRINE, Incendie, SSUAP, etc.' },
    { number: '3', title: 'Révise efficacement', description: 'Feedback + ressources à chaque question' },
  ];

  const testimonials = [
    {
      name: 'Thomas L.',
      role: 'SPV depuis 3 ans',
      text: 'Parfait pour réviser entre deux gardes. Les liens vers les docs officiels sont un vrai plus !',
    },
    {
      name: 'Marie D.',
      role: 'SPP en formation',
      text: 'Interface claire et rapide. J\'ai progressé rapidement sur mes points faibles.',
    },
    {
      name: 'Alexandre M.',
      role: 'Formateur JSP',
      text: 'Excellent outil pour mes jeunes. Ils adorent le système de score !',
    },
  ];

  const faqs = [
    {
      question: 'D\'où viennent les questions ?',
      answer: 'Toutes les questions sont basées sur les documents officiels : GDO, GTO et RETEX. Chaque question inclut un lien vers la ressource source.',
    },
    {
      question: 'Ça fonctionne hors-ligne ?',
      answer: 'Oui ! L\'interface est mise en cache pour fonctionner sans connexion. Seuls les liens vers les PDF nécessitent une connexion.',
    },
    {
      question: 'Mes données sont-elles sécurisées ?',
      answer: 'Absolument. Votre score et vos préférences sont stockés localement sur votre appareil. Aucune donnée personnelle n\'est envoyée à nos serveurs.',
    },
    {
      question: 'C\'est gratuit ?',
      answer: 'Oui, cet outil est 100% gratuit et conçu pour aider la communauté des sapeurs-pompiers.',
    },
    {
      question: 'Puis-je proposer des questions ?',
      answer: 'Bien sûr ! Contactez-nous via le formulaire de contact pour suggérer de nouvelles questions ou signaler une erreur.',
    },
    {
      question: 'Compatible mobile ?',
      answer: 'Totalement ! Le quiz est optimisé pour smartphone, tablette et ordinateur.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Quiz Pompier — Secourisme | Révise le secourisme pompier en 5 minutes par jour</title>
        <meta
          name="description"
          content="Outil d'entraînement au secourisme pour sapeurs-pompiers volontaires et professionnels. QCM, modes d'entraînement, liens vers GDO/GTO/RETEX. Gratuit et hors-ligne."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Révise la théorie pompier,
              <br />
              5 minutes par jour
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Entraîne-toi avec des QCM infinie, des liens directs vers les documents officiels, et des lectures aléatoires.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-500 hover:bg-red-600 text-lg px-8">
                <Link to="/app">Lancer le quiz</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/ressources">Voir les ressources</Link>
              </Button>
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-lg px-8"
                onClick={() => {
                  const url = getRandomResourceLink();
                  if (!url) return;
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
              >
                Lecture aléatoire
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <img
              className="rounded-lg shadow-2xl mx-auto max-w-3xl w-full border border-slate-700"
              alt="Interface du quiz pompier"
             src="/pompier_1.jpg" />
          </motion.div>
        </section>

        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Trois étapes simples pour réviser efficacement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-red-500/50 transition-colors">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir Quiz Pompier ?</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-red-500/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-slate-300">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Soutenir Solarex SP</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Solarex SP est un projet porté par l'association <span className="font-semibold">Le Studio Solidaire</span>.
              Vos dons permettent d'héberger, maintenir et enrichir l'outil pour toute la communauté.
              Les dons sont collectés via HelloAsso sur la page de l'association.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-6 md:p-8 text-center">
              <p className="text-slate-300 mb-6">
                Chaque contribution compte. Merci de soutenir l'initiative pour qu'elle reste gratuite et accessible.
              </p>
              <Button asChild size="lg" className="bg-red-500 hover:bg-red-600 text-lg px-8">
                <a
                  href="https://www.helloasso.com/associations/le-studio-solidaire/formulaires/1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faire un don sur HelloAsso
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions fréquentes</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-slate-300 ml-7">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à réviser ?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Commence dès maintenant et améliore tes connaissances en secourisme pompier
            </p>
            <Button asChild size="lg" className="bg-red-500 hover:bg-red-600 text-lg px-8">
              <Link to="/app">Lancer le quiz maintenant</Link>
            </Button>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Home;