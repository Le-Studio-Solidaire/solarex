import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Medal, Users, MapPin, Crown, ChevronUp } from 'lucide-react';

const Leaderboard = () => {
  const { user, profile } = useAuth();
  const [casernes, setCasernes] = useState([]);
  const [filter, setFilter] = useState('national');
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('casernes')
      .select('*')
      .order('total_points', { ascending: false });

    if (data) {
      setCasernes(data);
      const depts = [...new Set(data.map((c) => c.department))].sort();
      setDepartments(depts);
    }
    setLoading(false);
  };

  const displayed = filter === 'national'
    ? casernes
    : casernes.filter((c) => c.department === selectedDept);

  const getRankIcon = (rank) => {
    if (rank === 0) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 1) return <Medal className="w-6 h-6 text-slate-300" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-orange-400" />;
    return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-slate-400">{rank + 1}</span>;
  };

  const getRankBg = (rank) => {
    if (rank === 0) return 'border-yellow-500/50 bg-yellow-500/5';
    if (rank === 1) return 'border-slate-400/50 bg-slate-400/5';
    if (rank === 2) return 'border-orange-500/50 bg-orange-500/5';
    return 'border-slate-700';
  };

  return (
    <>
      <Helmet>
        <title>Classement des Casernes | SOLAREX</title>
        <meta name="description" content="Classement national des casernes de sapeurs-pompiers sur SOLAREX. Quelle caserne sera en tête ?" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Classement des Casernes
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Chaque bonne réponse rapporte des points à ta caserne. Monte au classement !
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
              onClick={() => setFilter('national')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === 'national'
                  ? 'bg-red-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              National
            </button>
            <button
              onClick={() => setFilter('departement')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === 'departement'
                  ? 'bg-red-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Par département
            </button>
            {filter === 'departement' && (
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">— Département —</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Leaderboard */}
          {loading ? (
            <div className="text-center py-12 text-slate-400">Chargement du classement…</div>
          ) : !supabase ? (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-4">
                Le classement sera disponible après la configuration de Supabase.
              </p>
              <Button asChild className="bg-red-500 hover:bg-red-600">
                <Link to="/inscription">S'inscrire</Link>
              </Button>
            </div>
          ) : displayed.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              {filter === 'departement' && !selectedDept
                ? 'Sélectionne un département pour voir le classement.'
                : 'Aucune caserne trouvée.'}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-3">
              {displayed.map((caserne, index) => {
                const isUserCaserne = profile?.caserne_id === caserne.id;
                return (
                  <motion.div
                    key={caserne.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${getRankBg(index)} ${
                      isUserCaserne ? 'ring-2 ring-red-500' : ''
                    }`}
                  >
                    <div className="shrink-0">{getRankIcon(index)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold truncate">{caserne.name}</p>
                        {isUserCaserne && (
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                            Ma caserne
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {caserne.sdis || caserne.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {caserne.member_count} membre{caserne.member_count !== 1 ? 's' : ''}
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
          )}

          {/* CTA for non-premium */}
          {!profile?.is_premium && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 max-w-2xl mx-auto"
            >
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-8 text-center">
                <ChevronUp className="w-10 h-10 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Fais monter ta caserne !</h3>
                <p className="text-slate-300 mb-6">
                  Inscris-toi pour que chaque bonne réponse rapporte des points à ta caserne.
                </p>
                <Button asChild size="lg" className="bg-red-500 hover:bg-red-600">
                  <Link to="/inscription">Rejoindre la compétition — 10€/an</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Leaderboard;
