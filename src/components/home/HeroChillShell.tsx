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
      <h2 className="text-h2 font-heading font-bold text-chill-text mb-6">
        ChillShell
      </h2>

      {/* Animated Tagline */}
      <div className="mb-4">
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.4,
              delay: index * 0.08,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Subtitle */}
      <p className="text-body text-chill-text-secondary mb-8 max-w-2xl mx-auto">
        {subtitle}
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4 justify-center items-center flex-wrap">
        <a
          href={playStoreUrl}
          className="px-6 py-3 bg-chill-accent text-white rounded-chill-xl text-body-sm font-medium hover:bg-chill-accent-hover transition-colors"
        >
          Download on Play Store
        </a>
        <a
          href={appStoreUrl}
          className="px-6 py-3 border border-chill-border text-chill-text rounded-chill-xl text-body-sm font-medium hover:bg-chill-surface transition-colors"
        >
          Download on App Store
        </a>
      </div>
    </section>
  );
}
