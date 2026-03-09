-- ========================================
-- SOLAREX — Seed casernes (SDIS principaux)
-- ========================================

INSERT INTO casernes (name, department, sdis) VALUES
  -- Bouches-du-Rhône (13)
  ('CS Marseille Centre', '13', 'SDIS 13'),
  ('CS Marseille Nord', '13', 'SDIS 13'),
  ('CS Marseille Sud', '13', 'SDIS 13'),
  ('CS Aix-en-Provence', '13', 'SDIS 13'),
  ('CS Martigues', '13', 'SDIS 13'),
  ('CS Salon-de-Provence', '13', 'SDIS 13'),
  ('CS Aubagne', '13', 'SDIS 13'),
  ('CS Istres', '13', 'SDIS 13'),
  -- Paris (75) / BSPP
  ('BSPP - Champerret', '75', 'BSPP'),
  ('BSPP - Ménilmontant', '75', 'BSPP'),
  ('BSPP - Grenelle', '75', 'BSPP'),
  ('BSPP - Montmartre', '75', 'BSPP'),
  ('BSPP - Port-Royal', '75', 'BSPP'),
  -- Rhône (69)
  ('CS Lyon Centre', '69', 'SDIS 69'),
  ('CS Villeurbanne', '69', 'SDIS 69'),
  ('CS Vénissieux', '69', 'SDIS 69'),
  -- Haute-Garonne (31)
  ('CS Toulouse Centre', '31', 'SDIS 31'),
  ('CS Toulouse Nord', '31', 'SDIS 31'),
  ('CS Blagnac', '31', 'SDIS 31'),
  -- Nord (59)
  ('CS Lille Centre', '59', 'SDIS 59'),
  ('CS Roubaix', '59', 'SDIS 59'),
  ('CS Tourcoing', '59', 'SDIS 59'),
  ('CS Dunkerque', '59', 'SDIS 59'),
  -- Gironde (33)
  ('CS Bordeaux Centre', '33', 'SDIS 33'),
  ('CS Mérignac', '33', 'SDIS 33'),
  ('CS Pessac', '33', 'SDIS 33'),
  -- Loire-Atlantique (44)
  ('CS Nantes Centre', '44', 'SDIS 44'),
  ('CS Saint-Nazaire', '44', 'SDIS 44'),
  -- Alpes-Maritimes (06)
  ('CS Nice Centre', '06', 'SDIS 06'),
  ('CS Cannes', '06', 'SDIS 06'),
  ('CS Antibes', '06', 'SDIS 06'),
  -- Var (83)
  ('CS Toulon Centre', '83', 'SDIS 83'),
  ('CS Fréjus', '83', 'SDIS 83'),
  -- Hérault (34)
  ('CS Montpellier Centre', '34', 'SDIS 34'),
  ('CS Béziers', '34', 'SDIS 34'),
  -- Bas-Rhin (67)
  ('CS Strasbourg Centre', '67', 'SDIS 67'),
  -- Ille-et-Vilaine (35)
  ('CS Rennes Centre', '35', 'SDIS 35'),
  -- Isère (38)
  ('CS Grenoble Centre', '38', 'SDIS 38'),
  -- Seine-Maritime (76)
  ('CS Rouen Centre', '76', 'SDIS 76'),
  ('CS Le Havre', '76', 'SDIS 76'),
  -- Essonne (91)
  ('CS Évry', '91', 'SDIS 91'),
  -- Hauts-de-Seine (92)
  ('CS Nanterre', '92', 'SDIS 92'),
  -- Seine-Saint-Denis (93)
  ('CS Bobigny', '93', 'SDIS 93'),
  -- Val-de-Marne (94)
  ('CS Créteil', '94', 'SDIS 94'),
  -- Corse (2A/2B)
  ('CS Ajaccio', '2A', 'SDIS 2A'),
  ('CS Bastia', '2B', 'SDIS 2B')
ON CONFLICT (name) DO NOTHING;
