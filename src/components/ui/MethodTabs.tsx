import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Method = 'graphical' | 'terminal';

interface MethodTabsProps {
  graphicalLabel: string;
  terminalLabel: string;
  graphicalContent: ReactNode;
  terminalContent: ReactNode;
}

export default function MethodTabs({
  graphicalLabel,
  terminalLabel,
  graphicalContent,
  terminalContent,
}: MethodTabsProps) {
  const [active, setActive] = useState<Method>('graphical');

  return (
    <div className="mt-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActive('graphical')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-micro font-body rounded-chill-sm border transition-colors cursor-pointer ${
            active === 'graphical'
              ? 'border-chill-accent text-chill-accent bg-chill-accent/10'
              : 'border-chill-border text-chill-text-secondary hover:text-chill-text'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          {graphicalLabel}
        </button>
        <button
          onClick={() => setActive('terminal')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-micro font-body rounded-chill-sm border transition-colors cursor-pointer ${
            active === 'terminal'
              ? 'border-chill-accent text-chill-accent bg-chill-accent/10'
              : 'border-chill-border text-chill-text-secondary hover:text-chill-text'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          {terminalLabel}
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {active === 'graphical' ? graphicalContent : terminalContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
