import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Quiz from '@/pages/Quiz';
import Resources from '@/pages/Resources';
import RandomRead from '@/pages/RandomRead';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Legal from '@/pages/Legal';
import NotFound from '@/pages/NotFound';
import CookieBanner from '@/components/CookieBanner';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Quiz />} />
          <Route path="/ressources" element={<Resources />} />
          <Route path="/lecture-aleatoire" element={<RandomRead />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <CookieBanner />
      <Toaster />
    </>
  );
}

export default App;