import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Button } from './ui/button';
import { ArrowDown, ArrowRight, FileText, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { InteractiveTerminal } from './InteractiveTerminal';

interface AppleStyleHeroProps {
  onScrollToSection: (sectionId: string) => void;
}

/* ✏️ Personal details — edit here */
const RESUME_URL = '/resume.pdf'; // put resume.pdf in your /public folder
const PHONE = '+1 (206)-335-1168'; // e.g. '+12065550123' — leave empty to hide the phone icon

const SOCIAL_LINKS = [
  { label: 'Email', href: 'mailto:abhinandinishrestha@gmail.com', icon: Mail, external: false },
  ...(PHONE ? [{ label: 'Phone', href: `tel:${PHONE}`, icon: Phone, external: false }] : []),
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhinandini-shrestha/', icon: Linkedin, external: true },
  { label: 'GitHub', href: 'https://github.com/abhinandini-shrestha', icon: Github, external: true },
];

const FOCUS_AREAS = ['Full-Stack', 'Data Engineering', 'AI / LLMs'];

/* The scroll-away parallax only runs on large screens, where the hero fits in one
   viewport. On phones/tablets the text and terminal stack and scroll normally. */
function useIsDesktop() {
  const query = '(min-width: 1024px)';
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setIsDesktop(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
}

export function AppleStyleHero({ onScrollToSection }: AppleStyleHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 250, damping: 25, restDelta: 0.001 };
  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -500]), springConfig);
  const bgOpacity = useSpring(useTransform(scrollYProgress, [0, 0.3], [1, 0]), springConfig);

  // Content leaves top-down: greeting/name first, actions next, terminal last
  const titleY = useSpring(useTransform(scrollYProgress, [0, 0.25], [0, -300]), springConfig);
  const titleOpacity = useSpring(useTransform(scrollYProgress, [0, 0.15], [1, 0]), springConfig);
  const subtitleY = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, -250]), springConfig);
  const subtitleOpacity = useSpring(useTransform(scrollYProgress, [0.05, 0.2], [1, 0]), springConfig);
  const actionsY = useSpring(useTransform(scrollYProgress, [0, 0.35], [0, -200]), springConfig);
  const actionsOpacity = useSpring(useTransform(scrollYProgress, [0.1, 0.25], [1, 0]), springConfig);
  const terminalY = useSpring(useTransform(scrollYProgress, [0, 0.4], [0, -220]), springConfig);
  const terminalOpacity = useSpring(useTransform(scrollYProgress, [0.12, 0.3], [1, 0]), springConfig);

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const effectsOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      id="home"
      ref={heroRef}
      aria-label="Introduction"
      className="relative min-h-screen bg-gradient-to-b from-background to-background/50"
    >
      {/* Sticky with parallax on desktop, normal flow on smaller screens */}
      <div className="relative overflow-hidden lg:sticky lg:top-0 lg:h-screen">
        {/* Background */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={isDesktop ? { y: bgY, opacity: bgOpacity } : undefined}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/30 to-orange-400/30 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Grid pattern */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: effectsOpacity }}
        >
          <div
            className="absolute inset-0 opacity-10 dark:opacity-5"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </motion.div>

        {/* Main content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-24 lg:py-0">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left column */}
            <div className="text-center lg:text-left">
              <motion.div style={isDesktop ? { y: titleY, opacity: titleOpacity } : undefined}>
                {/* Availability */}
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Open to full-time roles
                </motion.div>

                <motion.p
                  className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-400 mb-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Hi, I'm
                </motion.p>

                <motion.h1
                  className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.05] mb-6 pb-1 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  Abhinandini{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-normal">
                    Shrestha
                  </span>
                </motion.h1>
              </motion.div>

              <motion.div style={isDesktop ? { y: subtitleY, opacity: subtitleOpacity } : undefined}>
                <motion.p
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  Software engineer with <strong className="font-semibold text-gray-900 dark:text-white">6+ years</strong>{' '}
                  building SaaS platforms, APIs and data pipelines, now focused on{' '}
                  <strong className="font-semibold text-gray-900 dark:text-white">building AI-based systems</strong>.
                </motion.p>

                <motion.ul
                  className="flex flex-wrap gap-2 justify-center lg:justify-start mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  {FOCUS_AREAS.map((area) => (
                    <li
                      key={area}
                      className="rounded-full bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-gray-800 backdrop-blur px-3 py-1 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {area}
                    </li>
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div style={isDesktop ? { y: actionsY, opacity: actionsOpacity } : undefined}>
                <motion.div
                  className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.7 }}
                >
                  <div className="flex gap-3">
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="group rounded-full px-6 bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                    >
                      <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-4 w-4" />
                        View my Résumé
                      </a>
                    </Button>
                  </div>

                  <span className="hidden sm:block h-8 w-px bg-gray-300 dark:bg-gray-700" aria-hidden="true" />

                  <nav aria-label="Social links" className="flex gap-1">
                    {SOCIAL_LINKS.map(({ label, href, icon: Icon, external }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        title={label}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group p-2.5 rounded-full hover:bg-primary/10 transition-colors"
                      >
                        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </nav>
                </motion.div>
              </motion.div>
            </div>

            {/* Right column: interactive terminal */}
              <motion.div
                  className="w-full max-w-2xl mx-auto lg:max-w-none"
                  style={isDesktop ? {y: terminalY, opacity: terminalOpacity} : undefined}
              >
                  <motion.div
                      initial={{opacity: 0, y: 40, scale: 0.96}}
                      animate={{opacity: 1, y: 0, scale: 1}}
                      transition={{duration: 0.9, delay: 1.0, type: 'spring', stiffness: 120, damping: 20}}
                  >
                      <InteractiveTerminal/>
                  </motion.div>
                  <p className="text-center text-sm text-muted-foreground mt-4">Try commands like: help, about, skills,
                      projects, contact</p>
              </motion.div>
          </div>
        </div>

          {/* Scroll indicator (desktop only) */}
          <motion.div
              className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          style={{ opacity: indicatorOpacity }}
        >
          <motion.button
            type="button"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center text-gray-500 dark:text-gray-400 cursor-pointer bg-transparent border-none"
            onClick={() => onScrollToSection('about')}
          >
            <span className="text-sm mb-5">Scroll to explore</span>
            <ArrowDown className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}