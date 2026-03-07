/**
 * append-questions.mjs
 * Ajoute les nouvelles questions (IDs 405-458) au fichier quizData.js
 * Identifie le thème parmi :
 *   DOCTRINE | Incendie | SSUAP | Secours Routier |
 *   Opérations Diverses | Gestion Opérationnelle | Matériel & Équipements
 *
 * Usage : node tools/append-questions.mjs
 */

import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const _require   = createRequire(import.meta.url);

const INPUT = path.resolve(__dirname, '../src/data/quizData.js');
const TMP   = path.resolve(__dirname, '../src/data/_tmp_append.cjs');

// ─── Ressources par thème (depuis Resources.jsx) ─────────────────────────────
const R = {
  DOCTRINE          : 'https://drive.google.com/file/d/11eQ5Gp88r0cDr5qMuTMCAwKVpirxgFXi/view?usp=drive_link',
  INCENDIE_GDO      : 'https://drive.google.com/file/d/1jCB3finjG0nadQBnG9TN7LemP2HC5drL/view?usp=drive_link',
  INCENDIE_MGO      : 'https://drive.google.com/file/d/17fkNAIIcv1e4osM7i2axXy1jgHFD5JVI/view?usp=drive_link',
  INCENDIE_FEU      : 'https://drive.google.com/file/d/1JpiYA-EU6xkxr41QWEB63JPMQ5A6z3aE/view?usp=drive_link',
  INCENDIE_BACKDRAFT: 'https://drive.google.com/file/d/1xbKoqj4O_XUuoECu3OzwKoAwZ7Tlmwrf/view?usp=drive_link',
  GDO_GAZ           : 'https://drive.google.com/file/d/1p3w1V_RMsR_137hJDbvEQ9tlel7MqQt7/view?usp=drive_link',
  GTO_EXTINCTION    : 'https://drive.google.com/file/d/1vBzRKYBMf0xFdIoOdTCcLfIw4BMcegu0/view?usp=drive_link',
  GTO_SAUVETAGE     : 'https://drive.google.com/file/d/1OOKlUIyZQrLmdivON8ANhm9FWWrbO7U8/view?usp=drive_link',
  GTO_ARI           : 'https://drive.google.com/file/d/1RTiIC-VLpt-kxlNSsni9db1cpCsYJV_2/view?usp=drive_link',
  GESTION_OPE       : 'https://drive.google.com/file/d/1ihpUKoQng9ko9fTqnxg8Kpf_N0Pkl7QO/view?usp=drive_link',
  SSUAP_GDO         : 'https://drive.google.com/file/d/1SYuZeHmFISVXNloYdhlMlRs08OgiLznz/view?usp=drive_link',
  SSUAP_BILAN       : 'https://drive.google.com/file/d/15itvACbviZOAEmAWB61e6HyVn42WMNlB/view?usp=drive_link',
  SSUAP_HEMO        : 'https://drive.google.com/file/d/1DNygKcF7qhBRwEvrEavqK0A8C85er5BW/view?usp=drive_link',
  SSUAP_PLS         : 'https://drive.google.com/file/d/1hkJmSOvHBLNjiIK4JR9Fw8jVQKFL3zHs/view?usp=drive_link',
  NONE              : '#',
};

// ─── Nouvelles questions ──────────────────────────────────────────────────────
const newQuestions = [
  // ── DOCTRINE ──────────────────────────────────────────────────────────────
  {
    id: 405,
    theme: 'DOCTRINE',
    difficulty: 'medium',
    tags: ['juridique', 'organisation'],
    question: "Parmi les personnalités citées, laquelle assiste de plein droit aux séances du Conseil d'administration du SDIS ?",
    answers: [
      "Le préfet",
      "Le directeur départemental des services d'incendie et de secours",
      "Le président de l'union départementale des sapeurs-pompiers",
      "Le président du conseil régional",
    ],
    correctAnswer: 0,
    explanation: "Le préfet de département assiste de plein droit aux séances du conseil d'administration du SDIS, conformément au CGCT.",
    resourceUrl: R.DOCTRINE,
  },
  {
    id: 406,
    theme: 'DOCTRINE',
    difficulty: 'easy',
    tags: ['juridique'],
    question: "Le fait de ne pas divulguer d'avis sur le service public relève de :",
    answers: [
      "L'obligation de réserve",
      "L'obligation de secret professionnel",
      "L'obligation de discrétion professionnelle",
      "L'obligation de neutralité",
    ],
    correctAnswer: 0,
    explanation: "L'obligation de réserve impose aux fonctionnaires une retenue dans l'expression de leurs opinions, notamment vis-à-vis du service public.",
    resourceUrl: R.DOCTRINE,
  },
  {
    id: 418,
    theme: 'DOCTRINE',
    difficulty: 'easy',
    tags: ['juridique'],
    question: "Que signifie l'appellation MOSC ?",
    answers: [
      "La loi de MOdernisation de la Sécurité Civile",
      "La Mission Opérationnelle de Sécurité Civile",
      "La Mise en Oeuvre de la réponse de la Sécurité Civile",
      "Le Manuel des Opérations de Sécurité et de Commandement",
    ],
    correctAnswer: 0,
    explanation: "La MOSC est la loi de Modernisation de la Sécurité Civile du 13 août 2004, cadre législatif de la sécurité civile française.",
    resourceUrl: R.DOCTRINE,
  },
  {
    id: 408,
    theme: 'DOCTRINE',
    difficulty: 'easy',
    tags: ['juridique', 'relationnel'],
    question: "Sur les lieux d'un incendie, un journaliste vous interpelle pour obtenir des informations sur les causes du sinistre. Que faites-vous ?",
    answers: [
      "Je le dirige vers le chef de groupe",
      "Je lui réponds en ma qualité d'équipier incendie",
      "Je lui donne uniquement les informations générales",
      "Je lui demande sa carte de presse avant de répondre",
    ],
    correctAnswer: 0,
    explanation: "Seul le responsable désigné (chef de groupe ou officier) est habilité à communiquer avec les médias. L'équipier doit diriger le journaliste vers lui.",
    resourceUrl: R.DOCTRINE,
  },
  {
    id: 425,
    theme: 'DOCTRINE',
    difficulty: 'easy',
    tags: ['juridique', 'organisation'],
    question: "Quel est l'objectif principal d'un GDO (Guide de Doctrine Opérationnelle) ?",
    answers: [
      "Donner un cadre commun d'intervention à l'échelle nationale",
      "Organiser les plannings de garde des SDIS",
      "Évaluer les performances individuelles des sapeurs-pompiers",
      "Gérer les stocks de matériel opérationnel",
    ],
    correctAnswer: 0,
    explanation: "Les GDO fixent un référentiel national de doctrine pour harmoniser les pratiques d'intervention entre les SDIS.",
    resourceUrl: R.DOCTRINE,
  },
  {
    id: 430,
    theme: 'DOCTRINE',
    difficulty: 'easy',
    tags: ['formation'],
    question: "Le grade qui suit immédiatement 'Caporal-chef' chez les sapeurs-pompiers professionnels est :",
    answers: [
      "Sergent",
      "Major",
      "Adjudant",
      "Lieutenant",
    ],
    correctAnswer: 0,
    explanation: "La hiérarchie des sous-officiers SPP est : Sergent → Sergent-chef → Adjudant → Adjudant-chef → Major.",
    resourceUrl: R.DOCTRINE,
  },
  {
    id: 438,
    theme: 'DOCTRINE',
    difficulty: 'easy',
    tags: ['formation'],
    question: "Quel est le premier grade d'encadrement chez les sous-officiers des sapeurs-pompiers ?",
    answers: [
      "Sergent",
      "Caporal-chef",
      "Major",
      "Lieutenant",
    ],
    correctAnswer: 0,
    explanation: "Le Sergent est le premier grade de sous-officier et donc le premier grade d'encadrement dans la hiérarchie des sapeurs-pompiers.",
    resourceUrl: R.DOCTRINE,
  },
  {
    id: 446,
    theme: 'DOCTRINE',
    difficulty: 'medium',
    tags: ['formation'],
    question: "Quel grade de sapeur-pompier porte deux galons rouges en chevron ?",
    answers: [
      "Sergent",
      "Caporal",
      "Adjudant",
      "Lieutenant",
    ],
    correctAnswer: 0,
    explanation: "Le Sergent porte deux galons rouges en chevron, symboles de son rang de premier sous-officier.",
    resourceUrl: R.DOCTRINE,
  },

  // ── INCENDIE ───────────────────────────────────────────────────────────────
  {
    id: 410,
    theme: 'Incendie',
    difficulty: 'medium',
    tags: ['technique', 'sécurité'],
    question: "Sont considérés comme des points d'eau incendie (PEI), les poteaux, bouches d'incendie normalisés ou :",
    answers: [
      "Un puisard d'aspiration",
      "Une réserve de 45 m3",
      "Une piscine privée de 100 m3",
      "Un réservoir d'essence",
    ],
    correctAnswer: 0,
    explanation: "Un puisard d'aspiration est un PEI naturel au même titre qu'un cours d'eau accessible. Les réservoirs d'essence ne sont pas des PEI.",
    resourceUrl: R.INCENDIE_GDO,
  },
  {
    id: 411,
    theme: 'Incendie',
    difficulty: 'medium',
    tags: ['technique', 'organisation'],
    question: "Qui peut requalifier une PGR (Préventive Gaz Reconnue) en PGC (Préventive Gaz Confirmée) ?",
    answers: [
      "Le commandant des opérations de secours",
      "Le représentant de l'opérateur de gaz",
      "Le directeur des opérations de secours",
      "L'équipier incendie",
    ],
    correctAnswer: 0,
    explanation: "La requalification PGR → PGC relève de la décision du COS, après confirmation d'une fuite réelle par les mesures ou l'opérateur.",
    resourceUrl: R.GDO_GAZ,
  },
  {
    id: 412,
    theme: 'Incendie',
    difficulty: 'medium',
    tags: ['technique', 'sécurité'],
    question: "La phase de refroidissement d'une bouteille d'acétylène exposée à la chaleur est d'une durée préconisée de :",
    answers: [
      "1 heure",
      "15 min",
      "30 min",
      "20 min",
    ],
    correctAnswer: 0,
    explanation: "Une bouteille d'acétylène chauffée doit être refroidie pendant au moins 1 heure à l'eau, et surveillée pendant 24 h après l'intervention.",
    resourceUrl: R.GDO_GAZ,
  },
  {
    id: 415,
    theme: 'Incendie',
    difficulty: 'medium',
    tags: ['technique'],
    question: "En théorie, le jet diffusé d'attaque doit avoir un cône d'ouverture maximale de :",
    answers: [
      "60°",
      "45°",
      "30°",
      "90°",
    ],
    correctAnswer: 0,
    explanation: "Le jet diffusé d'attaque s'ouvre jusqu'à 60°. Au-delà, on parle de jet en paravent (protection).",
    resourceUrl: R.GTO_EXTINCTION,
  },
  {
    id: 417,
    theme: 'Incendie',
    difficulty: 'medium',
    tags: ['technique', 'sécurité'],
    question: "Pour refroidir le contenant d'une citerne exposée à l'action des flammes, le jet d'une lance doit être dirigé :",
    answers: [
      "Au-dessus du niveau du liquide contenu dans la citerne",
      "Au milieu de la citerne",
      "En partie basse de la citerne",
      "Sur les flammes directement",
    ],
    correctAnswer: 0,
    explanation: "La partie de la citerne exposée aux flammes mais non touchée par le liquide (espace gazeux) est la plus dangereuse : c'est là qu'il faut refroidir.",
    resourceUrl: R.GTO_EXTINCTION,
  },
  {
    id: 422,
    theme: 'Incendie',
    difficulty: 'medium',
    tags: ['technique'],
    question: "Un point d'eau doit fournir au minimum :",
    answers: [
      "60 m3/h",
      "30 m3/h",
      "120 m3/h",
      "150 m3/h",
    ],
    correctAnswer: 0,
    explanation: "Selon la règlementation française, un PEI doit pouvoir fournir un débit minimum de 60 m3/h pendant 2 heures.",
    resourceUrl: R.INCENDIE_GDO,
  },
  {
    id: 423,
    theme: 'Incendie',
    difficulty: 'easy',
    tags: ['organisation', 'sécurité'],
    question: "Quelle est la première priorité d'un chef d'agrès en feu d'habitation ?",
    answers: [
      "Sauver les vies humaines",
      "Sauvegarder les biens",
      "Réduire l'impact environnemental",
      "Sécuriser les lieux après l'intervention",
    ],
    correctAnswer: 0,
    explanation: "La MGO Incendie place la vie humaine comme priorité absolue : Sauvetage / Mise en sécurité avant toute action d'extinction.",
    resourceUrl: R.INCENDIE_MGO,
  },
  {
    id: 428,
    theme: 'Incendie',
    difficulty: 'easy',
    tags: ['technique'],
    question: "Le triangle du feu est composé de :",
    answers: [
      "Comburant, combustible, énergie d'activation",
      "Air, fumée, chaleur",
      "Eau, mousse, poudre",
      "Gaz, liquide, solide",
    ],
    correctAnswer: 0,
    explanation: "Le triangle du feu représente les 3 conditions nécessaires à la combustion : un combustible, un comburant (O2) et une énergie d'activation.",
    resourceUrl: R.INCENDIE_FEU,
  },
  {
    id: 434,
    theme: 'Incendie',
    difficulty: 'easy',
    tags: ['technique', 'sécurité'],
    question: "En reconnaissance sous ARI, le binôme doit :",
    answers: [
      "Rester ensemble à tout moment",
      "Se séparer pour couvrir plus de surface",
      "Progresser en silence total",
      "S'appuyer systématiquement sur les murs",
    ],
    correctAnswer: 0,
    explanation: "Le binôme est indissociable sous ARI. Se séparer interdit le secours mutuel et constitue une faute grave.",
    resourceUrl: R.GTO_ARI,
  },
  {
    id: 437,
    theme: 'Incendie',
    difficulty: 'easy',
    tags: ['technique'],
    question: "La mousse est particulièrement efficace pour lutter contre :",
    answers: [
      "Les feux d'hydrocarbures liquides",
      "Les feux de bois",
      "Les feux de gaz",
      "Les feux d'origine électrique",
    ],
    correctAnswer: 0,
    explanation: "La mousse réalise un tapis isolant sur les liquides inflammables qui coupe l'apport d'O2 et empêche la vaporisation du combustible.",
    resourceUrl: R.GTO_EXTINCTION,
  },
  {
    id: 440,
    theme: 'Incendie',
    difficulty: 'easy',
    tags: ['technique'],
    question: "Le feu de classe B concerne :",
    answers: [
      "Les liquides inflammables",
      "Les gaz inflammables",
      "Les solides carbonés",
      "Les métaux combustibles",
    ],
    correctAnswer: 0,
    explanation: "Classe A : solides ; Classe B : liquides inflammables ; Classe C : gaz ; Classe D : métaux ; Classe F : graisses de cuisson.",
    resourceUrl: R.INCENDIE_FEU,
  },
  {
    id: 441,
    theme: 'Incendie',
    difficulty: 'medium',
    tags: ['technique'],
    question: "Le feu couvant se caractérise par :",
    answers: [
      "Une combustion lente, peu visible mais toxique",
      "Une flamme vive et bruyante",
      "Une explosion immédiate",
      "Une propagation rapide dans les gaines",
    ],
    correctAnswer: 0,
    explanation: "Le feu couvant est une combustion sans flamme, qui produit des gaz toxiques (CO notamment) et peut évoluer vers un backdraft lors d'une arrivée d'air.",
    resourceUrl: R.INCENDIE_GDO,
  },
  {
    id: 445,
    theme: 'Incendie',
    difficulty: 'medium',
    tags: ['technique', 'sécurité'],
    question: "Le backdraft peut survenir :",
    answers: [
      "Lors de l'ouverture d'un local saturé en gaz chauds sous-ventilé",
      "À l'extérieur uniquement",
      "À l'arrivée des secours uniquement",
      "Pendant la phase d'extinction uniquement",
    ],
    correctAnswer: 0,
    explanation: "Le backdraft est une explosion de gaz chauds et imbrûlés déclenchée par une admission soudaine d'air (ouverture de porte, brèche).",
    resourceUrl: R.INCENDIE_BACKDRAFT,
  },

  // ── SSUAP ──────────────────────────────────────────────────────────────────
  {
    id: 407,
    theme: 'SSUAP',
    difficulty: 'easy',
    tags: ['glossaire'],
    question: "Que signifie S.S.O. ?",
    answers: [
      "Soutien Sanitaire Opérationnel",
      "Service de Santé Opérationnel",
      "Soutien de Santé Opérationnel",
      "Système de Secours d'Urgence Opérationnelle",
    ],
    correctAnswer: 0,
    explanation: "Le SSO (Soutien Sanitaire Opérationnel) désigne le dispositif de soutien médical et paramédical mis en place pour les intervenants lors des opérations.",
    resourceUrl: R.SSUAP_GDO,
  },
  {
    id: 420,
    theme: 'SSUAP',
    difficulty: 'easy',
    tags: ['bilan', 'physiologie'],
    question: "Quelles sont les caractéristiques d'un pouls ?",
    answers: [
      "Fréquence, régularité, amplitude",
      "Intensité, puissance, localisation",
      "Importance, pression, origine",
      "Fémoral, radial, pédieux",
    ],
    correctAnswer: 0,
    explanation: "Le pouls se caractérise par sa fréquence (nombre de battements/min), sa régularité et son amplitude (force perçue sous les doigts).",
    resourceUrl: R.SSUAP_BILAN,
  },
  {
    id: 421,
    theme: 'SSUAP',
    difficulty: 'medium',
    tags: ['bilan', 'technique'],
    question: "Qu'est-ce que le « crush syndrome » ?",
    answers: [
      "Un syndrome d'écrasement",
      "Un syndrome de chute de grande hauteur",
      "Un syndrome d'accident de décompression de plongée",
      "Un syndrome de dépression",
    ],
    correctAnswer: 0,
    explanation: "Le crush syndrome résulte d'un écrasement musculaire prolongé : la libération massive de myoglobine entraîne une insuffisance rénale aiguë.",
    resourceUrl: R.SSUAP_GDO,
  },
  {
    id: 424,
    theme: 'SSUAP',
    difficulty: 'easy',
    tags: ['bilan', 'technique'],
    question: "Dans quelle position place-t-on une victime dans le VSAV en cas de douleurs abdominales ?",
    answers: [
      "Demi-assise",
      "En PLS",
      "Sur le dos, jambes étendues",
      "Jambes surélevées",
    ],
    correctAnswer: 0,
    explanation: "La position demi-assise réduit la tension des muscles abdominaux et diminue la douleur lors du transport.",
    resourceUrl: R.SSUAP_BILAN,
  },
  {
    id: 426,
    theme: 'SSUAP',
    difficulty: 'easy',
    tags: ['glossaire', 'bilan'],
    question: "Que signifie l'acronyme UA en secourisme ?",
    answers: [
      "Urgence absolue",
      "Urgence administrative",
      "Unité d'alerte",
      "Unité d'ambulance",
    ],
    correctAnswer: 0,
    explanation: "UA désigne une Urgence Absolue : victime en détresse vitale immédiate nécessitant un geste de secours urgent.",
    resourceUrl: R.SSUAP_GDO,
  },
  {
    id: 435,
    theme: 'SSUAP',
    difficulty: 'easy',
    tags: ['technique', 'urgence'],
    question: "En PSE2, quelle est la première action face à un saignement abondant ?",
    answers: [
      "Comprimer immédiatement la plaie",
      "Mettre la victime en PLS",
      "Retirer l'objet planté",
      "Appliquer un garrot systématiquement",
    ],
    correctAnswer: 0,
    explanation: "La compression directe et immédiate est le premier geste devant tout saignement abondant. Le garrot n'est indiqué qu'en cas d'échec.",
    resourceUrl: R.SSUAP_HEMO,
  },
  {
    id: 447,
    theme: 'SSUAP',
    difficulty: 'easy',
    tags: ['technique', 'bilan'],
    question: "Une victime inconsciente qui respire est mise en :",
    answers: [
      "Position latérale de sécurité (PLS)",
      "Position assise",
      "Décubitus dorsal",
      "Position déclive",
    ],
    correctAnswer: 0,
    explanation: "La PLS maintient les voies aériennes libres et facilite l'écoulement des sécrétions ou vomissements éventuels.",
    resourceUrl: R.SSUAP_PLS,
  },

  // ── Gestion Opérationnelle ─────────────────────────────────────────────────
  {
    id: 414,
    theme: 'Gestion Opérationnelle',
    difficulty: 'easy',
    tags: ['glossaire', 'organisation'],
    question: "Que signifie SINUS ?",
    answers: [
      "Système d'Information Numérique Standardisé",
      "Système Informatique de Numérotation Unifiée sur Sinistre",
      "Système Interservice de Numérotation Unifiée Spécifique",
      "Système Informatique Normalisé d'Urgence et de Secours",
    ],
    correctAnswer: 0,
    explanation: "SINUS est le Système d'Information NUmérique Standardisé utilisé pour la numérotation et le suivi des victimes lors des situations à nombreuses victimes.",
    resourceUrl: R.GESTION_OPE,
  },
  {
    id: 427,
    theme: 'Gestion Opérationnelle',
    difficulty: 'medium',
    tags: ['organisation'],
    question: "Qui est désigné par l'indicatif radio LANCELOT ?",
    answers: [
      "Le directeur départemental",
      "Le chef de centre",
      "Le médecin-chef du SDIS",
      "Le vétérinaire du SDIS",
    ],
    correctAnswer: 0,
    explanation: "Dans le plan de numérotation radio SDIS, LANCELOT désigne le directeur départemental des services d'incendie et de secours.",
    resourceUrl: R.GESTION_OPE,
  },
  {
    id: 443,
    theme: 'Gestion Opérationnelle',
    difficulty: 'medium',
    tags: ['organisation'],
    question: "Le rôle du chef de colonne est :",
    answers: [
      "Coordonner plusieurs engins sur une mission",
      "Piloter un engin lors des interventions",
      "Superviser la logistique du centre de secours",
      "Évaluer la conformité des EPI",
    ],
    correctAnswer: 0,
    explanation: "Le chef de colonne coordonne plusieurs groupes ou engins sur une même opération, sous les ordres du chef de site ou du DOS.",
    resourceUrl: R.GESTION_OPE,
  },

  // ── Matériel & Équipements ─────────────────────────────────────────────────
  {
    id: 409,
    theme: 'Matériel & Équipements',
    difficulty: 'hard',
    tags: ['matériel', 'technique'],
    question: "Vous avez besoin de 10 minutes sous ARI. Quelle est la pression minimale de la bouteille (consommation 90 l/min, volume bouteille 6 l) ?",
    answers: [
      "150 bars",
      "54 bars",
      "60 bars",
      "90 bars",
    ],
    correctAnswer: 0,
    explanation: "Volume nécessaire = 90 l/min × 10 min = 900 l. Pression minimale = 900 / 6 = 150 bars.",
    resourceUrl: R.GTO_ARI,
  },
  {
    id: 416,
    theme: 'Matériel & Équipements',
    difficulty: 'medium',
    tags: ['matériel', 'technique'],
    question: "L'hydro-éjecteur permet de :",
    answers: [
      "Épuiser un volume d'eau limité en sous-sol",
      "Réaliser un pompage sur une nappe d'eau",
      "Réalimenter un engin",
      "Ventiler un local enfumé",
    ],
    correctAnswer: 0,
    explanation: "L'hydro-éjecteur est un accessoire hydraulique qui utilise l'effet venturi pour aspirer et évacuer un volume d'eau limité, notamment en sous-sol.",
    resourceUrl: R.GTO_EXTINCTION,
  },
  {
    id: 419,
    theme: 'Matériel & Équipements',
    difficulty: 'medium',
    tags: ['matériel', 'technique'],
    question: "Vous devez ouvrir une porte au 2e étage sans EPA. Quelle type d'échelle utiliserez-vous ?",
    answers: [
      "À coulisse",
      "À crochets",
      "Plate",
      "Triple plans",
    ],
    correctAnswer: 0,
    explanation: "L'échelle à coulisse permet d'atteindre des hauteurs intermédiaires sans appui EPA grâce à son coulissage manuel.",
    resourceUrl: R.GTO_SAUVETAGE,
  },
  {
    id: 429,
    theme: 'Matériel & Équipements',
    difficulty: 'medium',
    tags: ['matériel', 'technique'],
    question: "Que signifie l'acronyme NELAR dans le contexte de l'engagement sous ARI ?",
    answers: [
      "Nombre, Engagement, Localisation, Air, Renfort",
      "Nombre, État, Localisation, Alerte, Risque",
      "Nom, Engin, Localisation, Air, Renfort",
      "Niveau, Escalier, Ligne, Appareil, Retour",
    ],
    correctAnswer: 0,
    explanation: "NELAR est le message de renseignement transmis avant l'engagement sous ARI : Nombre d'intervenants, Engagement prévu, Localisation, niveau d'Air, Renfort nécessaire.",
    resourceUrl: R.GTO_ARI,
  },
  {
    id: 431,
    theme: 'Matériel & Équipements',
    difficulty: 'medium',
    tags: ['matériel', 'technique'],
    question: "Le R.A.P.A.C.E est utilisé pour :",
    answers: [
      "Vérifier l'équipement du porteur ARI avant l'engagement",
      "Contrôler les points d'eau sur le secteur",
      "Régler les équipements radio avant l'intervention",
      "Planifier les relais hydrauliques",
    ],
    correctAnswer: 0,
    explanation: "RAPACE est la procédure de contrôle ARI : Régulateur, Alimentation en air, Pression, Avertisseur de fin d'air, Ceinture et équipement, Étanchéité.",
    resourceUrl: R.GTO_ARI,
  },
  {
    id: 432,
    theme: 'Matériel & Équipements',
    difficulty: 'easy',
    tags: ['matériel', 'technique'],
    question: "La lance à débit variable permet :",
    answers: [
      "D'adapter le débit et la forme du jet à la situation opérationnelle",
      "De modifier la température de l'eau projetée",
      "De réduire automatiquement les pertes de charge",
      "De créer de la mousse automatiquement",
    ],
    correctAnswer: 0,
    explanation: "La lance à débit variable (LDV) permet à l'opérateur de choisir le débit (l/min) et la forme du jet (plein, diffusé, brouillard) en temps réel.",
    resourceUrl: R.GTO_EXTINCTION,
  },
  {
    id: 433,
    theme: 'Matériel & Équipements',
    difficulty: 'medium',
    tags: ['matériel'],
    question: "Quelle est la pression normale de service d'un ARI de type air comprimé ?",
    answers: [
      "300 bars",
      "200 bars",
      "150 bars",
      "250 bars",
    ],
    correctAnswer: 0,
    explanation: "Les bouteilles d'air comprimé des ARI des sapeurs-pompiers sont à 300 bars (haute pression).",
    resourceUrl: R.GTO_ARI,
  },
  {
    id: 436,
    theme: 'Matériel & Équipements',
    difficulty: 'medium',
    tags: ['matériel', 'glossaire'],
    question: "Une LDV 500 signifie :",
    answers: [
      "Lance à Débit Variable de 500 l/min de débit maximum",
      "Lance de Défense Volumétrique",
      "Lance Dédiée aux Véhicules de 500 kg",
      "Lance Double Volume",
    ],
    correctAnswer: 0,
    explanation: "LDV 500 = Lance à Débit Variable dont le débit maximum est de 500 litres par minute.",
    resourceUrl: R.GTO_EXTINCTION,
  },
  {
    id: 444,
    theme: 'Matériel & Équipements',
    difficulty: 'medium',
    tags: ['matériel', 'technique'],
    question: "Une lance de 45 mm est alimentée en général par :",
    answers: [
      "Un tuyau de 45 mm",
      "Un tuyau de 70 mm",
      "Une colonne sèche",
      "Une division mobile",
    ],
    correctAnswer: 0,
    explanation: "La convention est d'alimenter une lance par un tuyau de même diamètre : la lance de 45 mm est raccordée sur un tuyau de 45 mm.",
    resourceUrl: R.GTO_EXTINCTION,
  },

  // ── Opérations Diverses ────────────────────────────────────────────────────
  {
    id: 413,
    theme: 'Opérations Diverses',
    difficulty: 'medium',
    tags: ['technique', 'sécurité'],
    question: "À quel type de danger renvoie le chiffre 5 sur un code de danger de transport (Kemler) ?",
    answers: [
      "Comburant ou peroxyde organique",
      "Liquide inflammable",
      "Toxique",
      "Très radioactif",
    ],
    correctAnswer: 0,
    explanation: "Code Kemler : 2=gaz, 3=liquide inflammable, 4=solide inflammable, 5=comburant/peroxyde, 6=toxique, 7=radioactif, 8=corrosif, 9=divers.",
    resourceUrl: R.NONE,
  },
  {
    id: 439,
    theme: 'Opérations Diverses',
    difficulty: 'medium',
    tags: ['sécurité', 'technique'],
    question: "Face à un produit chimique inconnu, le premier réflexe est :",
    answers: [
      "Reconnaissance sans contact et sécurisation de la zone",
      "Évacuer immédiatement la totalité de la population",
      "Ventiler la pièce contaminée",
      "Éteindre l'incendie avant toute autre action",
    ],
    correctAnswer: 0,
    explanation: "Face à un inconnu chimique : ne pas s'exposer, délimiter le périmètre, identifier via les étiquettes/plaques, demander renfort spécialisé.",
    resourceUrl: R.NONE,
  },
  {
    id: 442,
    theme: 'Opérations Diverses',
    difficulty: 'medium',
    tags: ['technique', 'sécurité'],
    question: "Que signifie le chiffre en haut d'une plaque orange TMD ?",
    answers: [
      "Le code de danger (Kemler)",
      "Le poids brut du chargement",
      "Le numéro du transporteur",
      "Le type de véhicule",
    ],
    correctAnswer: 0,
    explanation: "La plaque orange TMD comporte en haut le code de danger (Kemler) et en bas le numéro ONU identifiant la matière dangereuse.",
    resourceUrl: R.NONE,
  },
  {
    id: 448,
    theme: 'Opérations Diverses',
    difficulty: 'medium',
    tags: ['technique', 'sécurité'],
    question: "Le code ONU (NIP) dans le TMD sert à identifier :",
    answers: [
      "La matière dangereuse transportée",
      "L'entreprise de transport",
      "Le trajet effectué",
      "Le numéro de lot",
    ],
    correctAnswer: 0,
    explanation: "Le numéro ONU (ou NIP) est un code à 4 chiffres qui identifie de façon unique la matière dangereuse transportée selon le référentiel onusien.",
    resourceUrl: R.NONE,
  },
  {
    id: 449,
    theme: 'Opérations Diverses',
    difficulty: 'medium',
    tags: ['sécurité', 'technique'],
    question: "En cas de produit toxique inconnu, les intervenants doivent :",
    answers: [
      "Porter un ARI et limiter l'exposition au strict nécessaire",
      "Appeler la gendarmerie en premier lieu",
      "Se protéger avec un gilet fluorescent",
      "Décontaminer immédiatement à l'eau sans attendre",
    ],
    correctAnswer: 0,
    explanation: "L'ARI et le port d'équipements de protection adaptés sont obligatoires. La durée d'exposition doit être minimisée en attendant les équipes spécialisées.",
    resourceUrl: R.NONE,
  },

  // ── Culture générale / Actualité ───────────────────────────────────────────
  {
    id: 450,
    theme: 'Opérations Diverses',
    difficulty: 'easy',
    tags: ['conscience'],
    question: "Qui a remporté l'élection présidentielle américaine de novembre 2024 ?",
    answers: [
      "Donald Trump",
      "Joe Biden",
      "Kamala Harris",
      "Ron DeSantis",
    ],
    correctAnswer: 0,
    explanation: "Donald Trump a remporté l'élection présidentielle américaine du 5 novembre 2024 face à Kamala Harris.",
    resourceUrl: R.NONE,
  },
  {
    id: 451,
    theme: 'Opérations Diverses',
    difficulty: 'easy',
    tags: ['conscience'],
    question: "Quel pays a accueilli la COP16 sur la biodiversité en 2024 ?",
    answers: [
      "Colombie",
      "Brésil",
      "Indonésie",
      "Canada",
    ],
    correctAnswer: 0,
    explanation: "La COP16 sur la biodiversité (Convention de Rio) s'est tenue à Cali, en Colombie, en octobre 2024.",
    resourceUrl: R.NONE,
  },
  {
    id: 452,
    theme: 'Opérations Diverses',
    difficulty: 'easy',
    tags: ['conscience'],
    question: "Quel est le nom du roman pour lequel Julia Deck a reçu le prix Médicis en 2024 ?",
    answers: [
      "Ann d'Angleterre",
      "Tarentule",
      "Les Variations Goldberg",
      "La Carte postale",
    ],
    correctAnswer: 0,
    explanation: "Julia Deck a reçu le prix Médicis 2024 pour 'Ann d'Angleterre'.",
    resourceUrl: R.NONE,
  },
  {
    id: 453,
    theme: 'Opérations Diverses',
    difficulty: 'easy',
    tags: ['conscience'],
    question: "Quel pays a rejoint l'Union européenne en 2024 ?",
    answers: [
      "Aucun pays n'a adhéré à l'UE en 2024",
      "Albanie",
      "Serbie",
      "Macédoine du Nord",
    ],
    correctAnswer: 0,
    explanation: "Aucun pays n'a adhéré à l'Union européenne en 2024. Les pays candidats (Balkans, Ukraine, Moldavie) sont encore en phase de négociation.",
    resourceUrl: R.NONE,
  },
  {
    id: 454,
    theme: 'Opérations Diverses',
    difficulty: 'easy',
    tags: ['conscience'],
    question: "Quelle ville a accueilli le sommet de l'OTAN en juillet 2024 ?",
    answers: [
      "Washington D.C.",
      "Paris",
      "Madrid",
      "Vilnius",
    ],
    correctAnswer: 0,
    explanation: "Le sommet de l'OTAN s'est tenu à Washington D.C. en juillet 2024, pour les 75 ans de l'Alliance.",
    resourceUrl: R.NONE,
  },
  {
    id: 455,
    theme: 'Opérations Diverses',
    difficulty: 'easy',
    tags: ['conscience'],
    question: "Comment s'appelle la mission spatiale européenne dédiée à l'étude de Jupiter et de ses lunes glacées lancée en 2023 ?",
    answers: [
      "JUICE",
      "Galileo",
      "Cassini",
      "Artemis",
    ],
    correctAnswer: 0,
    explanation: "JUICE (Jupiter Icy Moons Explorer) a été lancée en avril 2023 par l'ESA pour explorer Jupiter et ses lunes Ganymède, Europe et Callisto.",
    resourceUrl: R.NONE,
  },
  {
    id: 456,
    theme: 'Opérations Diverses',
    difficulty: 'easy',
    tags: ['conscience'],
    question: "Quel pays a remporté la Coupe du Monde de rugby 2023 ?",
    answers: [
      "Afrique du Sud",
      "France",
      "Nouvelle-Zélande",
      "Angleterre",
    ],
    correctAnswer: 0,
    explanation: "L'Afrique du Sud a remporté la Coupe du Monde de rugby 2023 en France, en battant la Nouvelle-Zélande en finale.",
    resourceUrl: R.NONE,
  },
  {
    id: 457,
    theme: 'Opérations Diverses',
    difficulty: 'easy',
    tags: ['conscience'],
    question: "Quel accord commercial majeur a franchi une étape politique décisive entre l'UE et le Mercosur en décembre 2024 ?",
    answers: [
      "L'accord d'association UE-Mercosur",
      "L'Accord de Paris sur le climat",
      "Le Pacte vert européen",
      "Le Traité de Lisbonne",
    ],
    correctAnswer: 0,
    explanation: "L'accord d'association UE-Mercosur a été finalisé politiquement en décembre 2024 après 25 ans de négociations.",
    resourceUrl: R.NONE,
  },
  {
    id: 458,
    theme: 'Opérations Diverses',
    difficulty: 'easy',
    tags: ['conscience'],
    question: "Quel pays organise les Jeux Olympiques d'hiver de 2026 ?",
    answers: [
      "Italie",
      "Japon",
      "France",
      "Canada",
    ],
    correctAnswer: 0,
    explanation: "Les Jeux Olympiques d'hiver 2026 se tiennent à Milan-Cortina d'Ampezzo, en Italie.",
    resourceUrl: R.NONE,
  },
];

// ─── Sérialisation ────────────────────────────────────────────────────────────
function esc(s) {
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, '\\n');
}

function serializeQ(q) {
  const answersStr = q.answers.map(a => `    '${esc(a)}',`).join('\n');
  const tagsStr    = q.tags ? `  tags: [${q.tags.map(t => `'${esc(t)}'`).join(', ')}],\n` : '';
  return `  {
  id: ${q.id},
  theme: '${esc(q.theme)}',
  difficulty: '${esc(q.difficulty || 'medium')}',
${tagsStr}  question: '${esc(q.question)}',
  answers: [
${answersStr}
  ],
  correctAnswer: ${q.correctAnswer},
  explanation: '${esc(q.explanation || '')}',
  resourceUrl: '${esc(q.resourceUrl || '#')}',
  },`;
}

// ─── Lecture + chargement ─────────────────────────────────────────────────────
console.log('Lecture du fichier source...');
const raw = readFileSync(INPUT, 'utf8');
const cjsContent = raw
  .replace(/^export const quizData\s*=\s*/, 'module.exports = ')
  .replace(/;\s*$/, ';');
writeFileSync(TMP, cjsContent, 'utf8');

let existing;
try {
  existing = _require(TMP);
} finally {
  try { unlinkSync(TMP); } catch { /* ignore */ }
}

if (!Array.isArray(existing)) throw new Error('quizData n\'est pas un tableau');
console.log(`${existing.length} questions existantes.`);

// Vérification des doublons
const existingIds = new Set(existing.map(q => q.id));
const toAdd = newQuestions.filter(q => {
  if (existingIds.has(q.id)) {
    console.warn(`  ⚠ ID ${q.id} déjà présent, ignoré.`);
    return false;
  }
  return true;
});

const merged = [...existing, ...toAdd].sort((a, b) => a.id - b.id);

const output = ['export const quizData = [', ...merged.map(serializeQ), '];', ''].join('\n');
writeFileSync(INPUT, output, 'utf8');
console.log(`\nFichier écrit : ${INPUT}`);
console.log(`${existing.length} + ${toAdd.length} = ${merged.length} questions au total.`);
