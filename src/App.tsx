import React, { useCallback, useState } from 'react';
import { Intro } from './sections/Intro';
import { Header } from './sections/Header';
import { Hero, Marquee } from './sections/Hero';
import { SelectedWork } from './sections/SelectedWork';
import { UpClose } from './sections/UpClose';
import { Statement } from './sections/Statement';
import { Services } from './sections/Services';
import { MoreWork } from './sections/MoreWork';
import { Footer } from './sections/Footer';
import { Cursor } from './sections/Cursor';
import { useReveal } from './hooks/useReveal';

export const App: React.FC = () => {
  const [introDone, setIntroDone] = useState(false);
  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  useReveal([introDone]);

  return (
    <div className="min-h-screen bg-bg text-ink font-sans antialiased">
      {!introDone && <Intro onDone={handleIntroDone} />}
      <Cursor />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <SelectedWork />
        <UpClose />
        <Statement />
        <Services />
        <MoreWork />
      </main>
      <Footer />
    </div>
  );
};

export default App;
