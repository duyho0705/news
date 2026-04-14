import React, { useEffect, useRef, useCallback } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

const FADE_DURATION = 0.5; // seconds

/* ───────────────────────── Navigation ───────────────────────── */
const Navbar: React.FC = () => {
  const menuItems = [
    { label: 'Home', active: true },
    { label: 'Studio', active: false },
    { label: 'About', active: false },
    { label: 'Journal', active: false },
    { label: 'Reach Us', active: false },
  ];

  return (
    <nav className="relative z-10 w-full">
      <div className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        {/* Logo */}
        <a href="#" className="font-display text-3xl tracking-tight text-[#000000] select-none">
          Aethera<sup className="text-xs align-super">®</sup>
        </a>

        {/* Menu items */}
        <ul className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`text-sm font-body transition-colors duration-200 hover:text-[#000000] ${
                  item.active ? 'text-[#000000]' : 'text-[#6F6F6F]'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="rounded-full px-6 py-2.5 text-sm font-body bg-[#000000] text-white transition-transform duration-200 hover:scale-[1.03] cursor-pointer">
          Begin Journey
        </button>
      </div>
    </nav>
  );
};

/* ──────────────────────── Video Background ──────────────────── */
const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  const fadeLoop = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.paused) {
      rafRef.current = requestAnimationFrame(fadeLoop);
      return;
    }

    const { currentTime, duration } = video;

    if (duration && duration > 0) {
      if (currentTime < FADE_DURATION) {
        // Fading in
        video.style.opacity = String(Math.min(currentTime / FADE_DURATION, 1));
      } else if (currentTime > duration - FADE_DURATION) {
        // Fading out
        const remaining = duration - currentTime;
        video.style.opacity = String(Math.max(remaining / FADE_DURATION, 0));
      } else {
        video.style.opacity = '1';
      }
    }

    rafRef.current = requestAnimationFrame(fadeLoop);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '0';

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    };

    video.addEventListener('ended', handleEnded);
    rafRef.current = requestAnimationFrame(fadeLoop);

    return () => {
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, [fadeLoop]);

  return (
    <div
      className="absolute z-0 overflow-hidden"
      style={{ top: '300px', right: 0, bottom: 0, left: 0 }}
    >
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        autoPlay
        className="w-full h-full object-cover transition-none"
        style={{ opacity: 0 }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-transparent to-[#FFFFFF]" />
    </div>
  );
};

/* ─────────────────────── Hero Content ───────────────────────── */
const HeroContent: React.FC = () => {
  return (
    <section
      className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-40"
      style={{ paddingTop: 'calc(8rem - 75px)' }}
    >
      {/* Headline */}
      <h1
        className="font-display text-5xl sm:text-7xl md:text-8xl max-w-7xl font-normal animate-fade-rise whitespace-nowrap"
        style={{ lineHeight: 0.95, letterSpacing: '-2.46px', color: '#000000' }}
      >
        Beyond{' '}
        <em className="text-[#6F6F6F]">silence,</em>{' '}
        we build{' '}
        <em className="text-[#6F6F6F]">the&nbsp;eternal.</em>
      </h1>

      {/* Description */}
      <p className="font-body text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-[#6F6F6F] animate-fade-rise-delay">
        Building platforms for brilliant minds, fearless makers, and thoughtful
        souls. Through the noise, we craft digital havens for deep work and pure
        flows.
      </p>

      {/* CTA */}
      <button className="rounded-full px-14 py-5 text-base font-body bg-[#000000] text-[#FFFFFF] mt-12 transition-transform duration-200 hover:scale-[1.03] animate-fade-rise-delay-2 cursor-pointer">
        Begin Journey
      </button>
    </section>
  );
};

/* ──────────────────────── Main Page ─────────────────────────── */
const HeroPage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FFFFFF]">
      {/* Video layer */}
      <VideoBackground />

      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <HeroContent />
    </div>
  );
};

export default HeroPage;
