'use client';
import { useState, useEffect } from 'react';
import LogoAndTitle from './components/LogoAndTitle';
import ChatNowButton from './components/CallToAction';
import Footer from './components/Footer';
import BackgroundWrapper from './components/BackgroundWrapper';
import ReleaseNotes from './components/ReleaseNotes';
import BulletPoints from './components/SubTitle';
import SubTitle from './components/SubTitle';
import CallToAction from './components/CallToAction';

export default function Home() {
  const [releaseNotes, setReleaseNotes] = useState('');

  useEffect(() => {
    fetch('/release_notes.md')
      .then(response => response.text())
      .then(text => setReleaseNotes(text));
  }, []);

  return (
    <>
      <BackgroundWrapper>
        <main className="flex flex-col gap-8 items-center justify-center flex-1 sm:max-w-lg sm:p-0 p-8">
          <LogoAndTitle />
          <SubTitle />
          <CallToAction />
        </main>
        <Footer />
      </BackgroundWrapper>
    </>
  );
}
