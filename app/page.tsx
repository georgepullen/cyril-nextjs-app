"use client"
import { Navbar } from './components/Navbar';
import HeroSection from './components/HeroSection';
import RoadmapSection from './components/Roadmap';
import Footer from './components/Footer';
import MainLayout from './components/MainLayout';

export default function HomePage() {
  return (
    <MainLayout>
      <Navbar />
      <HeroSection />
      <RoadmapSection />
      <Footer />
    </MainLayout>
  );
}