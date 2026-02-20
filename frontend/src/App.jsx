import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CookieBanner from './components/CookieBanner.jsx';
import './styles/globals.css';

// Lazy load pages for fast initial load
const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Team = lazy(() => import('./pages/Team.jsx'));
const Programmes = lazy(() => import('./pages/Programmes.jsx'));
const News = lazy(() => import('./pages/News.jsx'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail.jsx'));
const Donate = lazy(() => import('./pages/Donate.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const DataProtectionPolicy = lazy(() => import('./pages/DataProtectionPolicy.jsx'));

// Simple placeholder pages
const Projects = lazy(() => import('./pages/Projects.jsx'));
const Resources = lazy(() => import('./pages/Resources.jsx'));

// Loading spinner
function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', flexDirection: 'column', gap: '16px'
    }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '50%',
        border: '3px solid #DDE3EA', borderTopColor: '#1A3A5C',
        animation: 'spin 0.7s linear infinite'
      }} />
      <p style={{ color: '#8A9BB0', fontSize: '0.9rem' }}>Loading…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="page-wrapper">
        <a href="#main-content" className="sr-only">Skip to main content</a>
        <Navbar />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/programmes" element={<Programmes />} />
              <Route path="/programmes/:id" element={<Programmes />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:sub" element={<Projects />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<ArticleDetail />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:sub" element={<Resources />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/data-protection" element={<DataProtectionPolicy />} />
              <Route path="/privacy" element={<Navigate to="/data-protection" replace />} />
              <Route path="/terms" element={<Navigate to="/" replace />} />
              <Route path="/transparency" element={<Navigate to="/resources" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '40px' }}>
      <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🕊️</div>
      <h1 style={{ color: '#1A3A5C', marginBottom: '12px' }}>Page Not Found</h1>
      <p style={{ color: '#8A9BB0', marginBottom: '24px' }}>The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-primary">Return Home</a>
    </div>
  );
}
