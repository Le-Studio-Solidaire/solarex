import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { getRandomResourceLink } from '@/data/resourceLinks';
import {
  CheckCircle2,
  Zap,
  Target,
  BookOpen,
  TrendingUp,
  Shield,
  Trophy,
  Users,
  Crown,
  MapPin,
  Flame,
} from 'lucide-react';

const Home = () => {
  const { profile } = useAuth();
  const [topCasernes, setTopCasernes] = useState([]);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('casernes')
      .select('id, name, department, sdis, total_points, member_count')
      .order('total_points', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setTopCasernes(data);
      });
  }, []);

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Compétition casernes',
      description: 'Chaque bonne réponse rapporte des points à ta caserne. Monte au classement national !',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Modes d\'entraînement',
      description: 'Mode Infini, Test de 100 questions, filtrage par thème et difficulté.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Suivi personnalisé',
      description: 'Score, stats par thème, progression — tout synchronisé dans le cloud.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: '650+ questions',
      description: '7 thèmes (SSUAP, Incendie, Doctrine…), 3 niveaux de difficulté, corrigés détaillés.',
    },
  ];

  const steps = [
    { number: '1', title: 'Teste le quiz gratuit', description: '100 questions SSUAP pour découvrir' },
    { number: '2', title: 'Inscris ta caserne', description: 'Choisis ta caserne et passe Premium (10€/an)' },
    { number: '3', title: 'Monte au classement', description: 'Chaque bonne réponse rapporte des points !' },
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
      answer: 'Le quiz découverte (100 questions SSUAP) est gratuit. Pour accéder aux 650+ questions et participer à la compétition casernes : 10€/an, soit moins de 1€/mois.',
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
        <title>SOLAREX — Le Codex du Soleil | Compétition quiz entre casernes de sapeurs-pompiers</title>
        <meta
          name="description"
          content="SOLAREX : quiz et compétition entre casernes pour sapeurs-pompiers. 650+ questions, classement national, 10€/an. Fais monter ta caserne !"
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
              Le Codex du Soleil
              <br />
              <span className="text-3xl md:text-5xl">Compétition entre casernes</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Entraîne-toi avec 650+ questions, fais gagner des points à ta caserne, et monte au classement national des sapeurs-pompiers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-500 hover:bg-red-600 text-lg px-8">
                <Link to="/app">Lancer le quiz</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/classement">Voir le classement</Link>
              </Button>
              {!profile?.is_premium && (
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8">
                  <Link to="/inscription">S'inscrire — 10€/an</Link>
                </Button>
              )}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir SOLAREX ?</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <Trophy className="inline w-8 h-8 text-yellow-500 mr-2 -mt-1" />
              Top 3 Casernes
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Le classement est en temps réel. Chaque bonne réponse compte !
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {topCasernes.length > 0 ? (
              <div className="space-y-3 mb-6">
                {topCasernes.map((caserne, index) => {
                  const medals = [
                    { icon: <Crown className="w-6 h-6 text-yellow-400" />, bg: 'border-yellow-500/50 bg-yellow-500/5' },
                    { icon: <Crown className="w-6 h-6 text-slate-300" />, bg: 'border-slate-400/50 bg-slate-400/5' },
                    { icon: <Crown className="w-6 h-6 text-orange-400" />, bg: 'border-orange-500/50 bg-orange-500/5' },
                  ];
                  return (
                    <motion.div
                      key={caserne.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-lg border-2 ${medals[index].bg}`}
                    >
                      <div className="shrink-0">{medals[index].icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{caserne.name}</p>
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {caserne.sdis || caserne.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" /> {caserne.member_count} membre{caserne.member_count !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-2xl font-bold text-red-500">{caserne.total_points.toLocaleString()}</p>
                        <p className="text-xs text-slate-400">points</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center mb-6">
                <Trophy className="w-12 h-12 text-yellow-500/50 mx-auto mb-3" />
                <p className="text-slate-400">Le classement apparaîtra dès les premières inscriptions.</p>
              </div>
            )}
            <div className="text-center">
              <Button asChild variant="outline">
                <Link to="/classement">Voir le classement complet</Link>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à défendre ta caserne ?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Lance le quiz gratuit maintenant, ou inscris-toi pour participer à la compétition nationale
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-500 hover:bg-red-600 text-lg px-8">
                <Link to="/app">Quiz gratuit (100 questions)</Link>
              </Button>
              {!profile?.is_premium && (
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8">
                  <Link to="/inscription">Rejoindre la compétition — 10€/an</Link>
                </Button>
              )}
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Home;