import { motion } from 'motion/react';

interface HeroChillShellProps {
  tagline: string;
  subtitle: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
}

export default function HeroChillShell({
  tagline,
  subtitle,
  playStoreUrl = '#',
  appStoreUrl = '#',
}: HeroChillShellProps) {
  // Split tagline into words for animation
  const words = tagline.split(' ');

  return (
    <section className="py-16 text-center">
      {/* Product Name */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="text-h2 font-heading font-bold text-chill-text mb-6"
      >
        ChillShell
      </motion.h1>

      {/* Animated Tagline */}
      <div className="mb-4">
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.5 + index * 0.08,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className="text-body text-chill-text-secondary mb-8 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>

      {/* CTA Buttons — Official store badges */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0, ease: [0.25, 0.4, 0.25, 1] }}
        className="flex gap-4 justify-center items-center flex-wrap"
      >
        <a href={playStoreUrl} className="inline-block hover:opacity-80 transition-opacity">
          <img
            src="/images/badges/google-play-badge.png"
            alt="Get it on Google Play"
            width={210}
            height={62}
            className="h-[62px] w-auto"
          />
        </a>
        {/* App Store — masqué temporairement, réactiver quand prêt
        <a href={appStoreUrl} className="inline-block hover:opacity-80 transition-opacity">
          <img
            src="/images/badges/app-store-badge.svg"
            alt="Download on the App Store"
            width={135}
            height={40}
            className="h-[40px] w-auto"
          />
        </a>
        */}
      </motion.div>
    </section>
  );
}
