import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HeaderNav } from './components/HeaderNav';
import { Footer } from './components/Footer';
import { BlogHome } from './pages/BlogHome';
import { PostDetail } from './pages/PostDetail';
import { TopicsPage } from './pages/TopicsPage';
import { AboutPage } from './pages/AboutPage';

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#fafafa] text-gray-900 selection:bg-blue-600 selection:text-white flex flex-col font-inter">
        <HeaderNav />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<BlogHome />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
