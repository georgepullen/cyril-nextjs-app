'use client';
import LogoAndTitle from './components/shared/LogoAndTitle';
import BackgroundWrapper from './components/shared/BackgroundWrapper';
import SubTitle from './components/home/SubTitle';
import CallToAction from './components/home/CallToAction';
import CopyrightFooter from './components/shared/CopyrightFooter';

export default function Home() {

  return (
    <>
      <BackgroundWrapper>
        <main className="flex flex-col gap-8 items-center justify-center flex-1 sm:max-w-lg sm:p-0 p-8">
          <LogoAndTitle />
          <SubTitle />
          <CallToAction />
        </main>
        <CopyrightFooter />
      </BackgroundWrapper>
    </>
  );
}
