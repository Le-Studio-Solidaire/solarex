import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ExternalLink, ChevronDown, FileText, Folder } from 'lucide-react';

const resourceData = [
  {
    category: 'Doctrine',
    icon: Folder,
    items: [
      { title: 'Vadémécum Doctrine à l\'usage des services d\'incendie et de secours', url: 'https://drive.google.com/file/d/11eQ5Gp88r0cDr5qMuTMCAwKVpirxgFXi/view?usp=drive_link' },
      { title: 'Note sur la doctrine - DGSCGC', url: 'https://drive.google.com/file/d/1L__YgOUbshOgp7ylMZ5Whzf0EeUWy9BY/view?usp=drive_link' },
    ],
  },
  {
    category: 'Gestion Opérationnelle et Commandement',
    icon: Folder,
    items: [
      {
        title: 'GDO Gestion Opérationnelle et Commandement', url :'https://drive.google.com/file/d/1ihpUKoQng9ko9fTqnxg8Kpf_N0Pkl7QO/view?usp=drive_link',
        isCollapsible: true,
        subItems: [
          { section: 'Chapitre 1 - Caractéristiques et particularités d\'une opération de secours', memos: [{ title: 'Fiche mémo - Caractéristiques d\'une opération de secours', url: 'https://drive.google.com/file/d/16q1kelM0c1rqgTaBRY-49Hh_bC9FaKjY/view?usp=drive_link' }] },
          { section: 'Chapitre 2 - Avant l\'opération', memos: [
              { title: 'Fiche mémo - La posture du chef', url: 'https://drive.google.com/file/d/166CyvXuoj6W-NWMo_9XeMDu9TqGwFGlp/view?usp=drive_link' },
              { title: 'Fiche mémo - Les documents structurant la réponse opérationnelle des SIS', url: 'https://drive.google.com/file/d/1kI_Rf-g0AlME4neGlgOF9CiavQJLlbtF/view?usp=drive_link' },
              { title: 'Fiche mémo - La réponse opérationnelle sur les territoires', url: 'https://drive.google.com/file/d/1n5CuM7bfkZb5_5L2wx6XOO6r4-0d7Ai0/view?usp=drive_link' },
              { title: 'Fiche mémo - La chaîne de direction opérationnelle des secours', url: 'https://drive.google.com/file/d/1tM1HBvWJ2Y0H4SAeV3KblTrSj0F4AqD1/view?usp=drive_link' },
              { title: 'Fiche mémo - La préparation opérationnelle', url: 'https://drive.google.com/file/d/1FLS03PLMXbTy573Yu23Rj8sD99XYAPfB/view?usp=drive_link' },
          ]},
          { section: 'Chapitre 3 - Pendant l\'opération', memos: [
              { title: 'Conduite des opérations et messages de commandement', url: 'https://drive.google.com/file/d/1eg_Brrl2u3Pgz_caxt8f-XAZqQ2-a8en/view?usp=drive_link' },
              { title: 'La Marge générale des opérations (MGO)', url: 'https://drive.google.com/file/d/1-Yvf-qbG-tl5gRdoUlR1KENSCiiHJ01W/view?usp=drive_link' },
              { title: 'La SITAC avec l\'appui des drônes et du croquis opérationnel', url: 'https://drive.google.com/file/d/128F9LbzwczO_QWAw_RE8SnXLHdv_CVBx/view?usp=drive_link' },
              { title: 'Les ordres de transmissions', url: 'https://drive.google.com/file/d/1CoOrCD2Bb4SdYcqTKRL2vB1qgk3hTe4G/view?usp=drive_link' },
              { title: 'Le travail d\'anticipation', url: 'https://drive.google.com/file/d/1AyVFvc_YL2Rjw_i1Tr6gBNre50gAUKI5/view?usp=drive_link' },
              { title: 'La remontée d\'informations', url: 'https://drive.google.com/file/d/1Bp8ItZ5vG-Eng8ZfN6eoPsQFJjdzJ_89/view?usp=drive_link' },
              { title: 'La prise en compte des médias sur intervention', url: 'https://drive.google.com/file/d/1CpP9NnAF0wrjpFqi83Db7Gz8nNVl5uxZ/view?usp=drive_link' },
              { title: 'Le cadre spatio-temporel d\'une opération de secours', url: 'https://drive.google.com/file/d/1tNgeGXSz3I6uosv0ZM1KOXYyL6oPlcel/view?usp=drive_link' },
              { title: 'La boucle de gestion de l\'activité décisionnelle du COS', url: 'https://drive.google.com/file/d/1dNdVYDRHb-jwktnIB-l8_wYES43-r13J/view?usp=drive_link' },
              { title: 'Commander en opération', url: 'https://drive.google.com/file/d/10-O72H0fWPqEllbRYMVVT53BZz1YVIeP/view?usp=drive_link' },
              { title: 'Les postes de commandement', url: 'https://drive.google.com/file/d/10-O72H0fWPqEllbRYMVVT53BZz1YVIeP/view?usp=drive_link' },
              { title: 'La sécurité et le soutien aux intervenants en opération', url: 'https://drive.google.com/file/d/1VMGPk-EB8Q_ezo4pwmxhaPlbXh7Eilen/view?usp=drive_link' },
              { title: 'Le gestion des désordres opérationnels', url: 'https://drive.google.com/file/d/1KY7lBE4jmUxOoh2FPWNIuzMLA89_0IIm/view?usp=drive_link' },
              { title: 'L\'usage des médias sociaux en situation d\'urgence (MSGU)', url: 'https://drive.google.com/file/d/1nwOkmWt2JBWD8ESXLE7bzdw1yC5gLGG9/view?usp=drive_link' },
          ]},
          { section: 'Chapitre 4 - Après l\'opération', memos: [
              { title: 'Réflexivité opérationnelle', url: 'https://drive.google.com/file/d/1IlLdvGBui5_iNZrXiC9R8dLMRXl0mDyI/view?usp=drive_link' },
              { title: 'Réhabilitation physique et psychologique du personnel - Rapport d\'intervention', url: 'https://drive.google.com/file/d/1AZJrXHqAkX8Mqa_Z2B27GjEvlpcATsxI/view?usp=drive_link' },
              { title: 'Le partage et le retour d\'expérience', url: 'https://drive.google.com/file/d/1ZnYsMbzR2oyq8sYBgVTSTg_3QWnlYDgA/view?usp=drive_link' },
          ]},
        ],
      },
    ],
  },
  {
    category: 'Risques et interventions particulières',
    icon: Folder,
    items: [
        { title: 'RISQUE GAZ ET EXPLOSIONS', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GDO - Interventions en présence de gaz - V1 Décembre 2021', description: 'Version 1 - Décembre 2021', url: 'https://drive.google.com/file/d/1p3w1V_RMsR_137hJDbvEQ9tlel7MqQt7/view?usp=drive_link'},
        ]},
        { title: 'RISQUE ELECTRIQUE', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GDO-Operations-Presence-Electricite - V1 Janvier 2024', description: 'V1 - Janvier 2024', url: 'https://drive.google.com/file/d/1kJrPuYUqVRo9TKvcgSS0rHokaR87YSf5/view?usp=drive_link'},
            { title: 'Fiche mémo - Les types d\'accidents électriques', url: 'https://drive.google.com/file/d/1JNm0O1ooAdL5p3DxVuCMgQbiuQ3eWPlC/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Identification d\'un ouvrage électrique', url: 'https://drive.google.com/file/d/1l7UkygtkKkBF6Pc2WOsQZ2aeenesqerZ/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo : Sécurisation de la zone', url: 'https://drive.google.com/file/d/1ULtLiucIHmJrAQUFN2hzUTnJdJCdzWux/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Incendie à proximité d\'une installation électrique', url: 'https://drive.google.com/file/d/12o1-F5ZhweGT1WZR5jqYi95GTF3EM-Ry/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Gestion des risques de pollution & contamination lors d\'une intervention sur un transformateur', url: 'https://drive.google.com/file/d/1yiujzwHvG0R8bR3XwthkPe69cULDGcl0/view?usp=drive_link', isMemo: true },
        ]},
        { title: 'PHOTOVOLTAIQUE', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'Fiche mémo - Intervention en présence d\'éléments photovoltaïques', url: 'https://drive.google.com/file/d/19svxMOEFNjeiefMTP9CpLmGDnTtzXl5G/view?usp=sharing', isMemo: true },
        ]},
        { title: 'EOLIENNES', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'Fiche mémo - Interventions dans les éoliennes', url: 'https://drive.google.com/file/d/1fsiYT0Za7hpDGk_FtL8y7BPOnjocW4yq/view?usp=sharing', isMemo: true },
        ]},
        { title: 'MILIEU FERROVIAIRE', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'Fiche mémo - Intervention en milieu ferrovaire', url: 'https://drive.google.com/file/d/1MhnXTI5K5PURSxs2lXs_mrlfJfRriRS9/view?usp=sharing', isMemo: true },
        ]},
        { title: 'RISQUE BATIMENTAIRE', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'PIO - Murs porteurs (5 pages)', url: 'https://drive.google.com/file/d/1ffM-OoxRU7KEYHA-iXW7WXviq_q-_oUQ/view?usp=drive_link' },
            { title: 'PIO - Edifices religieux', url: 'https://drive.google.com/file/d/12hZVDx637KGwlU5enC53sNQ8BnxSDVGX/view?usp=drive_link' },
            { title: 'PIO : Les planchers en bois', url: 'https://drive.google.com/file/d/1mRNkYF38Pi1fRqvZ_-0VUtTP_DyDK3Qp/view?usp=drive_link' },
            { title: 'PIO - Isolation thermique extérieure et feux de façades', url: 'https://drive.google.com/file/d/1ughqvo3KTQJ3qPot7HuPqRkn4Ay9eD-X/view?usp=drive_link' },
            { title: 'Fiche mémo - Conduite à tenir par rapport à la menace de ruine', url: 'https://drive.google.com/file/d/1EaNnezl78P8vvyMEwcDUyb0bYpGBQ4KD/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Conduite à tenir par rapport aux Edifices religieux', url: 'https://drive.google.com/file/d/1unZ4UGKEpLEqGD03cRQ15GhJgx7SwU4d/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Planchers en bois : la conduite à tenir', url: 'https://drive.google.com/file/d/1dECU76HwWXJ85mJxYzb-8aytEd8BSup1/view?usp=drive_link', isMemo: true },
        ]},
        { title: 'TOXICITÉ DES FUMÉES', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GDO - Prévention des risques liés à la toxicité des fumées', url: 'https://drive.google.com/file/d/1Rl2bylSS75SSC3C3QJn33Wbl7GLwl9tl/view?usp=drive_link' },
            { title: 'Guide - Impact et prévention des risques relatifs aux fumées d’incendie pour les sapeurs-pompiers - DGSCGC / CNRACL', url: 'https://drive.google.com/file/d/11rR8Vw3W65CDN9CefMvoLxUmRpvvaerU/view?usp=drive_link' },
            { title: 'Fiche mémo - Toxicité des fumées', url: 'https://drive.google.com/file/d/1XuxI0cC2Duf1nM26XCUX4F3t-2LAzcBF/view?usp=drive_link', isMemo: true },
        ]},
        { title: 'RISQUE ROUTIER', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'Prévention du risque routier - Pratiques dans les SIS - Edition 2020', url: 'https://drive.google.com/file/d/1dqecBl7r8R4Nrt21lRBvJ8DNBjTofQqs/view?usp=drive_link' },
            { title: 'Conduite opérationnelle : Responsabilités et constat amiable', url: 'https://drive.google.com/file/d/1St7r-BZvbgt7VJAJkjrohlLzi_KUXrQh/view?usp=drive_link' },
            { title: 'Code de la route et dérogations SP', url: 'https://drive.google.com/file/d/10kRPxRo1nK6GfMRMLaw7LDw18VXpRSmT/view?usp=drive_link' },
            { title: 'Fiche mémo - Techniques de guidage', url: 'https://drive.google.com/file/d/10Zswv0ds8QkRZxL2OHMJNgR_fA8OTM2R/view?usp=drive_link', isMemo: true },
        ]},
        { title: 'AÉRONEFS - ULM', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GDO - Interventions sur des aéronefs de type ULM - V1 - Dec 2017', description: 'Version 1 - Dec 2017', url: 'https://drive.google.com/file/d/1OIzE56MAE2pTGhUeK5C5I6LIEvjpGYFN/view?usp=drive_link' },
            { title: 'Fiche mémo - Intervention sur Accident d\'Aéronef', url: 'https://drive.google.com/file/d/1oYiRsCYuC0WqZqt8_MoC1M9ROQbESuHh/view?usp=drive_link', isMemo: true },
        ]},
        { title: 'BATEAUX EAUX INTÉRIEURES', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GDO - Interventions sur bateaux en eaux intérieures', url: 'https://drive.google.com/file/d/1HR8Kd9pf3WtKKsn69fDlS226LsBZfiNM/view?usp=drive_link' },
            { title: 'Fiche mémo - Intervention sur bateaux en eaux intérieures', url: 'https://drive.google.com/file/d/1ZQgac-Jpwegtap0vUCrC_fAxtZsqV_4x/view?usp=drive_link', isMemo: true },
        ]},
        { title: 'INTERVENTIONS DANS LES SILOS', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GDO - Interventions dans les silos - V1 - Sept 2019', description: 'Version 1 - Septembre 2019', url: 'https://drive.google.com/file/d/1Xl9LOijq3_sZtrO6MYwphsHZQnCVqNRT/view?usp=drive_link'},
        ]},
        { title: 'MILIEU AGRICOLE', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GDO - Interventions en milieu agricole', url: 'https://drive.google.com/file/d/1ikcbYgEuuLLlA5bbW8ffxvUaQxBBPVJQ/view?usp=drive_link' },
            { title: 'Fiche mémo - La reconnaissance en milieu agricole', url: 'https://drive.google.com/file/d/115HYnohGSCQmP89JWyR_BCeI_D-KhIyr/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Les engrais', url: 'https://drive.google.com/file/d/1GWS-BAjRQuowC4Xi-Kr9zTNouzKxhxCc/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Incendie en présence d\'engrais', url: 'https://drive.google.com/file/d/1e6SXTLqrcylTyI-uNr-snr5FkJKIi54o/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Incendie en présence de produits phytosanitaires', url: 'https://drive.google.com/file/d/1l27zk0RJibOXt1fOh3IpBDADZVV1j3Fd/view?usp=drive_link', isMemo: true },
        ]},
        { title: 'STOCKAGE - TYPE CANTILEVER', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'PIO - Feux dans stockage type Cantilever', url: 'https://drive.google.com/file/d/1AyH-xQ5WbpKazsxaUf4SqDaxEArPOyHy/view?usp=drive_link' },
        ]},
        { title: 'NAVIRES ET BATEAUX EAUX MARITIMES', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GDO - Interventions à bord des navires et bateaux en milieu maritime (IBNB) - V1 - Nov 2017', description: 'Version 1 - Novembre 2017', url: 'https://drive.google.com/file/d/1SVNuOS29izAZhORs94l3FZdJoGJehW75/view?usp=drive_link' },
        ]},
        { title: 'PRÉSENCE D\'AMIANTE', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'PIO-Amiante - Septembre 2022', url: 'https://drive.google.com/file/d/1A9vaC-JrhNuoxmhI-tZhFUUg6Oc4iddj/view?usp=drive_link' },
        ]},
    ],
  },
  {
    category: 'Incendie',
    icon: Folder,
    items: [
        { title: 'GDO et GTO', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GDO - Interventions sur les incendies de structures - V1 - Avril 2018', description: 'Version 1 - Avril 2018', url: 'https://drive.google.com/file/d/1jCB3finjG0nadQBnG9TN7LemP2HC5drL/view?usp=drive_link'},
            { title: 'Fiche mémo - MGO Lutte contre l\'incendie', url: 'https://drive.google.com/file/d/17fkNAIIcv1e4osM7i2axXy1jgHFD5JVI/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Reconnaissances', url: 'https://drive.google.com/file/d/1YCQEHDI_Ei8S8BXc_6H0aN6ZvWWkxcUY/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Placement des engins', url: 'https://drive.google.com/file/d/1Yv1AZ1Dflae28K5De1c33ZO3gFJcCrBo/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Sauvetages et mises en sécurité', url: 'https://drive.google.com/file/d/1Tr_pfD52br9L-wSGRmNs7KCIOt7y5gKh/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Établissements', url: 'https://drive.google.com/file/d/1tEwvft79M6ayE7ETDXM7ARiHYJwzTWhI/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo : Attaque et Protection', url: 'https://drive.google.com/file/d/1Wm59jmMBvb7tc7v8wrzek0gSx0NAfk_k/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Ventilation', url: 'https://drive.google.com/file/d/1ga2YYbwMpS3SC38HZmgEcKL7UzPHwGYO/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Déblai', url: 'https://drive.google.com/file/d/1-sismR4pX70dFCLuoqO7HfjL-U6SGU2x/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Surveillance', url: 'https://drive.google.com/file/d/1yZBDNDHAzQyHNKmR_qkezM7LeCfonByQ/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Préservation des traces et indices', url: 'https://drive.google.com/file/d/1ORlsAx8Lz_8l2NuBiv0eEFRSXq0F_67h/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Système feu', url: 'https://drive.google.com/file/d/1JpiYA-EU6xkxr41QWEB63JPMQ5A6z3aE/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Flashover', url: 'https://drive.google.com/file/d/16K2Fjt4d7OJfFbgjQr153CZgCP_dSbtW/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Backdraft', url: 'https://drive.google.com/file/d/1xbKoqj4O_XUuoECu3OzwKoAwZ7Tlmwrf/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - FGI', url: 'https://drive.google.com/file/d/1ne6pUdhlMzxKazzaEVU9-VwQS4K_jgDF/view?usp=drive_link', isMemo: true },
        ]},
        { title: 'Sauvetages et mises en sécurité', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GTO - Sauvetages et mises en sécurité - v2 - Février 2024', description: 'Version 2 - Février 2024', url: 'https://drive.google.com/file/d/1OOKlUIyZQrLmdivON8ANhm9FWWrbO7U8/view?usp=drive_link'},
        ]},
        { title: 'Techniques d\'extinction', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GTO - Etablissements et techniques d\'extinction - DGSCGC', description: 'Version 1 - Août 2018', url: 'https://drive.google.com/file/d/1vBzRKYBMf0xFdIoOdTCcLfIw4BMcegu0/view?usp=drive_link'},
            { title: 'Fiche mémo - Généralités sur les techniques d\'extinction', url: 'https://drive.google.com/file/d/1mIFkF1QX5MZZvRheT3xlJL9lLdr5Li6V/view?usp=drive_link', isMemo: true },
            { title: 'Fiche Mémo - Attaque d\'atténuation', url: 'https://drive.google.com/file/d/17icb-YwNB66w-nZxI2WJEd1rBU8PYYQq/view?usp=drive_link', isMemo: true },
            { title: 'Fiche Mémo - Extinction directe', url: 'https://drive.google.com/file/d/1ylLckD45usxIWs-C10epeVTA_VZpc_fN/view?usp=drive_link', isMemo: true },
            { title: 'Fiche Mémo - Les extinctions indirectes', url: 'https://drive.google.com/file/d/1NWXwg3ksS_NkuzxaU0KZXWF-yoQnguDZ/view?usp=drive_link', isMemo: true },
            { title: 'Fiche Mémo - Extinction combinée massive', url: 'https://drive.google.com/file/d/1QsZXwjsha45ZxJIBBA02jpZCixSZWvnE/view?usp=drive_link', isMemo: true },
            { title: 'Fiche Mémo - Refroidissement des fumées', url: 'https://drive.google.com/file/d/1Tz7NQve0lE3BhWfrVR8mqA-ygdoBQFf3/view?usp=drive_link', isMemo: true },
            { title: 'Fiche Mémo - Situation de pré-backdraft', url: 'https://drive.google.com/file/d/1xY0RnnnX7oOJOp3iIh736e0Xq5gccf0n/view?usp=drive_link', isMemo: true },
            { title: 'Fiche Mémo - Le repli sous protection hydraulique', url: 'https://drive.google.com/file/d/18mptiNqM_zYb1QLxIyboEKYvvnbWIAif/view?usp=drive_link', isMemo: true },
            { title: 'Fiche Mémo - Feu soumis au vent et effet chalumeau', url: 'https://drive.google.com/file/d/1EU7Zc9FAi4OY1yhPjTziO0oulpDZyd9F/view?usp=drive_link', isMemo: true },
        ]},
        { title: 'Feux de véhicules', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'Fiche mémo - Feux sur véhicules', url: '#', isMemo: true },
            { title: 'Fiche mémo - Véhicules et risques associés', url: '#', isMemo: true },
        ]},
        { title: 'Engagement', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GTO - Engagement en milieu vicié - V2 Février 2024', description: 'Version 2 - Février 2024', url: 'https://drive.google.com/file/d/1RTiIC-VLpt-kxlNSsni9db1cpCsYJV_2/view?usp=drive_link', isCollapsible: true, subItems: [
                { section: 'Chapitre 1 - Les appareils de protection respiratoire', memos: [ { title: 'Les matériels complémentaires de lari', url: 'https://drive.google.com/file/d/1DrXaRDqmOJWmfSlcR7sK9SMKxNHdGyRT/view?usp=drive_link' }, { title: 'Le choix de la protection respiratoire adaptée', url: 'https://drive.google.com/file/d/1uvLxbUHr5ThwLE5ZRbJ8gACJ3USHt-Xu/view?usp=drive_link' } ] },
                { section: 'Chapitre 2 Préparation à l\'engagement', memos: [ { title: 'Entraînement / Habillage / Contrôle', url: 'https://drive.google.com/file/d/1GYKzlFzTbHiBdaPgApVqAoIZy4PLgJf4/view?usp=drive_link' }, { title: 'Rôles et missions avant engagement', url: 'https://drive.google.com/file/d/1bCr-0dKaTb8s78ye5LFE9rU-4mhiVBHq/view?usp=drive_link' }, { title: 'Les mesures spécifiques avant l’engagement', url: 'https://drive.google.com/file/d/1Goqfr4fdbw0Kaom_Bp9kSZUEe0PhGzbr/view?usp=drive_link' } ] },
                { section: 'Chapitre 3 L\'engagement', memos: [ { title: 'Les différentes techniques d\'engagement', url: 'https://drive.google.com/file/d/1LVDGSgumRwzhv6Ntwi0kj8UWtQEgJpPU/view?usp=drive_link' }, { title: 'Missions de recherche', url: 'https://drive.google.com/file/d/1s0lvHvxqmEMcrBZdPwGtVaZYQM_rXtD1/view?usp=drive_link' }, { title: 'Retour d\'engagement', url: 'https://drive.google.com/file/d/1Z_jDdxmGUrdovH9V9QK1F2pe7j3n_zBE/view?usp=drive_link' }, { title: 'Le ré-engagement', url: 'https://drive.google.com/file/d/1hrQ786bYeHfsETxi4tr9REhs-xF6N_Tp/view?usp=drive_link' }, { title: 'Les règles de marquage', url: 'https://drive.google.com/file/d/1pDiTJCbhL_SKn07zEmZI0cfTduO2pHxh/view?usp=drive_link' } ] },
                { section: 'Chapitre 4 Après l\'engagement', memos: [ { title: 'Après l\'engagement', url: 'https://drive.google.com/file/d/1vDx-K0rQr5Njlmr0PqP2tAFRQBK6_iZx/view?usp=drive_link' } ] }
            ]},
        ]},
        { title: 'Sauvegarde opérationnelle', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GTO-Sauvegarde-Operationnelle - V1 Février 2024', description: 'Version 1 - Février 2024', url: '#'},
        ]},
        { title: 'Ventilation opérationnelle', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GTO - Ventilation Opérationnelle - V1 - Fév 2019', description: 'Version 1 - Février 2019', url: 'https://drive.google.com/file/d/1szX7w4Gau1S_RD-NecKqkUw7ScW4fGNX/view?usp=drive_link'},
            { title: 'Fiche mémo - La Ventilation Par Pression Positive', url: 'https://drive.google.com/file/d/1YVdIuvvNyhs36AO2VrO5QMcAQJZ79myI/view?usp=drive_link', isMemo: true },
        ]},
        { title: 'Toxicité des fumées', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GDO - Prévention des risques liés à la toxicité des fumées d\'incendie - V2 - Sept 2020', description: 'V2 - Septembre 2020', url: 'https://drive.google.com/file/d/1GolvGy0lOpLRnTFXaZ0K65J2pJpEOldn/view?usp=drive_link'},
            { title: 'Fiche mémo - Toxicité des fumées', url: 'https://drive.google.com/file/d/1ufxCDDmR6Sc53etamKuRBn9m7SwDuvvR/view?usp=drive_link', isMemo: true },
        ]},
        { title: 'PIO', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'PIO - Feu de stockage type Cantilever - Fév 2019', url: 'https://drive.google.com/file/d/1i-wtOql18GSAXtQfCPSIyz0qrTD7IYSf/view?usp=drive_link' },
            { title: 'PIO - Edifices religieux', url: 'https://drive.google.com/file/d/1DH2nEJuzaqjxAsf7PKwVEy_chyYC1hAH/view?usp=drive_link' },
            { title: 'PIO - Murs porteurs (5 pages)', url: 'https://drive.google.com/file/d/1kpV-p0Ow_M2SxNEQh0SHEEfz6kuAN9x9/view?usp=drive_link' },
            { title: 'PIO - Isolation thermique extérieure et feux de façades', url: 'https://drive.google.com/file/d/1VAB-juUmnColMnzjfx7PVbbF4WFje0lT/view?usp=drive_link' },
            { title: 'PIO - Feux de silos bois céréales', url: 'https://drive.google.com/file/d/1TLhms6x19Fey93LDyBQdjHzEhFeuHYjp/view?usp=drive_link', isMemo: true },
            { title: 'PIO - Incendie self stockage', url: 'https://drive.google.com/file/d/1BE9kWwnR6-OkZoNqOq7UJ0hGaFI-OM2r/view?usp=drive_link' },
        ]},
    ],
  },
  {
    category: 'SSUAP',
    icon: Folder,
    items: [
        { title: 'Guide de Doctrine Opérationnelle - Secours et Soins d\'Urgence A Personne', description: 'GDO-SSUAP-V1.1 - Nov 2022, Version 1.1 de Novembre 2022', url: 'https://drive.google.com/file/d/1SYuZeHmFISVXNloYdhlMlRs08OgiLznz/view?usp=drive_link'},
        { title: 'LES RECOMMANDATIONS RELATIVES AUX PREMIERS SECOURS EN EQUIPE', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'Recommandations Premiers secours en équipe (décembre 2023)', url: 'https://drive.google.com/file/d/1hkJmSOvHBLNjiIK4JR9Fw8jVQKFL3zHs/view?usp=drive_link'},
            { title: 'Fiche MEMO - Les Brûlures', url: 'https://drive.google.com/file/d/19zqlzpLxhYOFTpeSS_QZa5CBTTGOyIg6/view?usp=drive_link', isMemo: true },
            { title: 'Fiche MEMO - Infarctus du myocarde', url: 'https://drive.google.com/file/d/1Dzb7L8sJL0_GgzxjwkFEaRPBRFsqILwC/view?usp=drive_link', isMemo: true },
            { title: 'Fiche Mémo Section de membre', url: 'https://drive.google.com/file/d/1EIV0QJpNETUHZe2lHEbnIvWMBbSF3I8H/view?usp=drive_link', isMemo: true },
            { title: 'Fiche Memo - Traumatisme crânien', url: 'https://drive.google.com/file/d/1mIG7kd3alt-6eGw7HqoRTYoxnf5Acwms/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Accidents liés à la foudre', url: 'https://drive.google.com/file/d/1eMMLaQUtOcOU227a8Ab-RqaQSBiiyoGl/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo : Intoxication aux opiacés', url: 'https://drive.google.com/file/d/1mHXIl414zYmeDpZQnkdL7_qvL5BookmU/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Morsures & Piqûres', url: 'https://drive.google.com/file/d/1vVCdHrSaYC9GrMnsW_1HZ1yRvndeMLe9/view?usp=drive_link', isMemo: true },
            { title: 'Fiche memo hémorragie externe', url: 'https://drive.google.com/file/d/1DNygKcF7qhBRwEvrEavqK0A8C85er5BW/view?usp=drive_link', isMemo: true },
            { title: 'Fiche memo hémorragie exteriorisée', url: 'https://drive.google.com/file/d/1Dl7lFAuhU_1mZ2gNXemWLZTna5QSqIee/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Oxygénothérapie', url: 'https://drive.google.com/file/d/1Np9KdyXMM8nFhwh9tPpEG8HvecI_TU4G/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Les accidents liés à la plongée', url: 'https://drive.google.com/file/d/1cWZX-sdJkyHfbHt0Cm7SSqBRf0VvZKJP/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Anaphylaxie', url: 'https://drive.google.com/file/d/1bGMtkrM0KNxg-ewTMq7NbZgJAz00Cjw7/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Les traumatismes du dos et du cou', url: 'https://drive.google.com/file/d/1_fO9bOwyhX8DKTzN-wViiFy9TW0rLlh-/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Malaise hypoglycémique chez le diabétique', url: 'https://drive.google.com/file/d/1byZiD4mwXoWREzZH-qKWbopQ0RJ4mboJ/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Bilan XABCDE', url: 'https://drive.google.com/file/d/15itvACbviZOAEmAWB61e6HyVn42WMNlB/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Repérage secouriste SMV NOVI', url: 'https://drive.google.com/file/d/12NrHXhkYwUONpf2tm7I_-6pda2fLgiLj/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Crise d\'asthme', url: 'https://drive.google.com/file/d/1I02vfFoWlttZnM5aIxfAw4gFZ6GxF1zM/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - L\'AVC', url: 'https://drive.google.com/file/d/13N7SDgIjKxvv7aINj-rh_jQhi2qt1ccu/view?usp=drive_link', isMemo: true },
        ]},
        { title: 'PARTAGES D\'INFORMATION OPÉRATIONNELLE', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'PIO-Points de rencontre et secours en forêt - nov 2022', url: 'https://drive.google.com/file/d/1ZNW8gZmcaiejuoZOEEUQ-yfuWe7NeW3H/view?usp=drive_link'},
        ]},
    ],
  },
  {
    category: 'Secours Routier',
    icon: Folder,
    items: [
        { title: 'TEXTES REGLEMENTAIRES', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'GDO - Opérations de secours en milieu routier - version juillet 2025', url: 'https://drive.google.com/file/d/1Fz4hNdl4iphOB3tCBKxjS8sGXqhkJ4M0/view?usp=drive_link' },
            { title: 'Note de doctrine opérationnelle - Intervention d\'Urgence sur les Véhicules (IUV) - DGSCGC', url: 'https://drive.google.com/file/d/1wWZNICJOmWtl0w7qNARFO46zptNh5p_x/view?usp=drive_link' },
            { title: 'Fiche mémo- Sécurité lors des interventions de secours routier', url: 'https://drive.google.com/file/d/136iZPkh2_XtgI32-GRjgwIquqgGNYpIG/view?usp=drive_link', isMemo: true },
        ]},
        { title: 'VEHICULES', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'Fiches Aides à la Désincarcération (DGSCGC)', url: 'https://drive.google.com/file/d/1S0ywm1BLCY4jii6DRQ-ovDhSk4ZOsSPB/view?usp=drive_link' },
        ]},
        { title: 'TECHNIQUES', isSubHeader: true, isCollapsible: true, subItems: [
            { title: 'Fiche mémo - Basculer le tableau de bord', url: 'https://drive.google.com/file/d/134D41aZuF4Y7iFxJTPv1rPBArTveogMp/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Relever le tableau de bord', url: 'https://drive.google.com/file/d/1sw8_u1OMZ3u-hYezxzOref9IDtD0XtK3/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Réaliser un pavillon', url: 'https://drive.google.com/file/d/1lWxZhtRbY0fTGlgTobDkfj0hpl-73WdF/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Réaliser un demi-pavillon', url: 'https://drive.google.com/file/d/1GbYQdLnNgAS600URr1qPhDI5T-7UxVDF/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Réaliser un demi-pavillon latéral (véhicule sur le côté)', url: 'https://drive.google.com/file/d/1ljOj67r2P6SzMOD1EbkzIZ6XnVo3_WPq/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Réaliser un demi-pavillon inversé (véhicule sur le toit)', url: 'https://drive.google.com/file/d/1IvHrPvdq3RYBjZiB5mthj5WP9dqQi1Aj/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Sortie arrière', url: 'https://drive.google.com/file/d/1tSVCq8v7AP_D4G4mLVIygyjobl3GiUJH/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Sortie avant', url: 'https://drive.google.com/file/d/19vJJ9nKWPvzT8EvxToUrSi5gLfgJ5hxq/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Sortie d\'un véhicule sur le côté', url: 'https://drive.google.com/file/d/1avDJhYTBjg7LggO7sJKBEL61zGS3s-rs/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Sortie d\'un véhicule sur le toit', url: 'https://drive.google.com/file/d/1Go6CZNTSw6w8Z3Hch7ZieYuO-0s6hPMv/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Sortie latérale d\'une victime allongée', url: 'https://drive.google.com/file/d/1UqXWnnMV3wfSZVnXuwbiJm9oNv3nhmxX/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Sortie latérale d\'une personne assise', url: 'https://drive.google.com/file/d/1lZMPtgPVLbhnli9CVFzyEO3ykpHZY1OP/view?usp=drive_link', isMemo: true },
            { title: 'Fiche mémo - Sortie oblique', url: 'https://drive.google.com/file/d/1Tz8sEXASv-HKjSxOOGjd9ds_N8cCaytP/view?usp=drive_link', isMemo: true },
        ]},
    ],
  },
];

const MemoItem = ({ memo }) => (
  <a href={memo.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-red-500 transition-colors group">
    <FileText className="w-4 h-4 shrink-0" />
    <span className="flex-1">{memo.title}</span>
    <ExternalLink className="w-4 h-4 text-slate-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
  </a>
);

const SimpleResourceItem = ({ item }) => {
    const Icon = item.isMemo ? FileText : BookOpen;
    return (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="block text-slate-300 hover:text-red-500 transition-colors group">
          <div className={`bg-slate-800/50 border border-slate-700 rounded-lg p-4 group-hover:border-red-500/50 transition-colors flex items-start gap-4 ${item.isMemo ? 'pl-8' : ''}`}>
            <Icon className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
            <div className="flex-1">
              <p className="font-medium text-white">{item.title}</p>
              {item.description && <p className="text-sm text-slate-400">{item.description}</p>}
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </a>
    );
}

const CollapsibleSubItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.isMemo ? FileText : BookOpen;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex justify-between items-center text-left hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-start gap-4">
          <Icon className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
          <div className="flex-1">
            <p className="font-medium text-white">{item.title}</p>
            {item.description && <p className="text-sm text-slate-400">{item.description}</p>}
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-slate-700 space-y-3">
              {item.subItems.map((subItem, index) => (
                <div key={index}>
                  {subItem.section && <h4 className="font-semibold text-red-400 mb-2">{subItem.section}</h4>}
                  <div className="space-y-2 pl-4 border-l-2 border-slate-700">
                    {subItem.memos ? subItem.memos.map((memo, memoIndex) => <MemoItem key={memoIndex} memo={memo} />)
                    : <SimpleResourceItem item={subItem}/>
                    }
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ResourceItem = ({ item }) => {
    if (item.isCollapsible && item.subItems) {
        if(item.isSubHeader){
            return <CollapsibleSubItem item={item}/>
        }
        return <CollapsibleSubItem item={item} />;
    }
    return <SimpleResourceItem item={item} />;
};

const MainCategory = ({ category }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left mb-6 group"
            >
                <h2 className="text-3xl font-bold flex items-center gap-3 text-white group-hover:text-red-500 transition-colors">
                    <category.icon className="w-7 h-7 text-red-500" />
                    {category.category}
                </h2>
                <ChevronDown className={`w-8 h-8 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-l-2 border-slate-800 pl-4 ml-4"
                >
                    <div className="space-y-3 pb-4">
                        {category.items.map((item, itemIndex) => (
                            <ResourceItem key={itemIndex} item={item} />
                        ))}
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
      </motion.div>
    )
}


const Resources = () => {
  return (
    <>
      <Helmet>
        <title>Ressources Officielles | Quiz Pompier</title>
        <meta
          name="description"
          content="Accédez aux documents officiels de référence : GDO, GTO, RETEX. Ressources classées par thème pour réviser efficacement."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ressources Officielles</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Accédez directement aux documents de référence pour approfondir vos connaissances
          </p>
        </motion.div>

        <div className="space-y-12">
          {resourceData.map((category, categoryIndex) => (
            <MainCategory key={categoryIndex} category={category} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-slate-800/50 border border-slate-700 rounded-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-3">Note importante</h3>
          <p className="text-slate-300">
            Ces ressources sont fournies à titre indicatif. Vérifiez toujours les documents officiels de votre SDIS 
            pour les procédures et protocoles spécifiques à votre département. Les liens sont des placeholders 
            et seront mis à jour avec les URLs officielles.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Resources;