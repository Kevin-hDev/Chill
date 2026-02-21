import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../hooks/useTheme';

interface ChillContentProps {
  lang: 'en' | 'fr';
  tagline: string;
  subtitle: string;
  badge: string;
  warning: string;
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
  warning,
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

          {/* CTA — GitHub open source */}
          <div className="flex flex-col items-center justify-center gap-3 mb-6">
            <a
              href="https://github.com/Kevin-hDev/ChillApp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img src="/images/icons_github.png" alt="GitHub" width={87} height={87} className="h-[87px] w-auto" />
            </a>
          </div>

          {/* Install & Clone terminal card */}
          <div className="w-full max-w-4xl mx-auto mb-12 text-left">
            <InstallCard />
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

          <div className="flex flex-col items-center justify-center gap-3 mb-4">
            <a
              href="https://github.com/Kevin-hDev/ChillApp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img src="/images/icons_github.png" alt="GitHub" width={87} height={87} className="h-[87px] w-auto" />
            </a>
          </div>

          <p className="text-body-sm text-chill-text-muted max-w-xl mx-auto leading-relaxed mb-6">
            {warning}
          </p>

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

/* Terminal-style card with method + OS selectors */
function InstallCard() {
  const [method, setMethod] = useState<'install' | 'build'>('install');
  const [os, setOs] = useState<'unix' | 'windows'>('unix');
  const [copiedLine, setCopiedLine] = useState<string | null>(null);

  const shell = os === 'unix' ? 'bash' : 'powershell';

  const lines: { comment: string; command: string; id: string }[] =
    method === 'install'
      ? [
          {
            comment: '# Install',
            command:
              os === 'unix'
                ? 'curl -fsSL https://raw.githubusercontent.com/Kevin-hDev/ChillApp/main/scripts/install.sh | bash'
                : 'irm https://raw.githubusercontent.com/Kevin-hDev/ChillApp/main/scripts/install.ps1 | iex',
            id: 'install',
          },
          {
            comment: '# Clone',
            command: 'git clone https://github.com/Kevin-hDev/ChillApp.git',
            id: 'clone',
          },
        ]
      : [
          {
            comment: '# Run',
            command:
              os === 'unix' ? 'flutter run -d linux' : 'flutter run -d windows',
            id: 'run',
          },
          {
            comment: '# Build',
            command:
              os === 'unix' ? 'flutter build linux' : 'flutter build windows',
            id: 'build',
          },
        ];

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLine(id);
      setTimeout(() => setCopiedLine(null), 2000);
    } catch { /* Clipboard API not available */ }
  };

  const tabClass = (active: boolean) =>
    `px-3 py-1 text-micro font-mono rounded transition-colors cursor-pointer ${
      active
        ? 'bg-chill-surface text-white'
        : 'text-chill-text-muted hover:text-chill-text-secondary'
    }`;

  return (
    <div className="bg-chill-elevated border border-chill-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-chill-border">
        <div className="flex items-center gap-3">
          {/* macOS dots */}
          <div className="flex items-center gap-2">
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#eb5757' }} />
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#f5c542' }} />
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#4cb782' }} />
          </div>
          <span className="text-micro font-mono text-chill-text-muted">{shell}</span>
        </div>

        {/* Selectors */}
        <div className="flex items-center gap-4">
          {/* Method selector */}
          <div className="flex items-center gap-1">
            <button onClick={() => setMethod('install')} className={tabClass(method === 'install')}>
              Install
            </button>
            <button onClick={() => setMethod('build')} className={tabClass(method === 'build')}>
              Build
            </button>
          </div>

          {/* Separator */}
          <span className="w-px h-5 bg-chill-border" />

          {/* OS selector */}
          <div className="flex items-center gap-1">
            <button onClick={() => setOs('unix')} className={tabClass(os === 'unix')}>
              Linux / macOS
            </button>
            <button onClick={() => setOs('windows')} className={tabClass(os === 'windows')}>
              Windows
            </button>
          </div>
        </div>
      </div>

      {/* Commands area */}
      <div className="px-5 py-5 space-y-4">
        {lines.map((line) => (
          <div key={line.id}>
            <p className="text-micro font-mono text-chill-text-muted mb-2">{line.comment}</p>
            <div className="flex items-start justify-between gap-3">
              <pre className="font-mono text-sm text-white whitespace-pre-wrap break-all m-0 flex-1 leading-relaxed">
                <span className="text-chill-text-muted select-none">$ </span>{line.command}
              </pre>
              <button
                onClick={() => handleCopy(line.command, line.id)}
                className="shrink-0 p-1.5 text-chill-text-muted hover:text-white transition-colors cursor-pointer"
                aria-label="Copy"
              >
                {copiedLine === line.id ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
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
