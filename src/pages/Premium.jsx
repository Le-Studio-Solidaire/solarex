import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Crown, CheckCircle2, Zap, Trophy, Users, BarChart3 } from 'lucide-react';

const Premium = () => {
  const { user, profile } = useAuth();

  const features = [
    { icon: <Zap className="w-5 h-5" />, text: '650+ questions, 7 thèmes, toutes difficultés' },
    { icon: <Trophy className="w-5 h-5" />, text: 'Mode infini + test de 100 questions' },
    { icon: <Users className="w-5 h-5" />, text: 'Contribution au classement de ta caserne' },
    { icon: <BarChart3 className="w-5 h-5" />, text: 'Historique et statistiques personnalisées' },
    { icon: <Crown className="w-5 h-5" />, text: 'Accès à tous les quiz premium' },
  ];

  const handleCheckout = () => {
    const stripeUrl = new URL('https://buy.stripe.com/4gM7sK6jS05o8Pq50j1Fe00');
    // Pass user email to prefill Stripe checkout
    if (user?.email) {
      stripeUrl.searchParams.set('prefilled_email', user.email);
    }
    window.location.href = stripeUrl.toString();
  };

  if (profile?.is_premium) {
    return (
      <>
        <Helmet>
          <title>Premium | SOLAREX</title>
        </Helmet>
        <div className="container mx-auto px-4 py-12 text-center">
          <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Tu es déjà Premium !</h1>
          <p className="text-slate-300 mb-2">
            Ton abonnement est actif
            {profile.premium_until &&
              ` jusqu'au ${new Date(profile.premium_until).toLocaleDateString('fr-FR')}`}.
          </p>
          <p className="text-slate-400 mb-8">Merci de soutenir SOLAREX et ta caserne.</p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-red-500 hover:bg-red-600">
              <Link to="/app">Lancer le quiz</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/classement">Voir le classement</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Devenir Premium | SOLAREX — 10€/an</title>
        <meta name="description" content="Passe Premium sur SOLAREX pour 10€/an : toutes les questions, tous les thèmes, compétition entre casernes." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto"
        >
          <div className="text-center mb-8">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">SOLAREX Premium</h1>
            <p className="text-slate-300">
              Débloquez tout le contenu et participez à la compétition entre casernes
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
            <div className="text-center mb-8">
              <p className="text-5xl font-bold text-red-500">10€</p>
              <p className="text-slate-400">par an — moins de 1€/mois</p>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 shrink-0">
                    {f.icon}
                  </div>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>

            {user ? (
              <Button onClick={handleCheckout} className="w-full bg-red-500 hover:bg-red-600" size="lg">
                <Crown className="w-5 h-5 mr-2" />
                Payer 10€ — Accès 1 an
              </Button>
            ) : (
              <div className="space-y-3">
                <Button asChild className="w-full bg-red-500 hover:bg-red-600" size="lg">
                  <Link to="/inscription">
                    <Crown className="w-5 h-5 mr-2" />
                    S'inscrire — 10€/an
                  </Link>
                </Button>
                <p className="text-center text-sm text-slate-400">
                  Déjà un compte ?{' '}
                  <Link to="/connexion" className="text-red-500 hover:underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Premium;
