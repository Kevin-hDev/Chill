import { motion } from 'motion/react';
import TabsOS from '../ui/TabsOS';
import CodeBlock from '../ui/CodeBlock';
import StepImage from '../ui/StepImage';
import MethodTabs from '../ui/MethodTabs';

interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  maxWidth?: string;
}

interface WolContentProps {
  warning: string;
  step1Title: string;
  step1Content: string;
  biosLink: string;
  winStep2Title: string;
  winStep2Intro?: string;
  winStep2Sub1Title?: string;
  winStep2Sub1Content?: string;
  winStep2Sub2Title?: string;
  winStep2Sub2Content?: string;
  winStep2Sub3Title?: string;
  winStep2Sub3Content?: string;
  winStep2Images?: ImageData[];
  winStep2PowershellCode?: string;
  linuxStep2Title: string;
  linuxStep2Code: string;
  linuxStep2Persist: string;
  step3Title: string;
  step3Content: string;
  winStep3Code: string;
  winStep3GraphicalContent?: string;
  winStep3GraphicalImage?: ImageData;
  linuxStep3Code: string;
  debugTitle: string;
  debugItems: string;
  methodGraphicalLabel?: string;
  methodTerminalLabel?: string;
}

export default function WolContent({
  warning,
  step1Title,
  step1Content,
  biosLink,
  winStep2Title,
  winStep2Intro,
  winStep2Sub1Title,
  winStep2Sub1Content,
  winStep2Sub2Title,
  winStep2Sub2Content,
  winStep2Sub3Title,
  winStep2Sub3Content,
  winStep2Images = [],
  winStep2PowershellCode,
  linuxStep2Title,
  linuxStep2Code,
  linuxStep2Persist,
  step3Title,
  step3Content,
  winStep3Code,
  winStep3GraphicalContent,
  winStep3GraphicalImage,
  linuxStep3Code,
  debugTitle,
  debugItems,
  methodGraphicalLabel = 'Graphical method',
  methodTerminalLabel = 'PowerShell',
}: WolContentProps) {
  const items = debugItems.split('|');

  // Check if we have enriched Windows content
  const hasEnrichedWin = winStep2Intro && winStep2Sub1Title;

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
        <p className="text-body-sm text-amber-900 dark:text-amber-200/90 leading-relaxed">{warning}</p>
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
        <div className="border border-chill-border rounded-chill bg-chill-elevated overflow-hidden">
        <h3 className="font-heading text-body-sm text-chill-text px-4 py-3">2. {winStep2Title}</h3>
        <div className="px-4 pb-4 border-t border-chill-border bg-chill-surface pt-3 text-body-sm text-chill-text-secondary">
        <TabsOS
          windows={
            hasEnrichedWin ? (
              <div className="space-y-4">
                <p className="text-body-sm text-chill-text-secondary leading-relaxed">
                  {winStep2Intro}
                </p>
                <MethodTabs
                  graphicalLabel={methodGraphicalLabel}
                  terminalLabel={methodTerminalLabel}
                  graphicalContent={
                    <div className="space-y-6">
                      {/* Device Manager */}
                      {winStep2Images[0] && (
                        <StepImage src={winStep2Images[0].src} alt={winStep2Images[0].alt} caption={winStep2Images[0].caption} maxWidth={winStep2Images[0].maxWidth} />
                      )}

                      {/* Sub-section 1: Wake on Magic Packet */}
                      {winStep2Sub1Title && (
                        <div>
                          <h4 className="text-body-sm font-heading font-semibold text-chill-text mb-2">
                            {winStep2Sub1Title}
                          </h4>
                          <p className="text-body-sm text-chill-text-secondary mb-3 leading-relaxed">{winStep2Sub1Content}</p>
                          {winStep2Images[1] && (
                            <StepImage src={winStep2Images[1].src} alt={winStep2Images[1].alt} caption={winStep2Images[1].caption} maxWidth={winStep2Images[1].maxWidth} />
                          )}
                        </div>
                      )}

                      {/* Sub-section 2: Power Management */}
                      {winStep2Sub2Title && (
                        <div>
                          <h4 className="text-body-sm font-heading font-semibold text-chill-text mb-2">
                            {winStep2Sub2Title}
                          </h4>
                          <p className="text-body-sm text-chill-text-secondary mb-3 leading-relaxed">{winStep2Sub2Content}</p>
                          {winStep2Images[2] && (
                            <StepImage src={winStep2Images[2].src} alt={winStep2Images[2].alt} caption={winStep2Images[2].caption} maxWidth={winStep2Images[2].maxWidth} />
                          )}
                        </div>
                      )}

                      {/* Sub-section 3: Disable Fast Startup */}
                      {winStep2Sub3Title && (
                        <div>
                          <h4 className="text-body-sm font-heading font-semibold text-chill-text mb-2">
                            {winStep2Sub3Title}
                          </h4>
                          <p className="text-body-sm text-chill-text-secondary mb-3 leading-relaxed">{winStep2Sub3Content}</p>
                          {winStep2Images[3] && (
                            <StepImage src={winStep2Images[3].src} alt={winStep2Images[3].alt} caption={winStep2Images[3].caption} maxWidth={winStep2Images[3].maxWidth} />
                          )}
                        </div>
                      )}
                    </div>
                  }
                  terminalContent={
                    winStep2PowershellCode ? (
                      <CodeBlock code={winStep2PowershellCode} language="powershell" title="PowerShell" />
                    ) : (
                      <p className="text-body-sm text-chill-text-muted italic">No PowerShell commands available for this step.</p>
                    )
                  }
                />
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-body font-heading font-semibold text-chill-text">
                  {winStep2Title}
                </h3>
                <p className="text-body-sm text-chill-text-secondary whitespace-pre-line leading-relaxed">
                  {winStep2Intro}
                </p>
              </div>
            )
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
        </div>
        </div>
      </motion.div>

      {/* Step 3: Configure in ChillShell (common + OS-specific code) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="border border-chill-border rounded-chill bg-chill-elevated overflow-hidden">
        <h3 className="font-heading text-body-sm text-chill-text px-4 py-3">3. {step3Title}</h3>
        <div className="px-4 pb-4 border-t border-chill-border bg-chill-surface pt-3 text-body-sm text-chill-text-secondary">
        <p className="text-body-sm text-chill-text-secondary mb-4 leading-relaxed">
          {step3Content}
        </p>
        <TabsOS
          windows={
            winStep3GraphicalContent ? (
              <MethodTabs
                graphicalLabel={methodGraphicalLabel}
                terminalLabel={methodTerminalLabel}
                graphicalContent={
                  <div className="space-y-3">
                    <p className="text-body-sm text-chill-text-secondary leading-relaxed">
                      {winStep3GraphicalContent}
                    </p>
                    {winStep3GraphicalImage && (
                      <StepImage
                        src={winStep3GraphicalImage.src}
                        alt={winStep3GraphicalImage.alt}
                        caption={winStep3GraphicalImage.caption}
                      />
                    )}
                  </div>
                }
                terminalContent={
                  <CodeBlock code={winStep3Code} language="powershell" title="PowerShell" />
                }
              />
            ) : (
              <CodeBlock code={winStep3Code} language="powershell" title="PowerShell" />
            )
          }
          linux={
            <CodeBlock code={linuxStep3Code} language="bash" title="Terminal" />
          }
        />
        </div>
        </div>
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
            <div key={i} className="border border-chill-border rounded-chill bg-chill-elevated overflow-hidden">
              <div className="flex items-center gap-2 text-chill-text-muted px-4 py-3">
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
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
