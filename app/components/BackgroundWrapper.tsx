import React from 'react';

type Props = {
  children: React.ReactNode;
  overflow?: 'hidden' | 'scroll';
};

export default function BackgroundWrapper({ children, overflow = 'hidden' }: Props) {
  return (
    <div
      className={`h-dvh text-white flex flex-col items-center justify-between`}
      style={{
        position: 'relative',
        overflow,
      }}
    >
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 -z-10 bg-slate-950"
        style={{
          backgroundImage: 'url(/background.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
        }}
      ></div>

      {/* Content */}
      {children}
    </div>
  );
}
