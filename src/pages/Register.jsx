import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Flame, UserPlus, Search } from 'lucide-react';

const Register = () => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [caserneId, setCaserneId] = useState('');
  const [casernes, setCasernes] = useState([]);
  const [caserneSearch, setCaserneSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('casernes')
      .select('id, name, department, sdis')
      .order('department')
      .order('name')
      .then(({ data }) => {
        if (data) setCasernes(data);
      });
  }, []);

  const filteredCasernes = casernes.filter(
    (c) =>
      c.name.toLowerCase().includes(caserneSearch.toLowerCase()) ||
      c.department.includes(caserneSearch) ||
      (c.sdis && c.sdis.toLowerCase().includes(caserneSearch.toLowerCase()))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caserneId) {
      toast({
        title: 'Caserne requise',
        description: 'Sélectionne ta caserne pour participer à la compétition.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { user } = await signUp(email, password);

      // Update profile with display name and caserne
      if (supabase && user) {
        await supabase.rpc('join_caserne', {
          p_user_id: user.id,
          p_caserne_id: parseInt(caserneId, 10),
        });
        await supabase
          .from('profiles')
          .update({ display_name: displayName })
          .eq('id', user.id);
      }

      toast({
        title: 'Inscription réussie !',
        description: 'Vérifie tes emails pour confirmer ton compte, puis passe au paiement.',
      });
      navigate('/premium');
    } catch (err) {
      toast({
        title: 'Erreur d\'inscription',
        description: err.message || 'Une erreur est survenue.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Inscription | SOLAREX</title>
        <meta name="description" content="Rejoins SOLAREX et inscris ta caserne à la compétition nationale des sapeurs-pompiers." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <Flame className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Rejoins la compétition</h1>
            <p className="text-slate-300">
              Inscris-toi et fais gagner ta caserne — <span className="text-red-500 font-semibold">10€/an</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Pseudo / Prénom</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Ton prénom ou pseudo"
              />
            </div>

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
                minLength={6}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Minimum 6 caractères"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Ta caserne</label>
              <div className="relative mb-2">
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={caserneSearch}
                  onChange={(e) => setCaserneSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Rechercher (nom, département, SDIS)"
                />
              </div>
              <select
                value={caserneId}
                onChange={(e) => setCaserneId(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">— Sélectionne ta caserne —</option>
                {filteredCasernes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.sdis || c.department})
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 text-sm text-slate-300">
              <p className="font-semibold text-white mb-1">Ce que tu obtiens :</p>
              <ul className="space-y-1">
                <li>✓ 650+ questions, 7 thèmes, toutes difficultés</li>
                <li>✓ Mode infini + test de 100 questions</li>
                <li>✓ Ta caserne au classement national</li>
                <li>✓ Historique et stats personnalisées</li>
              </ul>
            </div>

            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600" size="lg" disabled={loading}>
              <UserPlus className="w-5 h-5 mr-2" />
              {loading ? 'Inscription…' : 'S\'inscrire — 10€/an'}
            </Button>

            <p className="text-center text-sm text-slate-400">
              Déjà un compte ?{' '}
              <Link to="/connexion" className="text-red-500 hover:underline font-semibold">
                Se connecter
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
