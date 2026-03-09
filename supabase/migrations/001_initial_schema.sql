-- ========================================
-- SOLAREX — Schéma complet Supabase
-- Version 2.0 — Mars 2026
-- ========================================

-- ========================================
-- 1. TABLES
-- ========================================

CREATE TABLE casernes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL,
  sdis TEXT,
  total_points INTEGER DEFAULT 0,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  caserne_id INTEGER REFERENCES casernes(id),
  is_premium BOOLEAN DEFAULT false,
  premium_until TIMESTAMPTZ,
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  theme TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy','medium','hard')),
  tags TEXT[],
  question TEXT NOT NULL,
  answers JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  resource_url TEXT,
  is_premium BOOLEAN DEFAULT false,
  is_free_100 BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE quiz_answers (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_id INTEGER REFERENCES questions(id) NOT NULL,
  is_correct BOOLEAN NOT NULL,
  points_earned INTEGER DEFAULT 0,
  answered_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  url TEXT NOT NULL,
  is_memo BOOLEAN DEFAULT false
);

-- ========================================
-- 2. INDEXES
-- ========================================

CREATE INDEX idx_casernes_points ON casernes(total_points DESC);
CREATE INDEX idx_casernes_dept ON casernes(department);
CREATE INDEX idx_profiles_caserne ON profiles(caserne_id);
CREATE INDEX idx_quiz_answers_user ON quiz_answers(user_id);
CREATE INDEX idx_quiz_answers_question ON quiz_answers(question_id);
CREATE INDEX idx_questions_free ON questions(is_free_100) WHERE is_free_100 = true;
CREATE INDEX idx_questions_active ON questions(active) WHERE active = true;

-- ========================================
-- 3. TRIGGER — Auto-create profile on signup
-- ========================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ========================================
-- 4. FUNCTION — Record answer + update points
-- ========================================

CREATE OR REPLACE FUNCTION record_answer(
  p_user_id UUID,
  p_question_id INTEGER,
  p_is_correct BOOLEAN,
  p_points INTEGER
)
RETURNS void AS $$
BEGIN
  -- Insert the answer
  INSERT INTO quiz_answers (user_id, question_id, is_correct, points_earned)
  VALUES (p_user_id, p_question_id, p_is_correct, p_points);

  -- Update user total points
  UPDATE profiles
  SET total_points = total_points + p_points
  WHERE id = p_user_id;

  -- Update caserne total points (if user has one)
  UPDATE casernes
  SET total_points = total_points + p_points
  WHERE id = (SELECT caserne_id FROM profiles WHERE id = p_user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- 5. FUNCTION — Join a caserne
-- ========================================

CREATE OR REPLACE FUNCTION join_caserne(p_user_id UUID, p_caserne_id INTEGER)
RETURNS void AS $$
DECLARE
  v_old_caserne INTEGER;
BEGIN
  SELECT caserne_id INTO v_old_caserne FROM profiles WHERE id = p_user_id;

  -- Decrement old caserne member count
  IF v_old_caserne IS NOT NULL THEN
    UPDATE casernes SET member_count = GREATEST(member_count - 1, 0) WHERE id = v_old_caserne;
  END IF;

  -- Update profile
  UPDATE profiles SET caserne_id = p_caserne_id WHERE id = p_user_id;

  -- Increment new caserne member count
  UPDATE casernes SET member_count = member_count + 1 WHERE id = p_caserne_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- 6. VIEW — Public leaderboard
-- ========================================

CREATE OR REPLACE VIEW leaderboard_casernes AS
SELECT
  c.id,
  c.name,
  c.department,
  c.sdis,
  c.total_points,
  c.member_count
FROM casernes c
ORDER BY c.total_points DESC;

CREATE OR REPLACE VIEW leaderboard_departement AS
SELECT
  c.id,
  c.name,
  c.department,
  c.sdis,
  c.total_points,
  c.member_count,
  RANK() OVER (PARTITION BY c.department ORDER BY c.total_points DESC) as dept_rank
FROM casernes c
ORDER BY c.department, c.total_points DESC;

-- ========================================
-- 7. ROW LEVEL SECURITY
-- ========================================

ALTER TABLE casernes ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- CASERNES: public read
CREATE POLICY "casernes_select_public" ON casernes
  FOR SELECT USING (true);

-- PROFILES: users can read/update their own
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- QUESTIONS: anonymous/free users see free_100, premium sees all active
CREATE POLICY "questions_select_free" ON questions
  FOR SELECT USING (
    is_free_100 = true AND active = true
  );

CREATE POLICY "questions_select_premium" ON questions
  FOR SELECT USING (
    active = true
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_premium = true
    )
  );

-- QUIZ_ANSWERS: users manage their own
CREATE POLICY "quiz_answers_insert_own" ON quiz_answers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "quiz_answers_select_own" ON quiz_answers
  FOR SELECT USING (auth.uid() = user_id);

-- RESOURCES: public read
CREATE POLICY "resources_select_public" ON resources
  FOR SELECT USING (true);
