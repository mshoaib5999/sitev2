import React from 'react';
import { Hero, Marquee } from '../sections/Hero';
import { SelectedWork } from '../sections/SelectedWork';
import { UpClose } from '../sections/UpClose';
import { Statement } from '../sections/Statement';
import { Services } from '../sections/Services';

export const Home: React.FC = () => (
  <>
    <Hero />
    <Marquee />
    <SelectedWork />
    <UpClose />
    <Statement />
    <Services />
  </>
);
