import { motion } from 'motion/react';
import TabsOS from '../ui/TabsOS';
import Accordion from '../ui/Accordion';
import CodeBlock from '../ui/CodeBlock';

interface WolContentProps {
  warning: string;
  step1Title: string;
  step1Content: string;
  biosLink: string;
  winStep2Title: string;
  winStep2Content: string;
  linuxStep2Title: string;
  linuxStep2Code: string;
  linuxStep2Persist: string;
  step3Title: string;
  step3Content: string;
  winStep3Code: string;
  linuxStep3Code: string;
  debugTitle: string;
  debugItems: string;
}

export default function WolContent({
  warning,
  step1Title,
  step1Content,
  biosLink,
  winStep2Title,
  winStep2Content,
  linuxStep2Title,
  linuxStep2Code,
  linuxStep2Persist,
  step3Title,
  step3Content,
  winStep3Code,
  linuxStep3Code,
  debugTitle,
  debugItems,
}: WolContentProps) {
  const items = debugItems.split('|');

  return (
    <div className="space-y-10">
      {/* Warning banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className="rounded-chill border border-amber-500/40 bg-amber-500/10 px-5 py-4 flex items-start gap-3"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-400 shrink-0 mt-0.5"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <p className="text-body-sm text-amber-200/90 leading-relaxed">{warning}</p>
      </motion.div>

      {/* Step 1: Enable in BIOS (common) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <h2 className="text-h3 font-heading font-bold text-chill-text mb-3">
          1. {step1Title}
        </h2>
        <p className="text-body-sm text-chill-text-secondary leading-relaxed">
          {step1Content}{' '}
          <a
            href={biosLink}
            className="text-chill-accent underline underline-offset-2 hover:text-chill-accent/80 transition-colors"
          >
            BIOS Setup &rarr;
          </a>
        </p>
      </motion.div>

      {/* Step 2: OS-specific (TabsOS) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <h2 className="text-h3 font-heading font-bold text-chill-text mb-4">
          2. {winStep2Title.replace(/^.*?in /, 'Enable in ')}
        </h2>
        <TabsOS
          windows={
            <div className="space-y-3">
              <h3 className="text-body font-heading font-semibold text-chill-text">
                {winStep2Title}
              </h3>
              <p className="text-body-sm text-chill-text-secondary whitespace-pre-line leading-relaxed">
                {winStep2Content}
              </p>
            </div>
          }
          linux={
            <div className="space-y-4">
              <h3 className="text-body font-heading font-semibold text-chill-text">
                {linuxStep2Title}
              </h3>
              <CodeBlock code={linuxStep2Code} language="bash" title="Terminal" />
              <p className="text-body-sm text-chill-text-muted italic">
                {linuxStep2Persist}
              </p>
            </div>
          }
        />
      </motion.div>

      {/* Step 3: Configure in ChillShell (common + OS-specific code) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <h2 className="text-h3 font-heading font-bold text-chill-text mb-3">
          3. {step3Title}
        </h2>
        <p className="text-body-sm text-chill-text-secondary mb-4 leading-relaxed">
          {step3Content}
        </p>
        <TabsOS
          windows={
            <CodeBlock code={winStep3Code} language="powershell" title="PowerShell" />
          }
          linux={
            <CodeBlock code={linuxStep3Code} language="bash" title="Terminal" />
          }
        />
      </motion.div>

      {/* Debug checklist */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <h2 className="text-h3 font-heading font-bold text-chill-text mb-4">
          {debugTitle}
        </h2>
        <div className="space-y-2">
          {items.map((item, i) => (
            <Accordion key={i} title={item.trim()}>
              <div className="flex items-center gap-2 text-chill-text-muted">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-chill-accent"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-body-sm">{item.trim()}</span>
              </div>
            </Accordion>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
