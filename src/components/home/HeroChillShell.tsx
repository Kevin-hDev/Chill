import { useState } from 'react';
import { motion } from 'motion/react';

interface HeroChillShellProps {
  tagline: string;
  subtitle: string;
  githubUrl?: string;
}

export default function HeroChillShell({
  tagline,
  subtitle,
  githubUrl = 'https://github.com/Kevin-hDev',
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

      {/* CTA — GitHub open source */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0, ease: [0.25, 0.4, 0.25, 1] }}
        className="flex gap-4 justify-center items-center flex-wrap mb-8"
      >
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
          <img
            src="/images/icons_github.png"
            alt="GitHub"
            width={87}
            height={87}
            className="h-[87px] w-auto"
          />
        </a>
      </motion.div>

      {/* Terminal card — Clone & Build */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
        className="max-w-4xl mx-auto text-left"
      >
        <BuildCard />
      </motion.div>
    </section>
  );
}

/* Terminal-style card for ChillShell — clone, run & build */
function BuildCard() {
  const [copiedLine, setCopiedLine] = useState<string | null>(null);

  const lines = [
    {
      comment: '# Clone',
      command: 'git clone https://github.com/Kevin-hDev/ChillShell.git',
      id: 'clone',
    },
    { comment: '# Run', command: 'flutter run', id: 'run' },
    { comment: '# Build', command: 'flutter build apk', id: 'build' },
  ];

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLine(id);
      setTimeout(() => setCopiedLine(null), 2000);
    } catch { /* Clipboard API not available */ }
  };

  return (
    <div className="bg-chill-elevated border border-chill-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-chill-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#eb5757' }} />
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#f5c542' }} />
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#4cb782' }} />
          </div>
          <span className="text-micro font-mono text-chill-text-muted">bash</span>
        </div>

        <span className="text-micro font-mono text-chill-text-muted">Android</span>
      </div>

      {/* Commands area */}
      <div className="px-5 py-5 space-y-4">
        {lines.map((line) => (
          <div key={line.id}>
            <p className="text-micro font-mono text-chill-text-muted mb-2">{line.comment}</p>
            <div className="flex items-start justify-between gap-3">
              <pre className="font-mono text-sm text-chill-text whitespace-pre-wrap break-all m-0 flex-1 leading-relaxed">
                <span className="text-chill-text-muted select-none">$ </span>{line.command}
              </pre>
              <button
                onClick={() => handleCopy(line.command, line.id)}
                className="shrink-0 p-1.5 text-chill-text-muted hover:text-chill-text transition-colors cursor-pointer"
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
