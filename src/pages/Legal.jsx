import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Lock, Cookie, Database } from 'lucide-react';

const Legal = () => {
  return (
    <>
      <Helmet>
        <title>Mentions Légales & RGPD | Quiz Pompier</title>
        <meta
          name="description"
          content="Mentions légales, politique de confidentialité et informations RGPD de Quiz Pompier."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Mentions Légales & RGPD</h1>

          <div className="space-y-8">
            <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-4">
                <Shield className="w-8 h-8 text-red-500 shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Mentions Légales</h2>
                  
                  <div className="space-y-4 text-slate-300">
                    <div>
                      <h3 className="font-semibold text-white mb-2">Éditeur du site</h3>
                      <p>Quiz Pompier — Outil pédagogique non officiel</p>
                      <p>Email : contact@quizpompier.fr</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-2">Hébergement</h3>
                      <p>Ce site est hébergé par Hostinger</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-2">Propriété intellectuelle</h3>
                      <p>
                        Le contenu de ce site (questions, explications, structure) est protégé par le droit d'auteur. 
                        Les documents officiels (GDO, GTO, RETEX) restent la propriété de leurs auteurs respectifs.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-2">Responsabilité</h3>
                      <p>
                        Quiz Pompier est un outil pédagogique complémentaire. L'éditeur ne saurait être tenu responsable 
                        des erreurs ou omissions. Vérifiez toujours les informations avec vos documents officiels.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-4">
                <Lock className="w-8 h-8 text-red-500 shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Politique de Confidentialité (RGPD)</h2>
                  
                  <div className="space-y-4 text-slate-300">
                    <div>
                      <h3 className="font-semibold text-white mb-2">Responsable du traitement</h3>
                      <p>Quiz Pompier - contact@quizpompier.fr</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-2">Données collectées</h3>
                      <p className="mb-2">Nous collectons uniquement :</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Données de navigation anonymes (analytics, si consentement)</li>
                        <li>• Nom et email via le formulaire de contact (si utilisé)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-2">Stockage local</h3>
                      <p>
                        Votre score et vos préférences de quiz sont stockés localement sur votre appareil 
                        (localStorage). Ces données ne quittent jamais votre navigateur et ne sont pas transmises 
                        à nos serveurs.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-2">Finalité du traitement</h3>
                      <ul className="space-y-1 ml-4">
                        <li>• Analytics : améliorer l'expérience utilisateur</li>
                        <li>• Contact : répondre à vos demandes</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-2">Durée de conservation</h3>
                      <p>
                        Les données de contact sont conservées 3 ans maximum. Les données analytics sont anonymisées 
                        après 26 mois.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-2">Vos droits</h3>
                      <p className="mb-2">Conformément au RGPD, vous disposez des droits suivants :</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Droit d'accès à vos données</li>
                        <li>• Droit de rectification</li>
                        <li>• Droit à l'effacement</li>
                        <li>• Droit d'opposition</li>
                        <li>• Droit à la portabilité</li>
                      </ul>
                      <p className="mt-2">
                        Pour exercer ces droits, contactez-nous à : contact@quizpompier.fr
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-4">
                <Cookie className="w-8 h-8 text-red-500 shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Politique de Cookies</h2>
                  
                  <div className="space-y-4 text-slate-300">
                    <div>
                      <h3 className="font-semibold text-white mb-2">Cookies utilisés</h3>
                      <p className="mb-2">Nous utilisons uniquement :</p>
                      <ul className="space-y-2 ml-4">
                        <li>
                          <span className="font-semibold text-white">Cookies essentiels :</span> stockage local 
                          (localStorage) pour votre score et préférences. Pas de consentement requis.
                        </li>
                        <li>
                          <span className="font-semibold text-white">Cookies analytics :</span> mesure d'audience 
                          anonyme. Nécessite votre consentement.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-2">Gestion des cookies</h3>
                      <p>
                        Vous pouvez à tout moment modifier vos préférences de cookies en supprimant les données 
                        de votre navigateur ou en nous contactant.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-2">Cookies tiers</h3>
                      <p>
                        Nous n'utilisons aucun cookie publicitaire ou de tracking tiers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-4">
                <Database className="w-8 h-8 text-red-500 shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Sécurité des Données</h2>
                  
                  <div className="space-y-4 text-slate-300">
                    <p>
                      Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour 
                      protéger vos données personnelles contre la destruction, la perte, l'altération, la divulgation 
                      non autorisée ou l'accès non autorisé.
                    </p>
                    <p>
                      Le site utilise le protocole HTTPS pour sécuriser les échanges de données.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Contact & Réclamations</h2>
              <div className="space-y-3 text-slate-300">
                <p>
                  Pour toute question concernant vos données personnelles ou pour exercer vos droits :
                </p>
                <p className="font-semibold text-white">Email : contact@quizpompier.fr</p>
                <p>
                  Vous avez également le droit d'introduire une réclamation auprès de la CNIL 
                  (Commission Nationale de l'Informatique et des Libertés) si vous estimez que vos droits 
                  ne sont pas respectés.
                </p>
              </div>
            </section>

            <div className="text-center text-sm text-slate-400 pt-8">
              <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Legal;