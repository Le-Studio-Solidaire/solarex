import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Quiz from '@/pages/Quiz';
import Resources from '@/pages/Resources';
import RandomRead from '@/pages/RandomRead';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Legal from '@/pages/Legal';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Leaderboard from '@/pages/Leaderboard';
import Profile from '@/pages/Profile';
import Premium from '@/pages/Premium';
import CookieBanner from '@/components/CookieBanner';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Quiz />} />
          <Route path="/ressources" element={<Resources />} />
          <Route path="/lecture-aleatoire" element={<RandomRead />} />
          <Route path="/classement" element={<Leaderboard />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <CookieBanner />
      <Toaster />
    </AuthProvider>
  );
}

export default App;