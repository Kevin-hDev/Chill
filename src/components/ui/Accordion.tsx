import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  variant?: 'default' | 'code';
}

export default function Accordion({
  title,
  defaultOpen = false,
  children,
  variant = 'default',
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const isCode = variant === 'code';

  return (
    <div
      className={`border border-chill-border rounded-chill overflow-hidden ${
        isCode ? 'bg-chill-surface' : 'bg-chill-elevated'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer transition-colors hover:bg-chill-surface ${
          isCode ? 'font-mono text-code' : 'font-heading text-body-sm'
        } text-chill-text`}
        aria-expanded={isOpen}
      >
        <span className="min-w-0 truncate">{title}</span>
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-chill-text-secondary"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="accordion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className={`px-4 pb-4 border-t border-chill-border ${
                isCode
                  ? 'pt-3 font-mono text-code text-chill-text-secondary'
                  : 'pt-3 text-body-sm text-chill-text-secondary'
              }`}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
