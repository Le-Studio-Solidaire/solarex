import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  Play,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  XCircle,
  Trophy,
  Target,
  Flame,
  Flag,
  Send,
  Lock,
} from 'lucide-react';
import { quizData } from '@/data/quizData';

// --- Utils --- //
// Fisher–Yates
const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Mélange les réponses et recalcule l'index correct (0-based)
const shuffleQuestionAnswers = (q) => {
  const pairs = q.answers.map((ans, idx) => ({ ans, idx }));
  const shuffled = shuffleArray(pairs);
  const answers = shuffled.map((p) => p.ans);
  const correctAnswer = shuffled.findIndex((p) => p.idx === q.correctAnswer);
  return { ...q, answers, correctAnswer };
};

const Quiz = () => {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const isPremium = profile?.is_premium === true;

  // --- States --- //
  const [gameState, setGameState] = React.useState('setup');
  const [mode, setMode] = React.useState('infinite'); // 'infinite' | 'test'
  const [selectedTheme, setSelectedTheme] = React.useState('all');
  const [currentQuestion, setCurrentQuestion] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [questionCount, setQuestionCount] = React.useState(0);
  const [answered, setAnswered] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [reportOpen, setReportOpen] = React.useState(false);
  const [reportSubject, setReportSubject] = React.useState('');
  const [reportMessage, setReportMessage] = React.useState('');
  const [isSubmittingReport, setIsSubmittingReport] = React.useState(false);
  const [streak, setStreak] = React.useState(0);

  // Ces deux hooks DOIVENT être dans le composant
  const [usedIds, setUsedIds] = React.useState(new Set());
  const [lastQuestionId, setLastQuestionId] = React.useState(null);

  React.useEffect(() => {
    const savedScore = localStorage.getItem('quiz-score');
    const savedCount = localStorage.getItem('quiz-count');
    if (savedScore) setScore(parseInt(savedScore, 10));
    if (savedCount) setQuestionCount(parseInt(savedCount, 10));
  }, []);

  const themes = [
    'all',
    'DOCTRINE',
    'Incendie',
    'SSUAP',
    'Secours Routier',
    'Opérations Diverses',
    'Matériel & Équipements',
  ];

  // Free users: only SSUAP questions (first 100)
  // Premium users: all questions
  const FREE_SSUAP_IDS = new Set(
    quizData.filter((q) => q.theme === 'SSUAP').slice(0, 100).map((q) => q.id)
  );

  const getFilteredQuestions = () => {
    let pool = quizData;

    // Gate: non-premium users only get the free 100 SSUAP questions
    if (!isPremium) {
      pool = quizData.filter((q) => FREE_SSUAP_IDS.has(q.id));
    }

    if (selectedTheme === 'all') return pool;
    return pool.filter((q) => q.theme === selectedTheme);
  };

  const startQuiz = () => {
    const filtered = getFilteredQuestions();
    if (filtered.length === 0) {
      toast({
        title: 'Aucune question disponible',
        description: 'Sélectionnez un autre thème.',
        variant: 'destructive',
      });
      return;
    }
    // reset du pool pour un nouveau run
    setUsedIds(new Set());
    setLastQuestionId(null);

    setGameState('playing');
    loadNextQuestion();
  };

  const loadNextQuestion = () => {
    const filtered = getFilteredQuestions();

    // En mode "test": ne tirer que parmi les questions non encore posées
    const available =
      mode === 'test' ? filtered.filter((q) => !usedIds.has(q.id)) : filtered;

    if (available.length === 0) {
      // Plus de questions dispo en mode test → terminé
      setGameState('finished');
      return;
    }

    // Évite de répéter immédiatement la même question en mode infini
    let next = null;
    for (let tries = 0; tries < 10; tries++) {
      const idx = Math.floor(Math.random() * available.length);
      const candidate = available[idx];
      if (candidate.id !== lastQuestionId) {
        next = candidate;
        break;
      }
    }
    if (!next) {
      next = available[Math.floor(Math.random() * available.length)];
    }

    // Mélange les réponses et recalcule l'index correct
    const shuffledQ = shuffleQuestionAnswers(next);

    setCurrentQuestion(shuffledQ);
    setAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(false);
    setLastQuestionId(next.id);

    if (mode === 'test') {
      setUsedIds((prev) => {
        const n = new Set(prev);
        n.add(next.id);
        return n;
      });
    }
  };

  // Points by difficulty
  const POINTS_MAP = { easy: 1, medium: 2, hard: 3 };
  const STREAK_BONUS = 5;
  const STREAK_THRESHOLD = 10;

  const handleAnswer = (answerIndex) => {
    if (answered || !currentQuestion) return;

    setSelectedAnswer(answerIndex);
    setAnswered(true);

    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    let pointsEarned = 0;
    let newStreak = streak;

    if (correct) {
      const difficulty = currentQuestion.difficulty || 'medium';
      pointsEarned = POINTS_MAP[difficulty] || 2;
      newStreak = streak + 1;

      // Streak bonus every 10 correct in a row
      if (newStreak > 0 && newStreak % STREAK_THRESHOLD === 0) {
        pointsEarned += STREAK_BONUS;
        toast({
          title: `🔥 Série de ${newStreak} !`,
          description: `+${STREAK_BONUS} pts bonus pour ta caserne !`,
        });
      }
    } else {
      newStreak = 0;
    }

    setStreak(newStreak);

    const newScore = score + pointsEarned;
    const newCount = questionCount + 1;

    setScore(newScore);
    setQuestionCount(newCount);

    localStorage.setItem('quiz-score', newScore.toString());
    localStorage.setItem('quiz-count', newCount.toString());

    // Record answer to Supabase for premium users
    if (isPremium && supabase && user) {
      supabase.rpc('record_answer', {
        p_user_id: user.id,
        p_question_id: currentQuestion.id,
        p_is_correct: correct,
        p_points: pointsEarned,
      }).then(({ error }) => {
        if (error) console.error('Failed to record answer:', error.message);
      });
    }

    if (mode === 'test' && newCount >= 100) {
      setGameState('finished');
    }
  };

  const resetQuiz = () => {
    setGameState('setup');
    setScore(0);
    setQuestionCount(0);
    localStorage.setItem('quiz-score', '0');
    localStorage.setItem('quiz-count', '0');
  };

  const openResource = () => {
    if (currentQuestion?.resourceUrl && currentQuestion.resourceUrl !== '#') {
      window.open(currentQuestion.resourceUrl, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: '🚧 Ressource non disponible',
        description: 'Le lien vers la ressource sera ajouté prochainement.',
      });
    }
  };

  const openReport = () => {
    if (!currentQuestion) return;
    const defaultSubject = `Signalement - Question ${currentQuestion.id} (${currentQuestion.theme})`;
    setReportSubject(defaultSubject);
    setReportMessage('');
    setReportOpen(true);
  };

  const submitReport = (e) => {
    e?.preventDefault?.();
    if (!currentQuestion) return;
    const id = currentQuestion.id;
    const subject = reportSubject?.trim() || `Signalement - Question ${id}`;

    const fd = new FormData();
    fd.append('subject', subject);
    fd.append('message', reportMessage || '');
    fd.append('questionId', String(id));
    fd.append('theme', currentQuestion?.theme || '');
    fd.append('question', currentQuestion?.question || '');

    setIsSubmittingReport(true);
    fetch('https://getform.io/f/bzyqleja', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: fd,
    })
      .then(async (res) => {
        if (res.ok) {
          toast({
            title: 'Signalement envoyé ✅',
            description: "Merci, votre signalement nous aidera à améliorer le quiz.",
          });
          setReportOpen(false);
          setReportSubject('');
          setReportMessage('');
        } else {
          let errText = 'Une erreur est survenue. Réessayez plus tard.';
          try {
            const data = await res.json();
            if (data?.errors?.length) errText = data.errors.map((e) => e.message).join(' ');
          } catch {}
          toast({ title: 'Envoi impossible', description: errText, variant: 'destructive' });
        }
      })
      .catch(() => {
        toast({
          title: 'Envoi impossible',
          description: 'Vérifiez votre connexion et réessayez.',
          variant: 'destructive',
        });
      })
      .finally(() => setIsSubmittingReport(false));
  };

  // --- Rendu --- //
  if (gameState === 'setup') {
    return (
      <>
        <Helmet>
          <title>Quiz Secourisme Pompier | Entraînement</title>
          <meta
            name="description"
            content="Entraîne-toi au secourisme pompier avec des QCM. Choisis ton mode et ton thème pour commencer."
          />
        </Helmet>

        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Lancer le Quiz</h1>
              <p className="text-slate-300">Configure ton entraînement et c'est parti !</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">Mode d'entraînement</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setMode('infinite')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      mode === 'infinite'
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <Flame className="w-6 h-6 mx-auto mb-2 text-red-500" />
                    <p className="font-semibold">Mode Infini</p>
                    <p className="text-sm text-slate-400">Questions illimitées</p>
                  </button>
                  <button
                    onClick={() => setMode('test')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      mode === 'test'
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <Target className="w-6 h-6 mx-auto mb-2 text-red-500" />
                    <p className="font-semibold">Test 100</p>
                    <p className="text-sm text-slate-400">100 questions</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Thème</label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {themes.map((theme) => (
                    <option key={theme} value={theme} disabled={!isPremium && theme !== 'all' && theme !== 'SSUAP'}>
                      {theme === 'all' ? 'Tous les thèmes' : theme}
                      {!isPremium && theme !== 'all' && theme !== 'SSUAP' ? ' 🔒' : ''}
                    </option>
                  ))}
                </select>
                {!isPremium && (
                  <div className="mt-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Lock className="w-4 h-4 text-red-500 shrink-0" />
                      <span>
                        Quiz gratuit : 100 questions SSUAP.{' '}
                        <Link to="/inscription" className="text-red-500 hover:underline font-semibold">
                          Passe Premium (10€/an)
                        </Link>{' '}
                        pour 650+ questions et la compétition casernes.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Score actuel</p>
                  <p className="text-2xl font-bold text-red-500">{score} pts</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Questions répondues</p>
                  <p className="text-2xl font-bold">{questionCount}</p>
                </div>
              </div>

              <Button onClick={startQuiz} className="w-full bg-red-500 hover:bg-red-600" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Commencer
              </Button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  if (gameState === 'finished') {
    return (
      <>
        <Helmet>
          <title>Résultats du Quiz | Quiz Pompier</title>
        </Helmet>

        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Trophy className="w-20 h-20 mx-auto mb-6 text-yellow-500" />
            <h1 className="text-4xl font-bold mb-4">Test terminé !</h1>
            <p className="text-xl text-slate-300 mb-8">Bravo, tu as complété 100 questions</p>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-slate-400 mb-2">Score final</p>
                  <p className="text-4xl font-bold text-red-500">{score} pts</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-2">Questions</p>
                  <p className="text-4xl font-bold">{questionCount}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetQuiz} size="lg" className="bg-red-500 hover:bg-red-600">
                <RotateCcw className="w-5 h-5 mr-2" />
                Recommencer
              </Button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Quiz en cours | Quiz Pompier</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-slate-400">Score</p>
                <p className="text-xl font-bold text-red-500">{score} pts</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Questions</p>
                <p className="text-xl font-bold">
                  {questionCount}
                  {mode === 'test' && '/100'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {currentQuestion && (
                <Button onClick={openReport} variant="outline" size="sm">
                  <Flag className="w-4 h-4 mr-2" />
                  Signaler une erreur
                </Button>
              )}
              <Button onClick={resetQuiz} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Réinitialiser
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {currentQuestion && (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-8"
              >
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm font-semibold mb-4">
                    {currentQuestion.theme}
                  </span>
                  <h2 className="text-2xl font-bold mb-2">{currentQuestion.question}</h2>
                </div>

                <div className="space-y-3 mb-6">
                  {currentQuestion.answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={answered}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        answered
                          ? index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-500/10'
                            : index === selectedAnswer
                            ? 'border-red-500 bg-red-500/10'
                            : 'border-slate-700 opacity-50'
                          : 'border-slate-700 hover:border-slate-600 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{answer}</span>
                        {answered && index === currentQuestion.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        )}
                        {answered &&
                          index === selectedAnswer &&
                          index !== currentQuestion.correctAnswer && (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                      </div>
                    </button>
                  ))}
                </div>

                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div
                      className={`p-4 rounded-lg border-2 ${
                        isCorrect
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-red-500 bg-red-500/10'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span className="font-semibold text-green-500">
                              Bonne réponse ! +{POINTS_MAP[currentQuestion.difficulty || 'medium'] || 2} pt{(POINTS_MAP[currentQuestion.difficulty || 'medium'] || 2) > 1 ? 's' : ''}
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-500" />
                            <span className="font-semibold text-red-500">Mauvaise réponse</span>
                          </>
                        )}
                      </div>
                      {currentQuestion.explanation && (
                        <p className="text-sm text-slate-300">{currentQuestion.explanation}</p>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={openResource} variant="outline" className="flex-1">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Voir la ressource
                      </Button>
                      <Button onClick={loadNextQuestion} className="flex-1 bg-red-500 hover:bg-red-600">
                        Question suivante
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Report Modal */}
      {reportOpen && currentQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-slate-900/70"
            onClick={() => setReportOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-lg mx-4 bg-slate-900 border border-slate-700 rounded-lg shadow-xl">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Signaler une erreur</h3>
              <button
                onClick={() => setReportOpen(false)}
                className="text-slate-300 hover:text-white"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>
            <form onSubmit={submitReport} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">ID de la question</label>
                <input
                  type="text"
                  value={currentQuestion.id}
                  readOnly
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Objet</label>
                <input
                  type="text"
                  value={reportSubject}
                  onChange={(e) => setReportSubject(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder={`Signalement - Question ${currentQuestion.id}`}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  value={reportMessage}
                  onChange={(e) => setReportMessage(e.target.value)}
                  rows={6}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  placeholder="Décrivez l'erreur (réponse attendue, ressource incorrecte, orthographe, etc.)"
                />
              </div>
              <div className="flex gap-3 pt-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setReportOpen(false)}>
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 disabled:opacity-60"
                  disabled={isSubmittingReport}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmittingReport ? 'Envoi…' : 'Envoyer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;