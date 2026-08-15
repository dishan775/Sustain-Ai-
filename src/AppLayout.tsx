import { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from '@/lib/scrollTriggers';
import { ScrollTrigger } from '@/lib/scrollTriggers';

import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import StoryAnimation from '@/components/StoryAnimation';
import WhySustainAI from '@/components/WhySustainAI';
import AIIntelligenceGrid from '@/components/AIIntelligenceGrid';
import CarbonIntelligence from '@/components/CarbonIntelligence';
import EnergyIntelligence from '@/components/EnergyIntelligence';
import UrbanMobility from '@/components/UrbanMobility';
import DecisionEngine from '@/components/DecisionEngine';
import ScenarioSimulator from '@/components/ScenarioSimulator';
import MetricsBand from '@/components/MetricsBand';
import ExplainableAI from '@/components/ExplainableAI';
import ResearchTimeline from '@/components/ResearchTimeline';
import CallToAction3D from '@/components/CallToAction3D';
import AIAssistantWidget from '@/components/AIAssistantWidget';
import Footer from '@/components/Footer';
import SignIn from '@/components/SignIn';

export default function AppLayout() {
  const [showSignIn, setShowSignIn] = useState(() => window.location.hash === '#signin');

  const openSignIn = useCallback(() => {
    setShowSignIn(true);
    window.location.hash = '#signin';
  }, []);

  const closeSignIn = useCallback(() => {
    setShowSignIn(false);
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  useEffect(() => {
    const handleHash = () => {
      setShowSignIn(window.location.hash === '#signin');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    if (showSignIn) return; // Don't init smooth scroll on auth page

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [showSignIn]);

  if (showSignIn) {
    return <SignIn onBack={closeSignIn} />;
  }

  return (
    <div className="bg-white overflow-x-hidden">
      <Nav onSignIn={openSignIn} />
      <Hero onSignIn={openSignIn} />
      <StoryAnimation />
      <WhySustainAI />
      <AIIntelligenceGrid />
      <CarbonIntelligence />
      <EnergyIntelligence />
      <UrbanMobility />
      <DecisionEngine />
      <ScenarioSimulator />
      <MetricsBand />
      <ExplainableAI />
      <ResearchTimeline />
      <CallToAction3D onSignIn={openSignIn} />
      <Footer />
      <AIAssistantWidget />
    </div>
  );
}

