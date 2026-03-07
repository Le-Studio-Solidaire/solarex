import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Send } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.consent) {
      toast({
        title: 'Consentement requis',
        description: 'Veuillez accepter la politique de confidentialité.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      consent: formData.consent ? 'true' : 'false',
      _subject: `Contact site — ${formData.name || 'Anonyme'}`,
    };

    fetch('https://formspree.io/f/manrbdzr', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (res.ok) {
          toast({
            title: 'Message envoyé ✅',
            description: 'Merci pour votre message, nous revenons vers vous rapidement.',
          });
          setFormData({ name: '', email: '', message: '', consent: false });
        } else {
          let errText = 'Une erreur est survenue. Réessayez plus tard.';
          try {
            const data = await res.json();
            if (data?.errors?.length) {
              errText = data.errors.map((e) => e.message).join(' ');
            }
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
      .finally(() => setIsSubmitting(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Contact | SOLAREX SP</title>
        <meta
          name="description"
          content="Contactez l'équipe SOLAREX SP pour vos questions, suggestions ou signalements. Formulaire de contact sécurisé."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nous Contacter</h1>
            <p className="text-xl text-slate-300">
              Une question, une suggestion ou un signalement ? Écrivez-nous !
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <Mail className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-slate-300 text-sm">direction@lestudiosolidaire.fr</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <Send className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="font-semibold mb-2">Réponse rapide</h3>
              <p className="text-slate-300 text-sm">Nous répondons sous 48h ouvrées</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
            <div>
              <Label htmlFor="name" className="block text-sm font-semibold mb-2">
                Nom complet *
              </Label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Jean Dupont"
              />
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email *
              </Label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="jean.dupont@example.com"
              />
            </div>

            <div>
              <Label htmlFor="message" className="block text-sm font-semibold mb-2">
                Message *
              </Label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                placeholder="Votre message..."
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, consent: checked }))}
              />
              <Label htmlFor="consent" className="text-sm text-slate-300 cursor-pointer">
                J'accepte que mes données soient utilisées pour répondre à ma demande conformément à la{' '}
                <a href="/legal" className="text-red-500 hover:underline">
                  politique de confidentialité
                </a>
                . *
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-60"
              size="lg"
              disabled={isSubmitting}
            >
              <Send className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Envoi…' : 'Envoyer le message'}
            </Button>

            <p className="text-sm text-slate-400 text-center">
              * Champs obligatoires
            </p>
          </form>

          <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Vous pouvez nous contacter pour :</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Signaler une erreur dans une question</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Proposer de nouvelles questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Suggérer des améliorations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Poser une question technique</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Demander des informations sur le projet</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;