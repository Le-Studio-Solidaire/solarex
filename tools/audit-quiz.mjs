/**
 * audit-quiz.mjs
 * Enrichit quizData.js :
 *   - tags compétences
 *   - difficulty (questions manquantes)
 *   - resourceUrl (remplace '#' par lien Drive)
 *   - explanations manquantes
 *   - correctifs distracteurs / erreurs médicales
 *
 * Usage : node tools/audit-quiz.mjs
 */

import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const _require   = createRequire(import.meta.url);

const INPUT = path.resolve(__dirname, '../src/data/quizData.js');
const TMP   = path.resolve(__dirname, '../src/data/_tmp_quiz_audit.cjs');

// ─── Ressources SSUAP (depuis Resources.jsx) ──────────────────────────────────
const GDO_SSUAP   = 'https://drive.google.com/file/d/1SYuZeHmFISVXNloYdhlMlRs08OgiLznz/view?usp=drive_link';
const PSE_RECO    = 'https://drive.google.com/file/d/1hkJmSOvHBLNjiIK4JR9Fw8jVQKFL3zHs/view?usp=drive_link';
const BRULURES    = 'https://drive.google.com/file/d/19zqlzpLxhYOFTpeSS_QZa5CBTTGOyIg6/view?usp=drive_link';
const INFARCTUS   = 'https://drive.google.com/file/d/1Dzb7L8sJL0_GgzxjwkFEaRPBRFsqILwC/view?usp=drive_link';
const SECTION_MBR = 'https://drive.google.com/file/d/1EIV0QJpNETUHZe2lHEbnIvWMBbSF3I8H/view?usp=drive_link';
const TRAUMA_CRAN = 'https://drive.google.com/file/d/1mIG7kd3alt-6eGw7HqoRTYoxnf5Acwms/view?usp=drive_link';
const FOUDRE      = 'https://drive.google.com/file/d/1eMMLaQUtOcOU227a8Ab-RqaQSBiiyoGl/view?usp=drive_link';
const OPIACEES    = 'https://drive.google.com/file/d/1mHXIl414zYmeDpZQnkdL7_qvL5BookmU/view?usp=drive_link';
const MORSURES    = 'https://drive.google.com/file/d/1vVCdHrSaYC9GrMnsW_1HZ1yRvndeMLe9/view?usp=drive_link';
const HEMO_EXT    = 'https://drive.google.com/file/d/1DNygKcF7qhBRwEvrEavqK0A8C85er5BW/view?usp=drive_link';
const HEMO_EXTIOR = 'https://drive.google.com/file/d/1Dl7lFAuhU_1mZ2gNXemWLZTna5QSqIee/view?usp=drive_link';
const O2THERAPY   = 'https://drive.google.com/file/d/1Np9KdyXMM8nFhwh9tPpEG8HvecI_TU4G/view?usp=drive_link';
const PLONGEE     = 'https://drive.google.com/file/d/1cWZX-sdJkyHfbHt0Cm7SSqBRf0VvZKJP/view?usp=drive_link';
const ANAPHYLAXIE = 'https://drive.google.com/file/d/1bGMtkrM0KNxg-ewTMq7NbZgJAz00Cjw7/view?usp=drive_link';
const TRAUMA_DOS  = 'https://drive.google.com/file/d/1_fO9bOwyhX8DKTzN-wViiFy9TW0rLlh-/view?usp=drive_link';
const HYPOGLYC    = 'https://drive.google.com/file/d/1byZiD4mwXoWREzZH-qKWbopQ0RJ4mboJ/view?usp=drive_link';
const BILAN_XABCDE= 'https://drive.google.com/file/d/15itvACbviZOAEmAWB61e6HyVn42WMNlB/view?usp=drive_link';
const NOVI        = 'https://drive.google.com/file/d/12NrHXhkYwUONpf2tm7I_-6pda2fLgiLj/view?usp=drive_link';
const ASTHME      = 'https://drive.google.com/file/d/1I02vfFoWlttZnM5aIxfAw4gFZ6GxF1zM/view?usp=drive_link';
const AVC_MEMO    = 'https://drive.google.com/file/d/13N7SDgIjKxvv7aINj-rh_jQhi2qt1ccu/view?usp=drive_link';
const PIO_FORET   = 'https://drive.google.com/file/d/1ZNW8gZmcaiejuoZOEEUQ-yfuWe7NeW3H/view?usp=drive_link';

// ─── Tags ─────────────────────────────────────────────────────────────────────
function getTags(id) {
  if (id >=   1 && id <=   5) return ['juridique'];
  if (id >=   6 && id <=  10) return ['prévention', 'conscience'];
  if (id >=  11 && id <=  14) return ['conscience', 'relationnel'];
  if (id >=  15 && id <=  26) return ['bilan', 'organisation'];
  if (id >=  27 && id <=  32) return ['technique', 'sécurité'];
  if (id >=  33 && id <=  40) return ['conscience', 'psychotrauma'];
  if (id >=  41 && id <=  58) return ['relationnel', 'conscience'];
  if (id >=  59 && id <=  80) return ['conscience', 'psychotrauma'];
  if (id >=  81 && id <=  93) return ['conscience', 'technique'];
  if (id >=  94 && id <= 101) return ['bilan'];
  if (id >= 102 && id <= 129) return ['bilan', 'technique'];
  if (id >= 130 && id <= 145) return ['technique', 'bilan'];
  if (id >= 146 && id <= 200) return ['physiologie', 'matériel', 'bilan'];
  if (id >= 201 && id <= 209) return ['matériel', 'technique'];
  if (id >= 210 && id <= 239) return ['hygiène', 'sécurité'];
  if (id >= 240 && id <= 263) return ['technique', 'cardio'];
  if (id >= 264 && id <= 275) return ['physiologie', 'bilan'];
  if (id >= 276 && id <= 315) return ['technique', 'urgence'];
  if (id >= 316 && id <= 350) return ['technique'];
  if (id >= 351 && id <= 373) return ['technique', 'organisation'];
  if (id >= 374 && id <= 404) return ['glossaire'];
  return ['technique'];
}

// ─── Difficulty ───────────────────────────────────────────────────────────────
function getDefaultDifficulty(id) {
  if (id >= 374)                return 'easy';
  if (id >= 102 && id <= 120)   return 'medium';
  if (id >= 121 && id <= 145)   return 'easy';
  if (id >= 146 && id <= 239)   return 'medium';
  if (id >= 240 && id <= 263)   return 'easy';
  if (id >= 264 && id <= 373)   return 'medium';
  return 'medium';
}

// ─── ResourceUrl SSUAP (par thème) ────────────────────────────────────────────
// Toujours réassigner avec la fiche mémo SSUAP correspondante
function resolveResourceUrl(id) {
  // Q1-10 : juridique → GDO-SSUAP
  if (id >=   1 && id <=  10) return GDO_SSUAP;
  // Q11-101 : relationnel / conscience / bilan général → Recommandations PSE
  if (id >=  11 && id <= 101) return PSE_RECO;
  // Q102-129 : bilan → Bilan XABCDE
  if (id >= 102 && id <= 129) return BILAN_XABCDE;
  // Q130-145 : retournement / rachis → Traumatismes dos et cou
  if (id >= 130 && id <= 145) return TRAUMA_DOS;
  // Q146-163 : FR, FC, glycémie → GDO-SSUAP / Bilan
  if (id >= 146 && id <= 155) return BILAN_XABCDE;
  if (id >= 156 && id <= 163) return HYPOGLYC;
  // Q164-170 : PA → GDO-SSUAP
  if (id >= 164 && id <= 170) return GDO_SSUAP;
  // Q171-178 : SpO2 → Oxygénothérapie
  if (id >= 171 && id <= 178) return O2THERAPY;
  // Q179-200 : température, neurologie, douleur → Bilan XABCDE
  if (id >= 179 && id <= 200) return BILAN_XABCDE;
  // Q201-209 : ECG → GDO-SSUAP
  if (id >= 201 && id <= 209) return GDO_SSUAP;
  // Q210-239 : hygiène / sécurité → Recommandations PSE
  if (id >= 210 && id <= 239) return PSE_RECO;
  // Q240-263 : arrêt cardiaque / RCP → Infarctus du myocarde
  if (id >= 240 && id <= 263) return INFARCTUS;
  // Q264-275 : détresse vitale → GDO-SSUAP
  if (id >= 264 && id <= 275) return GDO_SSUAP;
  // Q276-277 : hémorragie externe
  if (id >= 276 && id <= 277) return HEMO_EXT;
  // Q278-284 : OVA / perte de connaissance → PSE
  if (id >= 278 && id <= 284) return PSE_RECO;
  // Q285-288 : section de membre
  if (id >= 285 && id <= 288) return SECTION_MBR;
  // Q289-304 : techniques (aspiration, garrot, compressions) → GDO-SSUAP
  if (id >= 289 && id <= 304) return GDO_SSUAP;
  // Q305-313 : PLS / traumatismes → Traumatismes dos et cou
  if (id >= 305 && id <= 313) return TRAUMA_DOS;
  // Q314-319 : AVC
  if (id >= 314 && id <= 319) return AVC_MEMO;
  // Q320-328 : convulsions / traumatisme crânien
  if (id >= 320 && id <= 328) return TRAUMA_CRAN;
  // Q329-334 : crise d'asthme
  if (id >= 329 && id <= 334) return ASTHME;
  // Q335 : SCA / Infarctus
  if (id === 335) return INFARCTUS;
  // Q336 : hypoglycémie
  if (id === 336) return HYPOGLYC;
  // Q337-341 : anaphylaxie
  if (id >= 337 && id <= 341) return ANAPHYLAXIE;
  // Q342-348 : accidents électriques → GDO-SSUAP (pas de fiche mémo dédiée)
  if (id >= 342 && id <= 348) return GDO_SSUAP;
  // Q349 : plongée
  if (id === 349) return PLONGEE;
  // Q350-358 : accouchement inopiné → GDO-SSUAP
  if (id >= 350 && id <= 358) return GDO_SSUAP;
  // Q359-361 : chaleur / compression → GDO-SSUAP
  if (id >= 359 && id <= 361) return GDO_SSUAP;
  // Q362-363 : brûlures
  if (id >= 362 && id <= 363) return BRULURES;
  // Q364-365 : plaies → GDO-SSUAP
  if (id >= 364 && id <= 365) return GDO_SSUAP;
  // Q366-373 : NOVI / SMV
  if (id >= 366 && id <= 373) return NOVI;
  // Q374-404 : glossaire → GDO-SSUAP
  if (id >= 374 && id <= 404) return GDO_SSUAP;
  return GDO_SSUAP;
}

// ─── Correctifs ponctuels ─────────────────────────────────────────────────────
const patches = {
  2: {
    answers: [
      "L'article L721-1",
      "L'article L731-2",
      "L'article L722-5",
      "L'article L732-1",
    ],
    correctAnswer: 0,
    explanation: "L'article L721-1 du Code de la Sécurité Intérieure rappelle que la sécurité civile est l'affaire de tous.",
  },
  5: {
    answers: [
      'Le 3 juillet 2020',
      'Le 9 avril 2021',
      'Le 5 mars 2018',
      'Le 10 décembre 2019',
    ],
    correctAnswer: 0,
    explanation: "La loi n°2020-840 du 3 juillet 2020 crée le statut de citoyen sauveteur et lutte contre l'arrêt cardiaque.",
  },
  7: {
    answers: [
      'Pour réduire la sollicitation des secours et du système de santé',
      'Pour limiter les arrêts de travail liés aux accidents domestiques',
      'Pour diminuer le coût des hospitalisations et des rééducations',
      'Pour améliorer la réactivité des équipes de secours sur le terrain',
    ],
    correctAnswer: 0,
    explanation: "La prévention permet de limiter le nombre d'accidents domestiques et donc de réduire la sollicitation des secours.",
  },
  8: {
    answers: [
      "En prenant régulièrement contact avec les personnes isolées pour repérer un besoin d'aide",
      "En signalant tout déplacement inhabituel aux autorités locales",
      "En gérant soi-même la situation médicale sans contacter les professionnels",
      "En limitant les visites pour respecter l'autonomie de la personne",
    ],
    correctAnswer: 0,
    explanation: "Le maintien du lien social permet de repérer précocement des situations de fragilité ou d'isolement.",
  },
  10: {
    answers: [
      "Elle peut permettre de sauver des vies en agissant avant l'arrivée des secours",
      "Elle améliore la coordination entre les équipes de secours professionnelles",
      "Elle réduit le temps d'acheminement des moyens médicalisés",
      "Elle garantit une prise en charge médicale optimale dès les premières minutes",
    ],
    correctAnswer: 0,
    explanation: "Une intervention rapide par un témoin peut sauver une vie, notamment en cas d'arrêt cardiaque.",
  },
  169: {
    answers: [
      '120 mmHg de PA systolique et 80 mmHg de PA diastolique',
      '160 mmHg de PA systolique et 100 mmHg de PA diastolique',
      '90 mmHg de PA systolique et 60 mmHg de PA diastolique',
      '140 mmHg de PA systolique et 90 mmHg de PA diastolique',
    ],
    correctAnswer: 0,
    explanation: "La PA normale est d'environ 120/80 mmHg. Au-dessus de 140/90 : HTA. En dessous de 90 systolique : hypotension.",
  },
  183: {
    answers: [
      'Lors du bilan initial et de chaque réévaluation de la victime',
      'Uniquement lors de la surveillance, après le bilan initial',
      "Seulement en cas de suspicion d'AVC ou de traumatisme crânien",
      "À l'arrivée des renforts médicaux uniquement",
    ],
    correctAnswer: 0,
    explanation: "L'évaluation neurologique est intégrée dès le bilan initial et répétée lors de chaque surveillance.",
  },
  184: {
    answers: [
      "Pour identifier des altérations des fonctions vitales et détecter une aggravation",
      "Pour compléter uniquement le compte rendu administratif de l'intervention",
      "Pour orienter l'évacuation vers la structure hospitalière la plus proche",
      "Pour déterminer si une sédation médicalisée est nécessaire",
    ],
    correctAnswer: 0,
    explanation: "L'évaluation neurologique permet de repérer une altération de conscience ou un déficit moteur traduisant une urgence vitale.",
  },
  212: {
    answers: [
      "L'introduction dans l'organisme d'un antigène atténué ou inactivé pour stimuler une réponse immunitaire protectrice",
      "L'administration d'un agent infectieux vivant pour provoquer une immunité naturelle rapide",
      "L'injection d'anticorps synthétiques afin de remplacer le système immunitaire",
      "La prise orale d'un traitement préventif à base d'antiviraux ou d'antibiotiques",
    ],
    correctAnswer: 0,
    explanation: "La vaccination introduit un antigène pour déclencher la production d'anticorps protecteurs sans provoquer la maladie.",
  },
  228: {
    answers: [
      'Toute exposition percutanée ou contact sur une peau lésée ou muqueuse avec du sang ou un liquide biologique',
      'Tout contact avec une victime présentant des signes visibles d\'infection cutanée',
      'Tout contact prolongé avec une surface contaminée par des sécrétions',
      'Tout contact accidentel avec du matériel souillé sans effraction cutanée',
    ],
    correctAnswer: 0,
    explanation: "Un AEV concerne les expositions par piqûre, coupure, projection sur muqueuses ou peau lésée avec un liquide potentiellement infectieux.",
  },
  241: {
    answers: [
      'Le décès de la victime',
      'Des lésions cérébrales irréversibles uniquement',
      'Un état végétatif prolongé sans risque de décès',
      'Des séquelles cardiaques légères sans issue fatale',
    ],
    correctAnswer: 0,
    explanation: "Sans geste de secours, un arrêt cardiaque entraîne le décès en quelques minutes. Les lésions cérébrales irréversibles surviennent dès 3 à 5 minutes.",
  },
  242: {
    answers: [
      'Une victime inconsciente qui ne respire pas (ou de façon anormale)',
      'Une victime présentant une détresse respiratoire avec cyanose',
      'Une victime consciente mais avec un pouls absent',
      'Une victime présentant des contractions musculaires involontaires',
    ],
    correctAnswer: 0,
    explanation: "Les deux signes définissant l'arrêt cardiaque sont l'absence de réaction et l'absence ou le caractère anormal de la ventilation.",
  },
  265: {
    answers: [
      'Une déshydratation sévère ou une hypovolémie',
      'Un sepsis ou une infection généralisée',
      'Un infarctus du myocarde ou une embolie pulmonaire',
      'Une brûlure étendue avec pertes liquidiennes importantes',
    ],
    correctAnswer: 0,
    explanation: "La déshydratation est la cause la plus fréquente de détresse circulatoire. Sepsis, infarctus et embolie pulmonaire en sont d'autres causes graves.",
  },
  287: {
    answers: [
      "Les mêmes que celles d'une hémorragie externe grave",
      'Un risque de contamination bactérienne immédiate',
      'Une atteinte osseuse avec perte de substance permanente',
      'Une douleur intense localisée sans perte de sang significative',
    ],
    correctAnswer: 0,
    explanation: "Une section de membre génère les mêmes risques qu'une hémorragie externe grave : état de choc hémorragique pouvant entraîner le décès.",
  },
  341: {
    answers: [
      "Éliminer tout contact de la victime avec l'allergène si possible et si l'allergène est connu",
      "Retirer les vêtements portés lors de l'exposition à l'allergène",
      "Limiter les déplacements de la victime et desserrer ses vêtements",
      "Surveiller la victime et lui expliquer la situation pour limiter son stress",
    ],
    correctAnswer: 0,
    explanation: "La première action est de soustraire la victime à l'allergène pour stopper l'afflux d'antigènes.",
  },
  343: {
    answers: [
      "Électrisation : ensemble des lésions dues au passage du courant ; électrocution : électrisation mortelle",
      "Électrocution : ensemble des lésions dues au passage du courant ; électrisation : électrocution non mortelle",
      "Les deux termes sont synonymes dans les textes de la sécurité civile",
      "Électrisation : brûlures superficielles uniquement ; électrocution : arrêt cardiaque uniquement",
    ],
    correctAnswer: 0,
    explanation: "L'électrisation désigne toutes les lésions liées au courant électrique. L'électrocution est sa forme particulièrement grave entraînant la mort.",
  },
};

// ─── Explanations (Q102-404) ──────────────────────────────────────────────────
const explanations = {
  102: "Face à une hémorragie externe grave, la priorité est d'arrêter le saignement par compression directe ou, si nécessaire, par un garrot.",
  103: "En cas d'obstruction des voies aériennes, libérer ces voies assure la ventilation de la victime.",
  104: "L'absence de réaction associée à une ventilation absente ou anormale signe l'arrêt cardiaque. La RCP doit être débutée immédiatement.",
  105: "Chez une victime suspecte de traumatisme du rachis, la position doit être adaptée avec stabilisation manuelle du rachis cervical.",
  106: "Le 3ème regard évalue les trois fonctions vitales : respiratoire (FR, SpO2), circulatoire (FC, PA, TRC) et neurologique (conscience, Glasgow).",
  107: "Le principe fondamental du bilan est de traiter en priorité ce qui engage le pronostic vital immédiat.",
  108: "Toute détresse vitale identifiée impose la réalisation immédiate des gestes de premiers secours appropriés.",
  109: "Les témoins peuvent fournir des informations cruciales sur les circonstances et l'état initial de la victime.",
  110: "Le 4ème regard complète le bilan par l'interrogatoire, l'examen clinique et les paramètres physiologiques.",
  111: "En contexte traumatique, le mécanisme lésionnel (cinétique, hauteur de chute) permet d'anticiper les lésions possibles.",
  112: "L'atteinte circonstancielle impose d'identifier l'agent causal (thermique, chimique, électrique) et ses spécificités.",
  113: "L'histoire de la maladie distingue un symptôme nouveau d'une aggravation d'une pathologie existante.",
  114: "L'analyse des plaintes guide l'orientation : douleur, malaise, trouble neurologique ou sensoriel orientent vers des pathologies différentes.",
  115: "Les antécédents médicaux et les traitements en cours sont indispensables pour anticiper les complications.",
  116: "Les quatre paramètres du bilan hémodynamique minimum : FR, SpO2, FC, PA.",
  117: "Glasgow, EVA, FAST ou surface brûlée complètent l'évaluation initiale selon le contexte.",
  118: "Le secouriste ne diagnostique pas ; il transmet les données brutes au médecin régulateur.",
  119: "L'examen segmentaire recherche toute anomalie visuelle sur la peau ou les tissus sous-jacents.",
  120: "La surveillance débute dès le repérage de la victime. Tout changement dès le 2ème regard doit être noté.",
  121: "En présence d'une détresse vitale, les paramètres sont réévalués toutes les 5 minutes.",
  122: "Les appareils multiparamétriques mesurent simultanément FC, SpO2, PA et FR, limitant les interruptions du bilan.",
  123: "Tout changement clinique impose une réévaluation immédiate et une adaptation des gestes.",
  124: "La transmission assure la continuité des soins. Sans elle, les renforts recommencent de zéro.",
  125: "La transmission du bilan permet d'obtenir un avis médical, de définir l'orientation et de préparer la continuité des soins.",
  126: "Une transmission bien structurée évite les ambiguïtés et facilite la prise de décision médicale.",
  127: "En cas d'insuffisance de moyens, la demande de renfort doit être immédiate et documentée.",
  128: "La demande de renfort précise : nature de l'urgence, âge, sexe, localisation et gestes déjà réalisés.",
  129: "En absence de détresse vitale, le bilan complet oriente la filière de soins adaptée.",
  130: "Le retournement à deux est indiqué quand la victime est en décubitus ventral avec suspicion de traumatisme du rachis.",
  131: "Retourner la victime sur le dos libère les voies aériennes et permet les gestes d'urgence.",
  132: "Le retournement à deux est une manœuvre à mains nues ; aucun matériel n'est requis.",
  133: "Le secouriste 1 (à la tête) guide le mouvement pour protéger l'axe cervical pendant toute la rotation.",
  134: "Le secouriste 2 saisit l'épaule et la hanche et imprime le retournement selon les instructions du secouriste 1.",
  135: "L'objectif principal est de libérer les voies aériennes et de permettre l'accès aux gestes de secours.",
  136: "Le principal risque est l'aggravation d'une lésion cervicale. Le maintien de la tête est donc permanent.",
  137: "En l'absence de suspicion de traumatisme ou si un seul secouriste est présent, le retournement à un secouriste est autorisé.",
  138: "Quelle que soit la technique, le décubitus ventral impose le retournement pour accéder aux fonctions vitales.",
  139: "Comme pour le retournement à deux, aucun matériel spécifique n'est indispensable.",
  140: "L'évaluation de la ventilation est réalisée dès le début du bilan et répétée à chaque altération de conscience.",
  141: "Toute perturbation respiratoire peut évoluer vers l'hypoxie puis l'arrêt cardiaque. Détection précoce = survie.",
  142: "Un chronomètre permet de compter les mouvements ventilatoires. L'oxymètre mesure la saturation.",
  143: "Chez l'inconscient, ouvrir les voies (bascule de tête, élévation du menton) avant de rechercher la ventilation.",
  144: "Une ventilation normale est silencieuse, régulière, sans effort, avec une ampliation thoracique symétrique.",
  145: "La détresse respiratoire se traduit par une respiration bruyante, rapide ou douloureuse, avec cyanose ou SpO2 basse.",
  146: "La fréquence ventilatoire se mesure en comptant les mouvements thoraciques complets sur 60 secondes.",
  147: "FR normale adulte : 12-20/min. Au-delà de 25 ou en dessous de 10, c'est pathologique.",
  148: "La fonction circulatoire est évaluée lors du bilan initial et réévaluée régulièrement.",
  149: "Toute défaillance circulatoire non traitée peut conduire à l'arrêt cardiaque.",
  150: "Le bilan circulatoire requiert un chronomètre (FC), un tensiomètre (PA) et un oxymètre (SpO2 et perfusion).",
  151: "Le pouls radial ou carotidien est recherché avec deux ou trois doigts, jamais le pouce.",
  152: "Pouls régulier, peau sèche et chaude, muqueuses rosées, TRC < 2 s = circulation normale.",
  153: "La fréquence cardiaque se mesure en comptant les battements perçus sur le pouls pendant 60 secondes.",
  154: "TRC normal : < 2 secondes. Un TRC allongé traduit une mauvaise perfusion périphérique.",
  155: "La FC normale chez l'adulte au repos est de 60 à 100 battements par minute.",
  156: "La glycémie capillaire est indiquée devant tout malaise, altération de conscience, suspicion d'AVC ou de crise convulsive.",
  157: "Glycémie < 60 mg/dl (3,3 mmol/L) = hypoglycémie imposant une prise en charge urgente.",
  158: "Matériel minimal pour glycémie capillaire : lecteur, bandelettes calibrées, autopiqueur.",
  159: "Installer la victime, expliquer le geste ; un doigt propre et sec améliore la fiabilité du résultat.",
  160: "L'autopiqueur est positionné sur la face latérale d'un doigt (moins douloureux) et déclenché d'un mouvement.",
  161: "Le principal risque d'une piqûre accidentelle est la transmission d'agent infectieux (VIH, VHB, VHC).",
  162: "En cas de dysfonctionnement, se référer à la notice. Ne pas improviser une réparation sur le terrain.",
  163: "Les bandelettes périmées ne sont pas des DASRI. Elles s'éliminent avec les ordures ménagères.",
  164: "La PA est mesurée lors du bilan et pendant la surveillance pour détecter un état de choc ou une HTA.",
  165: "PA systolique < 90 mmHg = état de choc. La mesure guide le médecin régulateur.",
  166: "Le tensiomètre (manuel ou automatique) est l'outil de référence pour la mesure de la pression artérielle.",
  167: "Tensiomètre manuel : nécessite stéthoscope + auscultation. Tensiomètre automatique : oscillométrie.",
  168: "Gonfler puis dégonfler lentement le brassard. Premier bruit de Korotkoff = systolique ; disparition = diastolique.",
  170: "En cas de doute sur la fiabilité de l'appareil, consulter la notice. Ne jamais ignorer un résultat suspect.",
  171: "L'oxymètre mesure la saturation de l'hémoglobine en O2 (SpO2) par spectrophotométrie.",
  172: "La SpO2 guide la décision d'administrer de l'oxygène et évalue l'efficacité de la ventilation.",
  173: "La mesure de SpO2 est indiquée en cas de détresse vitale, gêne respiratoire, malaise ou traumatisme.",
  174: "L'oxymètre comprend une unité centrale et un capteur (clip ou adhésif) placé sur un doigt ou lobe d'oreille.",
  175: "Le capteur doit être posé sur une peau propre, non vernie, avec un contact optimal pour une mesure fiable.",
  176: "SpO2 normale : 94-100 %. En dessous de 94 %, une supplémentation en oxygène est envisagée.",
  177: "En cas de mauvaise perfusion périphérique (vasoconstriction, froid), le signal peut être absent ou instable.",
  178: "Intoxication au CO : la SpO2 peut être faussement normale car le CO-Hb est mesuré comme de l'Oxy-Hb.",
  179: "La température est mesurée quand une hypo- ou hyperthermie est suspectée.",
  180: "La température oriente vers une pathologie thermique mais ne remplace pas les autres paramètres vitaux.",
  181: "Avant 3 mois, le conduit auditif externe du nourrisson est trop étroit pour le thermomètre auriculaire.",
  182: "Le choix de la voie de mesure dépend de l'âge. La voie rectale est la référence chez le tout-petit.",
  185: "EVDA, Glasgow et FAST permettent une évaluation rapide et communicable de la fonction neurologique.",
  186: "EVDA : Éveillé, réactif à la Voix, réactif à la Douleur, Aréactif — version simplifiée de l'échelle de conscience.",
  187: "Glasgow : ouverture des yeux + réponse verbale + réponse motrice. Score de 3 (coma profond) à 15 (normal).",
  188: "FAST : Face (sourire asymétrique ?), Arms (sustentation asymétrique ?), Speech (phrase déformée ?). Tout déficit = AVC suspecté.",
  189: "Pour rechercher une perte de connaissance : stimulation verbale + secousse douce des épaules.",
  190: "Fonction neurologique normale : réponses cohérentes, mouvements coordonnés, pupilles égales et réactives.",
  191: "La stimulation douloureuse par pression sur la base de l'ongle est la méthode recommandée car reproductible et non traumatique.",
  192: "La douleur est mesurée à la première évaluation et à chaque réévaluation pour suivre l'évolution.",
  193: "L'évaluation de la douleur guide la prise en charge et la transmission des informations au médecin régulateur.",
  194: "L'évaluation de la douleur repose sur des outils validés selon l'âge et les capacités de communication.",
  195: "EVS, EN, EVA, Échelle des visages et EVENDOL sont les outils principaux selon l'âge et le contexte.",
  196: "EVS : 0 (absente), 1 (légère), 2 (modérée), 3 (intense), 4 (maximale imaginable).",
  197: "EN : la victime note sa douleur de 0 (absente) à 10 (maximale imaginable).",
  198: "Une douleur cotée >= 4/10 sur l'EVA est significative et justifie une prise en charge.",
  199: "L'échelle des 6 visages (FPS-R) est adaptée aux enfants de 4 à 12 ans.",
  200: "EVENDOL : 5 critères comportementaux observables chez l'enfant < 7 ans en situation d'urgence.",
  201: "L'ECG n'est réalisé que sur prescription médicale ; le secouriste ne peut pas l'initier seul.",
  202: "L'ECG mesure l'activité électrique du coeur et permet de détecter troubles du rythme, blocs ou ischémie.",
  203: "Matériel ECG : enregistreur (avec télétransmission), câbles de dérivation, électrodes à usage unique.",
  204: "Victime en décubitus dorsal, thorax dénudé, au calme. Bonne préparation cutanée = meilleure qualité du tracé.",
  205: "Convention couleur électrodes périphériques : rouge = bras D, jaune = bras G, vert = jambe G, noir = jambe D.",
  206: "Les électrodes précordiales suivent une codification couleur : rouge pour V1 (C1), jaune pour V2 (C2), etc.",
  207: "Brancher les câbles, positionner les électrodes, déclencher l'enregistrement.",
  208: "Mauvaise qualité de tracé : vérifier le contact électrode-peau, les câbles et l'immobilité de la victime.",
  209: "Après chaque utilisation : désinfecter l'appareil et ses accessoires, recharger la batterie.",
  210: "Les gants à usage unique protègent contre la transmission d'agents infectieux par contact avec la victime.",
  211: "Pour les objets tranchants (verre, métal, aiguille), les gants épais de manutention protègent contre les coupures.",
  213: "Le dégagement d'urgence est réservé aux situations où un péril imminent, réel et non contrôlable menace la vie.",
  214: "Le dégagement d'urgence est réservé aux situations où un péril imminent, réel et non contrôlable menace la vie.",
  215: "L'approche prudente permet de repérer les dangers (trafic, gaz, électricité) avant d'atteindre la victime.",
  216: "La délimitation de la zone protège les intervenants et les témoins des dangers persistants.",
  217: "Précautions standard pour toutes les interventions ; précautions complémentaires selon le risque spécifique.",
  218: "Un câble au sol peut être sous tension. S'en tenir à distance et attendre les équipes spécialisées.",
  219: "Sécuriser la zone (feux de détresse, ralentissement) avant d'approcher les victimes.",
  220: "Face au CO : sortir les personnes, ne pas entrer, aérer. Le CO est incolore, inodore et mortel.",
  221: "Un tissu humide sur le visage réduit l'inhalation de fumées toxiques lors d'une évacuation pour incendie.",
  222: "Allonger pour étouffer les flammes par contact sol ; une couverture prive les flammes d'oxygène.",
  223: "Les gants épais de manutention évitent les piqûres accidentelles lors de la manipulation d'objets tranchants.",
  224: "En cas de fuite de gaz : évacuer sans allumer (risque d'explosion par étincelle).",
  225: "Le dégagement d'urgence : danger réel, vital, immédiat et non contrôlable autrement.",
  226: "Signes d'intoxication CO (maux de tête, nausées) peu spécifiques, souvent confondus avec une maladie virale.",
  227: "Triangle de présignalisation à 150-200 m en amont, sur la voie, pour prévenir les autres usagers.",
  229: "AEV : lavage abondant eau + savon, antisepsie, déclaration immédiate à l'autorité d'emploi.",
  230: "Rendre compte est obligatoire pour déclencher la prophylaxie post-exposition si nécessaire.",
  231: "Les pflugge (gouttelettes de Flügge) sont de fines particules salivaires expulsées lors de la parole, toux ou éternuements.",
  232: "Précautions complémentaires indiquées selon le risque : contact, gouttelettes ou air.",
  233: "Prévention AEV : vaccination, EPI adaptés, respect strict des précautions standard.",
  234: "Les DASRI doivent être éliminés dans des contenants rigides ou souples dédiés pour éviter la contamination.",
  235: "Nettoyage = élimination mécanique ; désinfection = élimination chimique des agents pathogènes résiduels.",
  236: "Infection = pénétration et multiplication d'un micro-organisme pathogène dans l'organisme.",
  237: "Transmission : par contact direct ou indirect, par gouttelettes, par voie aérienne ou autres voies spécifiques.",
  238: "Nettoyage-désinfection : entre chaque victime, quotidiennement avant la prise de service, après transport à risque.",
  239: "Le nettoyage puis la désinfection assurent la propreté microbiologique et préviennent la transmission croisée.",
  240: "L'arrêt cardiaque = cessation de l'activité mécanique efficace du coeur (fibrillation ou asystolie).",
  243: "La RCP maintient une circulation artificielle permettant d'oxygéner le cerveau et le coeur.",
  244: "Chez l'adulte, l'arrêt cardiaque est majoritairement d'origine cardiaque (FV) ; l'obstruction voies aériennes est une cause respiratoire.",
  245: "Chez l'enfant, l'arrêt cardiaque est le plus souvent secondaire à une hypoxie prolongée d'origine respiratoire.",
  246: "Rechercher les signes d'arrêt cardiaque (absence de réaction + absence de ventilation normale) ne doit pas dépasser 10 s.",
  247: "Absence de réaction à la stimulation + ventilation absente ou anormale = démarrer la RCP sans délai.",
  248: "Chez le nourrisson, le pouls fémoral (aine) ou brachial interne est plus accessible que le pouls carotidien.",
  249: "Chaîne de survie : reconnaissance précoce, alerte, RCP immédiate, défibrillation précoce, soins post-réanimation.",
  250: "Rechercher les signes vitaux (pouls + respiration) en moins de 10 secondes pour ne pas retarder la RCP.",
  251: "Signes annonciateurs : douleur thoracique constrictive, dyspnée, sueurs froides, malaise, palpitations.",
  252: "Chaque minute sans défibrillation réduit les chances de survie d'environ 10 %. Un choc dans les 3 premières minutes est optimal.",
  253: "Staying Alive, SAUV Life géolocalisent les sauveteurs et les DAE proches d'une victime en arrêt cardiaque.",
  254: "RCP (30 compressions / 2 insufflations) est la première action à réaliser, simultanément à l'alerte.",
  255: "Après chaque analyse du DAE (avec ou sans choc), reprendre immédiatement la RCP pendant 2 minutes.",
  256: "Le tiers présent appelle le 15/18/112 et localise un DAE pendant que le secouriste réalise la RCP.",
  257: "Si les insufflations sont impossibles, continuer les compressions thoraciques seules.",
  258: "Relayer toutes les 2 minutes pour maintenir la qualité et l'efficacité des compressions.",
  259: "Avant la RCP chez l'enfant/nourrisson, retirer tout corps étranger visible et accessible dans la bouche.",
  260: "Chez l'enfant comme chez l'adulte, reprendre la RCP immédiatement après le choc du DAE.",
  261: "Le tiers fait alerter les secours et localiser un DAE pendant que le secouriste réalise la RCP.",
  262: "Si les insufflations sont impossibles chez l'enfant, continuer les compressions seules.",
  263: "Relayer toutes les 2 minutes pour maintenir l'efficacité des compressions chez l'enfant.",
  264: "La détresse circulatoire = incapacité du système circulatoire à assurer l'apport en oxygène aux organes vitaux.",
  266: "Marbrures, pâleur, tachycardie, sueurs froides, TRC allongé = signes classiques de détresse circulatoire.",
  267: "La détresse neurologique = défaillance du SNC pouvant altérer les autres fonctions vitales.",
  268: "Hypoglycémie, AVC, traumatisme crânien, intoxication et infections cérébrales provoquent une détresse neurologique.",
  269: "Détresse respiratoire : obstruction voies aériennes, asthme, pneumonie, pneumothorax, noyade...",
  270: "La cyanose (lèvres et extrémités bleues) est un signe visible d'hypoxémie caractéristique.",
  271: "Position semi-assise ou assise = permet une mécanique ventilatoire optimale en cas de détresse respiratoire.",
  272: "Somnolence, anxiété, dyspnée, cyanose, sueurs = signes classiques chez un patient conscient en détresse respiratoire.",
  273: "Sifflements = bronchospasme ; gargouillements = sécrétions ; râles = oedème pulmonaire ou infection.",
  274: "FR > 25/min ou < 10/min + SpO2 < 94 % = détresse respiratoire confirmée.",
  275: "Corriger la cause, améliorer l'oxygénation, obtenir avis médical, surveiller l'évolution.",
  276: "Hémorragie externe grave = saignement abondant et visible ne s'arrêtant pas spontanément.",
  277: "Gants + compression directe manuelle sur la plaie = première étape de prise en charge.",
  278: "Obstruction voies aériennes = empêchement brutal du passage de l'air entre l'extérieur et les poumons.",
  279: "Obstruction partielle : la victime peut encore parler ou tousser. La toux active est plus efficace que toute manoeuvre.",
  280: "Obstruction totale : la victime ne peut plus parler, tousser ni respirer. Cyanose et perte de connaissance imminentes.",
  281: "En obstruction partielle, NE JAMAIS pratiquer de manoeuvres de désobstruction : risque d'aggravation.",
  282: "Obstruction totale, adulte conscient : 5 claques dans le dos, puis 5 compressions abdominales (Heimlich), en alternance.",
  283: "Si la victime perd connaissance : accompagner au sol et débuter la RCP en commençant par les compressions.",
  284: "Perte de connaissance = incapacité temporaire ou permanente à réagir à l'environnement.",
  285: "Section de membre = séparation totale ou partielle d'un membre par traumatisme (mécanisme, thermique ou explosif).",
  286: "Une section de membre est toujours d'origine traumatique.",
  288: "Arrêter l'hémorragie (compression ou garrot), pansement sur le moignon, conditionner le segment en froid sans contact direct.",
  289: "Aspiration des mucosités = indiquée quand les sécrétions encombrent les voies aériennes et compromettent la ventilation.",
  290: "Matériel : pompe à dépression, sonde d'aspiration adaptée, réceptacle, EPI.",
  291: "Durée maximale d'aspiration : 10 secondes pour éviter la désaturation en oxygène.",
  292: "Chez une victime consciente : risque de déclenchement d'un réflexe nauséeux ou de vomissement.",
  293: "Les compressions thoraciques sont indiquées dès qu'un arrêt cardiaque est confirmé.",
  294: "Les compressions créent une circulation artificielle acheminant de l'oxygène vers le cerveau et le coeur.",
  295: "Métronome (fréquence cible 100-120/min) + moniteur de profondeur (5-6 cm) = RCP de qualité optimale.",
  296: "Adulte : talon d'une main au centre du sternum, deux mains, bras tendus, 5-6 cm de profondeur, 100-120/min.",
  297: "Compressions mal effectuées : risque de fractures costales et de contusions pulmonaires ou spléniques.",
  298: "Claques dans le dos (5 frappes entre les omoplates) = première technique de désobstruction chez l'adulte conscient.",
  299: "Compressions abdominales (Heimlich) en alternance avec les claques si le CE n'est pas expulsé.",
  300: "Garrot indiqué si la compression directe est inefficace (hémorragie artérielle) ou impossible (amputation).",
  301: "Lien du garrot improvisé : au moins 1,50 m pour pouvoir effectuer plusieurs tours autour du membre.",
  302: "Garrot positionné entre la plaie et la racine du membre (le plus proximal possible), jamais sur une articulation.",
  303: "L'heure de pose du garrot est notée directement sur la peau ou le garrot pour alerter l'équipe médicale.",
  304: "Saignement persistant après garrot : resserrer et superposer un deuxième garrot au-dessus.",
  305: "DAE indiqué chez toute victime en arrêt cardiaque dès lors que l'appareil est disponible.",
  306: "DEA : délivre le choc de façon autonome. DSA : prévient l'opérateur, qui appuie sur le bouton pour le choc.",
  307: "PLS à deux = victime traumatisée inconsciente ventilant normalement, après avis médical.",
  308: "La PLS maintient les voies aériennes libres et permet l'écoulement des sécrétions ou des vomissements.",
  309: "Collier cervical avant la PLS chez le traumatisé ; coussin de tête pour stabiliser la position.",
  310: "Le secouriste 1 maintient la tête à deux mains pour protéger le rachis cervical pendant toute la rotation.",
  311: "Risque principal : aggraver une lésion traumatique sous-jacente (rachis, fractures) par mobilisation inadaptée.",
  312: "PLS = victime inconsciente qui ventile. Absence de ventilation → RCP prime sur la PLS.",
  313: "La PLS maintient les voies aériennes libres et permet l'écoulement gravitaire des liquides buccaux.",
  314: "AVC = déficit neurologique soudain d'origine vasculaire par interruption de la circulation cérébrale.",
  315: "AVC ischémique (obstruction artérielle / caillot) et AVC hémorragique (rupture vasculaire).",
  316: "AIT : régression complète des signes en < 24 h, sans lésion permanente visible à l'imagerie.",
  317: "FAST : Face (asymétrie), Arm (faiblesse), Speech (trouble du langage), Time (appeler les secours).",
  318: "Glycémie capillaire indispensable lors d'un AVC suspecté pour écarter une hypoglycémie qui simule les symptômes.",
  319: "AVC = urgence absolue. Chaque minute perdue aggrave les lésions. Le pronostic dépend de la rapidité d'intervention.",
  320: "Crise convulsive = décharge électrique synchrone et excessive dans les deux hémisphères cérébraux.",
  321: "Causes multiples : épilepsie, traumatisme crânien, hypoglycémie, intoxication, hyperthermie.",
  322: "Risques principaux : traumatismes lors de la phase tonico-clonique ; obstruction des voies aériennes en phase post-critique.",
  323: "Rôle du secouriste : protéger la victime des traumatismes et surveiller la perméabilité des voies aériennes.",
  324: "Chez le nourrisson, les convulsions fébriles se manifestent souvent par révulsion oculaire et hypotonie.",
  325: "Ne jamais contraindre les mouvements (fracture) ni introduire quoi que ce soit dans la bouche (morsure).",
  326: "Allonger la victime, éloigner les objets dangereux et les spectateurs pour sécuriser le périmètre.",
  327: "Protéger la tête avec un vêtement souple ; ne rien mettre dans la bouche ; ne pas contraindre.",
  328: "Après les convulsions : vérifier les voies aériennes, évaluer la ventilation, PLS si inconscient.",
  329: "Crise d'asthme = bronchoconstriction aiguë avec inflammation, produisant une dyspnée expiratoire sifflante.",
  330: "Déclencheurs : allergène, effort, infections virales, émotions intenses, fumée, variations climatiques.",
  331: "Lors d'une crise d'asthme : position assise, aide à la prise du traitement bronchodilatateur, appel du 15 si grave.",
  332: "Crise grave non traitée = épuisement respiratoire, désaturation profonde, puis arrêt cardiaque.",
  333: "Première action : soustraire la victime à l'agent déclenchant pour limiter le bronchospasme.",
  334: "Position assise/demi-assise = maximise le volume pulmonaire et réduit le travail respiratoire.",
  335: "Douleur thoracique : causes cardiaques (SCA), pulmonaires (embolie, pneumothorax) ou digestives (RGO).",
  336: "Hypoglycémie du diabétique : repas sauté, effort inhabituel, surdosage insuline ou sulfamides.",
  337: "Allergènes majeurs : arachide, lait de vache, crustacés, venins d'hyménoptères, certains médicaments.",
  338: "Choc anaphylactique au 2/3ème regard : dyspnée laryngée (stridor), bronchospasme, oedème de Quincke.",
  339: "Urticaire, douleurs abdominales, signes digestifs = signes identifiés lors du 4ème regard en anaphylaxie.",
  340: "Prise en charge anaphylaxie : soustraction à l'allergène, adrénaline (SAI), appel du 15.",
  342: "Contact avec deux conducteurs sous tension ou un conducteur et la terre = accident électrique certain.",
  344: "Le courant peut paralyser les centres respiratoires/cardiaques (inhibition) ou provoquer une FV (stimulation).",
  345: "Passage du courant : perte de connaissance, tétanie, brûlures internes, arrêt cardiaque.",
  346: "S'assurer de l'absence de tout contact avant d'approcher, même si la victime semble déconnectée.",
  347: "En contact avec une ligne électrique : rester dans le véhicule jusqu'à la coupure du courant par les spécialistes.",
  348: "Victimes de foudre : elles ne sont plus sous tension et peuvent être touchées immédiatement et sans danger.",
  349: "Remontée trop rapide en plongée = accidents barotraumatiques graves (embolie gazeuse, pneumothorax).",
  350: "Accouchement inopiné = accouchement survenant hors d'une structure de soin prévue à cet effet.",
  351: "Trois phases : travail (contractions régulières), expulsion (naissance), délivrance (placenta).",
  352: "Travail = contractions régulières et progressivement plus intenses, parfois avec perte des eaux.",
  353: "Accouchement inopiné fréquent chez les femmes dont la grossesse n'est pas suivie régulièrement.",
  354: "Le bilan initial évalue si l'accouchement est imminent (col effacé, envie de pousser, présentation visible).",
  355: "Si non imminent, décubitus latéral gauche pour éviter la compression de la veine cave.",
  356: "Si transport impossible : préparer le matériel disponible et guider la parturiente jusqu'aux secours.",
  357: "Serviettes ou linges propres et secs pour accueillir et sécher le nouveau-né après la naissance.",
  358: "Ne pas tirer sur le cordon. Laisser la délivrance se faire naturellement. Traction = risque d'inversion utérine.",
  359: "Coup de chaleur = hyperthermie > 40 °C + troubles neurologiques (confusion, coma), souvent avec anhidrose.",
  360: "Exposition prolongée à forte chaleur avec effort intense ou en milieu confiné = cause principale.",
  361: "Compression musculaire > 2 h = lésions cellulaires avec risque de rhabdomyolyse (myoglobine libérée).",
  362: "Brûlure simple (1er degré ou cloque < 1/2 paume) : refroidir 15 min eau courante, pas d'hospitalisation.",
  363: "Brûlure grave (profonde, étendue, siège particulier ou électrique/radiologique) = urgence médicale absolue.",
  364: "Plaie = toute lésion rompant l'intégrité cutanée, exposant les tissus au risque infectieux.",
  365: "Plaies traumatiques causées par agents mécaniques (couteau, chute, morsure, éclat, projectile).",
  366: "Situation à nombreuses victimes = accident dont le nombre et la gravité des victimes dépassent les ressources initiales.",
  367: "Accidents collectifs, catastrophes naturelles, actes terroristes = causes principales.",
  368: "Les victimes non blessées peuvent présenter un impact psychologique majeur nécessitant écoute et soutien.",
  369: "Le repérage rapide identifie les victimes nécessitant une intervention immédiate.",
  370: "Code couleur : rouge (urgence absolue), jaune (urgence relative), vert (valide), noir (décès/insauvable).",
  371: "Première étape : progresser de façon ordonnée, victime par victime, en commençant par la première rencontrée.",
  372: "Évaluation rapide : conscience, respiration, circulation et menaces vitales immédiates.",
  373: "Triage : présence de menaces vitales, réponse à la voix, importance des blessures visibles.",
  374: "AC = Arrêt Cardiaque : cessation totale de l'activité mécanique du coeur.",
  375: "ACT = Attelle Cervico-Thoracique : dispositif d'immobilisation rigide du rachis cervical et thoracique.",
  376: "AEV = Accident d'Exposition à un risque Viral : exposition percutanée ou mucqueuse à un agent infectieux.",
  377: "CO = Monoxyde de Carbone, gaz toxique incolore et inodore produit par la combustion incomplète.",
  378: "DAE = Défibrillateur Automatisé Externe, analyse le rythme cardiaque et délivre un choc électrique.",
  379: "DASRI = Déchets d'Activités de Soins à Risques Infectieux, éliminés via des filières spécialisées.",
  380: "DEA = Défibrillateur Entièrement Automatique : délivre le choc seul sans intervention de l'opérateur.",
  381: "DSA = Défibrillateur Semi-Automatique : analyse le rythme, l'opérateur appuie sur le bouton pour le choc.",
  382: "FC = Fréquence Cardiaque, nombre de battements par minute.",
  383: "FFP2 = Filtering Face Piece niveau 2 : masque filtrant contre les fines particules infectieuses.",
  384: "FR = Fréquence Respiratoire, nombre de cycles ventilatoires complets par minute.",
  385: "MID = Matelas Immobilisateur à Dépression, se moule autour du corps par aspiration d'air.",
  386: "PA = Pression Artérielle, pression exercée par le sang sur la paroi des artères.",
  387: "SpO2 = Saturation Pulsée en Oxygène mesurée par oxymétrie de pouls (normale : 94-100 %).",
  388: "RCP = Réanimation Cardio-Pulmonaire, compressions thoraciques et insufflations.",
  389: "TA = Tension Artérielle, terme courant désignant la Pression Artérielle mesurée au brassard.",
  390: "VHB = Virus de l'Hépatite B, transmission sanguine et sexuelle, hépatite aiguë ou chronique.",
  391: "VHC = Virus de l'Hépatite C, transmission sanguine, hépatite chronique possible avec cirrhose.",
  392: "VIH = Virus de l'Immunodéficience Humaine, responsable du SIDA.",
  393: "O2 = Dioxygène, 21 % de l'air ambiant. Son administration médicale est réglementée.",
  394: "CO2 = Dioxyde de Carbone, produit terminal de la respiration cellulaire, éliminé par expiration.",
  395: "OVA = Obstruction des Voies Aériennes, blocage du passage de l'air entre l'extérieur et les poumons.",
  396: "VA = Voies Aériennes, ensemble des conduits permettant le passage de l'air.",
  397: "PLS = Position Latérale de Sécurité, maintient les voies aériennes libres chez l'inconscient qui ventile.",
  398: "AVC = Accident Vasculaire Cérébral, interruption brutale de la circulation dans une zone cérébrale.",
  399: "CUMP = Cellule d'Urgence Médico-Psychologique, soutien psychologique lors de catastrophes.",
  400: "MIN = Mort Inattendue et Inexpliquée du Nourrisson, décès imprévu d'un nourrisson < 1 an.",
  401: "Hg = symbole chimique du Mercure, métal lourd utilisé dans les anciens tensiomètres (d'où mmHg).",
  402: "LVA = Libération des Voies Aériennes, manoeuvre pour dégager les voies aériennes supérieures.",
  403: "SAI = Seringue Auto-Injectable, dispositif pré-rempli pour auto-administration rapide (ex. adrénaline).",
  404: "DGSCGC = Direction Générale de la Sécurité Civile et de la Gestion des Crises.",
};

// ─── Lecture + chargement ─────────────────────────────────────────────────────
console.log('Lecture du fichier source...');
const raw = readFileSync(INPUT, 'utf8');
const cjsContent = raw
  .replace(/^export const quizData\s*=\s*/, 'module.exports = ')
  .replace(/;\s*$/, ';');
writeFileSync(TMP, cjsContent, 'utf8');

let questions;
try {
  questions = _require(TMP);
} finally {
  try { unlinkSync(TMP); } catch { /* ignore */ }
}

if (!Array.isArray(questions)) throw new Error('quizData n\'est pas un tableau');
console.log(`${questions.length} questions chargees.`);

// ─── Transformations ──────────────────────────────────────────────────────────
for (const q of questions) {
  q.tags        = getTags(q.id);
  if (!q.difficulty)  q.difficulty  = getDefaultDifficulty(q.id);
  q.resourceUrl = resolveResourceUrl(q.id); // always use SSUAP-specific link
  if ((!q.explanation || q.explanation === '') && explanations[q.id]) {
    q.explanation = explanations[q.id];
  }
  if (patches[q.id]) Object.assign(q, patches[q.id]);
}

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

const output = ['export const quizData = [', ...questions.map(serializeQ), '];', ''].join('\n');
writeFileSync(INPUT, output, 'utf8');
console.log(`\nFichier ecrit : ${INPUT}`);
console.log(`${questions.length} questions -- tags OK  difficulty OK  explanations OK  resourceUrl OK`);
