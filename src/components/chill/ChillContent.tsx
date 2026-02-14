import { motion } from 'motion/react';
import { useTheme } from '../../hooks/useTheme';

interface ChillContentProps {
  lang: 'en' | 'fr';
  tagline: string;
  subtitle: string;
  badge: string;
  downloadWindows: string;
  downloadLinux: string;
  sshTitle: string;
  sshDescription: string;
  wolTitle: string;
  wolDescription: string;
  tailscaleTitle: string;
  tailscaleDescription: string;
  ctaTitle: string;
  ctaManual: string;
  tutosHref: string;
}

export default function ChillContent({
  lang,
  tagline,
  subtitle,
  badge,
  downloadWindows,
  downloadLinux,
  sshTitle,
  sshDescription,
  wolTitle,
  wolDescription,
  tailscaleTitle,
  tailscaleDescription,
  ctaTitle,
  ctaManual,
  tutosHref,
}: ChillContentProps) {
  const theme = useTheme();
  const imgBase = `/images/chill/${lang}/${theme}`;

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="py-12 md:py-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-hero-h1 font-heading font-bold text-chill-text mb-4">
            Chill
          </h1>
          <p className="text-h3 md:text-h2 font-heading font-semibold text-chill-text mb-4">
            {tagline}
          </p>
          <p className="text-body text-chill-text-secondary max-w-2xl mx-auto mb-6">
            {subtitle}
          </p>
          <span className="inline-block text-body-sm text-chill-accent font-heading font-semibold mb-8">
            {badge}
          </span>

          {/* Download buttons (disabled placeholders) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <button
              disabled
              className="px-6 py-3 rounded-chill border border-chill-border bg-chill-elevated text-body-sm text-chill-text-secondary cursor-not-allowed opacity-50"
            >
              {downloadWindows}
            </button>
            <button
              disabled
              className="px-6 py-3 rounded-chill border border-chill-border bg-chill-elevated text-body-sm text-chill-text-secondary cursor-not-allowed opacity-50"
            >
              {downloadLinux}
            </button>
          </div>
        </motion.div>

        {/* Dashboard image */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <img
            src={`${imgBase}/0.png`}
            alt="Chill dashboard"
            className="w-full rounded-chill-xl border border-chill-border shadow-2xl"
            loading="eager"
          />
        </motion.div>
      </section>

      <hr className="section-divider" />

      {/* SSH Section — image right */}
      <FeatureSection
        title={sshTitle}
        description={sshDescription}
        imageSrc={`${imgBase}/1.png`}
        imageAlt="SSH Setup"
        imageRight
      />

      <hr className="section-divider" />

      {/* WoL Section — image left */}
      <FeatureSection
        title={wolTitle}
        description={wolDescription}
        imageSrc={`${imgBase}/2.png`}
        imageAlt="Wake-on-LAN Setup"
        imageRight={false}
      />

      <hr className="section-divider" />

      {/* Tailscale Section — image right */}
      <FeatureSection
        title={tailscaleTitle}
        description={tailscaleDescription}
        imageSrc={`${imgBase}/3.png`}
        imageAlt="Tailscale"
        imageRight
      />

      <hr className="section-divider" />

      {/* CTA */}
      <section className="py-12 md:py-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h2 font-heading font-bold text-chill-text mb-6">
            {ctaTitle}
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <button
              disabled
              className="px-6 py-3 rounded-chill border border-chill-border bg-chill-elevated text-body-sm text-chill-text-secondary cursor-not-allowed opacity-50"
            >
              {downloadWindows}
            </button>
            <button
              disabled
              className="px-6 py-3 rounded-chill border border-chill-border bg-chill-elevated text-body-sm text-chill-text-secondary cursor-not-allowed opacity-50"
            >
              {downloadLinux}
            </button>
          </div>

          <a
            href={tutosHref}
            className="text-body-sm text-chill-accent hover:underline transition-colors"
          >
            {ctaManual} &rarr;
          </a>
        </motion.div>
      </section>
    </div>
  );
}

/* Feature section with alternating image/text layout */
function FeatureSection({
  title,
  description,
  imageSrc,
  imageAlt,
  imageRight,
}: {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageRight: boolean;
}) {
  const textBlock = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-h2 font-heading font-bold text-chill-text mb-4">
        {title}
      </h2>
      <p className="text-body text-chill-text-secondary leading-relaxed">
        {description}
      </p>
    </motion.div>
  );

  const imageBlock = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.15 }}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full rounded-chill-xl border border-chill-border shadow-lg"
        loading="lazy"
      />
    </motion.div>
  );

  return (
    <section className="py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {imageRight ? (
          <>
            {textBlock}
            {imageBlock}
          </>
        ) : (
          <>
            {imageBlock}
            {textBlock}
          </>
        )}
      </div>
    </section>
  );
}
