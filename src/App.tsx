import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import WhyUs from './components/WhyUs';
import Process from './components/Process';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import { ALL } from './data/projects';

export default function App() {
  // הפילטר של הגלריה מוחזק כאן כדי שלחיצה על אריח שירות תסנן את העבודות
  const [galleryFilter, setGalleryFilter] = useState(ALL);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services onSelectCategory={setGalleryFilter} />
        <Gallery filter={galleryFilter} onFilterChange={setGalleryFilter} />
        <WhyUs />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
