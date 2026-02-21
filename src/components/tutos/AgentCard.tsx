import { motion } from 'motion/react';
import { useState } from 'react';

interface Platform {
  label: string;
  install: string;
  run: string;
  upgrade: string;
}

interface AgentCardProps {
  name: string;
  subtitle?: string;
  prereqs?: string;
  platforms: Platform[];
  tabLabels: { install: string; run: string; upgrade: string };
}

export default function AgentCard({
  name,
  subtitle,
  prereqs,
  platforms,
  tabLabels,
}: AgentCardProps) {
  const [activePlatform, setActivePlatform] = useState(0);
  const [activeAction, setActiveAction] = useState<'install' | 'run' | 'upgrade'>('install');
  const [copied, setCopied] = useState(false);

  const code = platforms[activePlatform][activeAction];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const actions: { key: 'install' | 'run' | 'upgrade'; label: string }[] = [
    { key: 'install', label: tabLabels.install },
    { key: 'run', label: tabLabels.run },
    { key: 'upgrade', label: tabLabels.upgrade },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="rounded-chill border border-chill-border bg-chill-elevated overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        {/* Left: compact info */}
        <div className="px-4 py-3 md:w-48 md:border-r md:border-chill-border flex flex-col justify-center shrink-0">
          <h3 className="text-body font-heading font-bold text-chill-text leading-tight">
            {name}
          </h3>
          {subtitle && (
            <p className="text-micro text-chill-text-secondary">{subtitle}</p>
          )}
          {prereqs && (
            <p className="mt-1 text-micro font-mono text-chill-text-muted">
              {prereqs}
            </p>
          )}
        </div>

        {/* Right: tabs + code */}
        <div className="flex-1 min-w-0">
          {/* Tab bar */}
          <div className="flex items-center px-3 py-2 border-b border-chill-border gap-1 flex-wrap">
            {/* OS tabs (only if multiple platforms) */}
            {platforms.length > 1 && (
              <>
                {platforms.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePlatform(i)}
                    className={`px-2 py-1 text-micro rounded-chill-sm transition-colors cursor-pointer ${
                      activePlatform === i
                        ? 'bg-chill-accent/15 text-chill-accent font-medium'
                        : 'text-chill-text-muted hover:text-chill-text-secondary'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
                <span className="mx-1 h-4 w-px bg-chill-border shrink-0" />
              </>
            )}

            {/* Action tabs */}
            {actions.map((a) => (
              <button
                key={a.key}
                onClick={() => setActiveAction(a.key)}
                className={`px-2 py-1 text-micro rounded-chill-sm transition-colors cursor-pointer ${
                  activeAction === a.key
                    ? 'bg-chill-surface text-chill-text font-medium'
                    : 'text-chill-text-muted hover:text-chill-text-secondary'
                }`}
              >
                {a.label}
              </button>
            ))}

            {/* Copy */}
            <button
              onClick={handleCopy}
              className="ml-auto flex items-center gap-1 px-2 py-1 text-micro text-chill-text-muted hover:text-chill-text-secondary transition-colors cursor-pointer shrink-0"
              aria-label="Copy"
            >
              {copied ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              )}
              <span className="hidden sm:inline">{copied ? 'OK' : 'Copy'}</span>
            </button>
          </div>

          {/* Code */}
          <div className="overflow-x-auto px-4 py-3">
            <pre className="font-mono text-code text-chill-text whitespace-pre m-0">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
