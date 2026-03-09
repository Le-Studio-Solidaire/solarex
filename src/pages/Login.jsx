import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Flame, LogIn } from 'lucide-react';

const Login = () => {
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast({ title: 'Connexion réussie', description: 'Bienvenue sur SOLAREX !' });
      navigate('/');
    } catch (err) {
      toast({
        title: 'Erreur de connexion',
        description: err.message || 'Email ou mot de passe incorrect.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Connexion | SOLAREX</title>
        <meta name="description" content="Connectez-vous à SOLAREX pour participer à la compétition entre casernes." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <Flame className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Connexion</h1>
            <p className="text-slate-300">Accède à ton compte SOLAREX</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="ton.email@exemple.fr"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600" size="lg" disabled={loading}>
              <LogIn className="w-5 h-5 mr-2" />
              {loading ? 'Connexion…' : 'Se connecter'}
            </Button>

            <p className="text-center text-sm text-slate-400">
              Pas encore de compte ?{' '}
              <Link to="/inscription" className="text-red-500 hover:underline font-semibold">
                S'inscrire (10€/an)
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
