import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  User,
  LogOut,
  Trophy,
  Target,
  CheckCircle2,
  XCircle,
  Crown,
  BarChart3,
} from 'lucide-react';

const Profile = () => {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !supabase) {
      setLoading(false);
      return;
    }
    fetchStats();
  }, [user]);

  const fetchStats = async () => {
    const { data } = await supabase
      .from('quiz_answers')
      .select('is_correct, points_earned, questions(theme)')
      .eq('user_id', user.id);

    if (data) {
      const total = data.length;
      const correct = data.filter((a) => a.is_correct).length;
      const totalPoints = data.reduce((sum, a) => sum + a.points_earned, 0);

      // Stats by theme
      const byTheme = {};
      data.forEach((a) => {
        const theme = a.questions?.theme || 'Inconnu';
        if (!byTheme[theme]) byTheme[theme] = { total: 0, correct: 0 };
        byTheme[theme].total++;
        if (a.is_correct) byTheme[theme].correct++;
      });

      setStats({ total, correct, totalPoints, byTheme });
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({ title: 'Déconnexion', description: 'À bientôt sur SOLAREX !' });
    navigate('/');
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Mon compte</h1>
        <p className="text-slate-300 mb-6">Connecte-toi pour voir ton profil.</p>
        <Button asChild className="bg-red-500 hover:bg-red-600">
          <Link to="/connexion">Se connecter</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Mon compte | SOLAREX</title>
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <User className="w-16 h-16 text-red-500 mx-auto mb-4 p-3 bg-red-500/10 rounded-full" />
            <h1 className="text-3xl font-bold mb-1">{profile?.display_name || 'Pompier'}</h1>
            <p className="text-slate-400">{user.email}</p>
          </div>

          {/* Abonnement */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Abonnement</p>
                {profile?.is_premium ? (
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold text-yellow-500">Premium</span>
                    {profile.premium_until && (
                      <span className="text-sm text-slate-400">
                        — jusqu'au {new Date(profile.premium_until).toLocaleDateString('fr-FR')}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-slate-300">Gratuit</span>
                )}
              </div>
              {!profile?.is_premium && (
                <Button asChild size="sm" className="bg-red-500 hover:bg-red-600">
                  <Link to="/premium">Passer Premium</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Caserne */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Ma caserne</p>
                {profile?.casernes ? (
                  <p className="font-semibold">
                    {profile.casernes.name}{' '}
                    <span className="text-sm text-slate-400">
                      ({profile.casernes.sdis || profile.casernes.department})
                    </span>
                  </p>
                ) : (
                  <p className="text-slate-300">Aucune caserne sélectionnée</p>
                )}
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/classement">Voir le classement</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold">Statistiques</h2>
            </div>

            {loading ? (
              <p className="text-slate-400">Chargement…</p>
            ) : !stats || stats.total === 0 ? (
              <p className="text-slate-400">Aucune réponse enregistrée. Lance un quiz pour commencer !</p>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                    <Target className="w-5 h-5 mx-auto mb-2 text-slate-400" />
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-slate-400">Questions</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                    <CheckCircle2 className="w-5 h-5 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold text-green-500">
                      {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
                    </p>
                    <p className="text-xs text-slate-400">Réussite</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                    <Trophy className="w-5 h-5 mx-auto mb-2 text-yellow-500" />
                    <p className="text-2xl font-bold text-red-500">{profile?.total_points || 0}</p>
                    <p className="text-xs text-slate-400">Points</p>
                  </div>
                </div>

                {/* Par thème */}
                <h3 className="text-sm font-semibold mb-3 text-slate-400">Par thème</h3>
                <div className="space-y-2">
                  {Object.entries(stats.byTheme).map(([theme, data]) => {
                    const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                    return (
                      <div key={theme} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
                        <span className="text-sm font-medium">{theme}</span>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-slate-400">{data.correct}/{data.total}</span>
                          <span className={`font-semibold ${pct >= 70 ? 'text-green-500' : pct >= 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {pct}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Se déconnecter
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
